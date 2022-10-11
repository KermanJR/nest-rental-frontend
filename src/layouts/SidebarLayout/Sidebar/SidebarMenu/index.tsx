import { useContext } from 'react';

import {
  ListSubheader,
  alpha,
  Box,
  List,
  styled,
  Button,
  ListItem
} from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import { SidebarContext } from 'src/context/SidebarContext';
import { UserContext } from 'src/context/UserContext';
import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import BrightnessLowTwoToneIcon from '@mui/icons-material/BrightnessLowTwoTone';
import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { HiOutlineDocumentAdd } from 'react-icons/hi';
import { HiOutlineDocumentRemove } from 'react-icons/hi';
import { FiUserPlus } from 'react-icons/fi';


import { useNavigate } from 'react-router-dom';

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.alpha.white};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: "rgb(18, 80, 130)"
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
                  'transform',
                  'opacity'
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext);
  // const { idPerfil } = useContext(UserContext)
  const {
    usuario
  } = useContext(UserContext);

  
  if(!usuario?.id_perfil) {
    const navigate = useNavigate();
    navigate('/login');
  }
  return (
    <>
      <MenuWrapper>
        {usuario?.id_perfil === 1 && (
          <List component="div">
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/dashboard/geral"
                  startIcon={<DesignServicesTwoToneIcon />}
                >
                  Painel
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        )}
        
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Vendas
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/dashboard/pedidos"
                  startIcon={<HiOutlineDocumentAdd />}
                >
                  Pedidos
                </Button>
              </ListItem>
              
                <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/dashboard/devolucao"
                  startIcon={<HiOutlineDocumentRemove />}
                >
                  Devoluções
                </Button>
              </ListItem>
              
              
              {[1, 3].includes(usuario?.id_perfil) && 
              
                <ListItem component="div">
                  <Button
                    disableRipple
                    component={RouterLink}
                    onClick={closeSidebar}
                    to="/dashboard/clientes"
                    startIcon={<FiUserPlus />}
                  >
                    Clientes
                  </Button>
                </ListItem>
              }

              {[1, 3].includes(usuario?.id_perfil) && 
                <ListItem component="div">
                  <Button
                    disableRipple
                    component={RouterLink}
                    onClick={closeSidebar}
                    to="/dashboard/orcamentos"
                    startIcon={<HiOutlineDocumentText/>}
                  >
                    Orçamentos
                  </Button>
                </ListItem>
              }
              {[1, 3].includes(usuario?.id_perfil) && 
                <ListItem component="div">
                  <Button
                    disableRipple
                    component={RouterLink}
                    onClick={closeSidebar}
                    to="/dashboard/frete"
                    startIcon={<MdOutlineLocalShipping  />}
                  >
                    Frete
                  </Button>
                </ListItem>
              }
            </List>
          </SubMenuWrapper>
        </List>
        {usuario?.id_perfil === 1 && <>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Produtos
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/dashboard/cadastrar-produto"
                  startIcon={<TableChartTwoToneIcon />}
                >
                  Produtos
                </Button>
               
              </ListItem>
            </List>
          </SubMenuWrapper>
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/dashboard/cadastrar-categoria"
                  startIcon={<TableChartTwoToneIcon />}
                >
                  Categorias
                </Button>
               
              </ListItem>
            </List>
          </SubMenuWrapper>
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/dashboard/cadastrar-marca"
                  startIcon={<TableChartTwoToneIcon />}
                >
                  Marcas
                </Button>
               
              </ListItem>
            </List>
          </SubMenuWrapper>
          
        </List>

        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Marketing
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/dashboard/#"
                  startIcon={<TableChartTwoToneIcon />}
                >
                  Banners
                </Button>
               
              </ListItem>
            </List>
          </SubMenuWrapper>
          
        </List>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Aparência
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/dashboard/#"
                  startIcon={<TableChartTwoToneIcon />}
                >
                  Contatos
                </Button>
               
              </ListItem>
            </List>
          </SubMenuWrapper>
          
        </List>
        </> 
      }
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
