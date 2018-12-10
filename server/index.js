const fs = require('fs')
const Koa = require('koa')
const path = require('path')
const chalk = require('chalk')
const LRU = require('lru-cache')
const koaCompress = require('koa-compress')
const compressible = require('compressible')
const koaStatic = require('./static')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const HtmlMinifier = require('html-minifier').minify
const setupDevServer = require('../build/setup-dev-server')
// const { createBundleRenderer, createRenderer } = require('vue-server-renderer')
const { createBundleRenderer } = require('vue-server-renderer')

const resolve = file => path.resolve(__dirname, file)
// 缓存
const microCache = new LRU({
  max: 1000, // 最大緩存数
  maxAge: 1000 * 60 * 15 // 重要提示：条目在 15 分钟后过期。
})

const isCacheable = ctx => {
  // 实现逻辑为，检查请求是否是用户特定(user-specific)。
  // 只有非用户特定(non-user-specific)页面才会缓存
  console.log('当前路由地址： ' + ctx.url)
  if (ctx.url && ctx.url === '/b') {
    return true
  }
  return false
}

const isProd = process.env.NODE_ENV === 'production'

//  第 1 步：创建koa、koa-router 实例
const app = new Koa()
const router = new Router()

let renderer
let templatePath

// 第 2步：根据环境变量生成不同BundleRenderer实例
if (process.env.NODE_ENV === 'production') {
  templatePath = HtmlMinifier(fs.readFileSync(resolve('./index.html'), 'utf-8'), {
    collapseWhitespace: true,
    removeAttributeQuotes: true,
    removeComments: false
  })
  // 获取客户端、服务器端打包生成的json文件
  const serverBundle = require('../dist/vue-ssr-server-bundle.json')
  const clientManifest = require('../dist/vue-ssr-client-manifest.json')
  // 赋值
  renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    // template: fs.readFileSync(templatePath, 'utf-8'),
    template: templatePath,
    // for component caching
    cache: new LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('../dist'),
    clientManifest
  })
  // 静态资源  async标记的函数称为异步函数，在异步函数中，可以用await调用另一个异步函数，这两个关键字将在ES7中引入
  // router.get('/static/*', async (ctx, next) => {
  //   // await send(ctx, ctx.path, { root: __dirname + '/../dist' })
  //   await send(ctx, ctx.path, { root: path.resolve(__dirname, '../dist') })
  // })
} else {
   templatePath = path.resolve(__dirname, './index.html')
  // 开发环境
  setupDevServer(app, templatePath, (bundle, options) => {
    console.log('重新bundle~~~~~')
    const option = Object.assign({
      runInNewContext: false
    }, options)
    renderer = createBundleRenderer(bundle, option)
  }
  )
}

const render = async (ctx, next) => {
  ctx.set('Content-Type', 'text/html')

  const handleError = err => {
    if (err.code === 404) {
      ctx.status = 404
      ctx.body = '404 Page Not Found'
    } else {
      ctx.status = 500
      ctx.body = '500 Internal Server Error'
      console.error(`error during render : ${ctx.url}`)
      console.error(err.stack)
    }
  }

  const context = {
    url: ctx.url,
    cookies: ctx.cookies
  }

  // 判断是否可缓存，可缓存并且缓存中有则直接返回
  const cacheable = isCacheable(ctx)
  if (cacheable) {
    const hit = microCache.get(ctx.url)
    if (hit) {
      console.log('从缓存中取', hit)
      /* eslint-disable */
      return ctx.body = hit
    }
  }

  try {
    console.log('开始渲染页面')
    const html = await renderer.renderToString(context)
    console.log('html=== ' + html)
    console.log('ctx== ' + JSON.stringify(ctx))
    ctx.body = html
    if (cacheable) {
      console.log('设置缓存: ', ctx.url)
      microCache.set(ctx.url, html)
    }
  } catch (error) {
    handleError(error)
  }
}

router.get('*', render)

app.use(koaCompress({ // 压缩数据
  filter: type => !(/event\-stream/i.test(type)) && compressible(type) // eslint-disable-line
}))

app.use(koaStatic(isProd ? path.resolve(__dirname, '../dist') : path.resolve(__dirname, '../static'), {
    maxAge: 30 * 24 * 60 * 60 * 1000
  })) // 配置静态资源目录及过期时间

app.use(bodyParser())
  // .use(staticFiles(path.resolve(__dirname, "../dist")))
  // .use(favicon(path.resolve( __dirname, '../static/favicon.ico')))

app.use(router.routes())
   .use(router.allowedMethods())

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(chalk.green(`server started at localhost:${port}`))
})
