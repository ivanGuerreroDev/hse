const Menus = [
  {
    id: '1',
    nombre: 'Observaciones',
    estado: true,
    image: require('./observaciones.png'),
    navigate: 'Submenu',
    menuLista: [
      {
        titulo: 'PAUTAS DE CONDUCTAS DE RIESGO',
        navigate: 'Fomulario Pauta'
      },
      {
        titulo: 'PRUEBA ENVIO INMEDIATO',
        navigate: 'Formulario Prueba'
      },
      {
        titulo: 'PAUTA DE CONTROL SEGÚN CRITERIOS FORESTAL MININCO',
        navigate: 'Formulario Pauta de control'
      },
      {
        titulo: 'ACTIVIDADES EN TERRENO',
        navigate: 'Formulario Actividades'
      },
    ],
    menuAcordeon: [/* 
      {
        id: '1',
        menuPadre: 'EQUIPOS O MAQUINARIAS',
        expand: false,
        menuhijo: [
          {
            id: '1',
            subtitulo: 'TRINEUMATICO',
            navigate: ''
          },
          {
            id: '2',
            subtitulo: 'SKIDDER',
            navigate: ''
          },
          {
            id: '3',
            subtitulo: 'CAMION',
            navigate: ''
          },
          {
            id: '4',
            subtitulo: 'CARGADOR FRONTAL',
            navigate: ''
          },
        ],
      },
      {
        id: '2',
        menuPadre: 'INSTALACIONES',
        expand: false,
        menuLista: [],
        menuAcordeon: [],
        menuhijo: [
          {
            id: '5',
            subtitulo: 'TALLER DE MANTENCIÓN',
            navigate: ''
          },
          {
            id: '6',
            subtitulo: 'OFICINAS',
            navigate: ''
          },
          {
            id: '7',
            subtitulo: 'FAENAS DE MOTOSIERRISTAS',
            navigate: ''
          },
          {
            id: '8',
            subtitulo: 'BODEGAS',
            navigate: ''
          },
          {
            id: '9',
            subtitulo: 'Grua',
            navigate: ''
          },
        ],
      } */
    ],
    menuCard: [/* 
      {
        tipo: 'Charla 5 minutos',
        titulo: 'Investigacion de accidentes',
        cargo: 'Prevencionista',
        navigate: ''
      } */
    ]
  },
  {
    id: '2',
    nombre: 'Inspecciones',
    estado: true,
    image: require('./inspecciones.png'),
    navigate: 'Submenu',
    menuLista: [],
    menuAcordeon: [
      {
        id: '1',
        menuPadre: 'EQUIPOS Y Herramientas',
        expand: false,
        menuhijo: [
          {
            id: '1',
            subtitulo: 'TRINEUMATICO',
            navigate: ''
          },
          {
            id: '2',
            subtitulo: 'SKIDDER',
            navigate: ''
          },
          {
            id: '3',
            subtitulo: 'CAMION',
            navigate: ''
          },
          {
            id: '4',
            subtitulo: 'CARGADOR FRONTAL',
            navigate: ''
          },
        ],
      },
      {
        id: '2',
        menuPadre: 'INSTALACIONES',
        expand: false,
        menuLista: [],
        menuAcordeon: [],
        menuhijo: [
          {
            id: '5',
            subtitulo: 'TALLER DE MANTENCIÓN',
            navigate: ''
          },
          {
            id: '6',
            subtitulo: 'OFICINAS',
            navigate: ''
          },
          {
            id: '7',
            subtitulo: 'FAENAS DE MOTOSIERRISTAS',
            navigate: ''
          },
          {
            id: '8',
            subtitulo: 'BODEGAS',
            navigate: ''
          },
          {
            id: '9',
            subtitulo: 'Grua',
            navigate: ''
          },
        ],
      },
      {
        id: '3',
        menuPadre: 'MAQUINARIAS Y VEHICULOS',
        expand: false,
        menuLista: [],
        menuAcordeon: [],
        menuhijo: [
          {
            id: '5',
            subtitulo: 'TALLER DE MANTENCIÓN',
            navigate: ''
          },
          {
            id: '6',
            subtitulo: 'OFICINAS',
            navigate: ''
          },
          {
            id: '7',
            subtitulo: 'FAENAS DE MOTOSIERRISTAS',
            navigate: ''
          },
          {
            id: '8',
            subtitulo: 'BODEGAS',
            navigate: ''
          },
          {
            id: '9',
            subtitulo: 'Grua',
            navigate: ''
          },
        ],
      }
    ],
    menuCard: []
  },
  {
    id: '3',
    nombre: 'Capacitaciones',
    estado: true,
    image: require('./capacitaciones.png'),
    navigate: 'Formulario',
    menuLista: [],
    menuAcordeon: [],
    menuCard: [
      {
        tipo: 'CHARLA DE 5 MINUTOS',
        titulo: 'Investigación de Accidentes',
        cargo: 'Conductores',
        navigate: ''
      },
      {
        tipo: 'INDUCCIÓN',
        titulo: 'Alarmas de Monóxido de Carbono',
        cargo: 'Supervisores',
        navigate: ''
      },
      {
        tipo: 'CAPACITACIÓN',
        titulo: 'Extintores de Incendio',
        cargo: 'Varios',
        navigate: ''
      },
      {
        tipo: 'CAPACITACIÓN',
        titulo: 'Prevención de las Lesiones de Columna',
        cargo: 'Varios',
        navigate: ''
      },
    ]
  },
  {
    id: '4',
    nombre: 'Alcohotest',
    estado: false,
    image: require('./alcohotest_off.png'),
    navigate: 'Formulario',
    menuLista: [],
    menuAcordeon: [],
    menuCard: []
  },

];

export default Menus;