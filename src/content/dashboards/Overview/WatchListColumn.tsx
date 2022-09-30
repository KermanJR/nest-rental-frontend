import {
  Card,
  Box,
  Typography,
  Avatar,
  Grid,
  alpha,
  useTheme,
  styled
} from '@mui/material';
import Label from 'src/components/Label';
import Text from 'src/components/Text';
//import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { useEffect } from 'react';
import { api } from 'src/api/api';
import { useState } from 'react';
import {GoPerson} from 'react-icons/go';
import { GiFlatPlatform } from 'react-icons/gi';
import {MdAttachMoney} from 'react-icons/md'
import OrdersTable from 'src/content/applications/Orders/OrdersTable';
import { Pedido } from 'src/models/crypto_order';

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    margin: ${theme.spacing(0, 0, 1, -0.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    height: ${theme.spacing(5.5)};
    width: ${theme.spacing(5.5)};
    background: ${
      theme.palette.mode === 'dark'
        ? theme.colors.alpha.trueWhite[30]
        : alpha(theme.colors.alpha.black[100], 0.07)
    };
  
    img {
      background: ${theme.colors.alpha.trueWhite[100]};
      padding: ${theme.spacing(0.5)};
      display: block;
      border-radius: inherit;
      height: ${theme.spacing(4.5)};
      width: ${theme.spacing(4.5)};
    }
`
);

function WatchListColumn() {
  const theme = useTheme();

  const [usuarios, setUsuarios] = useState('');
  const [total, setTotal] = useState('');
  const [produto, setProduto] = useState(null);
  const [pedidos, setPedidos] = useState<any>(null);
  const [recentOrdersData, setRecentOrdersData] = useState<Pedido[]>([]);

  async function carregar_usuario(){
    const {data} = await api.get("/usuarios/total");
    setUsuarios(data.total);
  }

  async function carregar_pedidos(){
    const {data} = await api.get("/pedidos/total");
    setProduto(data.produto);
    setPedidos(data.pedidos);
  }

  async function carregar(){
    const {data} = await api.get("/pedidos/dashboard");
    setRecentOrdersData(data);
  }


  useEffect(()=>{
    carregar_usuario();
    carregar_pedidos();
    carregar();
  }, []);

  

 
  

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item md={4} xs={12}>
          <Card
            sx={{
              overflow: 'visible'
            }}
          >
            <Box
              sx={{
                p: 3
              }}
            >
              <Box display="flex" alignItems="center">
                <AvatarWrapper>
                  <GoPerson style={{width: '30px', height: '30px', fill: '#223354'}}/>
                </AvatarWrapper>
                <Box>
                  <Typography variant="h4" noWrap>
                  Clientes
                  </Typography>
                  <Typography variant="subtitle1" noWrap>
                    
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  pt: 3
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    pr: 1,
                    mb: 1
                  }}
                >
                  {usuarios}
                </Typography>

              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start'
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    pl: 1
                  }}
                >

                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item md={4} xs={12}>
          <Card
            sx={{
              overflow: 'visible'
            }}
          >
            <Box
              sx={{
                p: 3
              }}
            >
              <Box display="flex" alignItems="center">
                <AvatarWrapper>
                <MdAttachMoney style={{width: '30px', height: '30px', fill: '#223354'}}/>
                </AvatarWrapper>
                <Box>
                  <Typography variant="h4" noWrap>
                  Valor Total
                  </Typography>
                  <Typography variant="subtitle1" noWrap>
                  
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  pt: 3
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    pr: 1,
                    mb: 1
                  }}
                >
                  {pedidos?.valor_total?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start'
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    pl: 1
                  }}
                >
        
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item md={4} xs={12}>
          <Card
            sx={{
              overflow: 'visible'
            }}
          >
            <Box
              sx={{
                p: 3
              }}
            >
              <Box display="flex" alignItems="center">
                <AvatarWrapper>
                <GiFlatPlatform style={{width: '30px', height: '30px', fill: '#223354'}}/>
                </AvatarWrapper>
                <Box>
                  <Typography variant="h4" noWrap>
                  Mais Alugado
                  </Typography>
                  <Typography variant="subtitle1" noWrap>
                
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  pt: 3
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    pr: 1,
                    mb: 1
                  }}
                >
                  {produto?.nome}
                </Typography>

              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start'
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    pl: 1
                  }}
                >
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <div style={{marginTop: '3rem'}}>
       <OrdersTable cryptoOrders={recentOrdersData} panel={true}/>
      </div>
      
    </>
  );
}

export default WatchListColumn;
