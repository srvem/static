# @srvem/static
A [Srvem](https://github.com/srvem/app) middleware used to serve static files from a specified directory.
  
## Installation
> `npm install --save @srvem/app @srvem/static`
  
## Example
```typescript
import { Srvem } from '@srvem/app'
import { SrvStatic } from '@srvem/static'

// create a Srvem app
const app: Srvem = new Srvem()

// use SrvStatic middleware
app.use(new SrvStatic('public')) // host the /public directory

// listen on port 3000
app.server.listen(3000)

```
  
## API
```typescript
import { Context, MiddlewareBlueprint } from '@srvem/app'

/**
 * Used to serve static files from a directory.
 */
declare class SrvStatic extends MiddlewareBlueprint {
  /**
   * Root of the served directory.
   */
  baseDirectory: string

  /**
   * Default index file name for directory requests
   */
  indexName: string

  /**
   * Constructs the Srvem middleware.
   *
   * @param baseDirectory Root of the served directory
   * @param indexName Default index file name for directory requests
   */
  constructor(baseDirectory?: string, indexName?: string)

  /**
   * Attempts to serve GET requests.
   *
   * @param ctx The Context
   */
  main(ctx: Context): Promise<void>
}

```
  
## See Also
- [@srvem/app](https://github.com/srvem/app) - The core package of Srvem (contains a class used to construct a Srvem app).
- [@srvem/router](https://github.com/srvem/router) - A Srvem middleware used to develop routers and server APIs with asynchronous request handlers.
  
## Credits
Kaleab S. Melkie _<<kaleabmelkie@gmail.com>>_
  
## License
MIT License  
Copyright &copy; 2017 srvem
  
Made with &#10084; in Addis Ababa.
