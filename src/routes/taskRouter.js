const express = require('express');
const router = express.Router();

// Importação de controladores
const { 
    listTasks = (req, res) => res.status(500).json({ error: 'listTasks not implemented' }),
    storeTask = (req, res) => res.status(500).json({ error: 'storeTask not implemented' }),
    updateTask = (req, res) => res.status(500).json({ error: 'updateTask not implemented' }),
    deleteTask = (req, res) => res.status(500).json({ error: 'deleteTask not implemented' }),
} = require('../controller/taskController');

const { 
    loginTask = (req, res) => res.status(500).json({ error: 'loginTask not implemented' }),
} = require('../controller/loginController');

// Rotas da API
/**
 * @swagger
 * /tasks/list:
 *   get:
 *     summary: Retorna todas as tarefas
 *     responses:
 *       200:
 *         description: Lista de tarefas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/tasks/list', listTasks);

/**
 * @swagger
 * /task/register:
 *   post:
 *     summary: Cadastra uma nova tarefa
 *     responses:
 *       201:
 *         description: Tarefa cadastrada com sucesso
 */
router.post('/task/register', storeTask);

/**
 * @swagger
 * /store/logintask:
 *   post:
 *     summary: Realiza login
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 */
router.post('/store/logintask', loginTask);

/**
 * @swagger
 * /task/:id:
 *   put:
 *     summary: Atualiza uma tarefa
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarefa atualizada
 */
router.put('/task/:id', updateTask);

/**
 * @swagger
 * /task/:id:
 *   delete:
 *     summary: Remove uma tarefa
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarefa removida
 */
router.delete('/task/:id', deleteTask);

module.exports = router;
