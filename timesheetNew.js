// global variables used in different functions
// HTML Pointer variables
let BODYPOINTER = document.getElementById("body");
let CURRENTDATEVALUE = document.getElementById("currentDate");
let TIMERBUTTON = document.getElementById("timerButton");
let SECONDVALUEPOINTER = document.getElementById("sec");
let MINVALUEPOINTER = document.getElementById("min");
let HOURVALUEPOINTER = document.getElementById("hour");
let table = document.getElementById("dataTable");

// Function Instance variables
let today = new Date();


// local variables : 
let clickedButtonId;
let dataArray = [];
let startstopp = 0;
let time = 0;
let sec = 0;
let min = 0;
let hour = 0;
let clickedButtonTimerId = 0;
let startstop = 0;
let timerInterval;
let rowTimerInterval;
let dropDownData = { drop: "" }
let rowData = {clientValue: "", projectValue: "", taskValue: "", descriptionValue: "", billableValue: "", timerData: "", timeId: "", buttonId: ""};
let secOut = 0 ; 
let minOut = 0
let hourOut = 0;
let secNew ,minNew, hourNew = 0;
let rowCount = 0;
let dropdownCount = 0;

var j = 0;
// Variables to get the value of button clicked in the ROW


//Variable to hold the value of dropdown to store its value in local storage


var p = 0;


// FUNCTION TO SHOW DATE 
// FUNCTION TO CHECK IF THE DETAILS ARE FIELD DROPDOWN ON CHECK-IN BUTTON
function allInputField() 
{  
  let CLIENTVALUE = document.getElementById("Select-Client").value;
  let PROJECTVALUE = document.getElementById("Select-Project").value;
  let TASKVALUE = document.getElementById("Select-Job").value;
  let BILLABLEVALUE = document.getElementById("Billable").value;
  if (CLIENTVALUE && PROJECTVALUE && TASKVALUE && BILLABLEVALUE)
  {
    startStop();
  }
  else
  {
    alert("Please Select All");
  }
}

// FUNCTION FOR MAIN STOPWATCH and for appending the value in table rows
function startStop() {
  /* Toggle StartStop */
  startstop = startstop + 1;
  if (startstop === 1) {
    Mainstart();
    TIMERBUTTON.innerHTML = "Check Out";
    TIMERBUTTON.value = "Check Out";
    TIMERBUTTON.style.backgroundColor = "green";

    secNew = 00; 
    minNew = 00;
    hourNew = 00;
    insertDataInRow();

  } else if (startstop === 2) {
    TIMERBUTTON.innerHTML = "Check In";
    TIMERBUTTON.value = "Check In";
    TIMERBUTTON.style.backgroundColor = "red";
    startstop = 0;

    Mainstop();
    MainStopNew();
    localSetValue();

    // document.getElementById("milisec").innerHTML = "00";
    SECONDVALUEPOINTER.innerHTML = "00";
    MINVALUEPOINTER.innerHTML = "00";
    HOURVALUEPOINTER.innerHTML = "00";
    sec = 0;
    min = 0;
    hour = 0;
  }
}

// FUNCTION FOR GETTING IND. BUTTON CLICKED IN ROW TO RUN TIMER
var gettingTheValueOfR;
function MainStartNew(gettingTheValueOfR) {
  rowTimerInterval = setInterval(function () { MTimerNew(gettingTheValueOfR);}, 1000);
}
// FUNCTION TO CLEAR THE INTERVAL OF ROW TIMER
function MainStopNew() {
  clearInterval(rowTimerInterval);
}

// FUNCTION TO GET THE VALUE OF BUTTON CLICKED AND RUN STOPWATCH IN IND. ROW OF THE TABLE
function MTimerNew(gettingTheValueOfR) {

  if (TIMERBUTTON.value == "Check Out") {
      try {    
            var replacingTime = JSON.parse(localStorage.getItem("dataArray"));
            var replacingLocalTime = (replacingTime).length;

                length = clickedButtonTimerId;
                time = "time-" + (clickedButtonTimerId - 1);
                if (document.getElementById(time)) 
                {
            
                  document.getElementById(time).innerHTML = hourOut + ":" + minOut + ":" + secOut;
                  rowData.timerData = hourOut + ":" + minOut + ":" + secOut;
                }
                time = "time-" + (replacingLocalTime);
                rowData.timeId = time;
                rowData.buttonId = "buttonStart-" + (clickedButtonTimerId - 1);
              }
        catch{}
    

  } else {
    
    // if (document.getElementById(time)) {

      var replacingTime = JSON.parse(localStorage.getItem("dataArray"));
      var replacingLocalTime = JSON.parse(replacingTime[gettingTheValueOfR]);
      var RT = replacingLocalTime.timerData.split(":");
      hourNew = parseInt(RT[0]);
      minNew = parseInt(RT[1]);
      secNew = parseInt(RT[2]);

      secNew = checkTime(secNew);
      minNew = checkTime(minNew);
      hourNew = checkTime(hourNew);
      increaseTimer(secNew)

      time = "time-" + gettingTheValueOfR;

      document.getElementById(time).innerHTML = hourOut + ":" + minOut + ":" + secOut;
      replacingLocalTime.timerData = hourOut + ":" + minOut + ":" + secOut;

      replacingTime[gettingTheValueOfR] = JSON.stringify(replacingLocalTime);
      localStorage.setItem("dataArray", JSON.stringify(replacingTime));
    // }
  }

}

// FUNCTION TO START THE MAIN HEADER STOPWATCH
function Mainstart() {
  timerInterval = setInterval(function () {Mtimer()}, 1000);
}
// FUNCTION TO CLEAR THE MAIN HEADER STOPWATCH
function Mainstop() {
  clearInterval(timerInterval);
}

// FUNCTION TO RUN THE MAIN HEADER STOPWATCH
function Mtimer() 
{  
    secOut = checkTime(sec);    
    minOut = checkTime(min);     
    hourOut = checkTime(hour);   
    increaseTimer(secOut)
    document.getElementById("sec").innerHTML = secOut;
    document.getElementById("min").innerHTML = minOut;
    document.getElementById("hour").innerHTML = hourOut;  
}


function increaseTimer()
{
  
    sec = ++arguments[0]
    if (sec == 60) 
    {
        min = ++min;
        sec = 00;
    }
    if (min == 60) 
    {
        min = 00;
        hour = ++hour;
    }
    hourOut  = checkTime(hour);
    minOut  = checkTime(min);
    secOut = checkTime(sec);  
}
// FUNCTION TO INCREASE THE VALUE OF STOPWATCH TIME USING LOOP
function checkTime() 
{
  if (arguments[0] < 10)
  {
    return `0${arguments[0]}`;
  }
  return arguments[0];
}

// FUNCTION TO APPEND VALUE ON PAGE FROM LOCAL STORAGE
// var h;
function dataRender() {
  if (localStorage.getItem("dataArray") == null || localStorage.getItem("dataArray") == undefined) 
  {
    var Blank = [];
    localStorage.setItem("dataArray", JSON.stringify(Blank));
  }

  var Localstored = JSON.parse(localStorage.getItem("dataArray"));

  Localstored.forEach((element, index) => {
    row = table.insertRow(-1);
    var cell1 = row.insertCell(-1);
    var cell2 = row.insertCell(-1);
    var cell3 = row.insertCell(-1);
    var cell4 = row.insertCell(-1);
    var cell5 = row.insertCell(-1);
    var cell6 = row.insertCell(-1);
    var cell7 = row.insertCell(-1);

    var a = JSON.parse(element).clientValue;
    var b = JSON.parse(element).projectValue;
    var c = JSON.parse(element).taskValue;
    var d = JSON.parse(element).descriptionValue;
    var e = JSON.parse(element).billableValue;
    var f = JSON.parse(element).timerData.split(':');
    var g = JSON.parse(element).timeId;
    var h = JSON.parse(element).buttonId;


    cell1.innerHTML = a;
    cell2.innerHTML = b;
    cell3.innerHTML = c;
    cell4.innerHTML = d;
    cell5.innerHTML = e;
    cell6.innerHTML = "<div id="+ g +">"+ f[0]+":"+ f[1]+":"+f[2] +"</div>";         //'<span id="time-' + (index-1) + '">' + h + "</span>";
    cell7.innerHTML = "<button id="+ h +" onClick='onClickStartStop(this)' >Start</button>";

  });
}

var st = 0;
function onClickStartStop(e) {
  var buttonId = e.id;

  st = st + 1;
  if (st === 1) {
    document.getElementById(buttonId).innerHTML = "Stop";
    document.getElementById(buttonId).value = "Stop";

    if (document.getElementById(buttonId).value = "Stop") {
      var localTimeValue = JSON.parse(localStorage.getItem("dataArray"));
      clickedButtonId = parseInt(buttonId.split("-")[1]);
      var p = JSON.parse(localTimeValue[clickedButtonId]).timeId;
      parseInt(p.split("-")[1]);

      if (parseInt(p.split("-")[1]) == clickedButtonId) {
        MainStartNew(clickedButtonId);
      }
    }
  } else if (st === 2) {
    document.getElementById(buttonId).innerHTML = "Start";
    st = 0;
    if (document.getElementById(buttonId).value = "Start") {
      MainStopNew();
    }
  }
}


// OBJECT TO STORE THE VALUES TO LOCAL STORAGE


// FUNCTION TO FLEX THE ROW IN THE TABLE ON FIRST TIME, INCLUDING THE DROPDOWN VALUES
function insertDataInRow() {
  var a = document.getElementById("Select-Client").value;
  var b = document.getElementById("Select-Project").value;
  var c = document.getElementById("Select-Job").value;
  var d = document.getElementById("text").value;
  var e = document.getElementById("Billable").value;

  row = table.insertRow(-1);
  var cell1 = row.insertCell(-1);
  var cell2 = row.insertCell(-1);
  var cell3 = row.insertCell(-1);
  var cell4 = row.insertCell(-1);
  var cell5 = row.insertCell(-1);
  var cell6 = row.insertCell(-1);
  var cell7 = row.insertCell(-1);

  cell1.innerHTML = a;
  cell2.innerHTML = b;
  cell3.innerHTML = c;
  cell4.innerHTML = d;
  cell5.innerHTML = e;
  if (
    localStorage.getItem("dataArray") == null ||
    localStorage.getItem("dataArray") == undefined
  ) {
    clickedButtonTimerId = 1;
    j = 1;
  } else {
    var array = JSON.parse(localStorage.getItem("dataArray"));
    clickedButtonTimerId = (array).length;
    j = (array).length;
  }
  cell6.innerHTML = '<span id="time-' + clickedButtonTimerId + '">00:00:00</span>';
  cell7.innerHTML = '<button id="buttonStart-' + j + '">Start</button>';
  MainStartNew();
  clickedButtonTimerId++;
  buttonsStartStop();
  j++;

}

// FUNCTION TO GET THE VALUE TO BUTTON CLICKED AND TO PASS THE VALUE TO STOPWATCH TIMER FUNCTION
function buttonsStartStop() {
  var buttonStart = "buttonStart-" + j;
  document.getElementById(buttonStart).onclick = function () { buttonsStartStop1() };

  function buttonsStartStop1() {

    startstopp = startstopp + 1;
    if (startstopp === 1) {
      document.getElementById(buttonStart).innerHTML = "Stop";
      document.getElementById(buttonStart).value = "Stop";

      if (document.getElementById(buttonStart).value = "Stop") {
        var localTimeValue = JSON.parse(localStorage.getItem("dataArray"));
        clickedButtonId = parseInt(buttonStart.split("-")[1]);
        p = JSON.parse(localTimeValue[clickedButtonId]).timeId;

        if (parseInt(p.split("-")[1]) == clickedButtonId) {
          MainStartNew(clickedButtonId);
        }
      }
    } else if (startstopp === 2) {
      document.getElementById(buttonStart).innerHTML = "Start";
      startstopp = 0;

      if (document.getElementById(buttonStart).value = "Start") {
        MainStopNew();
      }
    }
  }

}

// FUNCTION TO STORE THE VALUE TO LOCAL STORAGE
function localSetValue() {
  var tableClientValue = document.getElementById("Select-Client").value;
  var tableProjectValue = document.getElementById("Select-Project").value;
  var tableTaskValue = document.getElementById("Select-Job").value;
  var tableDescriptionValue = document.getElementById("text").value;
  var tableBillableValue = document.getElementById("Billable").value;

  rowData.clientValue = tableClientValue;
  rowData.projectValue = tableProjectValue;
  rowData.taskValue = tableTaskValue;
  rowData.descriptionValue = tableDescriptionValue;
  rowData.billableValue = tableBillableValue;


  var setVar = ("rowData " + rowCount, JSON.stringify(rowData));
  rowCount++;
  //dataArray.push(setVar)
  var k = JSON.parse(localStorage.getItem("dataArray"));
  k.push(setVar);
  localStorage.setItem("dataArray", JSON.stringify(k));
}

// FUNCTION TO ADD THE VALUES OF DROPDOWN TO LOCAL STORAGE
function Add() 
{
    let newTask = prompt("Please enter your task");
    if (newTask != null) 
    {
        // document.getElementById("txtText").innerHTML = person ;
        var dropDownValue = document.getElementById("Select-Job");
        var option = document.createElement("OPTION");
        option.innerHTML = newTask;
        dropDownValue.add(option);

        dropDownData.drop = newTask;

        var setVarr = ("dropDownData " + dropdownCount, JSON.stringify(dropDownData));
        dropdownCount++;
        var kk = JSON.parse(localStorage.getItem("dropDownData"));
        kk.push(setVarr);

        localStorage.setItem("dropDownData", JSON.stringify(kk));
    }
}

// FUNCTION TO GET THE VALUE OF DROPDOWN FROM LOCALSTORAGE AND APPEND ON PAGE
function dataRenderValue() {
  if (localStorage.getItem("dropDownData") == null || localStorage.getItem("dropDownData") == undefined) {

    var Blankk = [];
    localStorage.setItem("dropDownData", JSON.stringify(Blankk));
  }
  var LocalstoredValue = JSON.parse(localStorage.getItem("dropDownData"));

  LocalstoredValue.forEach((element, index) => {
    var x = JSON.parse(element).drop;
    var dropDownValue = document.getElementById("Select-Job");
    var option = document.createElement("OPTION");
    option.innerHTML = x;
    dropDownValue.add(option);

  });
}

// Blank Array stored in localstorage which will get the pushed value
BODYPOINTER.onload = () => {
  CURRENTDATEVALUE.innerHTML = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  dataRender();
  dataRenderValue();
}
TIMERBUTTON.addEventListener("click", allInputField);
