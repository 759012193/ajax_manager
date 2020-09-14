const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    
    app.use(
        '/bd_weather_diulei',
        createProxyMiddleware({
            target: 'http://api.map.baidu.com/telematics/v3',
            changeOrigin: true,
			pathRewrite:{
				'^/bd_weather_diulei':'/'
			}
        })
    );

    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:3001',
            changeOrigin: true
        })
    );
   
};
