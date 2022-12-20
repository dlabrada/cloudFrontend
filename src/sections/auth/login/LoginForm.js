import { useState,useEffect } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox,Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
// import AlertError from "../../../components/alerts/AlertsError"

// ----------------------------------------------------------------------

import { getAuth } from '../../../redux/authDucks';

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // !state.privilegios
  // const privilegios = state.privilegios

  // localStorage.setItem('authToken',"")
  const [showPassword, setShowPassword] = useState(false);

  const load = useSelector(store=>store.auth.loading)
  const err = useSelector(store=>store.auth.errorA)
  const succ = useSelector(store=>store.auth.successCreate)
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null );
  const [success,setSuccess]=useState(false );

   useEffect(()=>{
    console.log("load",load)
    console.log("loading",loading)
    setLoading(false)
    setError(err)
    setSuccess(succ)
   },[loading,succ,err])

   useEffect(()=>{
    setSuccess(succ)
       if(succ){
        console.log("todo ok")
        navigate('/dashboard');
        //  setError("")
        
        }else{
          
          console.log("hay errores")
          setError(err)
        }
     },[succ])

   const [code, setCode] = useState('');
   const handleChangeCode = (event) => {
     setCode(event.target.value);
   };

   const [password, setPassword] = useState('');
   const handleChangePassword = (event) => {
     setPassword(event.target.value);
   };
  const handleClick = () => {
    console.log(err)
    setLoading(true)
   const  data ={
      code,
      password
    }
    console.log("getAuth")
    dispatch(getAuth(data));

  };

  return (
    <>
                {
              error!==""  &&(
                <Stack sx={{ width: '100%' }} spacing={2} p={1} >
                <Alert severity="error">{error}</Alert>

                {/* <AlertError openT={err!==""} error={error} />      */}
              </Stack>
              )
              }
              
      <Stack spacing={3}>
        <TextField name="code" label="Usuario" onChange={handleChangeCode}/>

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={handleChangePassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <Checkbox name="remember" label="Remember me" /> */}
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading} onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
