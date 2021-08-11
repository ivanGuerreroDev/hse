# **Zimexa HSE**

## **Descripción**
Aplicación móvil que integra formularios dinámicos para la ejecución de módulos de Zimexa.

Desarrollada con `React Native` y `Typescript`.

## **Configuración**
En esta sección se detallan los pasos y requisitos para la correcta instalación y ejecución del proyecto.

## Requisitos:
* Node v16.0.0 o superior
* React Native CLI v2.0.1 o superior (package)
* Yarn (package)
* Android Studio o Android SDK tools (si se usa un dispositivo físico)
* XCode (para la la ejecución en ios)

## Instalación:
El proyecto está preparado con el manejador de paquetes `Yarn`, para la primera instalación de los paquetes ejecute:
```
yarn install
```

Una vez instalado los paquetes y la carpeta `node_modules` generada, ejecute el siguiente comando para lanzar la app en Android:
```
react-native run-android
```
o para ios:
```
react-native run-ios
```

## **Estructura de la App**
En esta sección se detalla la estructura en árbol de los archivos y carpetas (se omiten los archivos y carpetas generados por `React Native`)
```
.
├─ src
│   ├─ components
│   │   ├─ Assets
│   │   ├─ Lottie
│   │   └─ Theme
│   ├─ state
│   │   ├─ store
│   │   │   ├─ reducers.ts
│   │   │   └─ store.ts
│   │   └─ <Identidad>
│   │   │   ├─ actions.ts
│   │   │   ├─ reducers.ts
│   │   │   ├─ thunk.ts
│   │   │   └─ types.ts
│   ├─ utils
│   │   └─ types
│   ├─ views
│   │   └─ <SubApp>
│   └─ index.tsx
└─ App.tsx
```

### src `(./src)`:
Carpeta contenedora del proyecto en general, a excepción de `App.tsx` y los archivos generados por `React Native` no se debería crear nada fuera de esta carpeta

### components `(./src/components)`:
Carpeta contenedora de todos los componentes genéricos de la app (no relacionados a una subapp)

### Assets `(./src/components/Assets)`:
Carpeta contenedora de todos los archivos estáticos (audios, iconos, imágenes, etc.)

### Lottie `(./src/components/Lottie)`:
Carpeta contenedora del componente `Lottie` (pantalla de carga animada)

### Theme `(./src/components/Theme)`:
Carpeta contenedora de los temas genéricos de la app, estos temas son utilizados por `ThemeProvider`correspondiente a `react-native-elements`

### state `(./src/state)`:
Carpeta contenedora de las configuraciones y almacenamientos manejados por `Redux`

### store `(./src/state/store)`:
Carpeta contenedora de las configuraciones correspondiente a `Redux`y sus dependencias y middlewares

### reducers.ts `(./src/state/store/reducers.ts)`:
Archivo que combina todos los reducers de las `<Identidades>`, cada vez que se cree un nuevo reducer, se debe registrar en este archivo

### store.ts `(./src/state/store/store.ts)`:
Archivo de configuración de `Redux` contiene las configuraciones necesarias para el almacenamiento persistente y los middlewares como `Redux Thunk`

### \<Identidad> `(./src/state/<Identidad>)`:
Por cada identidad que se necesite almacenar o manejar globalmente, se debe crear una nueva carpeta, por ejemplo para el almacenamiento de los usuarios la carpeta `users`

### actions.ts `(./src/state/<Identidad>/actions.ts)`:
Archivo con funciones correspondientes a acciones síncronas de la `<Identidad>` (acciones de efecto inmediato)

### reducers.ts `(./src/state/<Identidad>/reducers.ts)`:
Archivo que contiene los reducers correspondientes a la `<Identidad>`. Aquí se realizan las llamadas a los stores.

### thunk.ts `(./src/state/<Identidad>/thunk.ts)`:
Archivo con funciones correspondientes a acciones asíncronas de la `<Identidad>` (acciones de efcto tardío, como la carga de datos de fuentes externas)

### types.ts `(./src/state/<Identidad>/types.ts)`:
Archivo con las declaraciones de interfaces y tipos específicos de la `<Identidad>`. Estas declaraciones son de uso directo para `Redux`, para otro tipo de declaraciones se deben crear en `./src/utils/types`

### utils `(./src/utils)`:
Carpeta contenedora de funciones y declaraciones de uso común en la app. Para evitar archivos demasiado largos, se deben segmentar las funciones en archivos según su identidad u objetivo de las funciones, por ejemplo para las funciones que validen datos, se pueden guardar en un archivo `validadores.ts`. Si es necesario (archivos extremadamente largos) la segmentación se puede realizar con carpetas, y dentro de estas crear archivo correspondientes al segmento

### types `(./src/utils/types)`:
Subcarpeta de `utils`, contiene exclusivamente las declaraciones de interfaces y tipos, igual al punto anterior, si es necesario, se deben segmentar las declaraciones en archivos, carpetas o ambos

### views `(./src/views)`:
Carpeta contenedora de componentes (generalmente pantallas), los componentes deben crearse en la carpeta de la SubApp correspondiente

### \<SubApp> `(./src/views/<SubApp>)`:
Por cada SubApp definida (`Autenticación`, `Formularios`, `App Principal`) se debe crear una carpeta, dentro de esta se crean los componentes necesarios, los que deben ser mayormente código `JSX` dejando las funciones complejas en `utils`. Cada componente debe crearse en un archivo independiente, si es necesario se pueden crear subcarpetas para agrupar los componentes

### index.tsx `(./src/index.tsx)`:
Archivo que contiene las cargas de pantallas organizadas por el navegador y la pantalla Lottie

### App.tsx `(./App.tsx)`:
Archivo que contiene la carga inicial de la app, incluye los proveedores que se inyectan en la app como el proveedor de temas o de almacenamiento

## **Versionado**
Se debe usar versionado semántico (Major.Minor.Patch) para que sea mas entendible el motivo de actualización, la división del versionado consiste en:
* **Patch**: Consiste en los cambios internos, como correcciones de errores o mejoras de código, que no afecten a la integridad de los datos existentes. "Una actualización de parche no debería romper la app"
* **Minor**: Consiste en la implementación de nuevas funcionalidades, las que son visibles para el usuario, pero que no afectan a lo ya existente, como agregar un botón de búsqueda, o una nueva pantalla
* **Major**: Consiste en cambios que generalmente, no son compatibles con la versión anterior y estos pueden romper la integridad de los datos existentes, como cambiar el lenguaje, cambiar toda la interfaz gráfica, o la forma en que llegan los datos. "Puede que se necesite respaldar lla información antes de actualizar"
* **Extensions**: Se agrega a versiones "inestables" (Alpha, beta, demo) y se identifican de la siguiente manera: 1.0.0-alpha. "Una versión inestable nunca debe pasar a producción"
