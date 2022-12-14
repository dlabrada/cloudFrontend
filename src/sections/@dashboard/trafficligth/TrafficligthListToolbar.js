import PropTypes from 'prop-types';
import {useNavigate,useParams} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment,Button } from '@mui/material';

// component
import Iconify from '../../../components/iconify';

import { getOrganization } from '../../../redux/organizationDucks';

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 150,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 250,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

TrafficligthListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  // select:PropTypes.array,
};

export default function TrafficligthListToolbar({ numSelected, filterName, onFilterName,select }) {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const list = useSelector(store=>store.trafficligth.org)

  let top100Films=[]

  const handleNavigateCreate = ()=>{

  top100Films =  list.map((org)=>{
  return  {label:org.code}
  })
// console.log(top100Films)
    navigate('./create',{state:{top100Films}})
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
          placeholder="Search..."
          size='small'
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
      )}

      {/* {numSelected > 0 ? (<>
      {numSelected>1 ?(
        <Stack direction={"row"} justifyContent="center" alignItems="center" spacing={1}> 
        <DeleteModal  organization={select} id={"trafficligth"}/>
        </Stack>
      ):(
        <Stack direction={"row"} justifyContent="center" alignItems="center" spacing={1}>
        <EditModal organization={select} id={"trafficligth"}/>   
        <DeleteModal  organization={select} id={"trafficligth"}/>
        </Stack>
      )}
      

      </>
      ) : ( */}
               <Button variant="contained" 
                size='small' 
                color='secondary'
                startIcon={<Iconify icon="eva:plus-fill" />}  
                onClick={handleNavigateCreate}
         >
           New
        </Button>
      {/* )} */}
    </StyledRoot>
  );
}
