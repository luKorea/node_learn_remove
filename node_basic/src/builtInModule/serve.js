const http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs'),
    mime = require('mime');

const {
    PORT
} = require('./util/config')

/**
 * @method server
 * @params req {Object}
 * @params res {Object}
*/
const server = (req,res) => {
    let {method, headers} = req,
    {pathname,query} = url.parse(req.url, true),
    pathName = path.resolve(__dirname, `./static/${pathname}`),
    pathReg = /\.([0-9a-z]+)$/i;
    // read static file
    if (pathReg.test(pathname)) {
        fs.readFile(pathName, (err, result) => {
            // console.log(pathName)
            let suffix = pathReg.exec(pathName)[1]
            // console.log(suffix)
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/plain;charset=utf-8'})
                res.end('找不到页面')
            } else {
                res.writeHead(200, {'Content-Type': `${mime.getType(suffix)};charset: utf-8`})
                res.end(result)
            }
        })
        return
    }
    // API request 
}


// create serve and listen port
http.createServer(server).listen(PORT, () => console.log(`server running http://localhost:${PORT}`))