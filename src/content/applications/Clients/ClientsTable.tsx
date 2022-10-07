import { FC, ChangeEvent, useState } from 'react';
import { api } from 'src/api/api';
import PropTypes from 'prop-types';
import React from 'react';
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

import Label from 'src/components/Label';
import { Cliente, CryptoOrderStatus } from 'src/models/crypto_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { BsEye } from 'react-icons/bs';
import BulkActions from '../Category/BulkActions';
import {FaCloudDownloadAlt} from 'react-icons/fa'
import { ClientsModal } from 'src/components/Modals/ClientsModal/ClientsModal';
import { UserContext } from 'src/context/UserContext';
import { useContext } from 'react';

interface RecentOrdersTableProps {
  className?: string;
  clients: Cliente[];
}

interface Filters {
  status?: CryptoOrderStatus;
}

const getStatusLabel = (cryptoOrderStatus: CryptoOrderStatus): JSX.Element => {
  const map = {
    failed: {
      text: 'Failed',
      color: 'error'
    },
    completed: {
      text: 'Completed',
      color: 'success'
    },
    pending: {
      text: 'Pending',
      color: 'warning'
    }
  };

  const { text, color }: any = map[cryptoOrderStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  cryptoOrders: Cliente[],
  filters: Filters
): Cliente[] => {
  return cryptoOrders.filter((cryptoOrder) => {
    let matches = true;

    /*if (filters.status && cryptoOrder.status !== filters.status) {
      matches = false;
    }*/

    return matches;
  });
};

const applyPagination = (
  cryptoOrders: Cliente[],
  page: number,
  limit: number
): Cliente[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const ClientsTable: FC<RecentOrdersTableProps> = ({ clients }) => {
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });



  const statusOptions = [
    {
      id: 'all',
      name: 'Todos'
    },
    {
      id: 'completed',
      name: 'Opção 2'
    },
    {
      id: 'pending',
      name: 'Opção 3'
    },
    {
      id: 'failed',
      name: 'Opção 4'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllCryptoOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoOrders(
      event.target.checked
        ? clients.map((clients) => clients.id)
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

  const filteredCryptoOrders = applyFilters(clients, filters);
  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );
  const selectedSomeCryptoOrders =
    selectedCryptoOrders.length > 0 &&
    selectedCryptoOrders.length < clients.length;
  const selectedAllCryptoOrders =
    selectedCryptoOrders.length === clients.length;
  const theme = useTheme();

  const [data, setData] = useState<Cliente[]>([]);
  const [idClient, setIdClient] = useState<Cliente[]>([]);
  const [modal, setModal] = React.useState<Boolean>(false)

  async function queryClientsById(idClient: any){
    setModal(!modal)
    setData(null)
    const {data} = await api.put(`/usuarios/${idClient}`);
    if(data){
  
      setData(data);
    }else{
      setData(null);
    }
  }

  const {
    usuario
  } = useContext(UserContext);




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
              
                <FaCloudDownloadAlt style={{
                  textAlign: 'right',
                  position: 'relative',
                  left: '7rem',
                  height: '25px',
                  width: '25px',
                  cursor: 'pointer'
               }}/>
            </Box>
          }
          title="Clientes cadastrados"
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
              <TableCell>Cliente</TableCell>
              <TableCell>CNPJ</TableCell>
              <TableCell>Contato</TableCell>
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
                      {data.documento}
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

                  {usuario?.id_perfil === 1? 
                  
                  <TableCell align="right">
                    <Tooltip title="Editar cliente" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={(e)=>queryClientsById(data.id)}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  :
                  <TableCell align="right">
                    <Tooltip title="Visuzalizar cliente" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={(e)=>queryClientsById(data.id)}
                      >
                        <BsEye style={{width: '20px', height: '20px'}}/>
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                }
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredCryptoOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
      {data  && (
        <ClientsModal 
        openModal={modal}
        setModal={setModal}
        data={data}
        edit={true}
      />
      )}
      
    </Card>
  );
};

ClientsTable.propTypes = {
  clients: PropTypes.array.isRequired
};

ClientsTable.defaultProps = {
  clients: []
};

export default ClientsTable;
