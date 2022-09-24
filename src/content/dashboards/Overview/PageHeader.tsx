import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function PageHeader() {
  const user = {
    name: 'Fernanda Alves',
    avatar: '/static/images/avatars/1.jpg'
  };
  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Painel Geral
        </Typography>
        <Typography variant="subtitle2">
          Gerencie todos os recursos da sua empresa
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
