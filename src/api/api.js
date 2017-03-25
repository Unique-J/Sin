import Express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import config from '../config';
import controllers from './controllers';
import dbHandle from './utils/dbHandle';

const port = config.apiPort;
const app = new Express();

app.use(bodyParser.json());

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
