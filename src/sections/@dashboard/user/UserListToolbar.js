import PropTypes from 'prop-types';
import {useNavigate,useParams} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Toolbar, Stack, IconButton, Typography, OutlinedInput, InputAdornment,Button } from '@mui/material';
// component
import Iconify from '../../../components/iconify';
import DeleteModal from "../../../components/modals/Delete"
import EditModal from "../../../components/modals/Edit"
import CreateModal from "../../../components/modals/Create"
// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function UserListToolbar({ numSelected, filterName, onFilterName,select }) {

  const navigate = useNavigate();
  const list = useSelector(store=>store.user.org)
  const logo = useSelector(store=>store.user.logo)
  const roles = useSelector(store=>store.user.roles)
  let top100Films=[]
  const user = JSON.parse(localStorage.getItem('usuario'))

  const handleNavigateCreate = ()=>{

  top100Films =  list.map((org)=>{
  return  {label:org.code}
  })
console.log(top100Films)
    navigate('../usercreate',{state:{top100Films,logo,roles}})
  }

  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <StyledSearch
          value={filterName}
          onChange={onFilterName}
          placeholder="Search user..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
      )}

{numSelected > 0 ? (<>
      {numSelected>1 ?(
        <Stack direction={"row"} justifyContent="center" alignItems="center" spacing={1}> 
        <DeleteModal  organization={select} id={"user"}/>
        </Stack>
      ):(
        <Stack direction={"row"} justifyContent="center" alignItems="center" spacing={1}>
        <EditModal organization={select} id={"user"}/>   
        <DeleteModal  organization={select} id={"user"}/>
        </Stack>
      )}
      </>
      ) : (
        
             user.roles==="Operator" ?'':(
            <Button variant="contained" 
            size='small' 
            color='secondary'
            startIcon={<Iconify icon="eva:plus-fill" />}  
            onClick={handleNavigateCreate}
     >
       New
    </Button>
          )
        
       
      )}
    </StyledRoot>
  );
}
