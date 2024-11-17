const app = require('./app');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// Configuração do Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Tarefas',
            version: '1.0.0',
            description: 'Documentação da API de Tarefas',
        },
        servers: [
            {
                url: 'http://localhost:3008', // URL do servidor da sua API
            },
        ],
    },
    apis: ['./routes/*.js'], // Caminho para os arquivos com as anotações do Swagger
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Rota da interface do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Outras configurações da aplicação
app.use(express.json());

// Rotas
const taskRouter = require('./routes/taskRouter'); // Corrigido o nome para taskRouter.js
app.use('/tasks', taskRouter);

// Porta do Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Documentação do Swagger em http://localhost:${PORT}/api-docs`);
});
