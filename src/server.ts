import * as Koa from 'koa';
import * as Router from 'koa-router';
import { config } from './config';

const app = new Koa();
const router = new Router();

app.use(async (ctx, next) => {
  const start = Date.now();

  await next();

  const responseTime = Date.now() - start;
  console.log(`${ctx.status} ${ctx.method} ${ctx.url} - ${responseTime}ms`);
})

router.get('/*', async ctx => {
  ctx.body = 'Hello World';
})

app.use(router.routes());
app.listen(config.port);
console.log(`Server is running at http://localhost:${config.port}/`);

