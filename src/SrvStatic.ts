import { CtxPromiseType, CtxResolveType, PromiseRejectType, SrvContext, SrvMiddlewareBlueprint } from '@srvem/app'
import { readFile } from 'fs'
import * as url from 'url'

export class SrvStatic extends SrvMiddlewareBlueprint {
  constructor(private baseDirectory: String = '.') {
    super()
  }

  async main(ctx: SrvContext): CtxPromiseType {
    return new Promise<SrvContext>((resolve: CtxResolveType, reject: PromiseRejectType): void => {
      const pathName = this.baseDirectory.replace(/\\/g, '/').replace(/\/$/g, '') + url.resolve('/', url.parse(ctx.request.url).pathname)

      readFile(pathName.substr(1), (err: NodeJS.ErrnoException, data: Buffer): void => {
        if (err)
          ctx.statusCode = 404 // todo: ???
        else {
          ctx.statusCode = 200
          ctx.body = data.toString()
        }
        
        resolve(ctx)
      })
    })
  }
}
