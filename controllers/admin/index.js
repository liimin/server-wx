const __base=require('../common/base')('admin')
const adminService=__base.Sevice
class AdminController {
    static async login(ctx) {
        try {
            const data =await adminService.login(ctx.request.body)
            response.SUCCESS(data,ctx)
        } catch (e) {
            response.ERROR(response.CODE.ERROR_412,e,ctx);
        }
    }
}
module.exports = AdminController