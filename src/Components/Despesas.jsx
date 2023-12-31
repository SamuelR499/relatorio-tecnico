import PropTypes from 'prop-types';
import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import { requestDelete,requestGet } from '../services/requests';


function preventDefault(event) {
  event.preventDefault();
}

export default function Despesas({ data }) {
  const navigate = useNavigate();

  const deleteItem = (id) => {
    requestDelete(`/relatorios/${id}`);
  };

  return (
    <>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Local</TableCell>
            <TableCell>Município</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={ row.id }>
              <TableCell>{row.data}</TableCell>
              <TableCell>{row.local}</TableCell>
              <TableCell>{row.municipio}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">
                <button>
                <a href={'https://os.ecrsistemas.com.br/gerar-pdf/'+row.id} target="_blank">
                  Imprimir
                </a>
                </button>
                <button
                  onClick={ () => {
                    navigate(`/formulario/${row.id}`);
                  } }
                >
                  Editar
                </button>
                <button type="button" onClick={ () => deleteItem(row.id) }>
                  Remover
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#test" onClick={ preventDefault } sx={ { mt: 3 } }>
        mais dados
      </Link>
    </>
  );
}

Despesas.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    date: PropTypes.string,
    name: PropTypes.string,
    shipTo: PropTypes.string,
    paymentMethod: PropTypes.string,
    amount: PropTypes.number,
  })).isRequired,
};
