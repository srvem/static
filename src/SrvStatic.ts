import { CtxPromiseType, CtxResolveType, PromiseRejectType, SrvContext, SrvMiddlewareBlueprint } from '@srvem/app'
import { readFile } from 'fs'
import * as url from 'url'

export class SrvStatic extends SrvMiddlewareBlueprint {
  constructor(private baseDirectory: String = '.') {
    super()
  }

  async main(ctx: SrvContext): CtxPromiseType {
    return new Promise<SrvContext>((resolve: CtxResolveType, reject: PromiseRejectType): void => {
      if (ctx.request.method !== 'GET')
        return resolve(ctx)

      const pathName = this.baseDirectory.replace(/\\/g, '/').replace(/\/$/g, '') + url.resolve('/', url.parse(ctx.request.url).pathname)

      return readFile(pathName, (err: NodeJS.ErrnoException, data: Buffer): void => {
        if (err) {
          switch (err.code) {
            case 'ENOENT':
              if (!ctx.body) {
                ctx.statusCode = 404
                ctx.body = `404 Not Found.\n\nRequest: ${ctx.request.method + ' ' + ctx.request.url}`
              }
              break;

            // todo more ???
            
            default:
              ctx.statusCode = 500
              ctx.body = '500 Internal Server Error.'
              // todo: should the promise be rejected ???
          }
        }
        else {
          ctx.statusCode = 200
          ctx.body = data.toString()
        }
        
        return resolve(ctx)
      })
    })
  }
}
