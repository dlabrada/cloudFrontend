import axios from 'axios'
// constantes 
const dataMaps ={
    array:[],
    loadingmap:false,
}
const BaseUrl = "http://137.184.201.232"
const LOADING = "LOADING"
const ERROR = "ERROR"
const GET_OBTENER_MAP = 'GET_OBETENER_MAP'


// reducer
export default function mapReducer(state= dataMaps,action){
    switch(action.type){
        case LOADING:
        return{ ...state,
            loadingmap:true
        };
        case ERROR:  // TODO 
        return{...state,
            array:[],
            loading:false,
            successCreate:false,
            error:action.payload.error,
        };
        case GET_OBTENER_MAP:
            return {...state,
                array:action.payload,
                loadingmap:false,    
            };
        default:
            return state;
    }
}

// acciones
// OBTENER INFORMACION
export const getMap= ()=> async (dispatch)=>{
    try{
            // setTimeout(async ()=>{
                const token = localStorage.getItem('authToken')
                
                const config = {
                    method: 'get',
                    url: `${BaseUrl}:9090/api/trafficligth/maps/sql`,
                    headers: { 
                      'Content-Type': 'application/json',
                       'auth-token': token
                    }
                  };
                const res = await axios(config);

                dispatch({
                    type: GET_OBTENER_MAP,
                    payload: res.data
                   }) 
            // },2000)

    }catch(error){
       
        dispatch({
            type:ERROR,
             payload:error.response.data
        });
    }
}
