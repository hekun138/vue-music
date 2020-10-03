const path = require('path')
const axios = require('axios')

// const resolve = dir => {
//   return path.join(__dirname, dir)
// }

/**
 * referer
 * Referer 请求头包含了当前请求页面的来源页面的地址，即表示当前页面是通过此来源页面里的链接进入的。
 * 服务端一般使用 Referer 请求头识别访问来源，可能会以此进行统计分析、日志记录以及缓存优化等。
 * host
 * Host 请求头指明了请求将要发送到的服务器主机名和端口号。
 */

module.exports = {
  devServer: {
    proxy: {
      '/v1': {
        target: 'http://localhost:8000',
        secure: false
      }
    },
    before (app) {
      app.get('/api/getDiscList', function (req, res) {
        const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

        axios.get(url, {
          headers: {
            referer: 'https://y.qq.com/',
            host: 'c.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })

      app.get('/api/getTopBanner', (req, res) => {
        const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'

        axios.get(url, {
          headers: {
            referer: 'https://u.y.qq.com/',
            host: 'u.y.qq.com'
          },
          params: req.query
        }).then(response => {
          response = response.data
          if (response.code === 0) {
            const slider = []
            const content = response.focus.data && response.focus.data.shelf.v_niche[0].v_card
            if (content) {
              for (let i = 0; i < content.length; i++) {
                const item = content[i]
                const slideItem = {}
                slideItem.id = item.id
                slideItem.picUrl = item.cover
                slider.push(slideItem)
              }
            }
            res.json({
              code: 0,
              data: {
                slider
              }
            })
          } else {
            res.json(response)
          }
        }).catch((e) => {
          console.log(e)
        })
      })
    }
  }
}
