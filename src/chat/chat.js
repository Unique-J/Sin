import Express from 'express';
import http from 'http';
import socketio from 'socket.io';
import config from '../config';
import dbHandle from '../api/utils/dbHandle';

const app = new Express();
const httpServer = http.createServer(app);
const io = socketio.listen(httpServer);

const port = config.chatPort;

const onlineUsers = {};
const userSockets = {};

io.on('connection', socket => {
  socket.on('login', user => {
    if (!onlineUsers.hasOwnProperty(user.sid)) {
      onlineUsers[user.sid] = user.name;
      userSockets[user.sid] = socket;
      userSockets.uid = user.sid;
      console.log(`${user.name} is connected`);
    }
  });

  socket.on('privateMsg', message => {
    if (message.to in userSockets) {
      // console.log(usocket[message.to]);
      userSockets[message.to].emit('to' + message.to, message);
      userSockets[message.from].emit('to' + message.from, message);
      // console.log(io.sockets.sockets);
      // socket.emit('to', message);
      // console.log(usocket[message.to]);
    }
  });

  // usocket['13110033140'].on('to', msg => console.log(msg));
  // socket.on('to', msg => console.log(msg));

  // socket.on('disconnect', () => {
  //   console.log('disconnect');
  //   console.log(user);
  //   if (onlineUsers.hasOwnProperty(socketid)) {
  //     delete onlineUsers[socketid];
  //     // console.log(1);
  //   }
  //   console.log(onlineUsers);
  // });
});

dbHandle();

httpServer.listen(port, err => {
  if (err) {
    console.error(err);
  } else {
    console.log('==> CHAT Listening on port %s', port);
  }
});
