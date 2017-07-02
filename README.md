# @srvem/static
A servem middleware that serves static files from a specified directory.

# Installation
> `npm install --save @srvem/app @srvem/static`

# Usage
```typescript
import { Srvem } from '@srvem/app'
import { SrvStatic } from '@srvem/static'

const app = new Srvem()

app.use(new SrvStatic('./public/'))

// more middlewares can go here using app.use()

app.start().listen(80)

```

# Public API
```typescript
// SrvMiddleware is from the '@srvem/middleware' module
class SrvStatic extends SrvMiddleware {

  // baseDir is the path of root directory to be served
  constructor(baseDir?: String)

}

```

# Credits
Kaleab S. Melkie (<kaleabmelkie@gmail.com>)

# License
MIT License
Copyright (c) 2017 srvem
