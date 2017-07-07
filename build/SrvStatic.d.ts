import { Context, MiddlewareBlueprint } from '@srvem/app';
/**
 * Used to serve static files from a directory.
 */
export declare class SrvStatic extends MiddlewareBlueprint {
    baseDirectory: string;
    indexName: string;
    /**
     * Constructs the Srvem middleware.
     *
     * @param baseDirectory Root of the served directory
     * @param indexName Default index file name for directory requests
     */
    constructor(baseDirectory?: string, indexName?: string);
    /**
     * Attempts to serve GET requests.
     *
     * @param ctx The Context
     */
    main(ctx: Context): Promise<void>;
    /**
     * Attempts to serve a path using the Context.
     *
     * @param ctx The Context
     * @param pathName Path to be served
     */
    private _serve(ctx, pathName);
}
