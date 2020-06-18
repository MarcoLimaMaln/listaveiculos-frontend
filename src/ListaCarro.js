
import React, { useEffect, useState } from 'react';
import Header from './Header';
import api from './api';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import Switch from '@material-ui/core/Switch';
import {Dialog,DialogActions,TextField,DialogContentText,DialogContent,DialogTitle, MenuItem} from '@material-ui/core';
function ListaCarro(){

    const [ carroSistema , setCarroSistema ] = useState([]);
    const [ open , setOpen ] = useState(false);
    const [ openUpdate , setOpenUpdate ] = useState(false);

  
    const [ modelo , setModelo ] = useState('');
    const [ fabricante , setFabricante ] = useState('');
    const [ ano , setAno ] = useState();
    const [ id , setId] = useState();

    function loadData()
    {
        api.get('/').then(response =>  {

            const carroSistema = response.data;
            setCarroSistema(carroSistema);

        });
        
    }

    useEffect(loadData, []);

    function openDialog()
    {
        setOpen(true);
    }

    function closeDialog()
    {
        setOpen(false);
    }

     function openDialogUpdate(modelo,fabricante,ano,id)
    {
        setModelo(modelo);
        setFabricante(fabricante);
        setAno(ano);
        setId(id);

        setOpenUpdate(true);
    }

    function closeDialogUpdate()
    {
        setOpenUpdate(false);
    }

     async function salvar() { 


          await api.post('/', {modelo,fabricante,ano}); 
        loadData();
        closeDialog();

        setModelo('');
        setFabricante('');
        setAno();
    }

    async function salvarUpdate() { 


        await api.put(`/`, {id,modelo,fabricante,ano});
          
        loadData();
        closeDialogUpdate();

       
        setModelo('');
        setFabricante('');
        setAno();
        setId();
    }


     async function apagar(id) { 
        await api.delete(`/${id}`);
        loadData();
    }

    // async function atualizar(id, Ativo) { 

    //     await api.put(`/caixa/id/${id}`, {ativo: Ativo });

    //     loadData();
    // }
  

    return <div style={{marginTop: '70px'}}>
        <Header/>
        <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="center">Modelo</TableCell>
            <TableCell align="center">Fabricante</TableCell>
            <TableCell align="center">Ano</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            
          {carroSistema.map(item => (
            <TableRow key={item.id}>
                
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell align="center">{item.modelo}</TableCell>
              <TableCell align="center">{item.fabricante}</TableCell>
              <TableCell align="center">{item.ano}</TableCell>
              <TableCell align="center" style={{width: '15px'}}>  <Button variant="outlined" color="primary" onClick={() => openDialogUpdate(item.modelo,item.fabricante,item.ano,item.id)}>  <CreateIcon /> &nbsp;Editar </Button> </TableCell>
              <TableCell align="center" style={{width: '15px'}}>  <Button variant="outlined" color="secondary" onClick={() => apagar(item.id)}> <DeleteIcon /> &nbsp;Apagar </Button> </TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>

    <Button  style={{marginTop: '20px'}}
        onClick={openDialog}
        variant="contained" 
        color="primary">
            Adicionar
    </Button>

    <Dialog open ={open}>
         <DialogTitle>Novo Veiculo</DialogTitle>
            <DialogContent>
                <DialogContentText>Preencha os dados para uma nova entrada de Veiculo.</DialogContentText>
                
                <TextField
                    margin="dense"
                    id="modelo"
                    label="Modelo"
                    type="text"
                    fullWidth
                    onChange={e => setModelo(e.target.value)}
                />

                <TextField
                    margin="dense"
                    id="fabricante"
                    label="Fabricante"
                    type="text"
                    fullWidth
                    onChange={e => setFabricante(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="ano"
                    label="Ano"
                    type="number"
                    fullWidth
                    onChange={e => setAno(e.target.value)}
                />        
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>Cancelar</Button>
                <Button onClick={salvar}>Salvar</Button>
            </DialogActions>
    </Dialog>

    <Dialog open ={openUpdate}>
         <DialogTitle>Atualizar Veiculo</DialogTitle>
            <DialogContent>
                <DialogContentText>Preencha os dados para atualizar um Veiculo.</DialogContentText>
                     
                <TextField
                    margin="dense"
                    id="modelo"
                    label="Modelo"
                    value={modelo}
                    type="text"
                    fullWidth
                    onChange={e => setModelo(e.target.value)}
                />

                <TextField
                    margin="dense"
                    id="fabricante"
                    label="Fabricante"
                    value={fabricante}
                    type="text"
                    fullWidth
                    onChange={e => setFabricante(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="ano"
                    label="Ano"
                    value={ano}
                    type="number"
                    fullWidth
                    onChange={e => setAno(e.target.value)}
                />     
                
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialogUpdate}>Cancelar</Button>
                <Button onClick={salvarUpdate}>Salvar</Button>
            </DialogActions>
    </Dialog>
    
        </div>
    
}


export default ListaCarro