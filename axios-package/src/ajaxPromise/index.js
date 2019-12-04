;
(function anonymous(window) {

    // default config
    let config = {
        method: 'GET',
        url: '',
        baseURL: '',
        headers: {},
        dataType: 'JSON',
        data: null,
        params: null,
        cache: true,
    }

    let ajaxPromise = (options) => {
        let {
            method,
            url,
            data,
            headers,
            dataType,
            params,
            cache,
            baseURL
        } = options;
        // Get request
        if (/^(GET|DELETE|HEAD|OPTIONS)$/i.test(method)) {
            if (params) {
                url += `${ajaxPromise.check(url)}${ajaxPromise.formatData(params)}`
            }
            if (cache === false) {
                url += `${ajaxPromise.check(url)}_=${+(new Date())}`
            }
            data = null
        }
        // Post request
        else {
            if (data) data = ajaxPromise.formatData(data)
        }
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(method, `${baseURL}${url}`)
            if (headers !== null && typeof headers === 'object') {
                for (let attr in headers) {
                    if (headers.hasOwnProperty(attr)) {
                        let val = headers[attr];
                        // Process Chinese coding 
                        if (/[\u4e00-\u9fa5]/.test(attr)) {
                            val = encodeURIComponent(val)
                        }
                        xhr.setRequestHeader(attr, val);
                    }
                }
            }
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && /^(2|3)\d{2}$/.test(xhr.status)) {
                    let result = xhr.responseText
                    dataType = dataType.toUpperCase()
                    dataType === 'JSON' ? result = JSON.parse(result) :
                        (dataType === 'XML' ? result = xhr.responseXML : null)
                    resolve(result, xhr)
                    return
                }
                reject(xhr.statusText, xhr)
            }
            xhr.send(data)
        })
    }

    // export config 
    ajaxPromise.config = config

    // formatData 把对象转换为urlencoded字符串
    ajaxPromise.formatData = (obj) => {
        let str = ``;
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                str += `${attr}=${obj[attr]}&`
            }
        }
        return str.substring(0, str.length - 1)
    }

    ajaxPromise.check = (url) => {
        return url.indexOf('?') >= -1 ? '&' : '?'
    }

    ['get', 'delete', 'head', 'options'].forEach(item => {
        ajaxPromise[item] = (url, options = {}) => {
            options = {
                ...config,
                ...options,
                url: url,
                method: item.toUpperCase(),
            }
            return ajaxPromise(options)
        }
    })

    // create get mothod
    ajaxPromise.get = (url, options = {}) => {
        ajaxPromise(url, options)
    }

    ['post', 'put', 'patch'].forEach(item => {
        ajaxPromise[item] = (url, data = {}, options = {}) => {
            options = {
                ...config,
                ...options,
                url: url,
                data: data,
                method: item.toUpperCase(),
            }
            return ajaxPromise(options)
        }
    })

    // create post method
    ajaxPromise.post = (url, data = {}, options = {}) => {
        ajaxPromise(url, data, options)
    }

    window.ajaxPromise = ajaxPromise
})(window)
