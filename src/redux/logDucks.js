import axios from 'axios'
import { redirect } from 'react-router-dom'
// constantes 
const dataLog ={
    array:[],
    details:[],
    loading:true,
    loadingmodal:true,
}
const LOADING = "LOADING"
const LOADINGMODAL = "LOADINGMODAL"
const ERROR = "ERROR"
const GET_OBTENER_LOGS = 'GET_OBETENER_LOGS'
const GET_DETAILS_LOGS = 'GET_DETAILS_LOGS'

// reducer
export default function logReducer(state= dataLog,action){
    switch(action.type){
        case LOADING:
        return{ ...state,
            loading:true
        };
        case LOADINGMODAL:
            return{ ...state,
                loadingmodal:true
            };
        case ERROR:  // TODO 
            return{...state,
                array:[],
                loading:false,
                successCreate:false,
                error:action.payload.error,
            };
        case GET_OBTENER_LOGS:
            return {...state,
                array:action.payload.response,
                loading:false, 
                error:"", 
                success: action.payload.success,
                successCreate:false,
            };
        case GET_DETAILS_LOGS:
            return {...state,
                array:action.payload.response,
                loading:false, 
                error:"", 
                success: action.payload.success,
                successCreate:false,
            };
        default:
            return state;
    }
}

// acciones
// OBTENER INFORMACION
export const getLogs= ()=> async (dispatch,getState)=>{
    try{
            dispatch({
                type:LOADING
            });  

            // setTimeout(async ()=>{
                const token = localStorage.getItem('authToken')
        
                const config = {
                    method: 'get',
                    url: 'http://localhost:9090/api/event/sql',
                    headers: { 
                      'Content-Type': 'application/json',
                       'auth-token': token
                    }
                  };
                const res = await axios(config);
                dispatch({
                    type: GET_OBTENER_LOGS,
                    payload: res.data
                   }) 
            // },2000)

    }catch(error){
        console.log(error)
        dispatch({
            type:ERROR,
             payload:error.response.data
        });
    }
}

// CREAR ORGANIZACION
export const getDetails = (codeTraffic)=>async (dispatch,getState)=>{
    // const organizationList = getState().organization.array
    try {
        dispatch({
            type:LOADING
        });
        console.log(codeTraffic)
        const data = {           
            codeTraffic
      } ;

      const token = localStorage.getItem('authToken')
        
      const config = {
          method: 'post',
          url: 'http://localhost:9090/api/event/details/sql',
          headers: { 
            'Content-Type': 'application/json',
             'auth-token': token
          },
          data
        };
      const res = await axios(config);
        // setTimeout(async()=>{

        dispatch({
         type: GET_DETAILS_LOGS,
         payload: res.data,
        }) 

        // },2000)
        
    } catch (error) {
        console.log(error)
        dispatch({
            type:ERROR,
             payload:error.response.data
        });
    }
}

