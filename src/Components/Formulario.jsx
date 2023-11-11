import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { requestPost, requestGet, requestPut, requestDelete } from '../services/requests';

function Formulario() {
  const [formData, setFormData] = useState({
    dias: 1,
    mes: 1,
    ano: 2022,
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
  const [formDespesa, setFormDespesa] = useState([]);
  const [tableData, setTableData] = useState([]);
  const idParams = useParams().id || null;

  useEffect(() => {
    (async () => {
      const response = await requestGet(`/relatorios/${idParams}`);
      const { data } = response;
      if (idParams) {
        const despesasRelatorio = await requestGet(`/despesas/list/${idParams}`);
        setTableData(despesasRelatorio.data);
      }
      const despesas = await requestGet('/itens_despesas');

      setItensDespesas(despesas.data);

      setFormData(data.relatorio);
    })();
  }, [tableData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeDespesa = (e) => {
    const { name, value } = e.target;
    setFormDespesa({
      ...formDespesa,
      relatorio_id: idParams,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (idParams) {
      requestPut(`/relatorios/${idParams}`, formData).then((response) => {
        return response;
      });
    } else {
      requestPost('/relatorios', formData).then((response) => {
        return response;
      });
    }
  };

  const addRow = async () => {
    await requestPost('/despesas', formDespesa).then((response) => {
      console.log('Stado local ->', tableData);
      console.log('Response ->', response.data);
      setTableData(() => [...tableData, response.data]);
    });
  };

  const updateRow = async (row) => {
    const { id } = row;
    await requestPut(`despesas/${id}`, formDespesa).then((response) => {
      return response;
    });
  };

  const deleteRow = (row) => {
    const { id } = row;
    requestDelete(`despesas/${id}`);
  };

  return (
    <Box sx={ { display: 'flex', flexWrap: 'wrap' } }>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Formulário de Coleta de Dados
          {String(idParams)}
        </Typography>
        <form onSubmit={ handleSubmit }>
          <TextField
            sx={ { m: 1, width: '25ch' } }
            name="dias"
            label="Dias"
            placeholder="Por exemplo: 1-5, 8, 11-13"
            variant="outlined"
            fullWidth
            margin="normal"
            value={ formData.dias }
            onChange={ handleChange }
          />
          <TextField
            sx={ { m: 1, width: '25ch' } }
            name="mes"
            label="Mês"
            variant="outlined"
            fullWidth
            margin="normal"
            value={ formData.mes }
            onChange={ handleChange }
          />
          <TextField
            sx={ { m: 1, width: '25ch' } }
            name="ano"
            label="ano"
            variant="outlined"
            fullWidth
            margin="normal"
            value={ formData.ano }
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
          <select name="item" onChange={ handleChangeDespesa }>
            <option value={ false }>Selecione</option>
            {itensDespesas.map(({ id, descricao }) => (
              <option key={ id + descricao } value={ id }>{descricao}</option>
            ))}
          </select>
          <input onChange={ handleChangeDespesa } name="valor_unitario" />
          <input onChange={ handleChangeDespesa } name="quantidade" />
          <input onChange={ handleChangeDespesa } name="valor_total" />
          <button type="button" onClick={ addRow }>Salvar</button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Valor</th>
                <th>Quantidade</th>
                <th>Total</th>
                <th>Editar</th>
                <th>Remover</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={ rowIndex }>
                  <td>
                    {row.item}
                  </td>
                  <td>
                    {row.valor_unitario}
                  </td>
                  <td>
                    {row.quantidade}
                  </td>
                  <td>
                    {row.valor_total}
                  </td>
                  <td>
                    <button onClick={ () => updateRow(row) }>Editar</button>
                  </td>
                  <td>
                    <button onClick={ () => deleteRow(row) }>Remover</button>
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
