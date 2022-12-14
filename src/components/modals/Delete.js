import * as React from 'react';
import {useDispatch,useSelector} from 'react-redux'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MenuItem,Button,
Container,Stack,Card, Paper,styled} from '@mui/material';

import Iconify from '../iconify';




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 2,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'rigth',
  color: theme.palette.text.secondary,
}));

export default function BasicModal(props) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Button onClick={handleOpen} variant="contained" size='small' color='error' >
      <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 1 }} />
          Delete
      </Button >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >


        <Card sx={style}>      
          {props.id==="organization"?
          ("<DeleteFormOrganization onClose= {handleClose} organization={props.organization}/>" ):
          (props.id==="trafficligth"?
          ("<DeleteFormTrafficligth onClose= {handleClose} organization={props.organization}/> "):
          ("<DeleteFormUser onClose= {handleClose} organization={props.organization}/>" )
          )}
        </Card>


      </Modal>
    </>
  );
}
