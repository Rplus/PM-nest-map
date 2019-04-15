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
    dd.name = names[d[1] - 1];
    return dd;
  });
  if (param.debug) { LL(JSON.stringify(resultObj)); }
  return returnJSON(resultObj);
}

function LL(s) {
  Logger.log(s);
  console.log(s);
}

// function cc() {
//   var sheet = getActiveSheet();
//   var lastColumn = sheet.getLastColumn();
//   var lastRow = sheet.getLastRow();

//   LL(sheet.getFrozenRows());
//   LL(lastColumn);
//   var fRows = sheet.getFrozenRows();
//   var fColumns = sheet.getFrozenColumns();
//   var dataRC = [1 + fRows, 1 + fColumns];
//   LL(sheet.getSheetValues(1 + fRows, 1 + fColumns, lastRow - fRows, lastColumn - fColumns));
// }

function doPost(e) {
  var param = e.parameter;
  var id = param.id;
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
  var data = param.data;
  var sheet = getSheetFromNamedInRC(1, 1);
  data = data.split(',');
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
  // Logger.log('debugGet');
  // var queryString = '?id=' + SpreadsheetId;
  // var url = ScriptApp.getService().getUrl() + queryString;
  // var options = {
  //   'method': 'GET',
  //   'followRedirects': true,
  //   'muteHttpExceptions': true
  // };
  // var result = UrlFetchApp.fetch(url, options);
  // if (result.getResponseCode() == 200) {
  //   var params = JSON.parse(result.getContentText());
  //   Logger.log(JSON.stringify(params));
  // }
}

function debugPost() {
  LL('debugPost');
  var x = doPost({parameter: { id: SpreadsheetId, debug: true, data: 'cc,as,,asd,asd,aa11'}});

  // Logger.log('debugPost');
  // var url = ScriptApp.getService().getUrl();
  // var payload = {
  //   id: '14q38yMwbrI0c9Mq6PrOB-oxndFmk3wg6_SjeMtXi6Qg'
  // };
  // var options = {
  //   'method': 'POST',
  //   'payload': payload,
  //   'followRedirects': true,
  //   'muteHttpExceptions': true
  // };
  // var result = UrlFetchApp.fetch(url, options);
  // if (result.getResponseCode() == 200) {
  //   var params = JSON.parse(result.getContentText());
  //   Logger.log(params);
  // }
}
