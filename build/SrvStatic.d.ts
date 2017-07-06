import { CtxPromiseType, SrvContext, SrvMiddlewareBlueprint } from '@srvem/app';
export declare class SrvStatic extends SrvMiddlewareBlueprint {
    private baseDirectory;
    constructor(baseDirectory?: String);
    main(ctx: SrvContext): CtxPromiseType;
}
