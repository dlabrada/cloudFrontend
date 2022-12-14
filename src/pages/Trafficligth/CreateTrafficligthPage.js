import React, {useEffect,useState} from 'react'
import {useNavigate, useLocation } from "react-router-dom"
import {useDispatch,useSelector} from 'react-redux'
import { MenuItem,
  styled,
  Paper,
    Container,Stack,Card,
  Divider,
Switch,
TextField,
Typography,
Autocomplete,
FormControlLabel,
Alert} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import validator from 'validator';

import { postTrafficligth } from '../../redux/trafficligthDucks';

import Iconify from '../../components/iconify';
import AlertError from '../../components/alerts/AlertsError';


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
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));  


const CreateTrafficligthPage = () => {

  const dispatch = useDispatch();

  const { state } = useLocation();

  // const [disable,setDisable]= useState(true)
  const load = useSelector(store=>store.trafficligth.loading)
  const err = useSelector(store=>store.trafficligth.error)
  const succ = useSelector(store=>store.trafficligth.successCreate)
  const org = useSelector(store=>store.organization.array)
  const [loading, setLoading] = React.useState(false);
  const [error,setError]=useState(useSelector(store=>store.trafficligth.error));
  const [success,setSuccess]=useState(false);
  const navigate = useNavigate();
  const handleNavigate = ()=>{
    navigate(-1)
  }
// console.log(org)
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

  const [code, setCode] = useState('');
  const handleChangeCode = (event) => {
    setCode(event.target.value);
  };

  const [name, setName] = useState('');
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  
  const [token, setToken] = useState("");
  const handleChangeToken = (event) => {
    setToken(event.target.value );
  };
   
  const [latitud, setLatitud] = useState(-38.737458774894144);
  const handleChangeLat = (event) => {
    setLatitud(event.target.value)
  };

  const [longitud, setLongitud] = useState(-72.59668028696235);
  const handleChangeLong = (event) => {
    setLongitud(event.target.value)
  };

  const [status, setStatus] = useState(true);
  const handleChangeStatus = (event) => {
      setStatus(event.target.checked)
  };

  const [organization, setOrganization] = useState(state.top100Films[0]);
  const datos = state.top100Films
  const handleChangeOrganization = (event,newValue) => {
    console.log(newValue)
      setOrganization(newValue)
  };


  const handleSaveTrafficligth = async (e) => {
    e.preventDefault();
    setLoading(true)
    const organizationItem={
      code,
      name,
      token,
      status:status?'Y':'N',
      organization:organization.label,
      latitud,
      longitud
    };
 console.log(organizationItem)
      dispatch(postTrafficligth(organizationItem));

  };
  
  return (
    <Container>
        <Card sx={style}>
          <form onSubmit={handleSaveTrafficligth}>

    
    <Stack spacing={2} justifyContent="center" alignItems="center" >
    <Typography variant="h5" gutterBottom > 
          Create
        </Typography>
    </Stack>

    <Divider />
    {
              error!=="" &&(
                <Stack sx={{ width: '100%' }} spacing={2} p={1} >
                <Alert severity="error">{error}</Alert>
                
              </Stack>
              )
              }
    <Stack spacing={1} direction={'row'} justifyContent="center" alignItems="center" >
    <Item >
      <TextField
      required
            id="outlined-code"
            label="Code"
            value={code}
            size="small"
            onChange={handleChangeCode}
            />
      </Item>
      <Item >
      <TextField
      required
            id="outlined-name"
            label="Name"
            value={name}
            size="small"
            onChange={handleChangeName}
            />
      </Item>
      
    </Stack>

    <Stack spacing={1} direction={'row'} justifyContent="center" alignItems="center">
      <Item>
        <TextField
                required
                id="outlined-latitud"
                label="Latitud"
                // value={latitud}
                size="small"
                onChange={handleChangeLat}   
                type="text"     
                                
              />
      </Item>
      <Item>            
      <TextField
                required
                id="outlined-longitud"
                label="Longitud"
                size="small"
                // value={longitud}
                onChange={handleChangeLong}   
                type="text" 
            />
      </Item>
      
    </Stack>

    <Stack justifyContent="center" alignItems="center" direction={"row"} spacing={1}>
    <Item>
        <TextField 
                required
                id="outlined-url"
                label="Token"
                size="small"
                // value={url}
                type="password"   
                onChange={handleChangeToken}             
          />
      </Item>
        <Item>
      <FormControlLabel   
            control={<Switch color="primary" checked={status} onChange={handleChangeStatus}/>}
            label={status?("Operativo"):("No Operativo")}                   
          />
      </Item>
    </Stack >
    <Stack>
      <Item>
      <Autocomplete
          disablePortal
          id="combo-box-demo"
          value={organization}
          onChange={(event, newValue) => {
            setOrganization(newValue);
          }}
          options={datos}
          size="small"
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} required label="Organization" />}
        />
      </Item>
    </Stack>
    <Divider />

    <Stack justifyContent="center" alignItems="center" spacing={2} direction={"row"}>
      <Item>
      <LoadingButton size='medium' variant="contained" onClick={handleNavigate} color="error" >
        <Iconify icon={'akar-icons:arrow-back-thick'} sx={{ mr: 0.5 }}  />
        Back
      </LoadingButton>
      </Item>
      <Item>
      <LoadingButton size='medium' variant="contained" type='submit' loading={loading} color="secondary" >
        <Iconify icon={'fluent:save-edit-20-regular'} sx={{ mr: 0.5 }}  />
        Save
      </LoadingButton>
      </Item>
    </Stack>

          </form>
        </Card>
    </Container>

  )
}

export default CreateTrafficligthPage