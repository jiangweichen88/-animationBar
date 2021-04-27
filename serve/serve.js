/*
 * @Description: 主程序
 * @Author: cuiht
 * @Date: 2020-12-04 22:19:56
 * @LastEditTime: 2021-01-14 18:31:35
 */
const xlsx = require("node-xlsx");
const fs = require("fs");
// 读取xlsx
const sheets = xlsx.parse("./" + "GDP.xlsx");
const sheets2 = xlsx.parse("./" + "electricity.xls");
// 获取xlsx第一个标签栏的数据
const sheetData = sheets[0].data;
// 定义数据列表
let testList = [];
// 循环拼装数据
//sheetData.forEach((item, index) => {
//if (index == 0) {
//  // 去除标题栏
//  testList.push(item);
//  return;
//} else {
//  testList.push(item);
//}
//});

const jsonObj0 = sheetData;
const jsonObj1 = sheets2[0].data;
//console.log(jsonObj)
// 不压缩的情况
// fs.writeFileSync('test-shujuchouqu.json',JSON.stringify(jsonObj, null, "\t"));
let aa=`
let GDP0=${ JSON.stringify(jsonObj0)};
let electricity0=${JSON.stringify(jsonObj1)};
export {GDP0,electricity0}
`;

fs.writeFileSync("../src/assets/data/data.js", aa);
// 压缩的情况
//fs.writeFileSync("../static/json/GDP0.json", JSON.stringify(jsonObj0));
//fs.writeFileSync("../static/json/electricity0.json", JSON.stringify(jsonObj1));
console.log('文件转换完成')