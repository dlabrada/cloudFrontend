import * as React from 'react';
import { useEffect, useState } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { useParams,useNavigate,useLocation } from 'react-router-dom';
import { MenuItem,
  styled,
  Paper,
  Typography,
  TextField,
  Divider,
  Alert,
  FormControlLabel,
  Switch,
    Container,Stack,Card} from '@mui/material';
    import { LoadingButton } from '@mui/lab';
    import Iconify from '../../components/iconify';
    import { deleteUser } from '../../redux/usersDucks';

const style = {
    // position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper  ',
    border: '1px solid #000',
    boxShadow: 10,
    p: 2,
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'rigth',
    color: theme.palette.text.secondary,
  }));

const DeleteUserPage = () => {

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const { state } = useLocation();

  const load = useSelector(store=>store.user.loading)
  const err = useSelector(store=>store.user.error)
  const succ = useSelector(store=>store.user.successCreate)
  const [loading, setLoading] = React.useState(false);
  const [error,setError]=useState(useSelector(store=>store.user.error));
  const [success,setSuccess]=useState(false);
  
  // Codigo para emular la carga desde BD
  useEffect(()=>{
    console.log(succ)
    setSuccess(succ)
       if(succ){
         console.log("todo ok")
         setError("")
         navigate(-1)
        }
   
     },[succ])

  useEffect(()=>{
      setError(err)
      setLoading(load)
   },[load])

   const handleDelete =()=>{
    // console.log(state.Organization.code)
    dispatch(deleteUser(state.Organization.code))
  }
    const navigate = useNavigate();
    const handleNavigate = ()=>{
      navigate(-1)
    }
  return (
    <Card sx={style}>
   <Stack spacing={1} justifyContent="center" alignItems="center" textAlign={"center"}>
    <Item>
    {
              error!=="" &&(
                <Stack sx={{ width: '100%' }} spacing={2} p={1} >
                <Alert severity="error">{error}</Alert>
                
              </Stack>
              )
              }
    </Item>
          <Item>
            <Typography variant="h6" gutterBottom >
            Are Sure Delete ?
            </Typography>
          <Typography variant="h7" gutterBottom  > 
            <strong> {state.Organization.name} </strong>    
          </Typography>
          </Item>
        </Stack>
          <Stack justifyContent="center" alignItems="center" spacing={2} direction={"row"}>
              <Item>
              <LoadingButton size='medium' variant="contained" onClick={handleNavigate} color="error" >
                <Iconify icon={'akar-icons:arrow-back-thick'} sx={{ mr: 0.5 }}  />
                Back
              </LoadingButton>
              </Item>
              <Item>
              <LoadingButton size='medium' variant="contained"  color="secondary" loading={loading}  onClick={handleDelete} >
                <Iconify icon={'fluent:delete-28-regular'} sx={{ mr: 0.5 }}  />
                Delete
              </LoadingButton>
              </Item>
            </Stack>   

   </Card>
          )
}

export default DeleteUserPage