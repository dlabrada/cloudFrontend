import * as React from 'react';
import {  useEffect, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
// import {} from 'react';
import {render} from 'react-dom';
import { Container} from '@mui/system';
import { Typography, Stack,Card, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

import {useDispatch,useSelector} from 'react-redux'


import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';
import { updateLocale } from 'moment';

import{getTrafficligth} from '../../redux/trafficligthDucks'

import USERLIST from '../../_mock/organization';
// import ControlPanel from './maps/control-panel';
import Pin from './pin';

import Loading from '../../components/loading/Loading';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,

}));

const TOKEN = 'pk.eyJ1IjoiZGxhYnJhZGE5MiIsImEiOiJja3V0NmRiaXkxamNnMm9wZ2pxNWpmdnQwIn0.UBQPlP-O4qqu5RYuWr0q5w'; // Set your mapbox token here

export default function Maps() {
  const [popupInfo, setPopupInfo] = useState(null);

  const dispatch = useDispatch()
  const TRAFFICLIGTHLIST = useSelector(store=>store.trafficligth.array)
  const load = useSelector(store=>store.trafficligth.loading)
  const [loading,setLoading]=useState(false);
  const time = new Date();
  const [hora,setHora]=useState(time)
  useEffect(()=>{
    dispatch(getTrafficligth());
    console.log(hora)
    setLoading(load)
   },[dispatch])

   const [update,setUpdate]= useState(0)
   const handleUpdate = ()=>{
    dispatch(getTrafficligth());
    let aum = 0
    aum=update+1 
 setUpdate(aum)
 console.log(update)
   }
   useEffect(()=>{
    setLoading(load)
    console.log(TRAFFICLIGTHLIST)
   },[load])

// setInterval(()=>{
//   // let value = 0;
//   // dispatch(getTrafficligth());
//   // if(value==='4'){
//   //   console.log("first")
//   //   console.log(value)
//   //   value=0
//   // }else{
//   //   value+=1
//   // }

// },5000)
  const pins = useMemo(
    () =>

      TRAFFICLIGTHLIST.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.longitud}
          latitude={city.latitud}
          anchor="bottom"
          onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(city);
          }}
        >
          <Pin status={city.statusTraffic} />
        </Marker>
      ))
    
    ,
    [load,update]
  );

  return (
    <>
      <Helmet>
        <title> Maps | Tek Cloud </title>
      </Helmet>
      {loading?(
        <Loading/>
      ):(
      <Container >
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Stack direction={"column"} alignItems="center" justifyContent="space-between">
          <Item>
          <Typography variant="h4" gutterBottom>
            <img alt="country" src={USERLIST[0].photoURL} style={{ width: 120 }} />
            </Typography>
          </Item> 
          <Item>
            <button onClick={handleUpdate}>Actualizar</button>
          </Item>
          </Stack >
          <Stack direction={"column"} alignItems="center" justifyContent="space-between">
          <Item>
          {/* {hora} */}
    
          </Item> 
          </Stack >
          <Stack justifyContent="flex-start" alignContent={"start"} direction={"row"} spacing={1} >
          <Stack direction={"column"} alignItems="end" justifyContent="flex-end" spacing={0.5} >
              <Item>
              Total {TRAFFICLIGTHLIST.length}
              </Item>
              <Item>
                Online
              </Item>
              <Item>
                Offline
              </Item>
          </Stack>
          <Stack direction={"column"} alignItems="end" justifyContent="flex-end" spacing={0.5} >
              <Item>
                Empalme
              </Item>
              <Item>
              Control
              </Item>
              <Item>
              Luces
              </Item>
          </Stack>
          </Stack>
          

        </Stack>
          <Card sx={{height:"30rem"}}>
            <Map

              initialViewState={{
                latitude: -38.7407, 
                longitude: -72.6056,
                zoom: 12,
                bearing: 0,
                pitch: 0
              }}

              mapStyle="mapbox://styles/mapbox/streets-v11"
              mapboxAccessToken={TOKEN}
              >
              <GeolocateControl  position="top-left"/>
              <FullscreenControl  position="top-left" />
              <NavigationControl   position="top-left"/>
              <ScaleControl />

              {
            
                   pins
             
           
              }

              {popupInfo && (
                <Popup
                  anchor="top"
                  longitude={Number(popupInfo.longitud)}
                  latitude={Number(popupInfo.latitud)}
                  onClose={() => setPopupInfo(null)}
                >
                  <div>
                  <strong>Informacion</strong> 
                    <hr/>
                  <strong>Interseccion:</strong>  {popupInfo.name}
                  <br/>
                  <strong>Estado:</strong>  {popupInfo.statusTraffic}
                  <br/>
                  <strong>Actualizacion:</strong>  {popupInfo.updatedAt}
                  <br/>
                  <strong>Ubicacion:</strong>  Lat:{popupInfo.latitud} y Log:{popupInfo.longitud}
                  </div>
                  {/* <img width="100%" src={popupInfo.image} alt="imagen"/> */}
                </Popup>
              )}
            </Map>
          </Card>
         
      </Container>

      )}
      
     
    </>
  );
}

export function renderToDom(container) {
  render(<Maps />, container);
}