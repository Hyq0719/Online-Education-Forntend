module.exports = {
    lintOnSave: false,
    configureWebpack: config => {
        if (process.env.NODE_ENV === "production") {
            config.externals = { // 不会被打包的库
                'vue': 'Vue',
                'vue-router': 'VueRouter',
                'element-ui': 'element-ui',
            }
        }
    },
    parallel: require('os').cpus().length > 1,
}

