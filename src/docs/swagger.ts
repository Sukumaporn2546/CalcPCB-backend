// import swaggerJsdoc, { Options } from 'swagger-jsdoc';
const swaggerJsdoc = require('swagger-jsdoc');
const options ={
    definition: {
        openapi: "3.0.0",
        info: {
            title: "PCB Data api doc",
            version: "0.1",
            description: 
            "This is PCB Data API application made with Express and documented with Swagger",
            contact: {
                name: "1921131",
                email: "muaunwongtum_s@silpakorn.edu"
            }
        },
        servers: [
            {
                url: "http://172.16.16.38:3000",
            },
        ],
    },
    apis: ['./src/docs/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
