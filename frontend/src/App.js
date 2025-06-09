import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { Container, List, ListItem, ListItemText, Typography, CircularProgress, Box } from '@mui/material';

const API_URL = 'http://localhost:3001';

function Usuarios() {
  const [usuarios, setUsuarios] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(`${API_URL}/usuarios`)
      .then(res => res.json())
      .then(data => {
        setUsuarios(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Usuários</Typography>
      <List>
        {usuarios.map(u => (
          <ListItem button component="a" href={`/dados/${u.id}`} target="_blank" key={u.id}>
            <ListItemText primary={u.nome} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

function Dados() {
  const { id } = useParams();
  const [usuario, setUsuario] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(`${API_URL}/usuarios/${id}`)
      .then(res => res.json())
      .then(data => {
        setUsuario(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <CircularProgress />;

  if (!usuario) return <Typography>Usuário não encontrado.</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Detalhes do usuário</Typography>
      <Typography><strong>Nome:</strong> {usuario.nome}</Typography>
      <Typography><strong>Idade:</strong> {usuario.idade}</Typography>
      <Typography><strong>Id:</strong> {usuario.id}</Typography>
    </Container>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/dados/:id" element={<Dados />} />
        <Route path="*" element={<Usuarios />} />
      </Routes>
    </Router>
  );
}
