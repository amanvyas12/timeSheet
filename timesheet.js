// global variables used in different functions
var seconds = 00;
var tens = 00;
var i = 0;
var z = 0;
var appendTens = document.getElementById("tens");
var appendSeconds = document.getElementById("seconds");
var Interval;
// variables for stopwatch
var x;
var startstop = 0;
// Variables holding the value of stopwatch FOR EVERY ROW IN TABLE
var milisecNew = 00;
var secNew = 00; /* holds incrementing value */
var minNew = 00;
var hourNew = 00;
/* Contains and outputs returned value of  function checkTime */
var miliSecOutNew = 0;
var secOutNew = 0;
var minOutNew = 0;
var hourOutNew = 0;
var time = 0;

// VARIABLES HOLDING THE VALUE OF MAIN STOPWATCH
var milisec = 00;
var sec = 00; /* holds incrementing value */
var min = 00;
var hour = 00;
/* Contains and outputs returned value of  function checkTime */
var miliSecOut = 0;
var secOut = 0;
var minOut = 0;
var hourOut = 0;
// Variables to store the value to localstorage
var arr = new Array();
var aitm = 0;
var dataArray = [];
var j = 0;
// Variables to get the value of button clicked in the ROW
var r;
var startstopp = 0;
//Variable to hold the value of dropdown to store its value in local storage
var objobj = { drop: "" }
aaitm = 0;
var dataArrayy = [];

// FUNCTION CALLED ON LOAD OF PAGE
function initClock() {
  dataRender();
  dataRenderValue();
}

// FUNCTION TO SHOW DATE 
var today = new Date();
var date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
setTimeout(() => {
  document.getElementById("currentDate").innerText = date;
}, 100);

// FUNCTION TO CHECK IF THE DETAILS ARE FIELD DROPDOWN ON CHECK-IN BUTTON
function togglebtn() {
  var btnelem = document.getElementById("togglebtn ");
  var a = document.getElementById("Select-Client").value;
  var b = document.getElementById("Select-Project").value;
  var c = document.getElementById("Select-Job").value;
  var d = document.getElementById("text").value;
  var e = document.getElementById("Billable").value;
  if (a && b && c && e) {
    startStop();
  }
}

// FUNCTION FOR MAIN STOPWATCH and for appending the value in table rows
function startStop() {
  /* Toggle StartStop */
  startstop = startstop + 1;
  if (startstop === 1) {
    Mainstart();
    document.getElementById("togglebtn ").innerHTML = "Check Out";
    document.getElementById("togglebtn ").value = "Check Out";
    document.getElementById("togglebtn ").style.backgroundColor = "green";

    milisecNew = 00;
    secNew = 00; /* holds incrementing value */
    minNew = 00;
    hourNew = 00;
    Test();

  } else if (startstop === 2) {
    document.getElementById("togglebtn ").innerHTML = "Check In";
    document.getElementById("togglebtn ").value = "Check In";
    document.getElementById("togglebtn ").style.backgroundColor = "red";
    startstop = 0;

    Mainstop();
    MainStopNew();
    localSetValue();

    console.log(resobj.hh);
    // document.getElementById("milisec").innerHTML = "00";
    document.getElementById("sec").innerHTML = "00";
    document.getElementById("min").innerHTML = "00";
    document.getElementById("hour").innerHTML = "00";
    milisec = 0;
    sec = 0;
    min = 0;
    hour = 0;
  }
}

// FUNCTION FOR GETTING IND. BUTTON CLICKED IN ROW TO RUN TIMER
var gettingTheValueOfR;
function MainStartNew(gettingTheValueOfR) {
  y = setInterval(function () { MTimerNew(gettingTheValueOfR), 10 });
}
// FUNCTION TO CLEAR THE INTERVAL OF ROW TIMER
function MainStopNew() {
  clearInterval(y);
}

// FUNCTION TO GET THE VALUE OF BUTTON CLICKED AND RUN STOPWATCH IN IND. ROW OF THE TABLE
function MTimerNew(gettingTheValueOfR) {

  if (document.getElementById("togglebtn ").value == "Check Out") {
    
        var replacingTime = JSON.parse(localStorage.getItem("dataArray"));
        var replacingLocalTime = (replacingTime).length;
        console.log(replacingLocalTime);

            length = z;
            time = "time-" + (z - 1);
            if (document.getElementById(time)) {
        
              document.getElementById(time).innerHTML = hourOut + ":" + minOut + ":" + secOut;
              resobj.ff = hourOut + ":" + minOut + ":" + secOut + ":" + miliSecOut;
            }
            time = "time-" + (replacingLocalTime);
            resobj.gg = time;
            resobj.hh = "buttonStart-" + (z - 1);
    

  } else {
    
    // if (document.getElementById(time)) {

      var replacingTime = JSON.parse(localStorage.getItem("dataArray"));
      var replacingLocalTime = JSON.parse(replacingTime[gettingTheValueOfR]);
      var RT = replacingLocalTime.ff.split(":");
      hourNew = parseInt(RT[0]);
      minNew = parseInt(RT[1]);
      secNew = parseInt(RT[2]);
      milisecNew = parseInt(RT[3]);

      milisecNew = checkkTime(milisecNew);
      secNew = checkkTime(secNew);
      minNew = checkkTime(minNew);
      hourNew = checkkTime(hourNew);

      milisecNew = ++milisecNew;

      if (milisecNew === 250) {
        milisecNew = 00;
        secNew = ++secNew;
      }

      if (secNew == 60) {
        minNew = ++minNew;
        secNew = 00;
      }

      if (minNew == 60) {
        minNew = 00;
        hourNew = ++hourNew;
      }

      time = "time-" + gettingTheValueOfR;

      document.getElementById(time).innerHTML = hourNew + ":" + minNew + ":" + secNew;
      replacingLocalTime.ff = hourNew + ":" + minNew + ":" + secNew + ":" + milisecNew;

      replacingTime[gettingTheValueOfR] = JSON.stringify(replacingLocalTime);
      localStorage.setItem("dataArray", JSON.stringify(replacingTime));
    // }
  }

}

// FUNCTION TO START THE MAIN HEADER STOPWATCH
function Mainstart() {
  x = setInterval(Mtimer, 10);
}
// FUNCTION TO CLEAR THE MAIN HEADER STOPWATCH
function Mainstop() {
  clearInterval(x);
}

// FUNCTION TO RUN THE MAIN HEADER STOPWATCH
function Mtimer() {
  /* Main Timer */

  miliSecOut = checkkTime(milisec);
  secOut = checkkTime(sec);
  minOut = checkkTime(min);
  hourOut = checkkTime(hour);

  milisec = ++milisec;

  if (milisec === 100) {
    milisec = 00;
    sec = ++sec;
  }

  if (sec == 60) {
    min = ++min;
    sec = 00;
  }

  if (min == 60) {
    min = 00;
    hour = ++hour;
  }
  // document.getElementById("milisec").innerHTML = miliSecOut;
  document.getElementById("sec").innerHTML = secOut;
  document.getElementById("min").innerHTML = minOut;
  document.getElementById("hour").innerHTML = hourOut;

}
// FUNCTION TO INCREASE THE VALUE OF STOPWATCH TIME USING LOOP
function checkkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// FUNCTION TO APPEND VALUE ON PAGE FROM LOCAL STORAGE
var table = document.getElementById("myTable");
// var h;
function dataRender() {
  if (localStorage.getItem("dataArray") == null || localStorage.getItem("dataArray") == undefined) {
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

    var a = JSON.parse(element).client;
    var b = JSON.parse(element).product;
    var c = JSON.parse(element).cc;
    var d = JSON.parse(element).dd;
    var e = JSON.parse(element).ee;
    var f = JSON.parse(element).ff.split(':');
    var g = JSON.parse(element).gg;
    var h = JSON.parse(element).hh;


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
  console.log(e);

  st = st + 1;
  if (st === 1) {
    document.getElementById(buttonId).innerHTML = "Stop";
    document.getElementById(buttonId).value = "Stop";

    if (document.getElementById(buttonId).value = "Stop") {
      var localTimeValue = JSON.parse(localStorage.getItem("dataArray"));
      r = parseInt(buttonId.split("-")[1]);
      var p = JSON.parse(localTimeValue[r]).gg;
      parseInt(p.split("-")[1]);

      if (parseInt(p.split("-")[1]) == r) {
        MainStartNew(r);
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
var resobj = {
  client: "",
  product: "",
  cc: "",
  dd: "",
  ee: "",
  ff: "",
  gg: "",
  hh: "",
};

// FUNCTION TO FLEX THE ROW IN THE TABLE ON FIRST TIME, INCLUDING THE DROPDOWN VALUES
function Test() {
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
    z = 1;
    j = 1;
  } else {
    var array = JSON.parse(localStorage.getItem("dataArray"));
    z = (array).length;
    j = (array).length;
  }
  cell6.innerHTML = '<span id="time-' + z + '">00:00:00</span>';
  cell7.innerHTML = '<button id="buttonStart-' + j + '">Start</button>';
  MainStartNew();
  z++;
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
        r = parseInt(buttonStart.split("-")[1]);
        var p = JSON.parse(localTimeValue[r]).gg;
        parseInt(p.split("-")[1]);

        if (parseInt(p.split("-")[1]) == r) {
          MainStartNew(r);
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
  var client = document.getElementById("Select-Client").value;
  var product = document.getElementById("Select-Project").value;
  var cc = document.getElementById("Select-Job").value;
  var dd = document.getElementById("text").value;
  var ee = document.getElementById("Billable").value;

  resobj.client = client;
  resobj.product = product;
  resobj.cc = cc;
  resobj.dd = dd;
  resobj.ee = ee;


  var setVar = ("resobj " + aitm, JSON.stringify(resobj));
  aitm++;
  //dataArray.push(setVar)
  var k = JSON.parse(localStorage.getItem("dataArray"));
  k.push(setVar);
  localStorage.setItem("dataArray", JSON.stringify(k));
  console.log(dataArray);
}

// FUNCTION TO ADD THE VALUES OF DROPDOWN TO LOCAL STORAGE
function Add() {

  var person = prompt("Please enter your task");
  if (person != null) {
    // document.getElementById("txtText").innerHTML = person ;
    var dropDownValue = document.getElementById("Select-Job");
    var option = document.createElement("OPTION");
    option.innerHTML = person;
    dropDownValue.add(option);

    objobj.drop = person;

    var setVarr = ("objobj " + aaitm, JSON.stringify(objobj));
    aaitm++;
    var kk = JSON.parse(localStorage.getItem("objobj"));
    kk.push(setVarr);
    localStorage.setItem("objobj", JSON.stringify(kk));
  }
}

// FUNCTION TO GET THE VALUE OF DROPDOWN FROM LOCALSTORAGE AND APPEND ON PAGE
function dataRenderValue() {
  if (localStorage.getItem("objobj") == null || localStorage.getItem("objobj") == undefined) {

    var Blankk = [];
    localStorage.setItem("objobj", JSON.stringify(Blankk));
  }
  var LocalstoredValue = JSON.parse(localStorage.getItem("objobj"));

  LocalstoredValue.forEach((element, index) => {
    var x = JSON.parse(element).drop;
    var dropDownValue = document.getElementById("Select-Job");
    var option = document.createElement("OPTION");
    option.innerHTML = x;
    dropDownValue.add(option);

  });
}

