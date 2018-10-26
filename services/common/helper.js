var  Helper = {
    ServerBase: 'http://59.110.235.8:9667',
    content:'',
    PageEx: function (params) {
        let {
            page = 1, pageSize = 10
        } = params
        return {
            page,
            pageSize: +pageSize,
            offset: (page - 1) * pageSize,
            limit: +pageSize
        }
    },
    GetReturnObj: function (pager, ret) {
        const {
            rows,
            count
        } = ret
        const {
            page,
            pageSize
        } = pager
        return {
            code: 200,
            data: rows,
            page: {
                cur: page,
                total: count,
                size: pageSize,
                pages: Math.ceil(count / pageSize),
            }
        }
    },
}
module.exports = Helper