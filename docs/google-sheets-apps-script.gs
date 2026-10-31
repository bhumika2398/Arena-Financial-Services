// Paste into the Google Sheet's Apps Script editor (Extensions > Apps Script),
// then Deploy > New deployment > Web app (Execute as: Me, Access: Anyone).

const SECRET = "CHANGE-ME-TO-A-LONG-RANDOM-STRING"; // must match GOOGLE_SHEETS_SECRET
const SHEET_NAME = "Enquiries v2"; // new tab: the columns changed, so do not reuse the old tab

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.secret !== SECRET) return out({ ok: false, error: "forbidden" });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(data.headers);
      sheet.setFrozenRows(1);
    }
    // Prefix with ' so numbers like phone numbers or leading zeros are kept as text.
    sheet.appendRow(data.row.map(function (v) { return "'" + v; }));
    return out({ ok: true });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  }
}

function out(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
