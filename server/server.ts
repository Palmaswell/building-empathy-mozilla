import * as Koa from 'koa';
import * as send from 'koa-send';
import { resolve } from 'path';
import { config } from './config';
import { routes } from './routes';

const app = new Koa();

app.use(async (ctx, next) => {
  const start = Date.now();

  await next();

  const responseTime = Date.now() - start;
  console.log(`${ctx.status} ${ctx.method} ${ctx.url} - ${responseTime}ms`);
})
app.use(routes);

console.log(resolve('../src/index.html'))

app.use(async (ctx) => {
  console.log('this is the context', ctx.path)
  await send(ctx, ctx.path, { root: './src/index.html'});
})

app.listen(config.port);

console.log(`Server is running at http://localhost:${config.port}/`);

