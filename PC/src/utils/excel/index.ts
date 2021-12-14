import XLSX from 'xlsx';

/*json转xlsx并导出*/
export function jsonToXLSX(data, fileName, showTitle) {
  // xlsx 头部
  let header: string[] = [];
  for (let name in data[0]) {
    header.push(name);
  }

  let _data = data.reduce((result, value) => {
    let temp = {};
    header.map((key) => {
      temp[key] = value[key];
    });
    result.push(temp);
    return result;
  }, []);

  let ws: any = XLSX.utils.json_to_sheet(data, { header: header });

  // 单元格配置
  ws['!rows'] = ws['!rows'] || [];
  ws['!rows'][0] = ws['!rows'][0] || {};
  if (showTitle !== false) {
    //  隐藏表头key字段
    ws['!rows'][0].hidden = true;
    ws['!rows'][0].hpx = 40;
  }

  ws['!cols'] = ws['!cols'] || [];
  header.map((item, index) => {
    ws['!cols'][index] = ws['!cols'][index] || {};
    ws['!cols'][index].wpx = 120;
  });
  let wb = {
    Sheets: { Sheet: ws },
    SheetNames: ['Sheet'],
  };
  let wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'binary',
  });

  let fileBuff = new ArrayBuffer(wbout.length);
  let view = new Uint8Array(fileBuff);
  for (let i = 0; i != wbout.length; ++i) view[i] = wbout.charCodeAt(i) & 0xff;

  let file = new Blob([fileBuff], { type: 'application/octet-stream' });

  let exportFileName = /\.[a-zA-Z]+$/.test(fileName) ? fileName : fileName + '.xlsx';
  // 兼容ie
  if (navigator.msSaveOrOpenBlob) {
    navigator.msSaveOrOpenBlob(file, exportFileName);
  } else {
    let url = (window.URL || window.webkitURL).createObjectURL(file);

    let link: any = document.createElement('a');
    link.href = url;

    link.style = 'visibility:hidden';
    link.download = exportFileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function exportExcel(data, columns, fileName, showTitle) {
  try {
    // 处理表头
    let titleRow = {};
    columns.forEach((col) => {
      if (col.title) {
        titleRow[col.dataIndex] = col.title;
      }
    });
    // 处理每行数据
    let dispalyCols = Object.keys(titleRow);
    var exportData = data.map((row) => {
      //1.筛选导出列；2.不依赖原始数据列的排序；3.优化undefined、日期、长数字字段
      var newRow = {};
      dispalyCols.forEach((col) => {
        if (typeof row[col] === 'undefined' || row[col] === null) {
          newRow[col] = '';
        } else {
          newRow[col] = row[col];
        }
      });
      return newRow;
    });
    if (showTitle !== false) {
      // 插入表头
      exportData.unshift(titleRow);
    }

    // 导出
    jsonToXLSX(exportData, fileName || '列表导出数据', showTitle);
  } catch (err) {
    console.error(err);
  }
}
/*Excel解析方法封装, outside import shim.js、jszip.js、xlsx.js as this sequence*/
export function parseExcel(file, args) {
  var rABS =
    typeof FileReader !== 'undefined' &&
    typeof FileReader.prototype !== 'undefined' &&
    typeof FileReader.prototype.readAsBinaryString !== 'undefined';
  var use_worker = typeof Worker !== 'undefined';
  //var use_worker = false;

  var XW = {
    msg: 'xlsx', //worker message
    jsFile: '/static/xlsx/worker.js', //worker scripts
  };

  //check file exetension
  var isExcel = function(filename) {
    var parts = filename.split('.');
    var ext = parts[parts.length - 1];
    switch (ext.toLowerCase()) {
      case 'xls':
      case 'xlsx':
      case 'csv':
        return true;
    }
    return false;
  };

  //transfer ArrayBuffer to BinaryString
  var fixdata = function(data) {
    var o: any = '',
      l = 0,
      w = 10240;
    for (; l < data.byteLength / w; ++l) {
      //以10kb为基准分割文件
      var block: any = new Uint8Array(data.slice(l * w, l * w + w)); //各分割块相当于length为10k的单字节数组
      o += String.fromCharCode.apply(null, block); //每个字节块被“翻译为”一个Unicode码(此处无需中文，故8位即可)，再转为常规字符
    }
    let unStr: any = new Uint8Array(data.slice(l * w));
    o += String.fromCharCode.apply(null, unStr); //10k整数倍以后的"余数"数据
    return o; //此处返回的BinaryString，相当于"字符串"形式的文件(01二进制码 => Unicode/ASCII => "乱码"字符串)
  };

  //execute workbook stranfer main func
  var process_wb = function(workbook) {
    var first_name = workbook.SheetNames[0]; //first sheet to json
    var res = XLSX.utils.sheet_to_json(workbook.Sheets[first_name]); //转化规则：sheet首行为key, 后续行化为对象数组
    return res;
  };
  let to_json = function(file, args) {
    var promise = new Promise(function(resolve, reject) {
      if (args) {
        //暂时无用
      }

      if (!isExcel(file.name)) {
        reject('请选择Excel格式文件');
        return;
      }

      var reader = new FileReader();
      if (rABS) {
        reader.readAsBinaryString(file);
      } else {
        reader.readAsArrayBuffer(file);
      }

      reader.onload = function(e: any) {
        var data = e.target.result;
        var jsonRes;
        if (use_worker) {
          //web worker execute
          var worker = new Worker(XW.jsFile);
          var arr = rABS ? data : btoa(fixdata(data));
          worker.postMessage({ rABS, arr });
          worker.onmessage = function(e) {
            switch (e.data.flag) {
              case 'ready':
                break;
              case 'error':
                reject(e.data.err);
                break;
              case XW.msg:
                jsonRes = process_wb(JSON.parse(e.data.res));
                resolve(jsonRes);
                break;
            }
          };
        } else {
          var workbook;
          if (rABS) {
            workbook = XLSX.read(data, { type: 'binary' });
          } else {
            var fixedData = fixdata(data);
            workbook = XLSX.read(fixedData, { type: 'binary' });
          }
          jsonRes = process_wb(workbook);
          resolve(jsonRes);
        }
      };
      reader.onerror = function(err: any) {
        console.error(err);
        reject(err.getMessage());
      };
    });

    return promise;
  };
  return to_json(file, args);
}
