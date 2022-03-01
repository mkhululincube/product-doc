import Koa from 'koa';
import cors from 'koa-cors';
import KoaRouter from 'koa-router';

import { koaSwagger } from '../lib';

const app = new Koa();
const router = new KoaRouter();

app.use(cors());

app.use(
  koaSwagger({
    exposeSpec: true,
    swaggerOptions: {
      spec: {},
      validatorUrl: null,
    },
  }),
);

export default app;

router.get('/moredocs', koaSwagger({ routePrefix: false }));

app.use(router.routes()).use(router.allowedMethods());

if (module.parent === null) {
  app.listen(3000);
  console.log('listening on: http://localhost:3000/docs');
}
