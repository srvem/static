"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var middleware_1 = require("@srvem/middleware");
var fs_1 = require("fs");
var url_1 = require("url");
var SrvStatic = (function (_super) {
    __extends(SrvStatic, _super);
    function SrvStatic(baseDir) {
        if (baseDir === void 0) { baseDir = ''; }
        var _this = _super.call(this) || this;
        _this.baseDir = baseDir;
        return _this;
    }
    SrvStatic.prototype.main = function () {
        var _this = this;
        var pathName = url_1.parse(this.baseDir + this.request.url).pathname;
        fs_1.readFile(pathName.substr(1), function (err, data) {
            if (err) {
                console.error(err);
                _this.response.writeHead(404);
            }
            else {
                _this.response.writeHead(200);
                _this.response.write(data.toString());
            }
            _this.response.end();
        });
    };
    return SrvStatic;
}(middleware_1.SrvMiddleware));
exports.SrvStatic = SrvStatic;
//# sourceMappingURL=SrvStatic.js.map