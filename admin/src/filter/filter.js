 // 类型
 function typeFilter (params) {
    switch (params)
    {
        case 0:
            return '首页banner';
        case 1:
            return '找职位banner';
        case 2:
            return '找精英banner';
        case 3:
            return '行业大图';
    }
}
// 状态
function statusFilter (params) {
    if (params === 1) {
        return '草稿'
    } else {
        return '上线'
    }
}
// 上下线
function updFilter (params) {
    if (params === 1) {
        return '上线'
    } else {
        return '下线'
    }
}
// 时间
function timeFilter(value) {
    let date = new Date(value);
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? "0" + MM : MM;
    let d = date.getDate();
    d = d < 10 ? "0" + d : d;
    let h = date.getHours();
    h = h < 10 ? "0" + h : h;
    let m = date.getMinutes();
    m = m < 10 ? "0" + m : m;
    let s = date.getSeconds();
    s = s < 10 ? "0" + s : s;
    return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
}
// function timeFilter(value) {
//     var date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
//     let Y, M, D, h, m, s;
//     Y = date.getFullYear() + '-';
//     M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
//     D = date.getDate() + ' ';
//     h = date.getHours() + ':';
//     m = date.getMinutes() + ':';
//     s = date.getSeconds();
//     let ggg = Y + M + D + h + m +s
//     return ggg;
// }
export {
    typeFilter,
    statusFilter,
    updFilter,
    timeFilter
}