import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import { api } from 'src/api/api';
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
import { ProductOrderStatus } from 'src/models/product_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { FaCloudDownloadAlt } from 'react-icons/fa'
import { Produto } from 'src/models/crypto_order';
import { ListProductsModal } from 'src/components/Modals/ListProductsModal/ListProductsModal';


interface RecentOrdersTableProps {
  className?: string;
  productOrders: Produto[];
}

interface Filters {
  status?: ProductOrderStatus;
}

const getStatusLabel = (cryptoOrderStatus: ProductOrderStatus): JSX.Element => {
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
  productOrders: Produto[],
  filters: Filters
): Produto[] => {
  return productOrders.filter((productOrder) => {
    let matches = true;

    /*
    if (filters.status && productOrder.status !== filters.status) {
      matches = false;
    }*/

    return matches;
  });
};

const applyPagination = (
  productOrders: Produto[],
  page: number,
  limit: number
): Produto[] => {
  return productOrders.slice(page * limit, page * limit + limit);
};

const ProductsTable: FC<RecentOrdersTableProps> = ({ productOrders }) => {
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
      name: 'Op????o 2'
    },
    {
      id: 'pending',
      name: 'Op????o 3'
    },
    {
      id: 'failed',
      name: 'Op????o 4'
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
        ? productOrders.map((cryptoOrder) => cryptoOrder.id)
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

  const filteredCryptoOrders = applyFilters(productOrders, filters);
  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );
  const selectedSomeCryptoOrders =
    selectedCryptoOrders.length > 0 &&
    selectedCryptoOrders.length < productOrders.length;
  const selectedAllCryptoOrders =
    selectedCryptoOrders.length === productOrders.length;
  const theme = useTheme();

  const [data, setData] = useState<Produto[]>([]);
  const [idProduct, setIdProduct] = useState<Produto[]>([]);
  const [modal, setModal] = useState<Boolean>(false)

  async function queryProductsById(idProduct: any){
    setModal(!modal)
    setData(null)
    const {data} = await api.get(`/produtos/${idProduct}`);
    if(data){
      setData(data);
    }else{
      setData(null);
    }
  }


  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              {/*<FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
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
                </Select>
                  </FormControl>*/}
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
          title="Produtos cadastrados"
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
              <TableCell>Produto</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell align="right">Valor Di??rio</TableCell>
              <TableCell align="right">A????es</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoOrders.map((produto) => {
              const isCryptoOrderSelected = selectedCryptoOrders.includes(
                produto.id
              );
              return (
                <TableRow
                  hover
                  key={produto.id}
                  selected={isCryptoOrderSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCryptoOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, produto.id)
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
                      {produto.nome}
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
                      {produto.fabricante}
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
                      {produto?.categoria?.descricao}
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
                      R${numeral(produto.valor).format(
                        `0,0.00`
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Editar produto" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={(e)=>queryProductsById(produto?.id)}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {/*<Tooltip title="Excluir produto" arrow>
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
        <ListProductsModal 
          openModal={modal}
          setModal={setModal}
          data={data}
          edit={true}
      />
      )}
    </Card>
  );
};

ProductsTable.propTypes = {
  productOrders: PropTypes.array.isRequired
};

ProductsTable.defaultProps = {
  productOrders: []
};

export default ProductsTable;
