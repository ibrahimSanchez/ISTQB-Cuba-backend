const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            certifications: '/api/certifications',
            users: '/api/users',
            reservations: '/api/reservations',
            roles: '/api/roles',
            categories: '/api/categories',
            jobApplications: '/api/jobApplications',
            notifications: '/api/notifications',

            provinces: '/api/provinces',
            municipalities: '/api/municipalities',
            user_certificatios: '/api/user_certifications',
            search: '/api/search',


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
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.certifications, require('../routes/certifications'));
        this.app.use(this.paths.users, require('../routes/users'));
        this.app.use(this.paths.reservations, require('../routes/reservations'));
        this.app.use(this.paths.roles, require('../routes/roles'));
        this.app.use(this.paths.jobApplications, require('../routes/jobApplications'));
        this.app.use(this.paths.notifications, require('../routes/notifications'));
        this.app.use(this.paths.categories, require('../routes/categories'));

        this.app.use(this.paths.provinces, require('../routes/provinces'));
        this.app.use(this.paths.municipalities, require('../routes/municipalities'));
        this.app.use(this.paths.user_certificatios, require('../routes/user_certifications'));
        this.app.use(this.paths.search, require('../routes/search'));
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en el puerto ', this.port);
        });
    }
}


module.exports = Server;