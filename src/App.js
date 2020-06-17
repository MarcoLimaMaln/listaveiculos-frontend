import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import api from './api';

function App() {
    
    const [ lista, setLista ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        api.get('/carro').then((response) => {
            const itens = response.data;
            setLista(itens);
            setLoading(false);
        })
    }, [])

    return(
        <>
            { loading ? <span>Carregando Dados...</span> : <div/> }
            <table>
                {lista.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.modelo}</td>
                        <td>{item.fabricante}</td>
                        <td>{item.ano}</td>
                    </tr>
                ))}
            </table>
            <Link to="create">Adicionar</Link> 
        </>
  
  );

}

export default App;
