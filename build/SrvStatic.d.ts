import { SrvMiddleware } from '@srvem/middleware';
export declare class SrvStatic extends SrvMiddleware {
    private baseDir;
    constructor(baseDir?: String);
    main(): void;
}
