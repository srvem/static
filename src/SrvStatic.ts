import { Context, MiddlewareBlueprint, PromiseRejectType, PromiseResolveType } from '@srvem/app'
import { readFile } from 'fs'
import { parse, resolve } from 'url'

/**
 * Used to serve static files from a directory.
 */
export class SrvStatic extends MiddlewareBlueprint {
  /**
   * Constructs the SrvStatic middleware.
   * 
   * @param baseDirectory Root of the served directory
   * @param indexName Default index file name for directory requests
   */
  constructor(public baseDirectory: string = '.', public indexName: string = 'index.html') {
    super()
  }

  /**
   * Attempts to serve GET requests.
   * 
   * @param ctx The Context
   */
  async main(ctx: Context): Promise<void> {
    if (ctx.method !== 'GET')
      return

    const pathName = this.baseDirectory.replace(/\\/g, '/').replace(/\/$/g, '') + resolve('/', parse(ctx.url).pathname)

    await this._serve(ctx, pathName)
  }

  /**
   * Attempts to serve a path using the Context.
   * 
   * @param ctx The Context
   * @param pathName Path to be served
   */
  private async _serve(ctx: Context, pathName: string): Promise<void> {
    return new Promise<void>((resolve: PromiseResolveType<void>, reject: PromiseRejectType): void => {
      readFile(pathName, (err: NodeJS.ErrnoException, data: Buffer): void => {
        if (err) {
          switch (err.code) {
            // if directory, try loading index.html from it
            case 'EISDIR':
              return resolve(this._serve(ctx, pathName + 'index.html'))
            
            // no entity (no such file) => 404
            case 'ENOENT':
              if (!ctx.body) {
                ctx.statusCode = 404
                ctx.body = `404 Not Found.\n\nRequest: ${ctx.request.method + ' ' + ctx.request.url}`
              }
              break

            // todo more error code handling ???

            // unknown errors => 500
            default:
              ctx.statusCode = 500
              ctx.body = '500 Internal Server Error.'
              console.error(`ERROR: ${ctx.request.method + ' ' + ctx.request.url} => 500 Internal Server Error (from SrvStatic): ${err}`)
          }
        }
        else {
          // 200 OK
          ctx.statusCode = 200
          ctx.body = data.toString()
        }
        
        return resolve()      
      })
    })
  }
}
