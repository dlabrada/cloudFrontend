import * as React from 'react';
import { useEffect, useState } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { useParams,useNavigate, useLocation } from 'react-router-dom';


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
  Avatar,
  Card,
Checkbox} from '@mui/material';

  import { LoadingButton } from '@mui/lab';
  import Iconify from '../../components/iconify';
  import {putUser } from '../../redux/usersDucks';

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

const EditUserPage = () => {

  const dispatch = useDispatch();

  const { state } = useLocation();

  const navigate = useNavigate()
  const load = useSelector(store=>store.user.loading)
  const err = useSelector(store=>store.user.error)
  const succ = useSelector(store=>store.user.successCreate)
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState(useSelector(store=>store.user.error));
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
  // console.log(state.Organization)
       const logos = state.logo
       const [logo, setLogo] = useState(logos[0]);
     
       const roles1 = state.roles
       const [rol, setRol] = useState(roles1[0]);
        
       const [user, setUser] = useState(state.Organization.code);
       const handleChangeUser = (event) => {
         setUser(event.target.value);
       };
     
       const [name, setName] = useState(state.Organization.name);
       const handleChangeName = (event) => {
         setName(event.target.value);
       };
       
       const [password, setPassword] = useState("");
       const handleChangePassword = (event) => {
         setPassword(event.target.value );
       };
        
       const [email, setEmail] = useState(state.Organization.email);
       const handleChangeEmail = (event) => {
         setEmail(event.target.value)
       };
     
       const [phone, setPhone] = useState(state.Organization.phone);
       const handleChangePhone = (event) => {
         setPhone(event.target.value)
       };
     
       const [status, setStatus] = useState(state.Organization.status==="Y");
       const handleChangeStatus = (event) => {
           setStatus(event.target.checked)
       };
     
       const [notificationP, setNotificationP] = useState(state.Organization.notification===2||state.Organization.notification===3);
       const handleChangeNotificationP = (event) => {
           setNotificationP(event.target.checked)
       };
       const [notificationE, setNotificationE] = useState(state.Organization.notification===1||state.Organization.notification===3);
       const handleChangeNotificationE = (event) => {
           setNotificationE(event.target.checked)
       };
     
       const org1 = state.top100Films
       const [organization, setOrganization] = useState(org1[0]);

       const handleNavigate = ()=>{
        navigate(-1)
      }
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
     console.log(userItem)
           dispatch(putUser(userItem));
     
       };
  return (
    <Card sx={style}>
{
  load?(
"load"
  ):(
    <form onSubmit={handleSaveUser}>

 
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
                  // disablePortal
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
              disabled
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
                         value={email}
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
                        value={phone}
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
              <FormControlLabel control={<Checkbox onChange={handleChangeNotificationE} checked={notificationE}/>} label="Email" />
              <FormControlLabel control={<Checkbox onChange={handleChangeNotificationP} checked={notificationP}/>} label="SMS" />
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

export default EditUserPage