import * as Koa from 'koa';
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



app.listen(config.port);

console.log(`Server is running at http://localhost:${config.port}/`);

