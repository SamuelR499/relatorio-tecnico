import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { creatRelatorio, getRelatorios } from '../services/requests';

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

  const [itensDespesas, setItensDespesas] = useState([]);
  const [tableData, setTableData] = useState([
    { coluna1: false, coluna2: '', coluna3: '', coluna4: '' },
  ]);

  useEffect(() => {
    (async () => {
      const response = await getRelatorios('/itens_despesas');
      const { data } = response;
      console.log(data);
      setItensDespesas(data);
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    creatRelatorio(formData);
  };

  const handleTableChange = (e, rowIndex, columnName) => {
    const newTableData = [...tableData];
    newTableData[rowIndex][columnName] = e.target.value;
    console.log(e.target.value);
    setTableData(newTableData);
  };

  const addRow = (row) => {
    console.log('Salvou no banco a linha', row);
    if (!row.coluna1) {
      alert('selecione uma opção, coluna1 é obrigatório');
    } else {
      setTableData(
        [...tableData, { coluna1: '', coluna2: '', coluna3: '', coluna4: '' }],
      );
    }
  };

  return (
    <Box sx={ { display: 'flex', flexWrap: 'wrap' } }>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Formulário de Coleta de Dados
        </Typography>
        <form onSubmit={ handleSubmit }>
          <TextField
            sx={ { m: 1, width: '25ch' } }
            name="autor"
            label="Autor"
            variant="outlined"
            fullWidth
            margin="normal"
            value={ formData.autor }
            onChange={ handleChange }
          />
          <TextField
            sx={ { m: 1, width: '25ch' } }
            name="data"
            label="Data"
            variant="outlined"
            fullWidth
            margin="normal"
            value={ formData.data }
            onChange={ handleChange }
          />
          <TextField
            sx={ { m: 1, width: '25ch' } }
            name="horario_saida"
            label="Horário de Saída"
            variant="outlined"
            fullWidth
            margin="normal"
            value={ formData.horario_saida }
            onChange={ handleChange }
          />
          <TextField
            sx={ { m: 1, width: '35ch' } }
            name="local"
            label="Local"
            variant="outlined"
            fullWidth
            margin="normal"
            value={ formData.local }
            onChange={ handleChange }
          />
          {console.log(itensDespesas)}
          <TextField
            sx={ { m: 1, width: '42ch' } }
            name="municipio"
            label="Município"
            variant="outlined"
            fullWidth
            margin="normal"
            value={ formData.municipio }
            onChange={ handleChange }
          />
          <TextField
            sx={ { m: 1, width: '25ch' } }
            name="distancia"
            label="Distância"
            variant="outlined"
            fullWidth
            margin="normal"
            value={ formData.distancia }
            onChange={ handleChange }
          />
          <TextField
            sx={ { m: 1, width: '25ch' } }
            name="meio_locomocao"
            label="Meio de Locomoção"
            variant="outlined"
            fullWidth
            margin="normal"
            value={ formData.meio_locomocao }
            onChange={ handleChange }
          />
          <TextField
            sx={ { m: 1, width: '25ch' } }
            name="placa"
            label="Placa"
            variant="outlined"
            fullWidth
            margin="normal"
            value={ formData.placa }
            onChange={ handleChange }
          />
          <TextField
            sx={ { m: 1, width: '35ch' } }
            name="consultor"
            label="Consultor"
            variant="outlined"
            fullWidth
            margin="normal"
            value={ formData.consultor }
            onChange={ handleChange }
          />
          <TextField
            sx={ { m: 1, width: '42ch' } }
            name="responsavel"
            label="Responsável"
            variant="outlined"
            fullWidth
            margin="normal"
            value={ formData.responsavel }
            onChange={ handleChange }
          />
          <TextField
            sx={ { m: 1 } }
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
        <div>
          <table>
            <thead>
              <tr>
                <th>Coluna 1</th>
                <th>Coluna 2</th>
                <th>Coluna 3</th>
                <th>Coluna 4</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={ rowIndex }>
                  <td>
                    <select
                      onChange={ (e) => handleTableChange(e, rowIndex, 'coluna1') }
                    >
                      <option value={ false }>Selecione</option>
                      {itensDespesas.map(({ id, descricao }) => (
                        <option key={ id + descricao } value={ id }>{descricao}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={ row.coluna2 }
                      onChange={ (e) => handleTableChange(e, rowIndex, 'coluna2') }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={ row.coluna3 }
                      onChange={ (e) => handleTableChange(e, rowIndex, 'coluna3') }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={ row.coluna4 }
                      onChange={ (e) => handleTableChange(e, rowIndex, 'coluna4') }
                    />
                  </td>
                  <td>
                    <button onClick={ () => addRow(row) }>Salvar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </Box>
  );
}
export default Formulario;
