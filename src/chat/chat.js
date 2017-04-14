import Express from 'express';
import http from 'http';
import socketio from 'socket.io';
import config from '../config';
import dbHandle from '../api/utils/dbHandle';
import saveMessage from './controllers/saveMessage';

const app = new Express();
const httpServer = http.createServer(app);
const io = socketio.listen(httpServer);

const port = config.chatPort;

const userSockets = {};

dbHandle();

io.on('connection', socketPara => {
  const socket = socketPara;

  socket.on('login', user => {
    const uid = user.sid || user.tid;

    if (!userSockets.hasOwnProperty(uid)) {
      userSockets[uid] = socket;
      socket.uid = uid;
      console.log(`${user.name} is connected`);
    }
  });

  socket.on('privateMsg', message => {
    if (message.receiverid in userSockets) {
      userSockets[message.receiverid].emit(message.receiverid, message);
    }
    // console.log(message);

    saveMessage(message);
  });

  socket.on('disconnect', () => {
    console.log('disconnect');
    if (userSockets.hasOwnProperty(socket.uid)) {
      delete userSockets[socket.uid];
    }
  });
});

httpServer.listen(port, err => {
  if (err) {
    console.error(err);
  } else {
    console.log('==> CHAT Listening on port %s', port);
  }
});
