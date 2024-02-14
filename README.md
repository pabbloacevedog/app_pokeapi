# Poke-App React

## Descripción

Poke-App React sirve para explorar información sobre Pokémon. Utiliza la [PokeAPI](https://pokeapi.co) para obtener datos en tiempo real sobre Pokémon, incluyendo estadísticas, tipos y habilidades.

## Funcionalidades

- **Listado de Pokémon**: Muestra una tabla paginada con los nombres e imágenes de los Pokémon.
- **Filtrado de Pokémon**: Permite a los usuarios filtrar la lista de Pokémon por nombre a través de un campo de búsqueda con autocompletado.
- **Detalle de Pokémon**: Al seleccionar un Pokémon de la lista, se muestra una tarjeta de detalles con más información sobre ese Pokémon específico.
- **Resumen Alfabético**: Proporciona una tabla resumen que muestra la cantidad de Pokémon que comienzan con cada letra del alfabeto.
- **Responsive**: La aplicación es completamente responsiva, proporcionando una experiencia fluida tanto en dispositivos móviles como de escritorio.

## Tecnologías Utilizadas

- React 18
- Redux para la gestión del estado
- TypeScript para un código más seguro y mantenible
- Axios para las solicitudes HTTP a la PokeAPI
- Vite para la construcción y desarrollo eficiente del proyecto

## Instalación y Despliegue

Para obtener una copia local en funcionamiento, sigue estos sencillos pasos.

### Prerrequisitos

Asegúrate de tener instalado `node.js` y `npm` en tu sistema. Visita [Node.js](https://nodejs.org) para las instrucciones de instalación.

### Instalación

1. Clona el repositorio:

   ```sh
   [git clone https://github.com/pabbloacevedog/app_pokeapi](https://github.com/pabbloacevedog/app_pokeapi)
	```
2. Instala las dependencias:

	```sh

	npm install
	```
3. Ejecuta el proyecto en modo desarrollo:

	```sh

	npm run dev
	```
4. Visita http://localhost:5173 en tu navegador para ver la aplicación en acción.

5. Para construir la aplicación para producción, ejecuta:

	```sh

	npm run build
	```
Esto generará una versión optimizada de la aplicación en la carpeta dist.

Para previsualizar la versión de producción localmente, puedes ejecutar:

 	```sh

	npm run preview
	```
Licencia
Este proyecto está licenciado bajo MIT License.

