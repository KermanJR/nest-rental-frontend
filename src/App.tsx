import { useRoutes } from 'react-router-dom';
import router from 'src/router';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import { CheckoutContext } from './context/CheckoutContext';


function App() {
  const content = useRoutes(router);

  return (

    <ThemeProvider>
      <CheckoutContext>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
          {content}
      </LocalizationProvider>
      </CheckoutContext>
    </ThemeProvider>
  );
}
export default App;
