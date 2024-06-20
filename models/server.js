const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {
    constructor() {
        this.app =  express();
        this.port = process.env.PORT;

        this.paths = {
            users: '/api/users',
        }

        this.connectDB();

        this.middlewares();

        this.routes();
    }

    // Conneccion con la DB
    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors()); //Buscar en documentacion de npm para ver como se hacen las restrinciones de las rutas que puedan hacer peticiones

        // Lectura y parseo del body
        this.app.use(express.json());

        // Public   
        this.app.use(express.static('public'));

        // para cargar archivos
        // this.app.use(fileUpload({
        //     useTempFiles: true,
        //     tempFileDir: '/tmp/',
        //     createParentPath: true
        // }));
    }

    routes() {
        this.app.use(this.paths.users, require('../routes/users'));
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en el puerto ', this.port);
        });
    }
}


module.exports = Server;