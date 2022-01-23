import React, {useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom"
import { SubmitButton } from './styles'
import './styles.css'
import { Link } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';
import {ToastSuccess, ToastError} from '../../modules/ToastInfo';

function AddEditUser() {
  const users = JSON.parse(localStorage.getItem('users'));
  const {state} = useLocation();
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: state?.name,
    email: state?.email,
    cpf: state?.cpf,
    phone:  state?.phone,
  })
 
  const [loading, setLoading] = useState(false)

  const updateForm = e => {
    const {name, value} = e.target
      setForm({
      ...form, [name]: value
      })
  }

  const onSubmit = (props) => { 
    let localStorageUsers = [];

    if(users.some(user => user.cpf === props.cpf) && !state){
      ToastError('Esse CPF já possuí cadastro.')
    } else if(state) {
      if(users.some(user => user.cpf === props.cpf) && props.cpf !== state?.cpf) {
        ToastError('Esse CPF já possuí cadastro.')
      } else {
        let changedUser = users.map(user => user.cpf).indexOf(state.cpf);
        users.splice(changedUser, 1);
        localStorageUsers.push(props, ...users);
        localStorage.setItem('users', JSON.stringify(localStorageUsers));
        setLoading(!loading)
        ToastSuccess('Dados editados com sucesso.')
      }
    }
    else {
      localStorageUsers.push(props, ...users);
      localStorage.setItem('users', JSON.stringify(localStorageUsers));
      setLoading(!loading)
      ToastSuccess('Usuário cadastrado com sucesso.')
    }
    navigate('/');
  }

  return <div className="page">
    <div className="cadastro">
       <form
        onSubmit={() => onSubmit(form)}
        autoComplete="off"
      >
        <FormControl fullWidth>
          <TextField required name="name" value={form.name} onChange={updateForm}  id="standard-basic" label="Nome completo (sem abreviações)" variant="standard" />
          <TextField required name="email" value={form.email} onChange={updateForm}   id="standard-basic" label="E-mail" type="email" variant="standard" />
          <TextField required name="cpf" value={form.cpf} onChange={updateForm}  id="standard-basic" label="CPF" variant="standard" />
          <TextField required name="phone" value={form.phone} onChange={updateForm}  id="standard-basic" label="Telefone" variant="standard" />
          <SubmitButton loading="false" type="submit">
            {loading && <CircularProgress size={36} sx={{color: '#FFF'}} />}
            {!loading && 'Cadastrar'}
          </SubmitButton>
        </FormControl>
      </form>
      <Box sx={{ position: 'fixed', bottom: '80px', right: '30px' }}>
        <Fab component={Link} to="/" color="primary" aria-label="add">
          <ArrowBackIcon />     
        </Fab>
      </Box>
    </div>
  </div> 
  ;
}

export default AddEditUser;