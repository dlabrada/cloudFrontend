import PropTypes from 'prop-types';
import {useNavigate,useParams} from "react-router-dom"
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton,Button, Typography, OutlinedInput, InputAdornment } from '@mui/material';
import { Stack } from '@mui/system';
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

OrganizationListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  // select:PropTypes.array,
};

export default function OrganizationListToolbar({ numSelected, filterName, onFilterName,select }) {
  const navigate = useNavigate();
  const handleNavigateCreate = ()=>{
    navigate('./create')
  }

//  const { code } = useParams();

  const handleNavigateEdit = (code)=>{

    console.log(code)
  // const handleNavigate = (code)=>{
  //   console.log(_id)
  //   id= _id;
  //   // id=id.toLowerCase()
    navigate(`./edit/${code}`)
  // }
}
const handleNavigateDelete = (code)=>{

  console.log(code)
// const handleNavigate = (code)=>{
//   console.log(_id)
//   id= _id;
//   // id=id.toLowerCase()
  navigate(`./delete/${code}`)
// }
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

      {numSelected > 0 ? (<>
      {numSelected>1 ?(
        <Stack direction={"row"} justifyContent="center" alignItems="center" spacing={1}> 
        <DeleteModal  organization={select} id={"organization"}/>
        </Stack>
      ):(
        <Stack direction={"row"} justifyContent="center" alignItems="center" spacing={1}>
              <Button variant="contained" size='small' color="warning" onClick={()=>handleNavigateEdit(select.code)}>
              <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                  Edit
              </Button>
              <Button onClick={()=>handleNavigateDelete(select.code)} variant="contained" size='small' color='error' >
                <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 1 }} />
                    Delete
                </Button >
        </Stack>
      )}
      </>
      ) : (
        <Button variant="contained" 
                size='small' 
                color='secondary'
                startIcon={<Iconify icon="eva:plus-fill" />}  
                onClick={handleNavigateCreate}
         >
            Add
        </Button>
      )}
    </StyledRoot>
  );
}
