import * as React from 'react';
import { useEffect, useState } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { useParams,useNavigate, useLocation } from 'react-router-dom';
import validator from 'validator';
import { 
  styled,
  Paper,
  Typography,
  TextField,
  Divider,
  Autocomplete,
  Alert,
  FormControlLabel,
  Switch,
  Stack,
  Card} from '@mui/material';

  import { LoadingButton } from '@mui/lab';
  import Iconify from '../../components/iconify';
  import {putTrafficligth } from '../../redux/trafficligthDucks';

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

const EditTrafficligthPage = () => {

  const dispatch = useDispatch();

  const { state } = useLocation();

  const load = useSelector(store=>store.trafficligth.loading)
  const err = useSelector(store=>store.trafficligth.error)
  const succ = useSelector(store=>store.trafficligth.successCreate)
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState(useSelector(store=>store.trafficligth.error));
  const [success,setSuccess] = useState(false);
  
    // Codigo para emular la carga desde BD
    useEffect(()=>{
      
      // setOrg(OrganizationEdit.code)
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
  
    const [code, setCode] = useState(state.Organization.code);
    const handleChangeCode = (event) => {
      setCode(event.target.value);
    };
  
    const [name, setName] = useState(state.Organization.name);
    const handleChangeName = (event) => {
      setName(event.target.value);
    };

    const [token, setToken] = useState(state.Organization.token);
    const handleChangeToken = (event) => {
      setToken(event.target.value);
    };

  console.log(state)
    const [latitud, setLatitud] = useState(state.Organization.latitud);
    const handleChangeLat = (event) => {
      setLatitud(event.target.value)
    };
  
    const [longitud, setLongitud] = useState(state.Organization.longitud);
    const handleChangeLong = (event) => {
      setLongitud(event.target.value)
    };
  
    const [status, setStatus] = useState(state.Organization.status==='Y'&&true);
    // const [status, setStatus] = useState(true);
    const handleChangeStatus = (event) => {
        setStatus(event.target.checked)
        // console.log(event.target.checked)
    };

    const datos = state.top100Films;
    // console.log(datos)
    const [organization, setOrganization] = useState( datos[0]);
    const [statusTraffic, setstatusTraffic] = useState(state.Organization.statusTraffic);
    const [updatedBy, setUpdatedBy] = useState(state.Organization.updatedBy);
    const [createdBy,setCreatedBy] = useState(state.Organization.createdBy);
    const handleSaveOrganization = async (e) => {
      e.preventDefault();
      const organizationItem={
        code,
        name,
        latitud,
        longitud,
        organization:organization.label,
        token,
        statusTraffic,
        status:status?'Y':'N',
        createdBy,
        updatedBy
      };
      console.log(organizationItem)
        dispatch(putTrafficligth(organizationItem));
    };
  
    const navigate = useNavigate();
    const handleNavigate = ()=>{
      navigate(-1)
    }
  return (
    <Card sx={style}>
{
  load?(
"load"
  ):(
    <form onSubmit={handleSaveOrganization}>

 
            <Stack spacing={2} justifyContent="center" alignItems="center" >
              <Item  sx={{alignItem:"center"}}>
                <Typography variant="h5" gutterBottom>
                    EDIT TRAFFICLIGTH
                </Typography>
              </Item>
            </Stack>

            <Divider />
            {
              error!=="" &&(
                <Stack sx={{ width: '100%' }} spacing={2} p={1} >
                <Alert severity="error">{error}</Alert>
                
              </Stack>
              )
              }
            <Stack spacing={1} direction={'row'} justifyContent="center" alignItems="center"  >
            <Item >
              <TextField
              disabled

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
                         value={latitud}
                        size="small"
                        onChange={handleChangeLat}   
                        type="number"     
                                         
                      />
              </Item>
              <Item>            
              <TextField
                        required
                        id="outlined-longitud"
                        label="Longitud"
                        size="small"
                         value={longitud}
                        onChange={handleChangeLong}   
                        type="number" 
                    />
              </Item>
              
            </Stack>

            <Stack justifyContent="center" alignItems="center" direction={"row"}>
            <Item>
                <TextField 
                        required
                        id="outlined-url"
                        label="Token"
                        size="small"
                         value={token}
                        type="text"   
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
  )
}

   </Card>
  )
}

export default EditTrafficligthPage