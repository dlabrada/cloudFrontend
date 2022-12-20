import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState , useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import {useDispatch,useSelector} from 'react-redux'



// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
 Skeleton,
} from '@mui/material';

import{getUser} from '../../redux/usersDucks'
import Iconify from '../../components/iconify';
// components
import Label from '../../components/label';
import Scrollbar from '../../components/scrollbar';
import Alert from "../../components/alerts/Alerts"
import AlertError from "../../components/alerts/AlertsError"
// sections
 import { UserListHead,UserListToolbar } from '../../sections/@dashboard/user';

// mock
import Loading from '../../components/loading/Loading';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'code', label: 'User', alignRigth: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'rol', label: 'Rol', alignRight: false },
  { id: 'notification', label: 'Notification', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'organization', label: 'Organization', alignRight: false },
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
  // console.log(array)
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

export default function UserPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch()
  const USERLIST = useSelector(store=>store.user.array)
  const load = useSelector(store=>store.user.loading)
  const err = useSelector(store=>store.user.error)
  const succ = useSelector(store=>store.user.success)
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null );
  const [success,setSuccess]=useState(false );

  const user = JSON.parse(localStorage.getItem('usuario'))

  useEffect(()=>{
    dispatch(getUser());
    setLoading(load)
   },[dispatch])

   useEffect(()=>{
    setLoading(load)
    setError(err)
    setSuccess(succ)
   },[load,err,succ])

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');


  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

   const [select,setSelect] = useState([]);

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

 
  let top100Films=[]
  const list = useSelector(store=>store.user.org)
  const logo = useSelector(store=>store.user.logo)
  const roles = useSelector(store=>store.user.roles)
  const handleNavigateEdit = (raw)=>{
    top100Films =  list.map((org)=>{
      return  {label:org.code}
      })
    navigate('../useredit',{state:{Organization:raw,top100Films,logo,roles}})
  }
  const handleNavigateDelete = (raw)=>{
  navigate('../userdelete',{state:{Organization:raw}})
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Users | Cloud Tek </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
        </Stack>
        <Card>
     
          {loading?(
            <>
            <Loading/>
            <Alert openT={loading}/>
            </>

               ):(
                (success)?(
                  <>       
                     <UserListToolbar filterName={filterName} select={select} onFilterName={handleFilterByName} /> 
                  <Scrollbar>
                    <TableContainer sx={{ minWidth: 800 }}>
                      <Table>
                        <UserListHead
                          order={order}
                          orderBy={orderBy}
                          headLabel={TABLE_HEAD}
                          rowCount={USERLIST.length}              
                          onRequestSort={handleRequestSort}                         
                        />
                        <TableBody>
                        {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                          const { code, name, logo, status, createdBy, notification ,organization,rol} = row;
                         
                          return (
                            <TableRow hover key={code} tabIndex={-1} role="checkbox" size='small'>
                    
                              <TableCell component="th" scope="row" size='small' >
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar alt={code} src={logo } />
                                <Typography variant="subtitle2" noWrap>
                                  {code}
                                </Typography>
                              </Stack>
                              </TableCell>
                              <TableCell align="left" size='small'>
                              <Typography variant="subtitle2" noWrap>
                                    {name}
                                  </Typography>
                              </TableCell>
                              <TableCell align="left" size='small'>
                              <Typography variant="subtitle2" noWrap>
                                    {rol}
                                   
                                  </Typography>
                              </TableCell>
                              <TableCell align="left" size='small'>
                                <Label  >{notification===1?'Email':(notification===2?'SMS':(notification===3?'Email - SMS':' Sin Notification '))}</Label>
                              </TableCell>
                              <TableCell align="left" size='small'>
                                <Label  >{status==="Y"?'Habilitado':'Inhabilitado'}</Label>
                              </TableCell>
                              <TableCell align="left" size='small'> 
                              {organization}
                              </TableCell>                      
                              <TableCell align="left" size='small'>
                              {
                                
                                user.roles==="Operator" ?'No Avaible':(
                                  <>
                                    <Button variant="contained" size='small' color="warning" onClick={()=>handleNavigateEdit(row)}>
                                      <Iconify icon={'eva:edit-fill'} sx={{ mr: 1 }} />
                                          Edit
                                      </Button>
                                      {
                                        user.roles==="SAdmin"&&(
                                          <Button onClick={()=>handleNavigateDelete(row)} variant="contained" size='small' color='error'sx={{ ml: 1 }}>
                                          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 1 }} />
                                              Delete
                                          </Button >
                                        )
                                      }      
                                  </>                              
                                )
                              }                      
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
                    count={USERLIST.length}
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
