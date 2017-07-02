import { SrvMiddleware } from '@srvem/middleware'
import { readFile } from 'fs'
import { parse } from 'url'

export class SrvStatic extends SrvMiddleware {
  constructor(private baseDir: String = '') {
    super()
  }

  main(): void {
    const pathName = parse(this.baseDir + this.request.url).pathname;

    readFile(pathName.substr(1), (err: NodeJS.ErrnoException, data: Buffer): void => {
      if (err) {
        console.error(err)
        this.response.writeHead(404)
      } else {
        this.response.writeHead(200)
        this.response.write(data.toString())
      }
      this.response.end()
    })
  }
}
