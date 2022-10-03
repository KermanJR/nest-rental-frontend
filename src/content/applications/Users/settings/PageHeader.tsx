import { Typography } from '@mui/material';

function PageHeader() {
  const user = window.localStorage.getItem('user');
  let name = ''
  let avatar = ''
  if(user) {
    name = JSON.parse(user).name 
    name = name? name : ''
  }
  return (
    <>
      <Typography variant="h3" component="h3" gutterBottom>
        Configurações da Conta
      </Typography>
      <Typography variant="subtitle2">
        {name}, você pode configurar seus dados!
      </Typography>
    </>
  );
}

export default PageHeader;
