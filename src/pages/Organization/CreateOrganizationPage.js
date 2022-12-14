import React, {useEffect,useState} from 'react'
import {useNavigate,useParams} from "react-router-dom"
import {useDispatch,useSelector} from 'react-redux'
import { MenuItem,
  styled,
  Paper,
    Container,Stack,Card,
  Divider,
Switch,
TextField,
Typography,
FormControlLabel,
Alert} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import validator from 'validator';
import Iconify from '../../components/iconify';
import AlertError from '../../components/alerts/AlertsError';
import { getOrganizationCreate, postOrganization } from '../../redux/organizationDucks';

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


const CreateOrganizationPage = () => {

  const dispatch = useDispatch();
  // const [disable,setDisable]= useState(true)
  const load = useSelector(store=>store.organization.loading)
  const err = useSelector(store=>store.organization.error)
  const succ = useSelector(store=>store.organization.successCreate)
  const [loading, setLoading] = React.useState(false);
  const [error,setError]=useState(useSelector(store=>store.organization.error));
  const [success,setSuccess]=useState(false);
  const navigate = useNavigate();
  const handleNavigate = ()=>{
    navigate('../organization')
  }

  useEffect(()=>{
 console.log(succ)
 setSuccess(succ)
    if(succ){
      console.log("todo ok")
      setError("")
      navigate('../organization')
     }

  },[succ])

  useEffect(()=>{
     setError(err)
     setLoading(load)
  },[load])

//   useEffect(()=>{
//     dispatch(getOrganizationCreate())
//  },[])

  const imagen = "/assets/images/tekchile/logoTek_top.png";
  const [img,setImg]= useState(imagen);
  
  const [code, setCode] = useState('');
  const handleChangeCode = (event) => {
    setCode(event.target.value);
  };

  const [name, setName] = useState('');
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  
  const [url, setUrl] = useState("/assets/images/tekchile/logoTek_top.png");
  const handleChangeUrl = (event) => {
    setUrl(event.target.value );
    if(validator.isURL(url)){
      setImg(url)
    }else{
      setImg(imagen)
    }
  };
  useEffect(()=>{
    if(validator.isURL(url)){
      setImg(url)
    }else{
      setImg(imagen)
    }
   },[url])
   
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

  const handleSaveOrganization = async (e) => {
    e.preventDefault();
    setLoading(true)
    const organizationItem={
      code,
      name,
      photoUrl:url,
      status:status?'Y':'N',
      latitud,
      longitud
    };
    // setError(false)
      dispatch(postOrganization(organizationItem));

  };

  return (
    <Container>
   
    <Card sx={style}>
    {/* <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" gutterBottom>
            Create
          </Typography>

        </Stack> */}
    <form onSubmit={handleSaveOrganization}>
            <Stack spacing={2} justifyContent="center" alignItems="center" >
              <Item  sx={{alignItem:"center"}}>          
                 <Card sx={{ p:1, border: '0 solid #000'}}>
                 <img alt="logo" src={img} style={{ width: 100,}} />
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
            <Stack spacing={1} direction={'row'} justifyContent="center" alignItems="center" >
            <Item >
              <TextField
              required
              // error={error}
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

            <Stack spacing={2}  justifyContent="center" alignItems="center" direction={"row"}>
            <Item>
                <TextField 
                        required
                        id="outlined-url"
                        label="Logo Url"
                        size="small"
                        // value={url}
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
   </Card>
    </Container>

  )
}

export default CreateOrganizationPage