/**
 * 解析url参数
 */

export function urlParse () {
  let url = window.location.search;
  let para = url.split('/')[0];
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = para.match(reg);
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
}
