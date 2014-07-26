//@0
function at(number) {
  var o = new String();
  for (i=number;i>=number;i++) {
    var input = diskRead(i);
    if (input == "\0" || input == "null" || input == null) {
      break;
    } else {
      o = o + input;
    }
  }
  return o;
}
eval(at(512));
//@512
function strtodisk(number, string) {
  var j;
  for(i=0;i<=string.length-1;i++) {
    diskWrite(i + number, string[i]);
    j = i;
  }
  diskWrite(j+1+number, "\0");
  writeString("Wrote " + (j+1)/1024 + "KiB.");
}

function cleardisplay() {
  for (x = 0; x <= 80; x++) {
    display[x] = [];
    for (y = 0; y <= 20; y++) {
      display[x][y] = null;
    }
  }
}
cleardisplay();
setCursor(0, 0);
strtodisk(0, at(2048));
function print(number0, number1, string) {
  setCursor(number0, number1);
  writeString(string);
}
print(0, 1, "Zeros\nCommand: ");
var cmdinput = "";
ehandle.keyboardp = function(number0, number1) {
  if (number0 == 13) {
    setCursor(0, getCursor(1)+1)
    if (cmdinput == "flash") {
      var forformat = prompt("Paste FS:", "function strtodisk(c,b){var a;for(i=0;i<=b.length-1;i++){diskWrite(i+c,b[i]);a=i}diskWrite(a+1+c,\"\\0\")}var bootsect=at(2048);strtodisk(0,bootsect);function cleardisplay(){for(x=0;x<=80;x++){display[x]=[];for(y=0;y<=20;y++){display[x][y]=null}}}cleardisplay();function print(b,a,c){setCursor(b,a);writeString(c)}print(0,0,\"Zeros\\nCommand: \");ehandle.keyboardp=function(b,a){print(getCursor(0),getCursor(1),String.fromCharCode(a))};");
      strtodisk(512, forformat);
      print(0, getCursor(1)+1, "Command: ");
    } else if (cmdinput == "clear") {
      cleardisplay();
      print(0, 0, "Command: ");
    } else {
      print(0, getCursor(1), "Unknown command.");
      print(0, getCursor(1)+1, "Command: ");
    }
    cmdinput = "";
  } else {
    print(getCursor(0), getCursor(1), String.fromCharCode(number1));
    cmdinput = cmdinput + String.fromCharCode(number1);
  }
};
//@2048
function at(b){var c=new String();for(i=b;i>=b;i++){var a=diskRead(i);if(a=="\0"||a=="null"||a==null){break}else{c=c+a}}return c}eval(at(512));
//@16384
