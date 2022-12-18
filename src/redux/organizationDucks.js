import axios from 'axios'
// constantes 
const dataOrganization ={
    array:[],
    loading:false,   
    loading1:false,
    successCreate: false,
    success: false,
    error:""
}
const BaseUrl = "http://137.184.201.232"
const LOADING = "LOADING"
const LOADING1 = "LOADING1"
const ERROR = "ERROR"
const GET_OBTENER_ORGANIZATION = 'GET_OBETENER_ORGANIZATION'
const CODE_OBTENER_ORGANIZATION = 'CODE_OBETENER_ORGANIZATION'
const POST_CREAR_ORGANIZATION = 'POST_CREAR_ORGANIZATION'
const PUT_EDITAR_ORGANIZATION = 'PUT_EDITAR_ORGANIZATION'
const DELETE_ELIMINAR_ORGANIZATION = 'DELETE_ELIMINAR_ORGANIZATION'

// reducer
export default function organizationReducer(state= dataOrganization,action){
    switch(action.type){
        case LOADING:
        return{ ...state,
            loading:true,
            loading1:false,
            success:false,
        };
        case LOADING1:
            return{ ...state,
                loading:false,
                loading1:true,
                success:false,
            };
        case ERROR:  // TODO 
            return{...state,
                array:[],
                loading:false,
                successCreate:false,
                error:action.payload.error,
            };
        case GET_OBTENER_ORGANIZATION:
            return {...state,
                array:action.payload.response,
                loading:false, 
                error:"", 
                success: action.payload.success,
                successCreate:false,
            };
        case CODE_OBTENER_ORGANIZATION:
                return {...state,
                    array:action.payload.response,
                    loading:false, 
                    error:"", 
                    success: action.payload.success,
                    successCreate:false,
                };
        case POST_CREAR_ORGANIZATION:
            return{...state,
                // array:action.payload.response,
                loading:false,  
                successCreate: action.payload.success,
        } ;
        case PUT_EDITAR_ORGANIZATION:
            return{...state,
                // array:action.payload.response,
                loading:false,  
                // success: false,
                successCreate: action.payload.success,
            };
        case DELETE_ELIMINAR_ORGANIZATION:
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
export const loading =()=> async (dispatch)=>{
    try {
        dispatch({
            type:LOADING
        });  
        
    } catch (error) {
        console.log(error)
    }
}

// OBTENER INFORMACION
export const getOrganization= ()=> async (dispatch)=>{
    try{
            dispatch({
                type:LOADING
            });  

            const token = localStorage.getItem('authToken')
            
            const config = {
                method: 'get',
                url: `${BaseUrl}:9090/api/organization/sql`,
                headers: { 
                  'Content-Type': 'application/json',
                   'auth-token': token
                }
              };
            const res = await axios(config);
            
            setTimeout(async ()=>{
        
                dispatch({
                    type: GET_OBTENER_ORGANIZATION,
                    payload: res.data
                   }) 
           },1000)

    }catch(error){
        // console.log(error.response.data)
        dispatch({
            type:ERROR,
             payload:error.response.data
        }); 

    }
}

// No se esta ocupando
export const getOrganizationCreate= ()=> async (dispatch)=>{
    try{
            dispatch({
                type:LOADING
            });  

            const token = localStorage.getItem('authToken')
           
            const config = {
                method: 'get',
                url:  `${BaseUrl}:9090/api/organization/create/sql`,
                headers: { 
                  'Content-Type': 'application/json',
                   'auth-token': token
                }
              };
            await axios(config);

    }catch(error){
        dispatch({
            type:ERROR,
             payload:error.response.data
        }); 

    }
}

// CREAR ORGANIZACION
export const postOrganization = (organization)=>async (dispatch)=>{
    try {
        dispatch({
            type: LOADING,
            
           }) 
      const {code,name,photoUrl,status,latitud,longitud} = organization;
        const data = {
            code,
            name,
            photoUrl,
            status,
            latitud,
            longitud,
            createdBy:"Dlabrada",
            updatedBy:"Juean"
      } ;
        // setTimeout(async()=>{

        const token = localStorage.getItem('authToken')
        
        const config = {
            method: 'post',
            url: `${BaseUrl}:9090/api/organization/sql`,
            headers: { 
              'Content-Type': 'application/json',
               'auth-token': token
            },
            data
          };
        const res = await axios(config);

        dispatch({
         type: POST_CREAR_ORGANIZATION,
         payload: res.data
        }) 
        // },3000)
        
    } catch (error) {
        
        dispatch({
            type:ERROR,
             payload:error.response.data
        }); 
    }
}

// OBTENER POR ID (nO SE ESTA OCUPANDO)
export const getCodeOrganization= (code)=> async (dispatch)=>{
    try{
        dispatch({
            type: LOADING,
            
           }) 
        const config = {
            method: 'post',
            url: `${BaseUrl}:9090/api/organization/sql/find`,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : {code}
          };

        const res = await axios(config);
        
        // setTimeout(()=>{ 
           
            dispatch({
                type: CODE_OBTENER_ORGANIZATION,
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

// EDITAR ORGANIZATION
export const putOrganization = (organization)=>async (dispatch)=>{

    try {
        dispatch({
            type:LOADING
        });
        const token = localStorage.getItem('authToken')

      const {code, name,photoUrl,status,latitud,longitud,createdBy,updatedBy} = organization;
    //   setTimeout(async ()=>{
        const data = {
            code,
            name,
            photoUrl,
            status,
            latitud,
            longitud,
            createdBy,
            updatedBy
      } ;
      
      const config = {
        method: 'put',
        url: `${BaseUrl}:9090/api/organization/sql`,
        headers: { 
          'Content-Type': 'application/json',
           'auth-token': token
        },
        data
      };

    const res = await axios(config);
      dispatch({
          type: PUT_EDITAR_ORGANIZATION,
          payload: res.data
      }) 
    //   console.log(getState().organization.loading)
        // },2000)
      
    } catch (error) {
      
        dispatch({
            type:ERROR,
             payload:error.response.data
        }); 
    }
}
// TODO: Faltan todas las validaciones
export const deleteOrganization = (code) => async(dispatch)=>{

    try {
        dispatch({
            type:LOADING
        });
    
        const token = localStorage.getItem('authToken')
        
        const config = {
            method: 'delete',
            url: `${BaseUrl}:9090/api/organization/sql`,
            headers: { 
              'Content-Type': 'application/json',
               'auth-token': token
            },
            data:{code}
          };
            const res = await axios(config);
       
         
            // setTimeout(()=>{ 
               
                dispatch({
                    type: DELETE_ELIMINAR_ORGANIZATION,
                    payload: res.data
                }) 
            // },2000)

    } catch (error) {

        dispatch({
            type:ERROR,
             payload:error.response.data
        }); 
    }
   
}