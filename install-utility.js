// Installation Utility
alert("Welcome to Installation Utility.");
var bootsector = prompt("Please paste the contents of \"bootsector\":", " ");
console.debug(bootsector);
if (bootsector.length > 512) {
  throw "Long bootloader";
}
var diskinfo = prompt("Please paste the contents of \"OS\"", " ");
console.debug(diskinfo);
for (i = 0; i <= bootsector.length; i++) {
  diskWrite(i, bootsector[i]);
}
for (i = 0; i <= diskinfo.length; i++) {
  diskWrite(i, diskinfo[i]);
}
alert("Complete!");