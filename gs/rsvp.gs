const KEY          = "sergei-daria-2026";
const SHEET_ANKETY = "Анкеты";
const SHEET_GUESTS = "Гости";

function doPost(e) {
  try {
    const ss   = SpreadsheetApp.getActiveSpreadsheet();
    const data = JSON.parse(e.postData.contents);

    const logSheet = ss.getSheetByName("Лог") || ss.insertSheet("Лог");
    logSheet.appendRow([
      new Date().toLocaleString("ru-RU"),
      JSON.stringify(data)
    ]);

    if (data.key !== KEY) {
      return response("forbidden_key");
    }

    const guestSheet = ss.getSheetByName(SHEET_GUESTS);
    if (guestSheet) {
      const rows      = guestSheet.getDataRange().getValues();
      const guestName = (data.guest_url || "").trim().toLowerCase();
      const guestG    = (data.g         || "").trim().toLowerCase();

      const found = rows.slice(1).some(row => {
        const url = String(row[3] || "").trim();
        if (!url) return false;
        const rowName = String(row[0] || "").trim().toLowerCase();
        const rowG    = String(row[1] || "").trim().toLowerCase();
        return rowName === guestName && rowG === guestG;
      });

      if (!found) return response("forbidden_guest");
    }

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

    updateGuestStatus(guestSheet, data);
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
    const url = String(rows[i][3] || "").trim();
    if (!url) continue;

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
  let yesCount = 0, noCount = 0, pendingCount = 0;

  rows.forEach(row => {
    const url = String(row[3] || "").trim();
    if (!url) return;

    const status = String(row[4] || "").trim();
    // Колонка F (индекс 5) — количество человек, заполняется вручную
    const people = parseInt(row[5]) || 1;

    if (status === "Придёт") {
      yes++;
      yesCount += people;
    } else if (status === "Не придёт") {
      no++;
      noCount += people;
    } else {
      pending++;
      pendingCount += people;
    }
  });

  const total      = yes + no + pending;
  const totalCount = yesCount + noCount + pendingCount;

  // Удаляем старые чарты
  guestSheet.getCharts().forEach(chart => guestSheet.removeChart(chart));

  // H=Статус, I=Анкет, J=Человек
  guestSheet.getRange("H4:J8").setValues([
    ["Статус",       "Анкет",   "Человек"],
    ["Придут",       yes,       yesCount],
    ["Не придут",    no,        noCount],
    ["Не ответили",  pending,   pendingCount],
    ["Всего",        total,     totalCount],
  ]);

  // Цвета
  guestSheet.getRange("I5").setBackground("#CCFFCC");
  guestSheet.getRange("J5").setBackground("#CCFFCC");
  guestSheet.getRange("I6").setBackground("#FFCCCC");
  guestSheet.getRange("J6").setBackground("#FFCCCC");
  guestSheet.getRange("I7").setBackground("#E0E0E0");
  guestSheet.getRange("J7").setBackground("#E0E0E0");
  guestSheet.getRange("I8").setBackground("#FFFFFF");
  guestSheet.getRange("J8").setBackground("#FFFFFF");

  // Жирный итог и заголовки
  guestSheet.getRange("H8:J8").setFontWeight("bold");
  guestSheet.getRange("H4:J4")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  SpreadsheetApp.flush();

  // График: метки из H4:H7, значения людей из J4:J7 (колонка F листа Гости)
  const chartBuilder = guestSheet.newChart()
    .setChartType(Charts.ChartType.PIE)
    .addRange(guestSheet.getRange("H4:H7"))
    .addRange(guestSheet.getRange("J4:J7"))
    .setPosition(9, 8, 0, 0)
    .setOption("title",           "Подтверждение участия")
    .setOption("width",           380)
    .setOption("height",          300)
    .setOption("colors",          ["#CCFFCC", "#FFCCCC", "#E0E0E0"])
    .setOption("pieSliceText",    "percentage")
    .setOption("legend",          { position: "right" })
    .setOption("backgroundColor", "#ffffff");

  guestSheet.insertChart(chartBuilder.build());
  SpreadsheetApp.flush();

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