const express = require('express');
const os = require('os');
const process = require('process');

const app = express();
const PORT = 3000;

// Rota principal
app.get('/', (req, res) => {
  res.json({
    disciplina: 'Sistemas Operacionais',
    aluno: process.env.ALUNO_NOME || 'Eduardo Felipe de Oliveira',
    hostname: os.hostname(),
    plataforma: os.platform(),
    arquitetura: os.arch()
  });
});

// Rota /info - Desafio obrigatório
app.get('/info', (req, res) => {
  res.json({
    pid: process.pid,
    uptime: Math.floor(process.uptime()),
    cpus: os.cpus().length
  });
});

// Rota de health check para verificar conexão com MySQL
app.get('/health', (req, res) => {
  const mysql = require('mysql2/promise');

  mysql.createConnection({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root123',
    database: process.env.DB_NAME || 'projeto_so'
  })
  .then(connection => {
    return connection.query('SELECT 1 AS status').then(([rows]) => {
      connection.end();
      res.json({
        status: 'ok',
        database: 'conectado',
        resultado: rows
      });
    });
  })
  .catch(err => {
    res.status(500).json({
      status: 'erro',
      database: 'desconectado',
      mensagem: err.message
    });
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Aluno: ${process.env.ALUNO_NOME || 'Eduardo'}`);
  console.log(`Hostname: ${os.hostname()}`);
  console.log(`PID: ${process.pid}`);
});
