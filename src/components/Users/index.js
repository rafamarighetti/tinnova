import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import './styles.css'
import api from '../../services/api.service'
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const localUsers = localStorage.getItem('users');
  const [idRemoved, setIdRemoved] = useState(null);

  useEffect(() => {
    api.get('/users').then((response) => { 
      localStorage.setItem('users', localUsers || JSON.stringify(response.data));
      setUsers(JSON.parse(localUsers));
    })
  .catch((err) => {
    console.error('ops! ocorreu um erro : ' + err);
  });
  }, [idRemoved, localUsers]);
  
  const deleteUser = (params) => {
    const filtered = users.filter(user => user.cpf !== params.id);
    localStorage.setItem('users', JSON.stringify(filtered))
    setIdRemoved(params.id)
  } 

  const editUser = (params) => {
    const { row } = params
    navigate('/add-edit',{state: row});
  } 
    
  const columns = [
    { field: 'name', headerName: 'Nome', width: 200 },
    { field: 'cpf', headerName: 'CPF', width: 200 },
    { field: 'phone', headerName: 'Telefone', width: 200 },
    { field: 'email', headerName: 'E-mail', width: 200 },
    {
    field: "edit",
    headerName: "Editar",
    sortable: false,
      renderCell: (params) => {
        return <Button onClick={() => editUser(params)}><Edit sx={{ color: 'gray' }} /></Button>;
      }
    },
    {
    field: "delete",
    headerName: "Excluir",
    sortable: false,
      renderCell: (params) => {
        return <Button onClick={() => deleteUser(params)}><Delete sx={{ color: '#F04124' }} /></Button>;
      }
    },
  ];
  
  return  <div className="tabela-usuarios">
     <DataGrid
        rows={users}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        getRowId={(row) => row.cpf}
      />
      <Box sx={{ position: 'fixed', bottom: '80px', right: '30px' }}>
        <Fab component={Link} to="/add-edit"  color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
  </div>;
}

export default Users;