const express = require('express');
const cors = require('cors');

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.userPath = '/api/users';

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  };

  middlewares() {
    // Enable cors
    this.app.use(cors());

    // Read and parse body
    this.app.use(express.json());

    // Public directory
    this.app.use(express.static('public'));
  }

  routes() {
    // User routes
    this.app.use(this.userPath, require('../routes/user.routes'));
  };

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App running on port ${this.port}`);
    });
  };
}

module.exports = Server;