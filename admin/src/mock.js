import Mock from 'mockjs';
// Mock.mock('/mockjs', 'post', (options)=> {
//     console.log(options)
//     return {
//         name: '艾克',
//         age: 18
//     }
// })
const Random = Mock.Random

var listData = (params) => {
    console.log(params)
    if (params.body) {
        let _data = []
        for (let i = 0; i < 20; i++) {
            let newList = { // 详细 规则 参照mockjs官网
                title: Random.csentence(5, 30), //  Random.csentence( min, max )
                imgSrc: Random.dataImage('200x160', '这是图片中的文本'), // Random.dataImage( size, text ) 生成图片（base64位数据格式）
                author_name: Random.cname(), // Random.cname() 随机生成中文名
                date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
            }
            _data.push(newList)
        }
        console.log(_data)
        return {
            _data: _data
        }
    } else {
        let _data = []
        for (let i = 0; i < 10; i++){
            let nikeList = {
                title: '妮可',
                imgSrc: 'http://carrots.ks3-cn-beijing.ksyun.com/3/640aa749-dbfd-4b76-b375-b68257e5d559.webp',
                author_name: '矢泽妮可',
                date: Random.date() + ' ' + Random.time()
            }
            _data.push(nikeList)
        }
        return {_data: _data}
    }

}
// url为要拦截的请求地址  请求方式  请求数据（规则） （此处api会被mockjs拦截）
Mock.mock('/mockjs', 'post', listData)