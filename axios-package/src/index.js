let url = 'http://www.baidu.com'
fetch(url).then(res => {
        let {
            status
        } = res
        if (/^(4|5)\d{2}$/.test(status)) {
            throw new Error('Query data is Error')
        }
        return res.json()
    }).then(data => {
        return data
    })
    .catch(err => console.log(err))