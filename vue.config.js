const webpack = require('webpack')

module.exports = {
    configureWebpack:{
        plugins:[
            new webpack.ProvidePlugin({
                $:'jquery',
                jQuery:'jquery',
                'windows.jQuery':'jquery'
            })
        ]
    },
    // serve:{
    //     proxyTable: {
    //         '/api': {  //使用"/api"来代替"http://f.apiplus.c"
    //             target: 'https://xqb-edu.oss-cn-hangzhou.aliyuncs.com/', //源地址
    //             changeOrigin: true, //改变源
    //             pathRewrite: {
    //                 '^/api': 'https://xqb-edu.oss-cn-hangzhou.aliyuncs.com/' //路径重写
    //             }
    //         }
    //     },
    // }

    // proxyTable: {
    //     '/api': {  //使用"/api"来代替"http://f.apiplus.c"
    //         target: 'http://f.apiplus.cn', //源地址
    //         changeOrigin: true, //改变源
    //         pathRewrite: {
    //             '^/api': 'http://f.apiplus.cn' //路径重写
    //         }
    //     }
    // }


    devServer:{//解决跨域 = =

        proxy:{
            '/api':{
                target:'https://xqb-edu.oss-cn-hangzhou.aliyuncs.com/',
                ws:true,
                changeOrigin:true,
                pathRewrite:{
                    '^/api':'https://xqb-edu.oss-cn-hangzhou.aliyuncs.com/'
                }
            }
        }
    },

}