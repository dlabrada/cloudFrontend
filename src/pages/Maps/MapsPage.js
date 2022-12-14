import * as React from 'react';
import {  useEffect, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
// import {} from 'react';
import {render} from 'react-dom';
import { Container} from '@mui/system';
import { Typography, Stack,Card, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

import {useDispatch,useSelector} from 'react-redux'
import { MapContainer, TileLayer, useMap, Marker,Popup } from 'react-leaflet'
import L from 'leaflet'
// const asd =require( "/assets/semaforo.png")

// import Map, {
//   Marker,
//   Popup,
//   NavigationControl,
//   FullscreenControl,
//   ScaleControl,
//   GeolocateControl
// } from 'react-map-gl';
// import { updateLocale } from 'moment';
import Moment from 'react-moment';
import{getMap} from '../../redux/mapDucks'

import USERLIST from '../../_mock/organization';
// import ControlPanel from './maps/control-panel';
// import Pin from './pin';

import Loading from '../../components/loading/Loading';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,

}));

// const markerIcon = new L.Icon({
//   iconUrl: asd
// })
const colores = [
  'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-black.png',
  'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png'
]
let iconNew = new L.Icon({
  iconUrl: colores[0],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const greenIcon = new L.Icon({
  iconUrl: colores[0],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const blueIcon = new L.Icon({
  iconUrl: colores[2],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const blackIcon = new L.Icon({
  iconUrl: colores[1],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const redIcon = new L.Icon({
  iconUrl: colores[3],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const yellowIcon = new L.Icon({
  iconUrl: colores[4],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
const TOKEN = 'pk.eyJ1IjoiZGxhYnJhZGE5MiIsImEiOiJja3V0NmRiaXkxamNnMm9wZ2pxNWpmdnQwIn0.UBQPlP-O4qqu5RYuWr0q5w'; // Set your mapbox token here

export default function Maps() {
  // const [popupInfo, setPopupInfo] = useState(null);

  const dispatch = useDispatch()

  const TRAFFICLIGTHLIST = useSelector(store=>store.map.array.TotalTraffic)
  const TotalTrafficOnline = useSelector(store=>store.map.array.TotalTrafficOnline)
  const TotalTrafficOffline = useSelector(store=>store.map.array.TotalTrafficOffline)
  const TotalTrafficEmpalme = useSelector(store=>store.map.array.TotalTrafficEmpalme)
  const TotalTrafficControl = useSelector(store=>store.map.array.TotalTrafficControl)
  const TotalTrafficLuces = useSelector(store=>store.map.array.TotalTrafficLuces)

 const user = JSON.parse(localStorage.getItem('usuario'))

  useEffect(()=>{
    dispatch(getMap());
   },[dispatch])

   useEffect(()=>{
    setTimeout(()=>{
        dispatch(getMap());
        console.log("cada 10 seg")
    },10000)

   },[TRAFFICLIGTHLIST])



  const marker = 
  TRAFFICLIGTHLIST?.map((mark,index)=>{
  let status = ""
  status= mark.statusTraffic===11111?("Operativo"):(
      mark.statusTraffic===10111?("Offline"):(
        mark.statusTraffic===11011?("Empalme"):(
          mark.statusTraffic===11101?("Control"):("Luces")
        )
      )
    )
    iconNew = mark.statusTraffic===11111?(greenIcon):(
      mark.statusTraffic===10111?(blueIcon):(
        mark.statusTraffic===11011?(blackIcon):(
          mark.statusTraffic===11101?(redIcon):(yellowIcon)
        )
      )
    )

   return (
         <Marker key={index} position={[mark.latitud, mark.longitud]}icon={iconNew} >      
                 <Popup>
                 <strong> Code: {mark.code} </strong> 
                  <hr/>   
                  <strong> Name: {mark.name} </strong> 
                  <br/>
                  <strong> Status: {status} </strong> 
                  <br/>
                  <strong> Actualizado el dia: 
                    <Moment format="DD/MM/YY">{mark.updatedAt}</Moment> 
                    a las: 
                    <Moment format="HH:mm:ss">{mark.updatedAt}</Moment>
                  </strong>   
                  <br/>
                  <strong> Location: {mark.latitud} y  {mark.longitud} </strong>      
               </Popup>
         </Marker>)
   
  }
  )
  return (
    <>
      <Helmet>
        <title> Maps | Tek Cloud </title>
      </Helmet>
      <Container >
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Stack direction={"column"} alignItems="center" justifyContent="space-between">
          <Item>
          <Typography variant="h4" gutterBottom>
            <img alt="country" src={user.photoUrl} style={{ width: 120 }} />
          </Typography>
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
              Total {TRAFFICLIGTHLIST?.length}
              </Item>
              <Item>
                Online {TotalTrafficOnline?.length}
              </Item>
              <Item>
                Offline {TotalTrafficOffline?.length}
              </Item>
          </Stack>
          <Stack direction={"column"} alignItems="end" justifyContent="flex-end" spacing={0.5} >
              <Item>
                Empalme {TotalTrafficEmpalme?.length}
              </Item>
              <Item>
              Control {TotalTrafficControl?.length}
              </Item>
              <Item>
              Luces {TotalTrafficLuces?.length}
              </Item>
          </Stack>
          </Stack>
          
        </Stack>
          <Card sx={{height:"30rem"}}>
          <MapContainer center={[-38.7407, -72.6056]} zoom={13} >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {
                marker
              }
            </MapContainer>
          </Card>      
      </Container>
    </>
  );
}
