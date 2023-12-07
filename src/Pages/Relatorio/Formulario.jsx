import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import EditDespesaModal from './EditDespesaModal';
import Select from 'react-select';
import Grid from '@mui/material/Unstable_Grid2';

import {
  requestPost,
  requestGet,
  requestPut,
  requestDelete,
} from '../../services/requests';
import { width } from '@mui/system';

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
  const [rowEdit,setRowEdit]=useState({});
  let [modalEdit, setModalDelete] = useState(false);
  
  const options = itensDespesas.map(item => ({
    value: item.id,
    label: item.descricao
  }));

 

  useEffect(() => {
    (async () => {
      if (idParams) {
        const despesasRelatorio = await requestGet(`/despesas/list/${idParams}`);
        const response = await requestGet(`/relatorios/${idParams}`);
        const { data } = response;
        setFormData(data.relatorio);
        setTableData(despesasRelatorio.data);
      }

      const despesas = await requestGet('/itens_despesas');
      
      setItensDespesas(despesas.data);
    })();
  }, []);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      height:'55px'
    }),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleChangeSelect = (e)=>{
    const {label, value}= e;
    console.log(e);
    
    setFormDespesa({
      ...formDespesa,
      relatorio_id: idParams,
      item:label,
      item_id:value
    });
    console.log(formDespesa);
  }
  const handleChangeDespesa = (e) => {
    console.log(e);
    const { name, value } = e.target;
    console.log(e);
    setFormDespesa({
      ...formDespesa,
      relatorio_id: idParams,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.atividades = formData.atividades.replaceAll('\n','<br>');
    setFormData(formData);
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
    setRowEdit(row);
    actionModal();
    const { id } = row;
  };

  const actionModal = id => {

    setModalDelete(!modalEdit);
  };


  const deleteRow = (row) => {
    const { id } = row;
    
    requestDelete(`despesas/${id}`);
  };

  return (
    <>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Formulário de Coleta de Dados
        </Typography>
        <form onSubmit={ handleSubmit }>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid xs={3}>
              <TextField
                name="dias"
                label="Dias"
                placeholder="Por exemplo: 1-5, 8, 11-13"
                variant="outlined"
                fullWidth
                margin="normal"
                value={ formData.dias }
                onChange={ handleChange }
              />
            </Grid>
            <Grid xs={3}>
              <TextField
                name="mes"
                label="Mês"
                variant="outlined"
                fullWidth
                margin="normal"
                value={ formData.mes }
                onChange={ handleChange }
              />
            </Grid>
            <Grid xs={2}>
              <TextField
                
                name="ano"
                label="ano"
                variant="outlined"
                fullWidth
                margin="normal"
                value={ formData.ano }
                onChange={ handleChange }
              />
            </Grid>
            <Grid xs={2}>
              <TextField
                
                name="horario_saida"
                label="Horário de Saída"
                variant="outlined"
                fullWidth
                margin="normal"
                value={ formData.horario_saida }
                onChange={ handleChange }
              />
            </Grid>
            <Grid xs={2}>
              <TextField
                
                name="horario_saida"
                label="Horário de Saída"
                variant="outlined"
                fullWidth
                margin="normal"
                value={ formData.horario_saida }
                onChange={ handleChange }
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                
                name="local"
                label="Local"
                variant="outlined"
                fullWidth
                margin="normal"
                value={ formData.local }
                onChange={ handleChange }
              />
            </Grid> 
            <Grid xs={6}>
              <TextField                  
                name="municipio"
                label="Município"
                variant="outlined"
                fullWidth
                margin="normal"
                value={ formData.municipio }
                onChange={ handleChange }
              />
            </Grid>
            <Grid xs={4}>
              <TextField                  
                name="distancia"
                label="Distância"
                variant="outlined"
                fullWidth
                margin="normal"
                value={ formData.distancia }
                onChange={ handleChange }
              />
            </Grid>
            <Grid xs={4}>
              <TextField
                
                name="meio_locomocao"
                label="Meio de Locomoção"
                variant="outlined"
                fullWidth
                margin="normal"
                value={ formData.meio_locomocao }
                onChange={ handleChange }
              />
            </Grid>
            <Grid xs={4}>
              <TextField                
                name="placa"
                label="Placa"
                variant="outlined"
                fullWidth
                margin="normal"
                value={ formData.placa }
                onChange={ handleChange }
              />
            </Grid>
            <Grid xs={6}>
              <TextField                
                name="consultor"
                label="Consultor"
                variant="outlined"
                fullWidth
                margin="normal"
                value={ formData.consultor }
                onChange={ handleChange }
              />
            </Grid>
            <Grid xs={6}>
              <TextField              
                name="responsavel"
                label="Responsável"
                variant="outlined"
                fullWidth
                margin="normal"
                value={ formData.responsavel }
                onChange={ handleChange }
              />
            </Grid>
            <Grid xs={12}>
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
            </Grid>
            <Grid>
              <Button type="submit" variant="contained" color="primary">
                Enviar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
       
      <Container> 
        <br/><br/>
        <hr/>
        <Typography variant="h4" align="center" gutterBottom>
          Apropriação de Custos
        </Typography>
        <hr/>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid xs={4}>
              <Select 
                name="item" 
                styles={customStyles}
                onChange={ handleChangeSelect }
                isClearable={true}
                autoSize={true}
                options={options}
              />
            </Grid>
            <Grid xs={2}>
              <TextField label="Valor Unitário"  onChange={ handleChangeDespesa } name="valor_unitario" />
            </Grid>
            <Grid xs={2}>
              <TextField label ="Quantidade"  onChange={ handleChangeDespesa } name="quantidade" />
            </Grid>
            <Grid xs={2}>
              <TextField label ="Valor Total" onChange={ handleChangeDespesa } name="valor_total" />
            </Grid>
            <Grid xs={2}>
              <Button color="primary" variant='contained' type="button" onClick={ addRow }>Salvar</Button>
            </Grid>
          </Grid>
        <div>
          <table style={{width:'100%'}}>
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

        <EditDespesaModal
          actionModal={actionModal}
          modalEdit={modalEdit}
          row = {rowEdit}
          itensDespesas = {itensDespesas}
        />
      </Container>
    </>
  );
}
export default Formulario;
