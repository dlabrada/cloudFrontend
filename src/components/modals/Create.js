import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { MenuItem,
Container,Stack,Card} from '@mui/material';




import Iconify from '../iconify';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper  ',
  border: '1px solid #000',
  boxShadow: 10,
  p: 2,
};


export default function BasicModal(props) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" 
        size='small' 
        color='secondary'
        startIcon={<Iconify icon="eva:plus-fill" />}  
        onClick={handleOpen}>
            Add
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          {props.id==="organization"?("<CreateFormOrganization onClose= {handleClose}/>" ):(
            props.id==="trafficligth"?("<CreateFormTrafficligth onClose= {handleClose}/>" ):
            ("<CreateFormUser onClose= {handleClose}/>" )
          )}
                             
        </Card>
      </Modal>
    </div>
  );
}
