if (process.env.NODE_ENV === 'production') {
  require('../build/chat/chat');
} else {
  require('babel-register');
  require('../src/chat/chat');
}
