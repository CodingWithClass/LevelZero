function writeString(string) {
  if (typeof string != "string") throw new IncorrectParameterException(string);
  
  for(i=0;i<=string.length-1;i++) {
    var newline = false;
    if (string[i] == "\n") {
      newline = true;
    } else {
      writeChar(string[i]);
    }
    if (getCursor(0)>=80 || newline == true) {
      setCursor(0, getCursor(1) + 1);
    } else {
      setCursor(getCursor(0)+1, getCursor(1));
    }
  }
}

writeString("LevelZero BIOS version 1\n");
writeString("Disk size: ");
writeString(localStorage.getItem("storageSize")/1024 + "KiB\n");
writeString("Booting from boot sector of disk...\n");
// Boot sector 512 bytes long
var bootSect = new String();
for (i=0;i<=511;i++) {
  var input = diskRead(i);
  if (input == "\0") {
    break;
  } else {
    bootSect = bootSect + input;
  }
}
setTimeout(function(){eval(bootSect);},2000);