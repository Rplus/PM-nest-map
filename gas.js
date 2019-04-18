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

function getBlacklist() {
  var sheet = getSheetFromNamedInRC(3, 1);
  var lastRow = sheet.getLastRow();
  var blacklist = sheet.getSheetValues(1, 1, lastRow, 1);
  return blacklist.map(function(s) { return s[0]; });
}

function validateData(dataArr) {
  var blacklist = getBlacklist();
  var data = dataArr.filter(function(rowData) {
    return (
      !!rowData[0] && (rowData[0] < 500) &&
      !!rowData[1] &&
      !!rowData[2] &&
      !!rowData[3] &&
      (blacklist.indexOf(rowData[6]) === -1) &&
      (rowData[8] !== 'gg') // admin kill word
    );
  });
  return uniArr(data);
}

function uniArr(arr) {
  var o = {};
  arr.forEach(function(d) {
    var key = d.slice(1, 3).join();
    if (
      !o[key] ||
      ( o[key] && (d[5] === 'update') )
    ) {
      o[key] = d;
    }
    if (d[4] === 'xxXxx') { // kill word
      delete o[key];
    }
  });

  var x = [];
  for (var i in o) {
    if (o.hasOwnProperty(i)) {
      x.push(o[i]);
    }
  }

  return x;
}

function tryFn() {
  var now = new Date();
  LL(new Date(now - now.getTimezoneOffset() * 60000).toISOString())
}

function cc() {
  var sheet = getSheetFromNamedInRC(1, 1);
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  var firstRowValues = sheet.getSheetValues(1, 1, 1, lastColumn)[0];
  var resultSheetArr = sheet.getSheetValues(2, 1, lastRow - 1, lastColumn);
  LL(resultSheetArr);
  LL(validateData(resultSheetArr));
}

function returnNewData() {
  var sheet = getSheetFromNamedInRC(1, 1);
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  var firstRowValues = sheet.getSheetValues(1, 1, 1, lastColumn)[0];
  var resultSheetArr = sheet.getSheetValues(2, 1, lastRow - 1, lastColumn);
  resultSheetArr = validateData(resultSheetArr);
  // var names = getPmNames();
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
    // dd.name = names[d[0] - 1];
    return dd;
  });
  // LL(JSON.stringify(resultObj));
  return returnJSON(resultObj);
}

function returnPmNames() {
  var names = getPmNames();
  return returnJSON(names);
};

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

  switch (param.method) {
    case 'get_pm_name':
      return returnPmNames();

    default:
      return returnNewData();
  }
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
