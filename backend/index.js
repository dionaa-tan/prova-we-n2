const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

const usuarios = [
  { id: 1, nome: 'Ana Silva', idade: 28 },
  { id: 2, nome: 'Carlos Pereira', idade: 34 },
  { id: 3, nome: 'Julia Martins', idade: 25 }
];

app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
  const user = usuarios.find(u => u.id === parseInt(req.params.id));
  if (user) res.json(user);
  else res.status(404).json({ message: 'Usuário não encontrado' });
});

app.listen(3001, () => {
  console.log('API rodando na porta 3001');
});
