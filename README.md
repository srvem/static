# @srvem/static
A servem middleware used to serve static files from a specified directory.
  
## Installation
> `npm install --save @srvem/app @srvem/static`
  
## Usage
```typescript
import { Srvem } from '@srvem/app'
import { SrvStatic } from '@srvem/static'

const app = new Srvem()

app.use(new SrvStatic('./public/'))
// more srvem middlewares can go here using app.use()
// handlers can also be defined here using app.handle()

app.start().listen(80)

```
  
## Public API
```typescript
// SrvMiddleware is from the '@srvem/middleware' module
class SrvStatic extends SrvMiddleware {

  // base or root directory to be served
  constructor(baseDirectory: String = '.')

}

```
  
## See Also
- [@srvem/app](https://github.com/srvem/app) a super-fast and minimalist TypeScript middleware-oriented server for Node.js.
- [@srvem/router](https://github.com/srvem/static) to develop routers and server APIs with asynchronous request handlers.
- [@srvem/middleware](https://github.com/srvem/static) to create your own custom middleware for Srvem apps.
  
## Credits
Kaleab S. Melkie (<kaleabmelkie@gmail.com>)
  
## License
MIT License  
Copyright &copy; 2017 srvem
