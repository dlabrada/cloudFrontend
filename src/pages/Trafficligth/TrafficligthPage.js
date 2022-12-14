import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState , useEffect } from 'react';

import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from "react-router-dom"


// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';

import Iconify from '../../components/iconify';
import{getTrafficligth} from '../../redux/trafficligthDucks'

// components
import Label from '../../components/label';
import Scrollbar from '../../components/scrollbar';
import Alert from "../../components/alerts/Alerts"
import AlertError from "../../components/alerts/AlertsError"

// sections
import { TrafficligthListHead,TrafficligthListToolbar } from '../../sections/@dashboard/trafficligth';

// mock
import Loading from '../../components/loading/Loading';

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'municipio', label: 'Organization', alignRight: false }, // TODO cambiar en BD registro por organizacion
  { id: 'code', label: 'Code', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'created', label: 'Creado', alignRight: false },
  { id: 'statusTraffic', label: 'StatusTrafficLigth', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'options', label: 'Options', alignRight: false},
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

export default function TrafficligthPage() {
  
  const dispatch = useDispatch()
  const TRAFFICLIGTHLIST = useSelector(store=>store.trafficligth.array)
  const load = useSelector(store=>store.trafficligth.loading)
  const err = useSelector(store=>store.trafficligth.error)
  const succ = useSelector(store=>store.trafficligth.success)
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null );
  const [success,setSuccess]=useState(false );
  useEffect(()=>{
    dispatch(getTrafficligth());
    setLoading(load)
   },[dispatch])

   useEffect(()=>{
    setLoading(load)
    setError(err)
    setSuccess(succ)
   },[load,succ,err])

  // const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  // const [selected, setSelected] = useState([]);

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


  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - TRAFFICLIGTHLIST.length) : 0;

  const filteredUsers = applySortFilter(TRAFFICLIGTHLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const navigate = useNavigate();
  const list = useSelector(store=>store.trafficligth.org)

  let top100Films=[]

  const handleNavigateEdit = (raw)=>{
    top100Films =  list.map((org)=>{
      return  {label:org.code}
      })
    navigate('./edit',{state:{Organization:raw,top100Films}})
  }
  const handleNavigateDelete = (raw)=>{
  navigate('./delete',{state:{Organization:raw}})
  }

  return (
    <>
      <Helmet>
        <title> Organization | Cloud Tek </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            Trafficligth
          </Typography>
        </Stack>
        <Card>
       
          {loading?(
            <>
             <Loading/>
            <Alert openT={loading}/>
            </>                               
               ):(
           success?(
            <>     
            <TrafficligthListToolbar 
       // numSelected={selected.length} 
       filterName={filterName} 
       // select={select} 
       onFilterName={handleFilterByName} />   
             <Scrollbar>
               <TableContainer sx={{ minWidth: 800 }}>
                 <Table>
                   <TrafficligthListHead
                     order={order}
                     orderBy={orderBy}
                     headLabel={TABLE_HEAD}
                     rowCount={TRAFFICLIGTHLIST.length}
                     // numSelected={selected.length}
                     onRequestSort={handleRequestSort}
                     // onSelectAllClick={handleSelectAllClick}              
                   />
                   <TableBody>
                   {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                     const { organization, code, name, status, createdBy,statusTraffic } = row;
                     // const selectedUser = selected.indexOf(name) !== -1;
                     return (
                       <TableRow hover key={code} tabIndex={-1} role="checkbox"  size='small'>
   
                         <TableCell component="th" scope="row" size='small' >
               
                         <Typography variant="subtitle2" noWrap>
                               {organization}
                             </Typography>
                         </TableCell>
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
                         <TableCell align="left" size='small'>{createdBy}</TableCell>
                         <TableCell align="left" size='small'> 
                           <Label  >{(statusTraffic===10111)?'Sin Informacion':(
                                         (statusTraffic===11011)?'Empalme':(
                                             (statusTraffic===11101)?'Control':
                                             (statusTraffic===11101)?'Luces':'Operativo'))}
                           </Label>
                         </TableCell>
                         <TableCell align="left" size='small'>
                           <Label  >{status==='Y'?'Habilitado':'Inhabilitado'}</Label>
                         </TableCell>
           
                             <TableCell align="left" size='small'>
                             <Button variant="contained" size='small' color="warning" onClick={()=>handleNavigateEdit(row)}>
                               <Iconify icon={'eva:edit-fill'} sx={{ mr: 1 }} />
                                   Edit
                               </Button>
                               <Button onClick={()=>handleNavigateDelete(row)} variant="contained" size='small' color='error'sx={{ ml: 1 }}>
                                 <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 1 }} />
                                     Delete
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
               count={TRAFFICLIGTHLIST.length}
               rowsPerPage={rowsPerPage}
               page={page}
               onPageChange={handleChangePage}
               onRowsPerPageChange={handleChangeRowsPerPage}
             />
           </>
           ):(
            <AlertError openT={!success} error={error} />    
           )
          )
          }

        </Card>
      </Container>
    </>
  );
}
