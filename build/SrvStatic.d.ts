import { SrvMiddleware } from '@srvem/middleware';
export declare class SrvStatic extends SrvMiddleware {
    private baseDirectory;
    constructor(baseDirectory?: String);
    main(): void;
}
