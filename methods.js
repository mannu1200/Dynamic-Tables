var tableNumber = 0;
//tableNumber will decide the index of table

var myDiv = [];
//myDiv is an array of divs which will contain the tables

var divIndexes = [];
//As tables can be deleted, divIndexes will contain the list of indexes of which are present in myDiv


//intialize them with number of rows and columns you want the table to have initially (when it is created)
var initialRows = null;
var initialColumns = null;

var numberOfRowsAndColumns = [];
/*array to store the number of rows and columns in every table
  numberOfRowsAndColumns[tableID*2]->number of rows in the table
  numberOfRowsAndColumns[tableID*2+1]->number of columns in the table*/

/*
  action          tableNumber   myDiv     divIndexes  numberOfRowsAndColumns
  add table         0           [table0]   [0]          [3,3]

  add_row(table0)   0           [table0]   [0]          [4,3]

  add table         1           [table0,   [0,1]        [4,3,3,3]
                                table1]

  delete table0     0           [table1]   [1]          [undefined,undefined,3,3]                         
*/

//textboxID -> textbox+tableNumber+rowNumner+columNumber


function addTable() {
  divIndexes.push(tableNumber);
  myDiv[tableNumber] = document.createElement('div');
  var hLine = document.createElement('HR');
  hLine.className = "hLines";
  myDiv[tableNumber].appendChild(hLine);
  myDiv[tableNumber].id = tableNumber;
  document.getElementById('mainDiv').appendChild(myDiv[tableNumber]); //adding new created div to dom

  myDiv[tableNumber].innerHTML = myDiv[tableNumber].innerHTML + "Title:";

  var titleInput = document.createElement('Input');
  titleInput.type = 'Text';
  titleInput.name = 'title' + tableNumber.toString();
  titleInput.id = "titleInput" + tableNumber.toString();
  myDiv[tableNumber].appendChild(titleInput);


  var removeTablebutton = document.createElement('INPUT');
  removeTablebutton.type = 'BUTTON';
  removeTablebutton.addEventListener('click', removetable);
  removeTablebutton.value = '    Remove Table';
  removeTablebutton.className = 'removeTableButtons';
  removeTablebutton.tableNumber = tableNumber;
  removeTablebutton.id = "removeTablebutton" + tableNumber.toString();
  myDiv[tableNumber].appendChild(removeTablebutton);


  numberOfRowsAndColumns[tableNumber * 2] = 0;
  numberOfRowsAndColumns[tableNumber * 2 + 1] = 0;

  var table = document.createElement('TABLE');
  table.className = "tables";
  table.id = "table" + tableNumber.toString();
  table.value = tableNumber;
  var tableBody = document.createElement('tbody');
  tableBody.id = 'tbody' + tableNumber.toString();
  table.appendChild(tableBody);

  var innerDiv = document.createElement('div');
  myDiv[tableNumber].appendChild(innerDiv);
  innerDiv.appendChild(table);

  addRows({
    target: {
      tableNumber: tableNumber
    }
  }, initialRows || 2);

  var addColumnButton = document.createElement('INPUT');
  addColumnButton.type = 'BUTTON';
  addColumnButton.addEventListener('click', addColumns);
  addColumnButton.value = 'Add Columns';
  addColumnButton.tableNumber = tableNumber;
  addColumnButton.id = "addColumnButton" + tableNumber.toString();
  addColumnButton.className = 'addColumnButtons';
  innerDiv.appendChild(addColumnButton);

  var addRowButton = document.createElement('INPUT');
  addRowButton.type = 'BUTTON';
  addRowButton.addEventListener('click', addRows);
  addRowButton.value = "Add Rows";
  addRowButton.tableNumber = tableNumber;
  addRowButton.id = "addRowButton" + tableNumber;
  addRowButton.className = "addRowButtons";
  myDiv[tableNumber].appendChild(addRowButton);


  tableNumber++;
}



function addRows(sender, count) { //adds single row, single iteration of loop
  var tableNumber = sender.target.tableNumber;
  var currentTable = document.getElementById('table' + tableNumber);
  var row = currentTable.insertRow(-1);
  row.id = 'tr' + tableNumber + numberOfRowsAndColumns[tableNumber * 2];
  var flag = 0; //flag=1 will tell that it is first(0 index) row

  if (numberOfRowsAndColumns[tableNumber * 2 + 1] == 0) {
    numberOfRowsAndColumns[tableNumber * 2 + 1] = initialColumns ? ++initialColumns : 3;
    flag = 1;
  }

  for (var i = 0; i <= numberOfRowsAndColumns[tableNumber * 2 + 1] - 1; i++) {
    var cell = row.insertCell(-1);
    cell.id = 'td' + tableNumber + numberOfRowsAndColumns[tableNumber * 2] + i;
    if (i == 0 && flag == 1) //table00
    /*Empty*/
    ;
    else if (i == 0) {
      var delButton = document.createElement("Input");
      delButton.type = "button";
      delButton.id = "delRowButton" + tableNumber + numberOfRowsAndColumns[tableNumber * 2] + i;
      cell.appendChild(delButton);
      delButton.addEventListener("click", removeRow);
      delButton.tableNumber = tableNumber;
      delButton.rowNumber = numberOfRowsAndColumns[tableNumber * 2].toString();
      delButton.className = "removeRowButtons";
    } else if (flag == 1) {
      var delDiv = document.createElement("DIV");
      delDiv.id = "delDiv" + tableNumber + numberOfRowsAndColumns[tableNumber * 2] + i;
      delDiv.className = 'headColumnDiv';
      cell.appendChild(delDiv);

      var textbox = document.createElement('input');
      textbox.type = 'Text';
      textbox.id = "textbox" + tableNumber + numberOfRowsAndColumns[tableNumber * 2] + i;
      textbox.placeholder = "Column name";
      textbox.className = "headTextboxes";
      delDiv.appendChild(textbox);

      var delButton = document.createElement("input");
      delButton.type = "button";
      delButton.id = "delColumnButton" + tableNumber + numberOfRowsAndColumns[tableNumber * 2] + i;
      delDiv.appendChild(delButton);
      delButton.className = 'removeColumnButtons';
      delButton.addEventListener("click", removeColumn);
      delButton.tableNumber = tableNumber;
      delButton.columnNumber = i;
    } else {
      var textbox = document.createElement("INPUT");
      textbox.type = "text";
      textbox.id = "textbox" + tableNumber + numberOfRowsAndColumns[tableNumber * 2] + i;
      textbox.className = 'textboxes';
      cell.appendChild(textbox);
    }
  }
  numberOfRowsAndColumns[tableNumber * 2]++;
  if (count)
    addRows(sender, count - 1);
}

function addColumns(sender, count) {
  var tableNumber = sender.target.tableNumber;
  var currentTable = document.getElementById("table" + tableNumber.toString());
  for (var i = 0; i <= numberOfRowsAndColumns[tableNumber * 2] - 1; i++) {
    var cell = currentTable.rows[i].insertCell(-1);
    cell.id = "td" + tableNumber + i + numberOfRowsAndColumns[tableNumber * 2 + 1];
    if (i == 0) {
      var delDiv = document.createElement('div');
      delDiv.id = "delDiv" + tableNumber + i + numberOfRowsAndColumns[tableNumber * 2 + 1];
      delDiv.className = 'headColumnDiv';
      cell.appendChild(delDiv);

      var textbox = document.createElement('input');
      textbox.type = 'text';
      textbox.id = "textbox" + tableNumber + i + numberOfRowsAndColumns[tableNumber * 2 + 1];
      textbox.className = 'headTextboxes';
      textbox.placeholder = "Column name";
      delDiv.appendChild(textbox);
      var delButton = document.createElement("input");
      delButton.type = "button";
      delButton.id = "delColumnButton" + tableNumber + i + numberOfRowsAndColumns[tableNumber * 2 + 1];
      delButton.className = "removeColumnButtons";
      delButton.addEventListener("click", removeColumn);
      delButton.tableNumber = tableNumber;
      delButton.columnNumber = (numberOfRowsAndColumns[tableNumber * 2 + 1]).toString();
      delDiv.appendChild(delButton);
    } else {
      var textbox = document.createElement("INPUT");
      textbox.type = "text";
      textbox.className = 'textboxes';
      textbox.id = "textbox" + tableNumber.toString() + i.toString() + numberOfRowsAndColumns[tableNumber * 2 + 1].toString();
      cell.appendChild(textbox);
    }
  }
  numberOfRowsAndColumns[tableNumber * 2 + 1]++;
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

    for (var j = 0; j < numberOfRowsAndColumns[i * 2]; j++) {
      var tempArr = [];
      for (var k = 1; k < numberOfRowsAndColumns[i * 2 + 1]; k++) {
        tempArr[k] = document.getElementById("textbox" + i + j + k).value;
      }
      temp.row.push(tempArr);
    }
    Mydata[i] = temp;
  }
  console.log(Mydata);
  $.ajax({
    url: "/",
    type: "post",
    data: {
      data: Mydata
    },
    dataType: "json",
    success: function(data) {
      if (data.error) {
        alert("some error occurred at server, values not inserted");
      } else {
        alert("Table Uploaded");
        location.reload();
      }
    }
  });
}


function removeColumn(sender) {
  var tableNumber = sender.target.tableNumber;
  var columnNumber = sender.target.columnNumber;
  for (var i = 0; i < numberOfRowsAndColumns[tableNumber * 2]; i++) {
    document.getElementById('tr' + tableNumber + i).removeChild(document.getElementById('td' + tableNumber + i + columnNumber));
    for (var j = parseInt(columnNumber) + 1; j < numberOfRowsAndColumns[tableNumber * 2 + 1]; j++) {
      if (i == 0) {
        document.getElementById('delColumnButton' + tableNumber + i + j).columnNumber -= 1;
        document.getElementById('delColumnButton' + tableNumber + i + j).id = 'delColumnButton' + tableNumber + i + (j - 1);
      } else {
        document.getElementById('textbox' + tableNumber + i + j).id = 'textbox' + tableNumber + i + (j - 1);
      }
      document.getElementById('td' + tableNumber + i + j).id = 'td' + tableNumber + i + (j - 1);
    }
  }
  numberOfRowsAndColumns[tableNumber * 2 + 1]--;
}


function removeRow(sender) {
  var tableNumber = sender.target.tableNumber;
  var rowNumber = sender.target.rowNumber;
  document.getElementById('tbody' + tableNumber).removeChild(document.getElementById('tr' + tableNumber + rowNumber));

  for (var i = parseInt(rowNumber) + 1; i < numberOfRowsAndColumns[tableNumber * 2]; i++) {
    document.getElementById('tr' + tableNumber + i).id = 'tr' + tableNumber + (i - 1);
    for (var j = 0; j < numberOfRowsAndColumns[tableNumber * 2 + 1]; j++) {
      if (j == 0) {
        document.getElementById('delRowButton' + tableNumber + i + j).rowNumber -= 1;
        document.getElementById('delRowButton' + tableNumber + i + j).id = 'delRowButton' + tableNumber + (i - 1) + j;
      } else {
        document.getElementById('textbox' + tableNumber + i + j).id = 'textbox' + tableNumber + (i - 1) + j;
      }
      document.getElementById('td' + tableNumber + i + j).id = 'td' + tableNumber + (i - 1) + j;
    }
  }
  numberOfRowsAndColumns[tableNumber * 2]--;
}

function removetable(sender) {
  var r = confirm("Are you sure you want to delete the table?");
  if (r == true) {
    //Empty
  } else {
    return false;
  }
  var tableToBeRemoved = sender.target.tableNumber;
  var i;
  for (i = 0; divIndexes[i] != undefined; i++) {
    if (tableToBeRemoved == divIndexes[i])
      break;
  }

  for (; divIndexes[i + 1] != undefined; i++) {
    divIndexes[i] = divIndexes[i + 1];
  }
  divIndexes.pop();
  document.getElementById('mainDiv').removeChild(myDiv[tableToBeRemoved]);
  delete numberOfRowsAndColumns[tableToBeRemoved * 2];
  delete numberOfRowsAndColumns[tableToBeRemoved * 2 + 1];
}