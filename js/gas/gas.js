// https://developers.google.com/apps-script/reference/spreadsheet/sheet
var SpreadsheetId = '1N9aa3LZMaFwNbjUSGVD9NloBNE7sM0DY318-DtZHzVo';

function checkId(id) {
  return (SpreadsheetId === id);
}

function returnJSON(obj) {
  return (
    ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON)
  );
}

function getSheets() {
  return SpreadsheetApp.openById(SpreadsheetId).getSheets();
}

function getSheetFromNamedInRC(r, c) {
  var targetSheetName = getSheets()[0].getSheetValues(r, c, 1, 1)[0];
  // LL(targetSheetName);
  return SpreadsheetApp.openById(SpreadsheetId).getSheetByName(targetSheetName);
}

function getPmNames() {
  var sheet = getSheetFromNamedInRC(2, 1);
  var lastRow = sheet.getLastRow();
  var names = sheet.getSheetValues(1, 1, lastRow, 1);
  return names.map(function(s) { return s[0]; });
}

function doGet(e) {
  var param = e.parameter;
  var id = param.id;

  if (param.debug) {
    LL(id);
  }

  if (!checkId(id)) {
    return returnJSON({
      status: 'error',
      errors: ['invalidate id']
    });
  }

  var sheet = getSheetFromNamedInRC(1, 1);
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  var firstRowValues = sheet.getSheetValues(1, 1, 1, lastColumn)[0];
  var resultSheetArr = sheet.getSheetValues(2, 1, lastRow - 1, lastColumn);
  var names = getPmNames();
  var resultObj = {
    status: 'ok',
    data: []
  };

  resultObj.data = resultSheetArr.map(function(d) {
    var dd = d.reduce(function(all, i, idx) {
      var l = firstRowValues[idx];
      if (l.indexOf('--') !== 0) { // non hidden data
        all[firstRowValues[idx]] = i;
      }
      return all;
    }, {});
    dd.name = names[d[0] - 1];
    return dd;
  });
  if (param.debug) { LL(JSON.stringify(resultObj)); }
  return returnJSON(resultObj);
}

function LL(s) {
  Logger.log(s);
  console.log(s);
}

function doPost(e) {
  var param = e.parameter;
  var id = param.id;
  LL('doPost');
  LL(param);
  if (!checkId(id)) {
    return (
      ContentService.createTextOutput(
        JSON.stringify({
          status: 'error',
          errors: ['invalidate id']
        })
      ).setMimeType(ContentService.MimeType.JSON)
    );
  }

  var sheet = getSheetFromNamedInRC(1, 1);
  var data = [param.dex, param.lat, param.lng, param.scale, param.note, param.type, param.uid, new Date().toISOString()];
  sheet.appendRow(data);
  var JSONString = JSON.stringify({
    status: 'ok',
    lastRow: sheet.getLastRow()
  });
  return ContentService.createTextOutput(JSONString).setMimeType(ContentService.MimeType.JSON);
}

function debugGet() {
  LL('debugGet');
  var x = doGet({parameter: { id: SpreadsheetId, debug: true, }});
}

function debugPost() {
  LL('debugPost');
  var x = doPost({
    parameter: {
      id: SpreadsheetId,
      debug: true,
      'dex': 1, 'lat': 25.047516, 'lng': 121.563219, 'scale': 5, 'note': 'cc', 'type': 'new', 'uid': 1,
    }
  });
  LL(x);
}
