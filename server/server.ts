import * as Koa from 'koa';
import * as send from 'koa-send';
// import * as middleware from 'webpack-dev-middleware';
import * as webpack from 'webpack';
import webpackConfig from '../webpack.config';
import { config } from './config';
import { routes } from './routes';

const app = new Koa();
const compiler = webpack(webpackConfig);

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const responseTime = Date.now() - start;
  console.log(`> ${ctx.status} ${ctx.method} ${ctx.url} - ${responseTime}ms`);
})

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: '/'
  })
);
app.use(routes);

console.log(webpackConfig.output)

app.use(async (ctx) => {
  console.log('this is the context', ctx.path)
  await send(ctx, ctx.path, { root: './src/index.html'});
})

app.listen(config.port);

console.log(`🎰 Server is running at http://localhost:${config.port}/`);

