import axios from 'axios'
// constantes 
const dataUsers ={
    array:[],
    user:[],
    org:[],
    roles:[],
    logo:[],
    loading:false,   
    loading1:false,
    successCreate: false,
    success: false,
    error:""

}
const BaseUrl = "https://tekchile-cloud.cl"
const LOADING = "LOADING"
const LOADING1 = "LOADING1"
const ERROR = "ERROR"
const GET_OBTENER_USUARIOS = 'GET_OBETENER_USUARIOS'
const GET_OBTENER_USUARIOS_CODE = 'GET_OBETENER_USUARIOS_CODE'
const POST_CREAR_USUARIOS = 'POST_CREAR_USUARIO'
const DELETE_ELIMINAR_USUARIOS = 'DELETE_ELIMINAR_USUARIOS'
const PUT_EDITAR_USUARIOS = 'PUT_EDITAR_USUARIOS'

// reducer
export default function usuariosReducer(state= dataUsers,action){
    switch(action.type){
        case LOADING:
            return{ ...state,
                loading:true,
                loading1:false,
                success:false,
            };
            case LOADING1:
                return{ ...state,
                    loading1:true
                };
            case ERROR:  // TODO 
                return{...state,
                    array:[],
                    loading:false,
                    successCreate:false,
                    error:action.payload.error,
                };
             case GET_OBTENER_USUARIOS:
                return {...state,
                    array:action.payload.response,
                    logo:action.payload.logo,
                    roles:action.payload.roles,
                    org:action.payload.org,
                    loading:false, 
                    error:"", 
                    success: action.payload.success,
                    successCreate:false,
                };
        case GET_OBTENER_USUARIOS_CODE:
                return {...state,
                    user:action.response,
                    loading1:false,  
                };
        case POST_CREAR_USUARIOS:
            return{...state,
                // array:action.payload.response,
                loading:false,  
                // success: action.payload.success,
                successCreate: action.payload.success,
        };
        case DELETE_ELIMINAR_USUARIOS:
            return{...state,
                // array:action.payload.response,
                loading:false,  
                // success: action.payload.success,
                successCreate: action.payload.success,
        };
        case PUT_EDITAR_USUARIOS:
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

// // acciones
export const getUser= ()=> async (dispatch)=>{
    try{
       // console.log("usuarios "+getState().usuarios.dataPost)
       dispatch({
        type:LOADING
    });

    const token = localStorage.getItem('authToken')
        
    const config = {
        method: 'get',
        url: `${BaseUrl}/api/users/sql`,
        headers: { 
          'Content-Type': 'application/json',
           'auth-token': token
        }
      };
    const res = await axios(config);
     
       dispatch({
        type: GET_OBTENER_USUARIOS,
        payload: res.data
       }) 

    }catch(error){
        
        dispatch({
            type:ERROR,
             payload:error.response.data
        }); 
    }
}


export const postUser = (userItems) => async (dispatch)=>{
    const {code,name,organization,notification,email,phone,rol,password,logo,status} = userItems;
    try {
        dispatch({
            type:LOADING
        });
        const data = {
            code,
            name,
            logo,
            organization,
            notification,
            email,
            phone,
            rol,
            status,
            password,
            createdBy:"Dlabrada",
            updatedBy:"Juean"
      }
      
      const token = localStorage.getItem('authToken')
        
      const config = {
          method: 'post',
          url: `${BaseUrl}/api/users/sql`,
          headers: { 
            'Content-Type': 'application/json',
             'auth-token': token
          },
          data
        };
      const res = await axios(config);

    
       dispatch({
        type: POST_CREAR_USUARIOS,
        payload: res.data
       }) 
    } catch (error) {
        
        dispatch({
            type:ERROR,
             payload:error.response.data
        }); 
    }
}

export const deleteUser = (code) => async(dispatch)=>{
    try {
        dispatch({
            type:LOADING
        });
       
        const token = localStorage.getItem('authToken')
            const config = {
                method: 'delete',
                url: `${BaseUrl}/api/users/sql`,
                headers: { 
                  'Content-Type': 'application/json',
                  'auth-token': token
                },
                data : {code}
              };

            const resDelete = await axios(config);
                dispatch({
                    type: DELETE_ELIMINAR_USUARIOS,
                    payload: resDelete.data
                }) 

    } catch (error) {
        dispatch({
            type:ERROR,
             payload:error.response.data
        }); 
    }
   
}

export const putUser = (users) => async(dispatch)=>{
    try {
        dispatch({
            type:LOADING
        });
        const {code,name,organization,notification,email,phone,rol,password,logo,status} = users;
     const data={code,name,organization,notification,email,phone,rol,password,logo,status,  createdBy:"Dlabrada",
     updatedBy:"Juean"}
     const token = localStorage.getItem('authToken')
      const config = {
        method: 'put',
        url: `${BaseUrl}/api/users/sql`,
        headers: { 
          'Content-Type': 'application/json',
          'auth-token': token
        },
        data 
      };
     const res = await axios(config)
      dispatch({
        type: PUT_EDITAR_USUARIOS,
        payload: res.data
       }) 
        
    } catch (error) {
     
        dispatch({
            type:ERROR,
             payload:error.response.data
        }); 
    }
}