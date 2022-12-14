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
  Alert,
  FormControlLabel,
  Switch,
  Stack,
  Card} from '@mui/material';

  import { LoadingButton } from '@mui/lab';
  import Iconify from '../../components/iconify';
  import { getCodeOrganization,putOrganization } from '../../redux/organizationDucks';

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

const EditOrganizationPage = () => {

  const dispatch = useDispatch();

  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state)
  const OrganizationEdit = useSelector(store=>store.organization.array[0])
  const [org,setOrg]=useState(OrganizationEdit)
  const param = useParams();
  const load = useSelector(store=>store.organization.loading)
  const err = useSelector(store=>store.organization.error)
  const succ = useSelector(store=>store.organization.successCreate)
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState(useSelector(store=>store.organization.error));
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

    const imagen = "/assets/images/tekchile/logoTek_top.png";
    const [img,setImg]= useState(imagen);
    const [url, setUrl] = useState(state.Organization.photoUrl);
    const handleChangeUrl = (event) => {
      setUrl(event.target.value);
    };

    useEffect(()=>{
      if(validator.isURL(url)){
        setImg(url)
      }else{
        setImg(imagen)
      }
     },[url])
  
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
  
    const [updatedBy, setUpdatedBy] = useState(state.Organization.updatedBy);
    const [createdBy,setCreatedBy] = useState(state.Organization.createdBy);
    const handleSaveOrganization = async (e) => {
      e.preventDefault();
      const organizationItem={
        // _id:props.organization._id,
        code,
        name,
        photoUrl:url,
        status:status?'Y':'N',
        latitud,
        longitud,
        createdBy,
        updatedBy
      };
       dispatch(putOrganization(organizationItem));
    };
  
 
    const handleNavigate = ()=>{
      navigate('../organization')
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
                 <Card sx={{ p:1, border: '0.1px solid #000'}}>
                 <img alt="logo" src={img} style={{ width: 80,}} />
                 </Card>
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
            label="Logo Url"
            size="small"
             value={url}
            type="url"   
            onChange={handleChangeUrl}             
      />
  </Item>
    <Item>
  <FormControlLabel   
        control={<Switch color="primary" checked={status} onChange={handleChangeStatus}/>}
        label={status?("Operativo"):("No Operativo")}                   
      />
  </Item>
</Stack >

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

export default EditOrganizationPage