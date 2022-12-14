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
Avatar,
Checkbox,
Alert} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import validator from 'validator';

// import { postTrafficligth } from '../../redux/trafficligthDucks';
import { postUser } from '../../redux/usersDucks';
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


const CreateUserPage = (props) => {
  const navigate = useNavigate();


  const dispatch = useDispatch();

  const { state } = useLocation();

  // const [disable,setDisable]= useState(true)
  const load = useSelector(store=>store.user.loading)
  const err = useSelector(store=>store.user.error)
  const succ = useSelector(store=>store.user.successCreate)
  const [loading, setLoading] = React.useState(false);
  const [error,setError]=useState(useSelector(store=>store.user.error));
  const [success,setSuccess]=useState(false);

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

  const logos = state.logo
  const [logo, setLogo] = useState(logos[0]);

  const roles1 = state.roles
  const [rol, setRol] = useState(roles1[0]);
   
  const [user, setUser] = useState('');
  const handleChangeUser = (event) => {
    setUser(event.target.value);
  };

  const [name, setName] = useState('');
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  
  const [password, setPassword] = useState("");
  const handleChangePassword = (event) => {
    setPassword(event.target.value );
  };
   
  const [email, setEmail] = useState("");
  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  };

  const [phone, setPhone] = useState("");
  const handleChangePhone = (event) => {
    setPhone(event.target.value)
  };

  const [status, setStatus] = useState(true);
  const handleChangeStatus = (event) => {
      setStatus(event.target.checked)
  };

  const [notificationP, setNotificationP] = useState(false);
  const handleChangeNotificationP = (event) => {
      setNotificationP(event.target.checked)
  };
  const [notificationE, setNotificationE] = useState(false);
  const handleChangeNotificationE = (event) => {
      setNotificationE(event.target.checked)
  };

  const org1 = state.top100Films
  const [organization, setOrganization] = useState(org1[0]);
  const handleSaveUser = async (e) => {
    e.preventDefault();
    setLoading(true)
    const userItem={
      code:user,
      name,
      logo:logo.url,
      organization:organization.label,
      notification:(notificationE&&notificationP?3:notificationP?2:notificationE?1:0),
      email,
      phone,
      rol:rol.label,
      status:status?'Y':'N',
      password
    };

      dispatch(postUser(userItem));

  };
  
  return (
    <Container>
        <Card sx={style}>
          <form onSubmit={handleSaveUser}>

    
    <Stack spacing={2} justifyContent="center" alignItems="center" >
    <Typography variant="h5" gutterBottom > 
          Create
        </Typography>
    </Stack>

    <Divider />

    <Stack spacing={2} justifyContent="center" alignItems="center" >
              <Item  sx={{alignItem:"center"}}>          
                 <Avatar
                        alt={name}
                        src={logo.url}
                        sx={{ width: 70, height: 70 }}
                      />
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
            <Stack spacing={1} direction={'row'} mt={1} justifyContent="center" alignItems="center">
              <Item>
              <Autocomplete
                 
                  id="combo-box-demo"
                  value={logo}
                  onChange={(event, newValue) => {
                    if(newValue!=null){
                      setLogo(newValue);
                    }
                    
                  }}
                  options={logos}
                  size="small"
                  sx={{ width: 140 }}
                  renderInput={(params) => <TextField {...params} required label="Logo" />}
                />
              </Item>
              <Item >
              <TextField
              required
                    id="outlined-code"
                    label="User"
                    value={user}
                    size="small"
                    onChange={handleChangeUser}
                    />
              </Item>
            </Stack>
            <Stack spacing={1} direction={'row'} justifyContent="center" alignItems="center" >
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
              <Item>
              <TextField
                        required
                        id="outlined-latitud"
                        label="Password"
                        // value={latitud}
                        size="small"
                        onChange={handleChangePassword}   
                        type="password"     
                                         
                      />
              </Item>
            </Stack>

            <Stack spacing={1} direction={'row'} justifyContent="center" alignItems="center">
              <Item>
                <TextField
                        required
                        id="outlined-latitud"
                        label="Email"
                        // value={latitud}
                        size="small"
                        onChange={handleChangeEmail}   
                        type="email"     
                                         
                      />
              </Item>
              <Item>            
              <TextField
                        required
                        id="outlined-longitud"
                        label="Phone"
                        size="small"
                        // value={longitud}
                        onChange={handleChangePhone}   
                        type="tel" 
                    />
              </Item>
              
            </Stack>

            <Stack justifyContent="center" alignItems="center" direction={"row"} spacing={1}>
            <Item>
              <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  value={rol}
                  onChange={(event, newValue) => {
                    setRol(newValue);
                  }}
                  options={roles1}
                  size="small"
                  sx={{ width: 140 }}
                  renderInput={(params) => <TextField {...params} required label="Roles" />}
                />
              </Item>
                <Item>
              <FormControlLabel   
                    control={<Switch color="primary" checked={status} onChange={handleChangeStatus}/>}
                    label={status?("Operativo"):("No Operativo")}                   
                  />
              </Item>
            </Stack >
            <Stack justifyContent="center" direction={"row"} spacing={1}>
              <Item>
              <FormControlLabel control={<Checkbox onChange={handleChangeNotificationE}/>} label="Email" />
              <FormControlLabel control={<Checkbox onChange={handleChangeNotificationP}/>} label="SMS" />
              </Item>

            </Stack>
            <Stack mb={1}>
              <Item>
              <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  value={organization}
                  onChange={(event, newValue) => {
                    setOrganization(newValue);
                  }}
                  options={org1}
                  size="small"
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} required label="Organization" />}
                />
              </Item>
            </Stack>
            <Divider />
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
export default CreateUserPage