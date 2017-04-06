module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || (process.env.NODE_ENV === 'production' ? 8080 : 3000),
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT || 3030,
  chatPort: process.env.CHATPORT || 3005,
  dataBase: 'mongodb://localhost/Sin',
  app: {
    title: 'Sin',
    description: 'Just a Blog',
    head: {
      titleTemplate: 'Sin: %s',
      meta: [
        {
          name: 'description',
          content: 'Just a Blog'
        },
        { charset: 'utf-8' }
      ]
    }
  }
};
