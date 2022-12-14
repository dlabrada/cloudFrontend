import PropTypes from 'prop-types';
import {useNavigate,useParams} from "react-router-dom"
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment, Button } from '@mui/material';
import { Stack } from '@mui/system';
// component
import Iconify from '../../../components/iconify';

import DetailsModal from "../../../components/modals/Details"
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
  width: 300,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 400,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

LogListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  // select:PropTypes.array,
};

export default function LogListToolbar({ numSelected, filterName, onFilterName,select}) {
  const navigate = useNavigate();
  const handleNavigate = ()=>{
    navigate(-1)
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
      {select==="details" ? (
       ''
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

      {select==="details" ? (
 
              <Stack direction={"row"} justifyContent="end" alignItems="end" spacing={1} > 
              <Button onClick={handleNavigate} variant="contained" size='small' color="secondary" >
                                <Iconify icon={'ic:baseline-arrow-back'} sx={{ mr: 0.5 }}  />
                                Back
                            </Button >
              </Stack>

      ) : (
        <Stack direction={"row"} justifyContent="end" alignItems="end" spacing={1} > 
        <Button  variant="contained" size='small' color="secondary" >
                          <Iconify icon={'material-symbols:cloud-download'} sx={{ mr: 0.5 }}  />
                          Export
                      </Button >
        </Stack>
      )}
    </StyledRoot>
  );
}
