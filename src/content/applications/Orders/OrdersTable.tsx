import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import { api } from 'src/api/api';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';


import { Pedido, CryptoOrderStatus } from 'src/models/crypto_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

import BulkActions from '../Clients/BulkActions';
import { FaCloudDownloadAlt } from 'react-icons/fa'
import { RegisterOrderModal } from 'src/components/Modals/RegisterOrderModal/RegisterOrderModal';
import moment from 'moment';

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: Pedido[];
  panel: boolean;
}

interface Filters {
  status?: CryptoOrderStatus;
}


const applyFilters = (
  cryptoOrders: Pedido[],
  filters: Filters
): Pedido[] => {
  return cryptoOrders.filter((cryptoOrder) => {
    let matches = true;

    /*if (filters.status && cryptoOrder.status !== filters.status) {
      matches = false;
    }*/

    return matches;
  });
};

const applyPagination = (
  cryptoOrders: Pedido[],
  page: number,
  limit: number
): Pedido[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const OrdersTable: FC<RecentOrdersTableProps> = ({ cryptoOrders, panel }) => {
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });



  const handleSelectAllCryptoOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoOrders(
      event.target.checked
        ? cryptoOrders.map((cryptoOrder) => cryptoOrder.id)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedCryptoOrders.includes(cryptoOrderId)) {
      setSelectedCryptoOrders((prevSelected) => [
        ...prevSelected,
        cryptoOrderId
      ]);
    } else {
      setSelectedCryptoOrders((prevSelected) =>
        prevSelected.filter((id) => id !== cryptoOrderId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoOrders = applyFilters(cryptoOrders, filters);
  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );
  const selectedSomeCryptoOrders =
    selectedCryptoOrders.length > 0 &&
    selectedCryptoOrders.length < cryptoOrders.length;
  const selectedAllCryptoOrders =
    selectedCryptoOrders.length === cryptoOrders.length;
  const theme = useTheme();


  const [data, setData] = useState<Pedido[]>([]);
  const [idOrder, setIdOrder] = useState<Pedido[]>([]);
  const [modal, setModal] = useState<Boolean>(false)

  async function queryOrdersById(idOrder: any){
    setModal(!modal)
    setData(null)
    const {data} = await api.get(`/pedidos/${idOrder}`);
    if(data){
      setData(data);
    }else{
      setData(null);
    }
  }



  return (
    <Card >
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                {/*<InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                  </Select>*/}
                  
              </FormControl>
              {!panel && (
                <FaCloudDownloadAlt style={{
                textAlign: 'right',
                position: 'relative',
                left: '7rem',
                height: '25px',
                width: '25px',
                cursor: 'pointer'
               }}/>
              )}
            </Box>
            
            
          }
          title={panel? "Pedidos recentes": "Pedidos cadastrados"}
          
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllCryptoOrders}
                  indeterminate={selectedSomeCryptoOrders}
                  onChange={handleSelectAllCryptoOrders}
                />
              </TableCell>
              <TableCell>Empresa</TableCell>
              <TableCell>Contato</TableCell>
              <TableCell>Início e Devolução</TableCell>
              <TableCell align="right">Valor</TableCell>
              {/*<TableCell align="right">Status</TableCell>*/}
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoOrders.map((data) => {
              const isCryptoOrderSelected = selectedCryptoOrders.includes(
                data.id
              );
              return (
                <TableRow
                  hover
                  key={data.id}
                  selected={isCryptoOrderSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCryptoOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, data.id)
                      }
                      value={isCryptoOrderSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {data.razao_social}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {data.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {moment(data.data_inicio).utc().format('DD/MM/yyyy')}
                    </Typography>
                    <Typography 
                        variant="body1"
                        fontWeight="bold"
                        color="text.secondary"
                        gutterBottom 
                        noWrap
                    >
                      {moment(data.data_entrega).utc().format('DD/MM/yyyy')}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >

                    
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                    R${numeral(data.vr_total).format(
                        `0,0.00`
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Editar pedido" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={(e)=>queryOrdersById(data.id)}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {/*<Tooltip title="Excluir pedido" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                      </Tooltip>*/}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {data  && (
        <RegisterOrderModal 
        openModal={modal}
        setModal={setModal}
        data={data}
        edit={true}
      />
      )}
    </Card>
  );
};

OrdersTable.propTypes = {
  cryptoOrders: PropTypes.array.isRequired
};

OrdersTable.defaultProps = {
  cryptoOrders: []
};

export default OrdersTable;
