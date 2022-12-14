import * as React from 'react';
import Modal from '@mui/material/Modal';
import { MenuItem,
Container,Stack,Card, Button} from '@mui/material';



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


export default function BasicModal(props) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} variant="contained" size='small' color="warning" >
      <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
      </Button >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
        {props.id==="organization"?("<EditFormOrganization onClose= {handleClose} organization={props.organization}/>" ):(
            props.id==="trafficligth"?("<EditFormTrafficligth onClose= {handleClose} organization={props.organization}/>" ):
            ("<EditFormUser onClose= {handleClose} organization={props.organization}/>" )
          )}                 
        </Card>
      </Modal>
    </>
  );
}
