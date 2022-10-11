import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  ListItem,
  ListItemText,
  Switch,
  List,
  Button
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import Text from 'src/components/Text';
import { UserContext } from 'src/context/UserContext';
import { useContext, useState } from 'react'
import Label from 'src/components/Label';
import { ChangePasswordModal } from 'src/components/Modals/UserProfileModal/ChangePasswordModal.tsx/ChangePasswordModal';
import { ChangeEmailModal } from 'src/components/Modals/UserProfileModal/ChangeEmailModal/ChangeEmailModal';
import { AddressPayModal } from 'src/components/Modals/UserProfileModal/AddressPayModal/AddressPayModal';



function EditProfileTab() {
  
const {
  usuario
} = useContext(UserContext);

const [modalPassword, setModalPassword] = useState<Boolean>(false);
const [modalEmail, setModalEmail] = useState<Boolean>(false);
const [modalAddress, setModalAddress] = useState<Boolean>(false);


  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Detalhes Pessoais
              </Typography>
              <Typography variant="subtitle2">
                Gerencia as informações pessoais da sua conta
              </Typography>
            </Box>
           {/* <Button variant="text" startIcon={<EditTwoToneIcon />}>
              Editar
            </Button>*/}
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Razão Social:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>{usuario?.razao_social}</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    CNPJ
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>{usuario?.documento}</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Inscrição Estadual:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                  <Text color="black">
                  <b>{usuario?.inscricao_estadual}</b>
                  </Text>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Nome Fantasia:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                  <Text color="black">
                  <b>{usuario?.nome_fantasia}</b>
                  </Text>
                  </Box>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>

        <Grid item xs={12}>
        <Card style={{marginTop: '3rem'}}>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Endereço de Faturamento
              </Typography>
              <Typography variant="subtitle2">
                Gerencia os detalhes relacionados a seu endereço de faturamento
              </Typography>
            </Box>
            <Button 
              variant="text" 
              startIcon={<EditTwoToneIcon />}
              onClick={(e)=>setModalAddress(!modalAddress)}
            >
              Editar
          </Button>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid style={{display: 'flex'}} spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    CEP:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>79097470</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Rua/AV:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>Verdes Mares</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Número:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>312</b>
                  </Text>
                </Grid>
              </Grid>

              <Grid style={{display: 'flex'}} spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Bairro:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>Corcovado</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Cidade:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>Campo Grande</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    UF:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>MS</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Complemento:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b></b>
                  </Text>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
        
        <Card style={{marginTop: '3rem'}}>
        <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Configurações de senha
              </Typography>
              <Typography variant="subtitle2">
               Gerencia os detalhes relacionados à sua senha
              </Typography>
            </Box>
            <Button 
              variant="text" 
              startIcon={<EditTwoToneIcon />}
              onClick={(e)=>setModalPassword(!modalPassword)}
            >
              Editar
            </Button>
          </Box>
          <Divider />
          <List>
            <ListItem sx={{ p: 3 }}>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: false }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary="Alterar senha"
                secondary="Altere sua senha aqui"
              />
              {/*<Button size="large" >
                Alterar Senha
              </Button>*/}
            </ListItem>
          </List>
        </Card>
      </Grid>
      

      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Endereço de E-mail
              </Typography>
              <Typography variant="subtitle2">
                Gerencia os detalhes relacionados a seu endereço de E-mail
              </Typography>
            </Box>
            <Button 
              variant="text" 
              startIcon={<EditTwoToneIcon />}
              onClick={(e)=>setModalEmail(!modalEmail)}
            >
              Editar
            </Button>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Email principal:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>{usuario?.email}</b>
                  </Text>
                  <Box pl={1} component="span">
                    <Label color="success">Principal</Label>
                  </Box>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      {modalPassword && (
        <ChangePasswordModal data="" edit={true} openModal={modalPassword} setModal={setModalPassword} />
      )}
      {modalEmail && (
        <ChangeEmailModal data="" edit={true} openModal={modalEmail} setModal={setModalEmail} />
      )}
      {modalAddress && (
        <AddressPayModal data="" edit={true} openModal={modalAddress} setModal={setModalAddress} />
      )}
      
      
    </Grid>
  );
}

export default EditProfileTab;
