import React from 'react';
import { AppBar,Typography,Toolbar } from '@material-ui/core';

function Header(){
    return <AppBar position="fixed">
    <Toolbar>
        <Typography variant="h6">
            Lista Carros
        </Typography>
    </Toolbar>
</AppBar>
}

export default Header