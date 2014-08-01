var counter = 0;
var myDiv = [];
var divIndexes = [];
//divIndexes store the list of divs
/*data[tableID*2]->number of rows in the table
  data[tableID*2+1]->number of columns in the table*/
var data = [];
//textboxID -> textbox+tableNumber+rowNumner+columNumber


function addTable() {
  divIndexes.push(counter);
  myDiv[counter] = document.createElement('div');
  var Hline = document.createElement('HR');
  document.getElementById('mainDiv').appendChild(myDiv[counter]);
  myDiv[counter].appendChild(Hline);
  myDiv[counter].id = counter;

  myDiv[counter].innerHTML = myDiv[counter].innerHTML + "Title:";

  var titleInput = document.createElement('Input');
  titleInput.type = 'Text';
  titleInput.name = 'title' + counter.toString();
  titleInput.id = "titleInput" + counter.toString();
  myDiv[counter].appendChild(titleInput);


  var removeTablebutton = document.createElement('INPUT');
  removeTablebutton.type = 'BUTTON';
  removeTablebutton.addEventListener('click', removetable);
  removeTablebutton.value = 'Remove Table';
  removeTablebutton.tableNumber = counter;
  removeTablebutton.id = "removeTablebutton" + counter.toString();
  removeTablebutton.className = "removeTablebuttons";
  myDiv[counter].appendChild(removeTablebutton);


  data[counter * 2] = 0;
  data[counter * 2 + 1] = 0;

  var table = document.createElement('TABLE');
  table.border = 0;
  table.id = "table" + counter.toString();
  table.value = counter;
  var tableBody = document.createElement('tbody');
  tableBody.id = 'tbody' + counter.toString();
  table.appendChild(tableBody);
  var obj = {
    target: {
      tableNumber: counter
    }
  };
  var innerDiv = document.createElement('div');
  myDiv[counter].appendChild(innerDiv);
  innerDiv.appendChild(table);
  $("#table" + counter.toString()).css("display", "inline");
  addRows(obj, 1);


  var addColumnButton = document.createElement('INPUT');
  addColumnButton.type = 'BUTTON';
  addColumnButton.addEventListener('click', addColumns);
  addColumnButton.value = 'Add Columns';
  addColumnButton.tableNumber = counter;
  addColumnButton.id = "addColumnButton" + counter.toString();
  addColumnButton.className = 'addColumnButtons';
  innerDiv.appendChild(addColumnButton);

  var addRowButton = document.createElement('INPUT');
  addRowButton.type = 'BUTTON';
  addRowButton.addEventListener('click', addRows);
  addRowButton.value = "Add Rows";
  addRowButton.tableNumber = counter;
  addRowButton.id = "addRowButton" + counter.toString();
  addRowButton.className = "addRowButtons";
  myDiv[counter].appendChild(addRowButton);


  counter++;
}

function addRows(sender, count) {
  var value = sender.target.tableNumber;
  var currentTable = document.getElementById('table' + value.toString());
  var row = currentTable.insertRow(-1);
  row.id = 'tr' + value.toString() + data[value * 2];
  var flag = 0;
  if (data[value * 2 + 1] == 0) {
    data[value * 2 + 1] = 2;
    flag = 1;
  }

  for (var i = 0; i <= data[value * 2 + 1] - 1; i++) {
    var cell = row.insertCell(-1);
    cell.id = 'td' + value.toString() + data[value * 2].toString() + i.toString();
    if (i == 0 && flag == 1)
    ;
    else if (i == 0) {
      var delButton = document.createElement("Input");
      delButton.type = "button";
      delButton.id = "delRowButton" + value.toString() + data[value * 2].toString() + i.toString();
      cell.appendChild(delButton);
      delButton.addEventListener("click", removeRow);
      delButton.tableNumber = value;
      delButton.rowNumber = data[value * 2].toString();
      document.getElementById("delRowButton" + value + data[value * 2] + i).className = "removeRowButtons";
    } else if (flag == 1) {
      var delDiv = document.createElement("DIV");
      delDiv.id = "delDiv" + value.toString() + data[value * 2].toString() + i.toString();
      delDiv.className = 'headColumnDiv';
      cell.appendChild(delDiv);

      var textbox = document.createElement('input');
      textbox.type = 'Text';
      textbox.id = "textbox" + value.toString() + data[value * 2].toString() + i.toString();
      textbox.placeholder = "Column name";
      textbox.width = "80%";
      textbox.className = "headColumn";
      delDiv.appendChild(textbox);

      var delButton = document.createElement("input");
      delButton.type = "button";
      delButton.id = "delColumnButton" + value.toString() + data[value * 2].toString() + i.toString();
      delDiv.appendChild(delButton);
      document.getElementById("delColumnButton" + value + data[value * 2] + i.toString()).className = "removeColumnButtons";
      delButton.addEventListener("click", removeColumn);
      delButton.tableNumber = value;
      delButton.columnNumber = i;
      flag = 0;
    } else {
      var textbox = document.createElement("INPUT");
      textbox.type = "text";
      textbox.id = "textbox" + value.toString() + data[value * 2].toString() + i.toString();
      cell.appendChild(textbox);
    }
  }
  data[value * 2]++;
  if (count)
    addRows(sender, count - 1);
}

function addColumns(sender, count) {
  var value = sender.target.tableNumber;
  var currentTable = document.getElementById("table" + value.toString());
  for (var i = 0; i <= data[value * 2] - 1; i++) {
    var cell = currentTable.rows[i].insertCell(-1);
    cell.id = "td" + value.toString() + i.toString() + data[value * 2 + 1].toString();
    if (i == 0) {
      var delDiv = document.createElement('div');
      delDiv.id = "delDiv" + value.toString() + i.toString() + data[value * 2 + 1].toString();
      cell.appendChild(delDiv);

      var textbox = document.createElement('input');
      textbox.type = 'text';
      textbox.id = "textbox" + value.toString() + i.toString() + data[value * 2 + 1].toString();
      textbox.placeholder = "Column name";
      delDiv.appendChild(textbox);
      var delButton = document.createElement("input");
      delButton.type = "button";
      delButton.id = "delColumnButton" + value.toString() + i.toString() + data[value * 2 + 1].toString();
      delDiv.appendChild(delButton);
      document.getElementById("delColumnButton" + value + i + data[value * 2 + 1]).className = "removeColumnButtons";
      delButton.addEventListener("click", removeColumn);
      delButton.tableNumber = value;
      delButton.columnNumber = (data[value * 2 + 1]).toString();
    } else {
      var textbox = document.createElement("INPUT");
      textbox.type = "text";
      textbox.id = "textbox" + value.toString() + i.toString() + data[value * 2 + 1].toString();
      cell.appendChild(textbox);
    }
  }
  data[value * 2 + 1]++;
}

function postData() {
  var Mydata = [];
  /*format of data will be
  [
    //array of json
    //every json holds the data of a table - titile and row(array)
    //row further is an array of arrays which are are array of data(string)
    //for instance data -
   table0 -  {titile:'',row:[["value of textbox table.0 row.0 column.1","value of textbox table.1 row.0 column.2","value of textbox table.0 row.0 column.3"],[],[],[],[],[],}
   table1 -  {}
    .
    .
    .
   tableN -  {}
  ]*/

  for (var z = 0; divIndexes[z] != undefined; z++) {
    i = divIndexes[z];
    var temp = {
      title: document.getElementById("titleInput" + i.toString()).value,
      row: []
    };

    for (var j = 0; j < data[i * 2]; j++) {
      var tempArr = [];
      for (var k = 1; k < data[i * 2 + 1]; k++) {
        tempArr[k] = document.getElementById("textbox" + i.toString() + j.toString() + k.toString()).value;
      }
      temp.row.push(tempArr);
    }
    Mydata[i] = temp;
  }
  console.log(Mydata);
  $.ajax({
    url: "/URL",
    type: "post",
    data: {
      data: Mydata
    },
    dataType: "json",
    success: function(data) {
      if (data.error) {
        alert("some error occurred at server, values not inserted");
      } else {
        alert("Chart Uploaded");
        location.reload();
      }
    }
  });
}

function removeColumn(sender) {
  var tableNumber = sender.target.tableNumber;
  var columnNumber = sender.target.columnNumber;
  var rowNumber = sender.target.rowNumber;
  for (var i = 0; i < data[tableNumber * 2]; i++) {
    document.getElementById('tr' + tableNumber.toString() + i.toString()).removeChild(document.getElementById('td' + tableNumber + i + columnNumber));
    for (var j = parseInt(columnNumber) + 1; j < data[tableNumber * 2 + 1]; j++) {
      if (i == 0) {
        document.getElementById('delColumnButton' + tableNumber + i + j).columnNumber -= 1;
        document.getElementById('delColumnButton' + tableNumber + i + j).id = 'delColumnButton' + tableNumber + i + (j - 1);
      } else {
        document.getElementById('textbox' + tableNumber.toString() + i.toString() + j.toString()).id = 'textbox' + tableNumber + i.toString() + (j - 1).toString();
      }
      document.getElementById('td' + tableNumber.toString() + i.toString() + j.toString()).id = 'td' + tableNumber + i.toString() + (j - 1).toString();
    }
  }
  data[tableNumber * 2 + 1]--;
}

function removeRow(sender) {
  var tableNumber = sender.target.tableNumber;
  var columnNumber = sender.target.columnNumber;
  var rowNumber = sender.target.rowNumber;
  document.getElementById('tbody' + tableNumber).removeChild(document.getElementById('tr' + tableNumber + rowNumber));

  for (var i = parseInt(rowNumber) + 1; i < data[tableNumber * 2]; i++) {
    document.getElementById('tr' + tableNumber + i).id = 'tr' + tableNumber + (i - 1);
    for (var j = 0; j < data[tableNumber * 2 + 1]; j++) {
      if (j == 0) {
        document.getElementById('delRowButton' + tableNumber + i + j).rowNumber -= 1;
        document.getElementById('delRowButton' + tableNumber + i + j).id = 'delRowButton' + tableNumber + (i - 1) + j;
      } else {
        document.getElementById('textbox' + tableNumber + i + j).id = 'textbox' + tableNumber + (i - 1) + j;
      }
      document.getElementById('td' + tableNumber + i + j).id = 'td' + tableNumber + (i - 1) + j;
    }
  }
  data[tableNumber * 2]--;
}

function removetable(sender) {
  var r = confirm("Are you sure you want to delete it?");
  if (r == true) {} else {
    return false;
  }
  var count = sender.target.tableNumber;
  var i;
  for (i = 0; divIndexes[i] != undefined; i++) {
    if (count == divIndexes[i])
      break;
  }

  for (; divIndexes[i + 1] != undefined; i++) {
    divIndexes[i] = divIndexes[i + 1];
  }
  divIndexes.pop();
  document.getElementById('mainDiv').removeChild(myDiv[count]);
}