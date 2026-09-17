<div align="center">

<img src="images/pockemones.png" alt="Pokedex Logo" width="500"/>

**Aplicación web de consulta de Pokémon usando la PokeAPI, con enrutamiento dinámico vía URL**

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![PokeAPI](https://img.shields.io/badge/PokeAPI-REST-EF5350?style=for-the-badge&logo=pokemon&logoColor=white)](https://pokeapi.co/)
[![GitHub](https://img.shields.io/badge/Repository-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/JohanaS77/pokedex-api-rest)

</div>

---

## 📑 Tabla de contenido

- [Descripción](#-descripción)
- [Capturas de pantalla](#-capturas-de-pantalla)
- [Funcionalidades principales](#-funcionalidades-principales)
- [Tecnologías utilizadas](#️-tecnologías-utilizadas)
- [Arquitectura del proyecto](#-arquitectura-del-proyecto)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Instalación y uso](#️-instalación-y-uso)
- [Características técnicas clave](#-características-técnicas-clave)
- [Mejoras futuras](#-mejoras-futuras)
- [Desarrolladora](#-desarrolladora)
- [Licencia](#-licencia)

---

## 📖 Descripción

**Pokedex API REST** es una aplicación web que permite consultar información detallada de cualquier Pokémon (imagen, tipo, altura, peso y estadísticas base) a partir de su ID, obtenida en tiempo real desde la **[PokeAPI](https://pokeapi.co/)**.

El proyecto fue desarrollado como parte de la asignatura **Desarrollo de Software Web Backend**, del programa de **Tecnología en Desarrollo de Aplicaciones Web y Móviles** de la Fundación Universitaria Compensar, aplicando los fundamentos de creación de APIs REST y enrutamiento dinámico con **Node.js** y **Express**.

La aplicación ofrece dos formas de consultar un Pokémon:
1. **Por URL**, agregando el ID directamente al final de la dirección (ej: `/25`), resuelto por una ruta dinámica del servidor Express.
2. **Por un buscador con formulario**, donde el usuario escribe el ID en un campo de texto y hace clic en "Buscar".

[⬆️ Volver arriba](#-tabla-de-contenido)

---

## 📸 Capturas de pantalla

### 🏡 Pantalla de inicio
<div align="center">
  <img src="images/pan1.png" alt="Pantalla de inicio" width="800"/>
</div>

### 🔎 Consulta por URL (`/id`)
<div align="center">
  <img src="images/pan2.png" alt="Consulta por URL" width="800"/>
</div>

### 🧭 Página del buscador
<div align="center">
  <img src="images/pan3.png" alt="Página del buscador" width="800"/>
</div>

### 🃏 Resultado en el buscador
<div align="center">
  <img src="images/pan4.png" alt="Resultado en el buscador" width="800"/>
</div>

[⬆️ Volver arriba](#-tabla-de-contenido)

---

## 🚀 Funcionalidades principales

### 🌐 Consulta por URL (ruta dinámica)
- Enrutamiento con Express usando parámetros de ruta (`/:id`)
- Validación del ID recibido (solo acepta números)
- Lectura del ID directamente desde `window.location.pathname` en el frontend

### 🔍 Buscador con formulario
- Input numérico con validación básica
- Búsqueda con clic en el botón o presionando Enter
- Reutiliza la misma lógica y estilo de carta que la consulta por URL

### 🃏 Carta de Pokémon estilo carta física
- Imagen oficial del Pokémon consumida desde la PokeAPI
- Tipo(s) mostrados como píldoras de color según el tipo (fuego, agua, planta, etc.)
- Estadísticas base: HP, ataque, defensa, velocidad, altura y peso
- Botón de cierre (✕) para limpiar el resultado sin recargar la página

### 🎨 Diseño y experiencia de usuario
- Imagen de fondo con los Pokémon en ambas pantallas
- Diseño responsive con capas superpuestas (`z-index`) y `object-fit`
- Animación de aparición para la carta
- Navegación fluida entre la pantalla de inicio y el buscador

[⬆️ Volver arriba](#-tabla-de-contenido)

---

## 🛠️ Tecnologías utilizadas

<div align="center">

| Tecnología | Uso |
|---|---|
| Node.js | Entorno de ejecución del servidor |
| Express | Framework backend y enrutamiento dinámico |
| JavaScript (ES6+) | Lógica de consumo de la API y manipulación del DOM |
| HTML5 | Estructura de las vistas |
| CSS3 | Estilos, capas superpuestas y diseño tipo carta |
| PokeAPI | API REST pública para obtener los datos de los Pokémon |
| Fetch API | Consumo de la PokeAPI desde el navegador |

</div>

[⬆️ Volver arriba](#-tabla-de-contenido)

---

## 🧩 Arquitectura del proyecto

<div align="center">

| Ruta | Método | Descripción |
|---|---|---|
| `/` | GET | Sirve `index.html`: pantalla de inicio con la imagen de fondo |
| `/:id` | GET | Ruta dinámica: valida que `id` sea numérico y reenvía `index.html`, donde el frontend lee el ID desde la URL |
| `/buscador.html` | GET | Servido como archivo estático: página con el formulario de búsqueda |
| `/style.css`, `/script.js`, `/images/*` | GET | Archivos estáticos servidos por `express.static` |

</div>

### Archivos principales

<div align="center">

| Archivo | Descripción |
|---|---|
| `server.js` | Servidor Express: sirve archivos estáticos y define la ruta dinámica `/:id` |
| `public/index.html` | Pantalla de inicio; muestra la carta superpuesta si la URL trae un ID |
| `public/buscador.html` | Página con el formulario de búsqueda por ID |
| `public/script.js` | Consume la PokeAPI, arma la carta y detecta en qué página se ejecuta |
| `public/style.css` | Estilos de ambas páginas y de la carta tipo Pokémon |

</div>

[⬆️ Volver arriba](#-tabla-de-contenido)

---

## 📂 Estructura del proyecto

```
pockemon/
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
│
├── public/
│   ├── index.html
│   ├── buscador.html
│   ├── style.css
│   ├── script.js
│   └── images/
│       └── pockemones.png
│
└── images/
    ├── pan1.png
    ├── pan2.png
    ├── pan3.png
    ├── pan4.png
    └── johana.png
```

[⬆️ Volver arriba](#-tabla-de-contenido)

---

## ⚙️ Instalación y uso

### Requisitos previos
- Node.js (versión 18 o superior)

### 1. Clonar el repositorio

```bash
git clone https://github.com/JohanaS77/pokedex-api-rest.git
cd pokedex-api-rest
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar el servidor

```bash
node server.js
```

### 4. Abrir en el navegador

```
http://localhost:3000
```

> Para consultar un Pokémon por URL, agrega su ID al final de la dirección, por ejemplo: `http://localhost:3000/25`

[⬆️ Volver arriba](#-tabla-de-contenido)

---

## 🧠 Características técnicas clave

- **Parámetros de ruta en Express (`req.params.id`)** — la ruta `/:id` captura dinámicamente cualquier número escrito en la URL y lo valida con una expresión regular antes de continuar.
- **`express.static`** — sirve automáticamente todos los archivos de la carpeta `public` (HTML, CSS, JS e imágenes), evitando tener que escribir una ruta manual para cada archivo.
- **`fetch` + `async/await`** — consumo asíncrono de la PokeAPI, con manejo de errores mediante `try/catch` para IDs inexistentes.
- **Detección de contexto en el frontend** — un mismo archivo `script.js` identifica si está en la pantalla de inicio (lee el ID desde `window.location.pathname`) o en el buscador (espera el clic del botón), evitando duplicar lógica.
- **`window.history.pushState`** — al cerrar la carta en la pantalla de inicio, la URL vuelve a `/` sin recargar la página.
- **Capas con `z-index` y `object-fit`** — la imagen de fondo, el overlay oscuro y el contenido se superponen en capas independientes para lograr el efecto de carta flotando sobre la imagen.

[⬆️ Volver arriba](#-tabla-de-contenido)

---

## 🔮 Mejoras futuras

- [ ] Búsqueda por nombre además de por ID
- [ ] Mostrar habilidades y movimientos del Pokémon
- [ ] Paginación o galería para explorar varios Pokémon
- [ ] Modo oscuro
- [ ] Guardar Pokémon favoritos con `localStorage`
- [ ] Despliegue en un servicio como Render o Railway

[⬆️ Volver arriba](#-tabla-de-contenido)

---

## 👩‍💻 Desarrolladora

<div align="center">

<img src="images/johana.png" width="160" style="border-radius: 50%;"/><br/><br/>
<b>Johana Saavedra</b><br/>
Estudiante de Desarrollo de Software

</div>

Este proyecto fue desarrollado de manera individual por **Johana Jazmín Saavedra Tafur**, estudiante de sexto semestre de la **Tecnología en Desarrollo de Aplicaciones Web y Móviles** en la Fundación Universitaria Compensar, como parte de la asignatura **Desarrollo de Software Web Backend**.

[⬆️ Volver arriba](#-tabla-de-contenido)

---

## 📜 Licencia

Este proyecto es de código abierto y está disponible bajo la Licencia MIT.

[⬆️ Volver arriba](#-tabla-de-contenido)

---

<div align="center">

⭐ *Proyecto desarrollado con fines académicos*<br/>
📚 *Asignatura: Desarrollo de Software Web Backend — Fundación Universitaria Compensar*

</div>
