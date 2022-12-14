import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import MuiAlert from '@mui/material/Alert';
// import CloseIcon from '@mui/icons-material/Close';



export default function SimpleSnackbar({openT}) {
  const Alert = React.forwardRef((props, ref) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

  const [open, setOpen] = React.useState(false);
// console.log(openT)
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      {/* <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button> */}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        {/* <CloseIcon fontSize="small" /> */}
      </IconButton>
    </>
  );

  return (
    <>
      {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
      <Snackbar
        open={openT}
        anchorOrigin={{ vertical:"bottom", horizontal:"right" }}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Load Information..."
        action={action}
      />
            {/* <Snackbar open={openT} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical:"bottom", horizontal:"right" }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar> */}
    </>
  );
}