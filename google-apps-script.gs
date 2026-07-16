/*
 * Setup:
 * 1. Create a Google Sheet (e.g. "The Beast - Leads").
 * 2. Extensions > Apps Script. Delete the placeholder code, paste this file's contents.
 * 3. Deploy > New deployment > select type "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the web app URL and paste it into SHEET_WEBHOOK_URL in index.html.
 * 5. Re-deploy (New deployment, or Manage deployments > Edit > new version)
 *    any time you edit this script.
 *
 * Two sheet tabs are used: "Signups" and "Membership Leads".
 * They are created automatically the first time each type of submission arrives.
 */

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  if (data.type === 'signup') {
    var signupSheet = getOrCreateSheet(ss, 'Signups', ['Timestamp', 'Name', 'Email', 'Phone']);
    signupSheet.appendRow([data.timestamp, data.name, data.email, data.phone]);
  } else if (data.type === 'membership-lead') {
    var leadSheet = getOrCreateSheet(ss, 'Membership Leads',
      ['Timestamp', 'Name', 'Phone', 'Email', 'Plan', 'Price', 'Preferred Payment Method']);
    leadSheet.appendRow([data.timestamp, data.name, data.phone, data.email,
      data.plan, data.price, data.preferredPaymentMethod]);
  }

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet(ss, name, headerRow) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headerRow);
    sheet.getRange(1, 1, 1, headerRow.length).setFontWeight('bold');
  }
  return sheet;
}
