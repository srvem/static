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
            const pathName = this.baseDirectory.replace(/\\/g, '/').replace(/\/$/g, '') + url.resolve('/', url.parse(ctx.request.url).pathname);
            fs_1.readFile(pathName.substr(1), (err, data) => {
                if (err) {
                    console.error(err);
                    ctx.statusCode = 404;
                }
                else {
                    ctx.statusCode = 200;
                    ctx.body = data.toString();
                }
            });
        });
    }
}
exports.SrvStatic = SrvStatic;
//# sourceMappingURL=SrvStatic.js.map