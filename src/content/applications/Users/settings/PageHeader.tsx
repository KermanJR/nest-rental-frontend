import { Typography } from '@mui/material';

function PageHeader() {
  const user = {
    name: 'Fernanda Alves',
    avatar: '/static/images/avatars/1.jpg'
  };

  return (
    <>
      <Typography variant="h3" component="h3" gutterBottom>
        Configurações da Conta
      </Typography>
      <Typography variant="subtitle2">
        {user.name}, você pode configurar seus dados!
      </Typography>
    </>
  );
}

export default PageHeader;
