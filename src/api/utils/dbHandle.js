import mongoose from 'mongoose';
import config from '../../config';

import { createModels } from '../models/index';

export default function dbHandle() {
  mongoose.connect(config.dataBase);

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.info('==> Connect DataBase succeed');

    createModels();
  });
}
