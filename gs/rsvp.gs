const KEY          = "sergei-daria-2026";
const SHEET_ANKETY = "Анкеты";
const SHEET_GUESTS = "Гости";

function doPost(e) {
  try {
    const ss   = SpreadsheetApp.getActiveSpreadsheet();
    const data = JSON.parse(e.postData.contents);

    // Лог
    const logSheet = ss.getSheetByName("Лог") || ss.insertSheet("Лог");
    logSheet.appendRow([
      new Date().toLocaleString("ru-RU"),
      JSON.stringify(data)
    ]);

    // 1. Проверка ключа
    if (data.key !== KEY) {
      return response("forbidden_key");
    }

    // 2. Проверка по белому списку
    const guestSheet = ss.getSheetByName(SHEET_GUESTS);
    if (guestSheet) {
      const rows      = guestSheet.getDataRange().getValues();
      const guestName = (data.guest_url || "").trim().toLowerCase();
      const guestG    = (data.g         || "").trim().toLowerCase();

      const found = rows.slice(1).some(row => {
        const url     = String(row[3] || "").trim();
        if (!url) return false;
        const rowName = String(row[0] || "").trim().toLowerCase();
        const rowG    = String(row[1] || "").trim().toLowerCase();
        return rowName === guestName && rowG === guestG;
      });

      if (!found) return response("forbidden_guest");
    }

    // 3. Запись в Анкеты
    const mainSheet = ss.getSheetByName(SHEET_ANKETY) || ss.getSheets()[0];
    mainSheet.appendRow([
      data.timestamp  || new Date().toLocaleString("ru-RU"),
      data.name       || "",
      data.attendance || "",
      data.family     || "",
      data.alcohol    || "",
      data.wishes     || "",
      data.guest_url  || "",
      data.g          || "",
    ]);

    // 4. Обновить статус в листе Гости
    updateGuestStatus(guestSheet, data);

    // 5. Обновить диаграмму
    buildPieChart();

    return response("ok");

  } catch (err) {
    return response("error: " + err.message);
  }
}

function updateGuestStatus(guestSheet, data) {
  if (!guestSheet) return;
  const rows      = guestSheet.getDataRange().getValues();
  const guestName = (data.guest_url || "").trim().toLowerCase();
  const guestG    = (data.g         || "").trim().toLowerCase();

  for (let i = 1; i < rows.length; i++) {
    const url = String(rows[i][3] || "").trim(); // колонка D — URL
    if (!url) continue;                          // пропускаем строки без URL

    const rowName = String(rows[i][0] || "").trim().toLowerCase();
    const rowG    = String(rows[i][1] || "").trim().toLowerCase();

    if (rowName === guestName && rowG === guestG) {
      const statusCell = guestSheet.getRange(i + 1, 5);
      const attendance = (data.attendance || "").toLowerCase();

      if (attendance.includes("не смогу")) {
        statusCell.setValue("Не придёт");
        statusCell.setBackground("#FFCCCC");
      } else {
        statusCell.setValue("Придёт");
        statusCell.setBackground("#CCFFCC");
      }
      break;
    }
  }
}

function buildPieChart() {
  const ss         = SpreadsheetApp.getActiveSpreadsheet();
  const guestSheet = ss.getSheetByName(SHEET_GUESTS);
  if (!guestSheet) return;

  const rows = guestSheet.getDataRange().getValues().slice(1);
  let yes = 0, no = 0, pending = 0;

  rows.forEach(row => {
    const url = String(row[3] || "").trim(); // колонка D — URL
    if (!url) return;                        // пропускаем строки без URL

    const status = String(row[4] || "").trim();
    if (status === "Придёт")         yes++;
    else if (status === "Не придёт") no++;
    else                             pending++;
  });

  const total = yes + no + pending;

  // Удаляем старые чарты с листа Гости
  const charts = guestSheet.getCharts();
  charts.forEach(chart => guestSheet.removeChart(chart));

  // Данные в G4:H8
  guestSheet.getRange("G4:H8").setValues([
    ["Статус",       "Количество"],
    ["Придут",       yes],
    ["Не придут",    no],
    ["Не ответили",  pending],
    ["Всего гостей", total],
  ]);

  // Цвета ячеек
  guestSheet.getRange("H5").setBackground("#CCFFCC");
  guestSheet.getRange("H6").setBackground("#FFCCCC");
  guestSheet.getRange("H7").setBackground("#E0E0E0");
  guestSheet.getRange("H8").setBackground("#FFFFFF");

  // Жирный итог
  guestSheet.getRange("G8:H8").setFontWeight("bold");

  // Заголовки жирные и по центру
  guestSheet.getRange("G4:H4")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  SpreadsheetApp.flush();

  // Чарт только по G4:H7 — без строки "Всего гостей"
  const dataRange = guestSheet.getRange("G4:H7");
  const chartBuilder = guestSheet.newChart()
    .setChartType(Charts.ChartType.PIE)
    .addRange(dataRange)
    .setPosition(9, 7, 0, 0)
    .setOption("title",           "Подтверждение участия")
    .setOption("width",           380)
    .setOption("height",          300)
    .setOption("colors",          ["#CCFFCC", "#FFCCCC", "#E0E0E0"])
    .setOption("pieSliceText",    "percentage")
    .setOption("legend",          { position: "right" })
    .setOption("backgroundColor", "#ffffff");

  guestSheet.insertChart(chartBuilder.build());
  SpreadsheetApp.flush();

  // Удаляем лист Статистика если остался от прошлой версии
  const statSheet = ss.getSheetByName("Статистика");
  if (statSheet) ss.deleteSheet(statSheet);
}

function doGet() {
  return ContentService.createTextOutput("Wedding RSVP script работает ✓");
}

function response(status) {
  return ContentService
    .createTextOutput(JSON.stringify({ status }))
    .setMimeType(ContentService.MimeType.JSON);
}