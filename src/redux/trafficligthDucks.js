import axios from 'axios'
// constantes 
const dataTrafficligth ={
    array:[],
    org:[],
    loading:false,   
    loading1:false,
    successCreate: false,
    success: false,
    error:""
}
const BaseUrl = "https://tekchile-cloud.cl"
const LOADING = "LOADING"
const ERROR = "ERROR"
const GET_OBTENER_TRAFFICLIGTH = 'GET_OBETENER_TRAFFICLIGTH'
const GET_OBTENER_TRAFFICLIGTH1 = 'GET_OBETENER_TRAFFICLIGTH1'
const POST_CREAR_TRAFFICLIGTH = 'POST_CREAR_TRAFFICLIGTH'
const PUT_EDITAR_TRAFFICLIGTH = 'PUT_EDITAR_TRAFFICLIGTH'
const DELETE_ELIMINAR_TRAFFICLIGTH = 'DELETE_ELIMINAR_TRAFFICLIGTH'

// reducer
export default function trafficligthReducer(state= dataTrafficligth,action){
    switch(action.type){
        case LOADING:
        return{ ...state,
            loading:true,
            loading1:false,
            success:false,
        };
        case ERROR:  // TODO 
            return{...state,
                array:[],
                loading:false,
                successCreate:false,
                error:action.payload.error,
            };
        case GET_OBTENER_TRAFFICLIGTH:
            return {...state,
                array:action.payload.response,
                org:action.payload.org,
                loading:false, 
                error:"", 
                success: action.payload.success,
                successCreate:false,
            };
            case GET_OBTENER_TRAFFICLIGTH1:
                return {...state,
                    array:action.payload.response,
                    loading:false, 
                    error:"", 
                    success: action.payload.success,
                    successCreate:false,
                };
        case POST_CREAR_TRAFFICLIGTH:
            return{...state,
                // array:action.payload.response,
                loading:false,  
                successCreate: action.payload.success,
        } ;
        case PUT_EDITAR_TRAFFICLIGTH:
            return{...state,
                // array:action.payload.response,
                loading:false,  
                // success: false,
                successCreate: action.payload.success,
            };
        case DELETE_ELIMINAR_TRAFFICLIGTH:
            return{...state,
                // array:action.payload.response,
                loading:false,  
                // success: action.payload.success,
                successCreate: action.payload.success,
        };
        default:
            return state;
    }
}

// acciones
// OBTENER INFORMACION
export const getTrafficligth= ()=> async (dispatch)=>{
    try{
            dispatch({
                type:LOADING
            });  
            
            const token = localStorage.getItem('authToken')
       
            const config = {
                method: 'get',
                url:`${BaseUrl}/api/trafficligth/sql`,
                headers: { 
                  'Content-Type': 'application/json',
                   'auth-token': token
                }
              };
            const res = await axios(config);
                dispatch({
                    type: GET_OBTENER_TRAFFICLIGTH,
                    payload: res.data
                   }) 

    }catch(error){
      
        dispatch({
            type:ERROR,
             payload:error.response.data
        }); 
    }
}

// CREAR ORGANIZACION
export const postTrafficligth = (trafficligth)=>async (dispatch)=>{

    try {
        dispatch({
            type:LOADING
        });
      const {code,name,status,latitud,longitud,token,organization} = trafficligth;
        const data = {
            code,
            name,
            status,
            organization,
            statusTraffic:10111,
            latitud,
            longitud,
            token,
            createdBy:"Dlabrada",
            updatedBy:"Juean"
      } ;

        const tokenWeb = localStorage.getItem('authToken')
        
        const config = {
            method: 'post',
            url:`${BaseUrl}/api/trafficligth/sql`,
            headers: { 
              'Content-Type': 'application/json',
               'auth-token': tokenWeb
            },
            data
          };
        const res = await axios(config);

        dispatch({
         type: POST_CREAR_TRAFFICLIGTH,
         payload: res.data,
        }) 

        
    } catch (error) {
        dispatch({
            type:ERROR,
             payload:error.response.data
        }); 
    }
}

// EDITAR ORGANIZATION
export const putTrafficligth = (trafficligth)=>async (dispatch)=>{

    try {
        dispatch({
            type:LOADING
        });

      const {code, name,organization,status,latitud,statusTraffic,longitud,token, createdBy,updatedBy} = trafficligth;
      // Se debe crear con data para que el backend lo reconzoa automaticamente

        const data = {
            code, name,organization,status,latitud,statusTraffic,longitud,token, createdBy,updatedBy
      } ;

      const tokenWeb = localStorage.getItem('authToken')
        
      const config = {
          method: 'put',
          url: `${BaseUrl}/api/trafficligth/sql`,
          headers: { 
            'Content-Type': 'application/json',
             'auth-token': tokenWeb
          },
          data
        };

    const response = await axios(config);


      dispatch({
          type: PUT_EDITAR_TRAFFICLIGTH,
          payload: response.data
      }) 
      
    } catch (error) {
        dispatch({
            type:ERROR,
            payload:error.response.data
        }); 
    }
}
// TODO: Faltan todas las validaciones
export const deleteTrafficligth = (code) => async(dispatch)=>{

    try {
        dispatch({
            type:LOADING
        });
        console.log(code)
        const token = localStorage.getItem('authToken')
        
      const config = {
                method: 'delete',
                url: `${BaseUrl}/api/trafficligth/sql`,
          headers: { 
            'Content-Type': 'application/json',
             'auth-token': token
          },
          data : {code}
     
        };

            const resDelete = await axios(config);

                dispatch({
                    type: DELETE_ELIMINAR_TRAFFICLIGTH,
                    payload: resDelete.data
                }) 
      

    } catch (error) {
        dispatch({
            type:ERROR,
             payload:error.response.data
        }); 
    }
   
}