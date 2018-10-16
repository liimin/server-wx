const response = {
    CODE: {
        SUCCESS: 200,

        ERROR_401: 401,

        ERROR_403: 403,

        ERROR_404: 404,

        ERROR_412: 412
    },
    MESSAGE: {
        200: 'success',
        401: 'error-401',
        403: 'error-403',
        404: 'error-404',
        412: 'error-412'
    },
    ERROR: (code, msg, ctx) => {
        const res = {
            code,
            msg
        }
        if (ctx) {
            ctx.response.status = code
            ctx.body = res
            return
        }
        return res
    },
    SUCCESS: (result, ctx) => {
        let {
            code = response.CODE.SUCCESS,
                data,
                page,
                msg = response.MESSAGE[response.CODE.SUCCESS]
        } = result
        data = data || result
        const res = {
            code,
            msg,
            data,
            page
        }
        if (ctx) {
            ctx.response.status = code
            ctx.body = res
            return
        }
        return res
    }
}

module.exports = response