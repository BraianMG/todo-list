const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.authPath = "/api/v1/auth";
        this.usersPath = "/api/v1/users";
        this.tasksPath = "/api/v1/tasks";

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();

        // Database connection
        this.connectDB();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // Reading and Parsing Data
        this.app.use( express.json() );

        // Public directory
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use( this.authPath, require('../routes/auth') );
        this.app.use( this.usersPath, require('../routes/users') );
        this.app.use( this.tasksPath, require('../routes/tasks') );
    }

    async connectDB() {
        await dbConnection();
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Server listening through port ${this.port}`)
        })
    }
}

module.exports = Server;