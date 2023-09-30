import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { creatRelatorio } from '../services/requests';

function Formulario() {
  const [formData, setFormData] = useState({
    data: '',
    autor: '',
    horario_saida: '',
    local: '',
    distancia: '',
    municipio: '',
    consultor: '',
    meio_locomocao: '',
    placa: '',
    responsavel: '',
    atividades: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode enviar os dados para o servidor ou realizar outras ações com os dados do formulário
    console.log(formData);
    creatRelatorio(formData);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Formulário de Coleta de Dados
      </Typography>
      <form onSubmit={ handleSubmit }>
        <TextField
          name="data"
          label="Data"
          variant="outlined"
          fullWidth
          margin="normal"
          value={ formData.data }
          onChange={ handleChange }
        />
        <TextField
          name="autor"
          label="Autor"
          variant="outlined"
          fullWidth
          margin="normal"
          value={ formData.autor }
          onChange={ handleChange }
        />
        <TextField
          name="horario_saida"
          label="Horário de Saída"
          variant="outlined"
          fullWidth
          margin="normal"
          value={ formData.horario_saida }
          onChange={ handleChange }
        />
        <TextField
          name="local"
          label="Local"
          variant="outlined"
          fullWidth
          margin="normal"
          value={ formData.local }
          onChange={ handleChange }
        />
        <TextField
          name="distancia"
          label="Distância"
          variant="outlined"
          fullWidth
          margin="normal"
          value={ formData.distancia }
          onChange={ handleChange }
        />
        <TextField
          name="municipio"
          label="Município"
          variant="outlined"
          fullWidth
          margin="normal"
          value={ formData.municipio }
          onChange={ handleChange }
        />
        <TextField
          name="consultor"
          label="Consultor"
          variant="outlined"
          fullWidth
          margin="normal"
          value={ formData.consultor }
          onChange={ handleChange }
        />
        <TextField
          name="meio_locomocao"
          label="Meio de Locomoção"
          variant="outlined"
          fullWidth
          margin="normal"
          value={ formData.meio_locomocao }
          onChange={ handleChange }
        />
        <TextField
          name="placa"
          label="Placa"
          variant="outlined"
          fullWidth
          margin="normal"
          value={ formData.placa }
          onChange={ handleChange }
        />
        <TextField
          name="responsavel"
          label="Responsável"
          variant="outlined"
          fullWidth
          margin="normal"
          value={ formData.responsavel }
          onChange={ handleChange }
        />
        <TextField
          name="atividades"
          label="Atividades"
          variant="outlined"
          fullWidth
          multiline
          rows={ 4 }
          margin="normal"
          value={ formData.atividades }
          onChange={ handleChange }
        />
        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </form>
    </Container>
  );
}

export default Formulario;
