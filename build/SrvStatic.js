"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@srvem/app");
const fs_1 = require("fs");
const url_1 = require("url");
/**
 * Used to serve static files from a directory.
 */
class SrvStatic extends app_1.MiddlewareBlueprint {
    /**
     * Constructs the Srvem middleware.
     *
     * @param baseDirectory Root of the served directory
     * @param indexName Default index file name for directory requests
     */
    constructor(baseDirectory = '.', indexName = 'index.html') {
        super();
        this.baseDirectory = baseDirectory;
        this.indexName = indexName;
    }
    /**
     * Attempts to serve GET requests.
     *
     * @param ctx The Context
     */
    async main(ctx) {
        if (ctx.method !== 'GET')
            return;
        const pathName = this.baseDirectory.replace(/\\/g, '/').replace(/\/$/g, '') + url_1.resolve('/', url_1.parse(ctx.url).pathname);
        await this._serve(ctx, pathName);
    }
    /**
     * Attempts to serve a path using the Context.
     *
     * @param ctx The Context
     * @param pathName Path to be served
     */
    async _serve(ctx, pathName) {
        return new Promise((resolve, reject) => {
            fs_1.readFile(pathName, (err, data) => {
                if (err) {
                    switch (err.code) {
                        // if directory, try loading index.html from it
                        case 'EISDIR':
                            return resolve(this._serve(ctx, pathName + 'index.html'));
                        // no entity (no such file) => 404
                        case 'ENOENT':
                            if (!ctx.body) {
                                ctx.statusCode = 404;
                                ctx.body = `404 Not Found.\n\nRequest: ${ctx.request.method + ' ' + ctx.request.url}`;
                            }
                            break;
                        // todo more error code handling ???
                        // unknown errors => 500
                        default:
                            ctx.statusCode = 500;
                            ctx.body = '500 Internal Server Error.';
                            console.error(`ERROR: ${ctx.request.method + ' ' + ctx.request.url} => 500 Internal Server Error (from SrvStatic): ${err}`);
                    }
                }
                else {
                    // 200 OK
                    ctx.statusCode = 200;
                    ctx.body = data.toString();
                }
                return resolve();
            });
        });
    }
}
exports.SrvStatic = SrvStatic;
//# sourceMappingURL=SrvStatic.js.map