import React from 'react'

import {
    Card,
    Table,
    Stack,
    Paper,
    Avatar,
    Box,
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

const Loading = () => {
  return (
        <Box >
            <Skeleton variant="rectangular" sx={{bgcolor: 'grey.300' }} height={70}/>
            <Skeleton variant="rectangular" height={350}/>
            <Skeleton variant="rectangular" height={30} sx={{mt:"0.4rem",}}/>
        </Box>
  )
}

export default Loading