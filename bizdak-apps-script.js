/**
 * Bizdak Store Application — Google Apps Script
 *
 * SETUP INSTRUCTIONS (do this once):
 * 1. Open script.google.com → New project → paste this code
 * 2. Click Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 3. Click Deploy → copy the Web App URL
 * 4. Paste that URL into store.html as APPS_SCRIPT_URL
 * 5. Done — every form submission adds a row to your sheet
 *
 * The sheet will auto-create these columns on first submission:
 * Timestamp | Store Name | City | Category | Address | Phone | Email | Website | Description
 */

const SHEET_ID   = '1Gfm140vrZ3KJbLEtTGEQ9zddSNh41vdVd4EYSnR3zW4';
const SHEET_NAME = 'Sheet1'; // change if your sheet tab has a different name
const NOTIFY_EMAIL = 'info@afridim.com';

function doPost(e) {
  try {
    const ss    = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

    // Add header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Store Name',
        'City',
        'Category',
        'Address',
        'Phone',
        'Email',
        'Website',
        'Description',
      ]);
      // Bold the header row
      sheet.getRange(1, 1, 1, 9).setFontWeight('bold').setBackground('#1a8fb5').setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }

    // Parse the submitted data
    const params = e.parameter || {};
    const now    = new Date();
    // Sanitize all user inputs — prefix with single quote to prevent
    // formula injection attacks (e.g. =IMPORTRANGE(...) in store name)
    function sanitize(val) {
      const s = (val || '').toString().trim();
      // If value starts with =, +, -, @ — prefix with ' to neutralize formula
      return (s.startsWith('=') || s.startsWith('+') || s.startsWith('-') || s.startsWith('@'))
        ? "'" + s
        : s;
    }

    const row = [
      Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss'),
      sanitize(params.store_name),
      sanitize(params.city),
      sanitize(params.category),
      sanitize(params.address),
      sanitize(params.phone),
      sanitize(params.email),
      sanitize(params.website),
      sanitize(params.description),
    ];

    sheet.appendRow(row);

    // Auto-resize columns for readability
    sheet.autoResizeColumns(1, 9);

    // Send notification email to info@afridim.com
    MailApp.sendEmail({
      to:      NOTIFY_EMAIL,
      subject: `New Bizdak Store Application — ${params.store_name || 'Unknown'} (${params.city || '?'})`,
      body: [
        'A new store application has been submitted.',
        '',
        `Store Name : ${params.store_name  || '—'}`,
        `City       : ${params.city        || '—'}`,
        `Category   : ${params.category    || '—'}`,
        `Address    : ${params.address     || '—'}`,
        `Phone      : ${params.phone       || '—'}`,
        `Email      : ${params.email       || '—'}`,
        `Website    : ${params.website     || '—'}`,
        `Description: ${params.description || '—'}`,
        '',
        `Submitted  : ${Utilities.formatDate(now, Session.getScriptTimeZone(), 'dd MMM yyyy HH:mm')}`,
        '',
        `View all submissions: https://docs.google.com/spreadsheets/d/${SHEET_ID}`,
      ].join('\n'),
    });

    // Return success — CORS headers needed so the browser fetch() doesn't block
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET handler — just confirms the script is live
function doGet() {
  return ContentService
    .createTextOutput('Bizdak Apps Script is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}
