import { sample } from 'lodash';

// ----------------------------------------------------------------------

const logs = [
    {
        id: '1',
        name: 'Pozo con Republica',
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
      },
      {
        id: '2',
        name: 'Pozo con Republica9',
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
      },
      {
        id: '3',
        name: 'Pozo con Republica2',
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
      },
      {
        id: '4',
        name: 'Pozo con Republica 1',
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
      },
];
  
  export default logs;