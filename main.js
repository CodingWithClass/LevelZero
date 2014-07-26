var cursor = {x: 0, y: 0};
var display = [];
for(x=0;x<=80;x++){display[x]=[];for(y=0;y<=20;y++){display[x][y]=null;}}
var ehandle = {
  keyboardd: function(number0, number1) {},
  keyboardp: function(number0, number1) {}
};

function IncorrectParameterException(param) {
  this.param = param;
}

function hardwareInit() {
  var storageSize = prompt("Storage size?", "65536")
  localStorage.setItem("storageSize", storageSize);
  for(i=0;i<=storageSize;i++) {
    localStorage.setItem(i, null);
  }
  //for(x=0;x<=80;x++){display[x]=[];for(y=0;y<=20;y++){display[x][y]=null;}} setCursor(25, 7); writeChar('O'); setCursor(25, 9); writeChar('O'); setCursor(28, 8); writeChar('('); setCursor(30, 8); writeString('No OS.');
  var bootsect = "";
  bootsect = bootsect + "\0";
  if (bootsect.length > 512 || bootsect.length > localStorage.getItem("storageSize")) {
    throw new Error();
  }
  for(i=0;i<=bootsect.length-1;i++) {
    localStorage.setItem(i, bootsect[i]);
  }
}

function diskWrite(number0, char) {
  if (typeof number0 != "number") throw new IncorrectParameterException(number0);
  if (typeof char != "string" && char != null) throw new IncorrectParameterException(char);
  if (number0 > localStorage.getItem("storageSize")) throw "Invalid Index";
  console.log("Writing...");
  localStorage.setItem(number0, char);
  console.log("Wrote byte " + char + " to location " + number0)
}

function diskRead(number0) {
  if (number0 > localStorage.getItem("storageSize")) throw "Invalid Index";
  
  return localStorage[number0]
}

function setCursor(number0, number1) {
  if (typeof number0 != "number" || x < 0) throw new IncorrectParameterException(number0);
  if (typeof number1 != "number" || y < 0) throw new IncorrectParameterException(number1);
  
  cursor = {x: number0, y: number1};
}

function getCursor(bit) {
  if (typeof bit != "number" || bit < 0 || bit > 1) throw new IncorrectParameterException(bit);
  
  if (!bit) {
    return cursor.x;
  } else if (bit) {
    return cursor.y;
  } else {
    throw new Error();
  }
}

function writeChar(char) {
  if (typeof char != "string" && char != null) throw new IncorrectParameterException(char);
  
  //var x = cursor.x * 7;
  //var y = cursor.y * 14;
  display[cursor.x][cursor.y] = char;
}

var iCanHazNeedPublicVariable;
function readChar() {
  iCanHazNeedPublicVariable = null;
  document.getElementById("vesa").onkeypress = function(key) {
    iCanHazNeedPublicVariable = key;
  }
  while (iCanHazNeedPublicVariable == null) {
    // Non-blocking is /supposed/ to be used in JavaScript, but PFFTTTTTT
  }
  var toreturn = iCanHazNeedPublicVariable;
  iCanHazNeedPublicVariable = null;
  return iCanHazNeedPublicVariable;
}

function updateDisplay() {
  document.getElementById("vesa").innerHTML = "";
  for(x=0;x<=80;x++) {
    for(y=0;y<=20;y++) {
      if (display[x][y] == null) {
        continue;
      } else {
        var pixelx = x * 7;
        var pixely = y * 14;
        document.getElementById("vesa").innerHTML = document.getElementById("vesa").innerHTML +
        "<span style='position: fixed; top: " + pixely + "px; left: " + pixelx + "px;'>" + display[x][y] + "</span>";
      }
    }
  }
  window.requestAnimationFrame(updateDisplay);
}

window.requestAnimationFrame(updateDisplay);
document.getElementById("disksize").innerHTML = localStorage.length;
var script = document.createElement("script");
script.src = "bios.js";
document.getElementsByTagName("body")[0].appendChild(script);
document.onkeydown = function(event) {
  ehandle.keyboardd(event.keyCode, event.charCode);
  console.debug(event);
};
document.onkeypress = function(event) {
  ehandle.keyboardp(event.keyCode, event.charCode);
  console.debug(event);
};