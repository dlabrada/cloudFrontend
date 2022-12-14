import axios from 'axios'
// constantes 
const dataMaps ={
    userActive:[],
    loading:false,
    error:"",
    errorA:""
}
const LOADING = "LOADING"
const ERROR1 = "ERROR1"
const GET_OBTENER_TOKEN = 'GET_OBETENER_TOKEN'
const GET_OBTENER_VALIDATE = 'GET_OBETENER_VALIDATE'
const GET_LOGOUT = 'GET_LOGOUT'


// reducer
export default function authReducer(state= dataMaps,action){
    switch(action.type){
        case LOADING:
            return{ ...state,
                loadingmap:true
            };
         case ERROR1:  // TODO 
            return{...state,
                userActive:[],
                loading:false,
                successCreate:false,    
                errorA:action.payload.error,
            };
        case GET_OBTENER_TOKEN:
            return {...state,
                userActive:action.payload.user,
                errorA:"",
                loading:false,  
                successCreate: action.payload.success,
            };
        case GET_OBTENER_VALIDATE:
                return {...state,
                    userActive:action.payload.user,
                    loading:false,  
                    successCreate: action.payload.success,
                    errorA:"",
                };
        case GET_LOGOUT:
                return {...state,
                        userActive:[],
                        loading:false,  
                        successCreate: false,
                        errorA:"Success Logout",
                    };
        default:
            return state;
    }
}

// acciones
// OBTENER INFORMACION
export const getAuth= (data)=> async (dispatch,getState)=>{
    try{
            dispatch({
                type:LOADING
            });  
            // setTimeout(async ()=>{
                const res = await axios.post('http://localhost:9090/api/login',data);
                dispatch({
                    type: GET_OBTENER_TOKEN,
                    payload: res.data
                   }) 
            // },2000)
            localStorage.setItem('authToken',res.data.response.token)
            localStorage.setItem("usuario", JSON.stringify(res.data.user));
    }catch(error){
        console.log(error)
        dispatch({
            type:ERROR1,
             payload:error.response.data
        });
    }
}

export const getValidate= ()=> async (dispatch,getState)=>{
    try{
            // dispatch({
            //     type:LOADING
            // });
            // console.log("se ejecuto")
            // setTimeout(async ()=>{
                const token = localStorage.getItem('authToken')
        
                const config = {
                    method: 'post',
                    url: 'http://localhost:9090/api/validate',
                    headers: { 
                      'Content-Type': 'application/json',
                       'auth-token': token
                    }
                  };
                const res = await axios(config);
                dispatch({
                    type:GET_OBTENER_VALIDATE,
                     payload:res.data
                });
                localStorage.setItem("usuario", JSON.stringify(res.data.user));
                // console.log(res.data.user)
            // },2000)
    }catch(error){
        console.log(error)
        dispatch({
            type:ERROR1,
             payload:error.response.data
        });
    }
}

export const getLogout= ()=> async (dispatch,getState)=>{
    try{           
        console.log("logout")
        localStorage.clear()
                dispatch({
                    type:GET_LOGOUT,
                     payload:"Success Logout"
                });
     
    }catch(error){
        console.log(error)
        // dispatch({
        //     type:ERROR1,
        //      payload:error.response.data
        // });
    }
}