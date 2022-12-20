import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
// import { sentenceCase } from 'change-case';
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
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';

import Iconify from '../../components/iconify';
import{getOrganization} from '../../redux/organizationDucks'

// components
import Label from '../../components/label';
import Scrollbar from '../../components/scrollbar';
import Alert from "../../components/alerts/Alerts"
import AlertError from "../../components/alerts/AlertsError"
// sections
 import { OrganizationListHead,OrganizationListToolbar } from '../../sections/@dashboard/organization';

// mock
import Loading from '../../components/loading/Loading';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'photoUrl', label: 'Logo', alignRight: false },
  { id: 'code', label: 'Code', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'created', label: 'Creado', alignRight: false },
  { id: 'update', label: 'Modificado', alignRight: false },
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
  const stabilizedThis = array?.map((el, index) => [el, index]);
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

export default function OrganizationPage() {
  
  const dispatch = useDispatch()
  const ORGANIZATIONLIST = useSelector(store=>store.organization.array)
  const load = useSelector(store=>store.organization.loading)
  const err = useSelector(store=>store.organization.error)
  const succ = useSelector(store=>store.organization.success)
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null );
  const [success,setSuccess]=useState(false );
  useEffect(()=>{
    dispatch(getOrganization());
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

  //  const [select,setSelect] = useState([]);

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

  const handleNavigateEdit = (raw)=>{
    navigate('../organizationedit',{state:{Organization:raw}})
}
  const handleNavigateDelete = (raw)=>{
  navigate('../organizationdelete',{state:{Organization:raw}})
}

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ORGANIZATIONLIST.length) : 0;

  const filteredUsers = applySortFilter(ORGANIZATIONLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Organization | Cloud Tek </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            Organization
          </Typography>

        </Stack>
        <Card>
       
          {loading ?(
            <>
             <Loading/>
            <Alert openT={loading}/>
            </>            
               ):(
                success?(
              <>   
                <OrganizationListToolbar  filterName={filterName}  onFilterName={handleFilterByName} />    
                  <Scrollbar>
                    <TableContainer sx={{ minWidth: 800 }}>
                      <Table>
                        <OrganizationListHead
                          order={order}
                          orderBy={orderBy}
                          headLabel={TABLE_HEAD}
                          rowCount={ORGANIZATIONLIST.length}
                          // numSelected={selected.length}
                          onRequestSort={handleRequestSort}
                          // onSelectAllClick={handleSelectAllClick}              
                        />
                        <TableBody>
                        {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                          const {code, name, photoUrl, status, createdBy, updatedBy } = row;
                          // const selectedUser = selected.indexOf(name) !== -1;
                          // console.log(row)
                          return (
                            <TableRow hover key={code} tabIndex={-1} role="checkbox"  size='small'>
                              {/* <TableCell padding="checkbox" >
                                <Checkbox checked={selectedUser} size='small' onChange={(event) => handleClick(event, name,row)} />
                              </TableCell> */}
    
                              <TableCell component="th" scope="row" size='small' >
                              <img alt="country" src={photoUrl} style={{ width: 80}} />
                              
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
                              <TableCell align="left" size='small'> {updatedBy}</TableCell>
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
                    count={ORGANIZATIONLIST.length}
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
