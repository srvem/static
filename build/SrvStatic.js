"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@srvem/app");
const fs_1 = require("fs");
const url = require("url");
class SrvStatic extends app_1.SrvMiddlewareBlueprint {
    constructor(baseDirectory = '.') {
        super();
        this.baseDirectory = baseDirectory;
    }
    async main(ctx) {
        return new Promise((resolve, reject) => {
            if (ctx.request.method !== 'GET')
                return resolve(ctx);
            const pathName = this.baseDirectory.replace(/\\/g, '/').replace(/\/$/g, '') + url.resolve('/', url.parse(ctx.request.url).pathname);
            return fs_1.readFile(pathName, (err, data) => {
                if (err) {
                    switch (err.code) {
                        case 'ENOENT':
                            if (!ctx.body) {
                                ctx.statusCode = 404;
                                ctx.body = `404 Not Found.\n\nRequest: ${ctx.request.method + ' ' + ctx.request.url}`;
                            }
                            break;
                        default:
                            ctx.statusCode = 500;
                            ctx.body = '500 Internal Server Error.';
                    }
                }
                else {
                    ctx.statusCode = 200;
                    ctx.body = data.toString();
                }
                return resolve(ctx);
            });
        });
    }
}
exports.SrvStatic = SrvStatic;
//# sourceMappingURL=SrvStatic.js.map