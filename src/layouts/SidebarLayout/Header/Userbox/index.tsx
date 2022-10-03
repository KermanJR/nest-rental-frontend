import { useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { UserContext } from 'src/context/UserContext';
import { checkContext } from 'src/context/CheckoutContext';
import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography
} from '@mui/material';

import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';




const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox() {
  const user = {
    name: 'Fernanda Alves',
    avatar: '/static/images/avatars/1.jpg',
    jobtitle: 'Administrador'
  };

  const {
    emailUser,
    passwordUser,
    levelUser,
    
  } = useContext(UserContext);
  
  const localuser = window.localStorage.getItem('user')
    const nameUser = localuser ? JSON.parse(localuser).name :''

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const navigate = useNavigate();

  

    const {login, setLogin} = React.useContext(checkContext);
    const handleSubmit = (e: any)=>{
        e.preventDefault();
        window.localStorage.clear()
        setLogin(false);
        navigate('/login')
  
    }


  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar variant="rounded" alt={emailUser} src={user.avatar} />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">{emailUser}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {levelUser}
            </UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar variant="rounded" alt={emailUser} src={user.avatar} />
          <UserBoxText>
            <UserBoxLabel variant="body1">{nameUser}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {levelUser}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
        <ListItem
            button
            to="/dashboard/geral"
            component={NavLink}
          >
            <AccountTreeTwoToneIcon fontSize="small" />
            <ListItemText primary="Painel" />
          </ListItem>
          <ListItem
            button
            to="/dashboard/perfil/configuracoes"
            component={NavLink}
          >
            <AccountTreeTwoToneIcon fontSize="small" />
            <ListItemText primary="Configurações da Conta" />
          </ListItem>
        </List>
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button color="primary" fullWidth onClick={handleSubmit}>
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Sair
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserbox;
