importScripts("jszip.js");
importScripts("xlsx.js"); //顺序不可颠倒
/* uncomment the next line for encoding support */
//importScripts('dist/cpexcel.js');
/* uncomment the next line for ODS support */
//importScripts('dist/ods.js');

postMessage({ flag: "ready" });

onmessage = function (oEvent) {
  var v;
  try {
    v = XLSX.read(oEvent.data.arr, { type: oEvent.data.rABS ? "binary" : "base64" });
  } catch (e) {
    postMessage({
      flag: "error",
      err: e.stack || e,
    });
  }
  postMessage({
    flag: "xlsx",
    res: JSON.stringify(v),
  });
};
