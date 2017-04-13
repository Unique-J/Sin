import path from 'path';
import Express from 'express';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import session from 'express-session';
import config from '../config';
import controllers from './controllers';
import dbHandle from './utils/dbHandle';

const port = config.apiPort;
const app = new Express();

app.use(favicon(path.join(__dirname, '..', '..', 'static', 'favicon.ico')));

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true, parameterLimit: 50000 }));

app.use(session({
  secret: 'react project',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 100000000 }
}));

dbHandle();

controllers(app);

app.listen(port, error => {
  if (error) {
    console.error(error);
  } else {
    console.info('==> API Listening on port %s', port);
  }
});
