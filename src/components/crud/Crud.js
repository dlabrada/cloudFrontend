// import React from 'react'
import { useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import {
    MenuItem,
    Link,
  } from '@mui/material';
import Iconify from '../iconify';

 
const Crud = (props) => {
  
  const [organization,setOrganization]= useState( props.id)

  return (
    <>
        <MenuItem>
          <Iconify icon={'carbon:data-view-alt'} sx={{ mr: 2 }}  />
          Details
        </MenuItem >
        <MenuItem  component={RouterLink} to={'edit'} organization={organization}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
    </>
  )
}

export default Crud