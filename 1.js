var fs = require('fs')
var buf = new Buffer.alloc(1300299)

console.log('准备打开已存在的文件！')
fs.open('./china-cities.json', 'r+', function (err, fd) {
  if (err) {
    return console.error(err)
  }
  console.log('文件打开成功！')
  console.log('准备读取文件：')
  fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
    if (err) {
      console.log(err)
    }
    console.log(bytes + '  字节被读取')
    // 仅输出读取的字节
    if (bytes > 0) {
      console.log(buf.slice(0, bytes).toString())
      const json = JSON.parse(buf.slice(0, bytes).toString())
      const { features } = json
      const mainCity = [
        '北京',
        '上海',
        '广州',
        '深圳',
        '成都',
        '杭州',
        '重庆',
        '西安',
        '苏州',
        '武汉',
        '南京',
        '天津',
        '郑州',
        '长沙',
        '东莞',
        '佛山',
        '宁波',
        '青岛',
        '沈阳'
      ]
      console.log('主要城市个数', mainCity.length);
      const arr = features.filter((item) =>
      mainCity.includes(item?.properties?.name)
      )
      console.log('写入城市的个数', arr.length);
      fs.writeFile('china-main-cities.json', JSON.stringify(arr), function (err) {
        if (err) {
          return console.error(err)
        }
        console.log('数据写入成功！')
        console.log('--------我是分割线-------------')
      })
    }
  })
})
