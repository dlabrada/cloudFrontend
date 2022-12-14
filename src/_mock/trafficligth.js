import { sample } from 'lodash';
// ----------------------------------------------------------------------

const trafficligth = [
    {
        id: '1',
        name: 'Pozo con Republica',
        latitude:-38.7383229498277,
        longitud: -72.59806505441291,
        status: sample([
         " Operativo",
          "Offline",
         "EmpalmeOff",
          "ControladorOff",
          "LucesOff",
        ]),
        organization:sample([
          "Temuco",
          "Padre_Las_Casas",
          "Labranza",
        ]),
        updateTraffic:"13123131",
        token:"1qazxsw2",
        createdBy:"Rodolfo",
        createdAt:"1222311332",
        updateBy:"Pedro",
        updateAt:"313213213",

      },
      {
        id: '2',
        name: 'Pozo con Republica',
        latitude:-38.7383229498277,
        longitud: -72.59806505441291,
        status: sample([
          "Operativo",
          "Offline",
          "EmpalmeOff",
          "ControladorOff",
          "LucesOff",
        ]),
        organization:sample([
          "Temuco",
          "Padre_Las_Casas",
          "Labranza",
        ]),
        updateTraffic:"13123131",
        token:"1qazxsw2",
        createdBy:"Rodolfo",
        createdAt:"1222311332",
        updateBy:"Pedro",
        updateAt:"313213213",

      },
      {
        id: '3',
        name: 'Pozo con Republica2',
        latitude:-38.7383729498277,
        longitud: -72.5985650544191,
        status: sample([
          "Operativo",
          "Offline",
          "EmpalmeOff",
          "ControladorOff",
          "LucesOff",
        ]),
        organization:sample([
          "Temuco",
          "Padre_Las_Casas",
          "Labranza",
        ]),
        updateTraffic:"13123131",
        token:"1qazxsw2",
        createdBy:"Rodolfo",
        createdAt:"1222311332",
        updateBy:"Pedro",
        updateAt:"313213213",

      },
      {
        id: '4',
        name: 'Pozo con Republica 1',
        latitude:-38.7380229498277,
        longitud: -72.59106505441291,
        status: sample([
          "Operativo",
          "Offline",
          "EmpalmeOff",
          "ControladorOff",
          "LucesOff",
        ]),
        organization:sample([
          "Temuco",
          "Padre_Las_Casas",
          "Labranza",
        ]),
        updateTraffic:"13123131",
        token:"1qazxsw2",
        createdBy:"Rodolfo",
        createdAt:"1222311332",
        updateBy:"Pedro",
        updateAt:"313213213",

      },
];
  
  export default trafficligth;