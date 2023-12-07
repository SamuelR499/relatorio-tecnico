import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Select from 'react-select';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import {
  requestPost,
  requestGet,
  requestPut,
  requestDelete,
} from '../../services/requests';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function EditDespesaModal({actionModal,modalEdit,row,itensDespesas}) {
  console.log(row)
  const options = itensDespesas.map(item => ({
    value: item.id,
    label: item.descricao
  }));

  const [formDespesa, setFormDespesa] = useState(row);

  const handleChangeDespesa = (e) => {
    console.log(e);
    const { name, value } = e.target;
    console.log(e);
    setFormDespesa({
      ...formDespesa,
     
      [name]: value,
    });
  };
  
  const handleChangeSelect = (e)=>{
    const {label, value}= e;
    console.log(e);
    
    setFormDespesa({
      ...formDespesa,
      item:label,
      item_id:value
    });
    console.log(formDespesa);
  }

  useEffect(()=>{
    ///setFormDespesa(row);
  },[])

  const salvarDespesa  = async ()=>{
    await requestPut(`despesas/${formDespesa.id}`, formDespesa).then((response) => {
      console.log(response);
      return response;
    });
  } 

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '200px', // Set the desired width
    }),
  };
  
  return (
    <div>     
      <Modal
        open={modalEdit}
        onClose={actionModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid xs={6}>
              <Select 
                name="item" 
                defaultValue={options[options.findIndex(obj=>{
                    return obj.value == row.item_id;
                })]}
                onChange={handleChangeSelect}
                styles={customStyles}
                isClearable={true}
                options={options}
              />
            </Grid>
            <Grid xs={6}>
              <TextField onChange={handleChangeDespesa} value={row.valor_unitario} label="Valor Unitário" sx={ { m: 1, width: '25ch'} }  name="valor_unitario" />
            </Grid>
            <Grid xs={6}>
            <TextField onChange={handleChangeDespesa} value={row.quantidade} label ="Quantidade" sx={ { m: 1, width: '25ch' } }  name="quantidade" />
            </Grid>
            <Grid xs={6}>
              <TextField onChange={handleChangeDespesa}  value={row.valor_total} label ="Valor Total"  sx={ { m: 1, width: '25ch' } }  name="valor_total" />
            </Grid>
            
          </Grid>
          <Button onClick={salvarDespesa} type="button" variant="contained" color="primary">
            Salvar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}