import * as React from 'react';

import { Button,
          Card,
        Modal} 
from '@mui/material';

// import { DetailsForm } from '../../sections/@dashboard/log/crud';


import Iconify from '../iconify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};


export default function DetailsModal(props) {
  

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
// console.log(props.select)
  return (
    <div>
   <Button onClick={handleOpen} variant="contained" size='small' color="warning" >
          <Iconify icon={'carbon:data-view-alt'} sx={{ mr: 2 }}  />
          Details
          </Button >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
        {/* <DetailsForm select={props.select} onClose= {handleClose} />                       */}
        </Card>
      </Modal>
    </div>
  );
}
