import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState , useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import {useDispatch,useSelector} from 'react-redux'

import Moment from 'react-moment';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';

import{getLogs} from '../../redux/logDucks'

// components
import Label from '../../components/label';
import Scrollbar from '../../components/scrollbar';
import Alert from "../../components/alerts/Alerts"
import AlertError from "../../components/alerts/AlertsError"
// sections
 import { LogListHead,LogListToolbar } from '../../sections/@dashboard/log';

// mock
import Loading from '../../components/loading/Loading';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'code', label: 'Code', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'statusTraffic', label: 'StatusTrafficLigth', alignRight: false },
  { id: 'date', label: 'DateTime', alignRight: false },
  { id: 'details', label: 'Details', alignRight: false },
];
const TABLE_HEAD1 = [
  { id: 'municipio', label: 'Organization', alignRight: false }, // TODO cambiar en BD registro por organizacion
  { id: 'code', label: 'Code', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'statusTraffic', label: 'StatusTrafficLigth', alignRight: false },
  { id: 'date', label: 'DateTime', alignRight: false },
  { id: 'details', label: 'Details', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function LogPage() {
  
  const dispatch = useDispatch()
  const LOGLIST = useSelector(store=>store.log.array)
  const load = useSelector(store=>store.log.loading)
  const err = useSelector(store=>store.log.error)
  const succ = useSelector(store=>store.log.success)
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null );
  const [success,setSuccess]=useState(false );
  const user = useSelector(store=>store.auth.userActive)
  useEffect(()=>{
    dispatch(getLogs());
    setLoading(load)
   },[dispatch])

   useEffect(()=>{
    setLoading(load)
    setError(err)
    setSuccess(succ)
   },[load,err,succ])


  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const navigate = useNavigate();

  const handleNavigate = (codeTraffic)=>{
    // console.log(codeTraffic)
    navigate(`../details`,{state:{codeTraffic}})
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - LOGLIST.length) : 0;

  const filteredUsers = applySortFilter(LOGLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Logs | Cloud Tek </title>
      </Helmet>
    
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            Logs
          </Typography>
        </Stack>
        <Card>
        <LogListToolbar  filterName={filterName} select={"log"} onFilterName={handleFilterByName} />
          {loading?(
            <>
            <Loading/>
            <Alert openT={loading}/>
            </>
                   
               ):(
         success?(
          <>        
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <LogListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={user.roles==="User" ? TABLE_HEAD:TABLE_HEAD1}
                  rowCount={LOGLIST.length}
                
                  onRequestSort={handleRequestSort}
                           
                />
                <TableBody>
                {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  const { code, organization, name, statusTraffic, updatedAt } = row;              

                  return (
                    <TableRow hover key={code} tabIndex={-1} role="checkbox"  size='small'>      
                      {
                        user.roles!=="User" && <TableCell component="th" scope="row" size='small' > 
                                           
                        <Typography variant="subtitle2" noWrap>
                              {organization}
                            </Typography>
                        </TableCell>
                      }          
                      
                      <TableCell align="left" size='small'>
                      <Typography variant="subtitle2" noWrap>
                            {code}
                          </Typography>
                      </TableCell>
                      <TableCell align="left" size='small'>
                      <Typography variant="subtitle2" noWrap>
                            {name}
                          </Typography>
                      </TableCell>

                      <TableCell align="left" size='small'> 
                        <Label  >{(statusTraffic===10111)?'Sin Informacion':(
                                      (statusTraffic===11011)?'Problemas de Empalme':(
                                          (statusTraffic===11101)?'Problemas de Control':(
                                            (statusTraffic===11110)?'Sin Luces hacia Terreno':'Funcionando con Normalida'
                                          )))}
                        </Label>
                      </TableCell>
                      <TableCell align="left" size='small'>
                   
                      <Moment format="DD/MM/YY">
                              {updatedAt}
                           </Moment>
                         ----
                           <Moment format="HH:mm:ss">
                              {updatedAt}
                           </Moment>
   
                     
                      </TableCell>
                      <TableCell align="left" size='small'>
                        <Button onClick={()=>handleNavigate(code)} variant="contained" size='small' color="warning" >
                            {/* <Iconify icon={'carbon:data-view-alt'} sx={{ mr: 2 }}  /> */}
                            Details
                        </Button >
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={LOGLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
      </>
         ):(
<AlertError openT={!success} error={error} />     
         )
          )}

        </Card>
      </Container>
    </>
  );
}
