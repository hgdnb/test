
import XLSX from 'xlsx'
/**
 * @description:
 * @param {Object} json 服务端发过来的数据
 * @param {String} name 导出Excel文件名字
 * @return:
 */
function exportExcel (json, name) {
  /* convert state to workbook */
  var data = []
  var keyArray = []

  for (const key1 in json) {
    if (Object.prototype.hasOwnProperty.call(json, 'key1')) {
      const element = json[key1]
      var rowDataArray = []
      for (const key2 in element) {
        if (Object.prototype.hasOwnProperty.call(element, 'key2')) {
          const element2 = element[key2]
          rowDataArray.push(element2)
          if (keyArray.length < getLength(element)) {
            keyArray.push(key2)
          }
        }
      }
      data.push(rowDataArray)
    }
  }
  data.splice(0, 0, keyArray)
  const ws = XLSX.utils.aoa_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'SheetJS')
  /* generate file and send to client */
  XLSX.writeFile(wb, name + '.xlsx')
}

/**
 * @description: 导入excel文件并返回数据
 * @param {function} 回调函数参数data,dataRef,一个是数据，一个是exce表单的索引
 * @return:
 */
function importExcel (callback) {
  var inputObj = document.createElement('input')
  inputObj.setAttribute('id', 'file')
  inputObj.setAttribute('type', 'file')
  inputObj.setAttribute('name', 'file')
  inputObj.setAttribute('style', 'visibility:hidden')
  inputObj.setAttribute('accept', '.xlsx,.xls,.csv')
  inputObj.addEventListener('change', (evt) => {
    const files = evt.target.files
    if (files && files[0]) {
      _file(files[0], (data, dataRef) => {
        callback(data, dataRef)
      })
    }
  })
  document.body.appendChild(inputObj)
  console.log(inputObj.value)
  inputObj.click()
}

/**
 * @description: 处理文件
 * @param {Object} file 文件对象
 * @param {function} callback 回调函数
 * @return:
 */
function _file (file, callback) {
  const makeCols = refstr => Array(XLSX.utils.decode_range(refstr).e.c + 1).fill(0).map((x, i) => ({
    name: XLSX.utils.encode_col(i),
    key: i
  }))

  /* Boilerplate to set up FileReader */
  const reader = new FileReader()
  reader.onload = (e) => {
    /* Parse data */
    const bstr = e.target.result
    const wb = XLSX.read(bstr, {
      type: 'binary'
    })
    /* Get first worksheet */
    const wsname = wb.SheetNames[0]
    const ws = wb.Sheets[wsname]
    /* Convert array of arrays */
    const data = XLSX.utils.sheet_to_json(ws, {
      header: 1
    })
    /* Update state */
    callback(data, makeCols(ws['!ref']))
  }
  reader.readAsBinaryString(file)
}

/**
 * @description: 获取map的长度
 * @param {Object} obj map对象
 * @return: map的长度
 */
function getLength (obj) {
  var count = 0
  for (const i in obj) {
    console.log(i)
    if (Object.prototype.hasOwnProperty.call(obj, 'i')) {
      count++
    }
  }

  return count
}
export default {
  exportExcel,
  importExcel
}
