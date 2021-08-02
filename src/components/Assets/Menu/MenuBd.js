const Menus = [
  {
    id: '1',
    nombre: 'Observaciones',
    estado: true,
    image: require('./observaciones.png'),
    navigate: 'Submenu',
    menuLista: [
      {
        titulo: 'Pautas de conductas de riesgo',
        navigate: ''
      }
    ],
    menuAcordeon: [
      {
        titulo: 'Equipos o Maquinarias',
        subTitulo: [
          {
            subtitulo: 'Trineumatico',
            navigate: ''
          },
          {
            subtitulo: 'Skidder',
            navigate: ''
          },
          {
            subtitulo: 'Camion',
            navigate: ''
          },
        ],
      }
    ],
    menuCard: [
      {
        tipo: 'Charla 5 minutos',
        titulo: 'Investigacion de accidentes',
        cargo: 'Prevencionista',
        navigate: ''
      }
    ]
  },
  {
    id: '2',
    nombre: 'Inspecciones',
    estado: true,
    image: require('./inspecciones.png'),
    navigate: 'Submenu'
  },
  {
    id: '3',
    nombre: 'Capacitaciones',
    estado: true,
    image: require('./capacitaciones.png'),
    navigate: 'Formulario'
  },
  {
    id: '4',
    nombre: 'Alcohotest',
    estado: false,
    image: require('./alcohotest_off.png'),
    navigate: 'Formulario'
  },

];

export default Menus;