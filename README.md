# Task Manager - Sistema de Gestión de Tareas

Sistema moderno de gestión de tareas con arquitectura MVC, backend en Node.js/Express y base de datos MongoDB.

## 🎨 Características del Diseño

- **Interfaz Minimalista**: Diseño limpio y profesional con paleta de colores neutral
- **Modo Oscuro Permanente**: Interfaz optimizada para reducir fatiga visual
- **Diseño Responsivo**: Adaptable a dispositivos móviles, tablets y escritorio
- **Glassmorfismo**: Efectos de vidrio esmerilado para profundidad visual
- **Tipografía Moderna**: Fuentes Inter y JetBrains Mono de Google Fonts

## 🚀 Tecnologías

### Backend
- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **Mongoose** - ODM para MongoDB
- **MongoDB Atlas** - Base de datos en la nube

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con variables CSS
- **JavaScript Vanilla** - Lógica del cliente sin frameworks
- **Arquitectura MVC** - Separación de responsabilidades

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- npm (v6 o superior)
- Cuenta de MongoDB Atlas (o MongoDB local)

## 🔧 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd LegacyappMVC-1
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar la base de datos**
   
   Asegúrate de tener MongoDB configurado. La cadena de conexión está en `config/database.js`:
   ```javascript
   mongodb+srv://Eduardo12:holapapu@clustereduardo.hw818rh.mongodb.net/ProfRobert
   ```

4. **Importar datos iniciales** (opcional)
   
   Usando MongoDB Compass o mongoimport:
   ```bash
   mongoimport --uri "tu-uri-mongodb" --db ProfRobert --collection users --file data-import/users.json --jsonArray
   mongoimport --uri "tu-uri-mongodb" --db ProfRobert --collection projects --file data-import/projects.json --jsonArray
   ```

## 🎯 Uso

### Iniciar el servidor

**Modo desarrollo:**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000`

### Acceder a la aplicación

1. Abre tu navegador en `http://localhost:3000`
2. Abre el archivo `index.html` directamente
3. O sirve los archivos estáticos con un servidor HTTP

### Credenciales por defecto

- **Admin**: usuario: `admin`, contraseña: `admin`
- **Usuario 1**: usuario: `user1`, contraseña: `user1`
- **Usuario 2**: usuario: `user2`, contraseña: `user2`

## 📁 Estructura del Proyecto

```
LegacyappMVC-1/
├── config/
│   └── database.js          # Configuración MongoDB
├── models/                   # Modelos del frontend (API calls)
│   ├── userModel.js
│   ├── taskModel.js
│   ├── projectModel.js
│   ├── commentModel.js
│   ├── historyModel.js
│   └── notificationModel.js
├── models-mongoose/          # Modelos Mongoose (backend)
│   ├── User.js
│   ├── Task.js
│   ├── Project.js
│   ├── Comment.js
│   ├── History.js
│   └── Notification.js
├── routes/                   # Rutas API REST
│   ├── userRoutes.js
│   ├── taskRoutes.js
│   ├── projectRoutes.js
│   ├── commentRoutes.js
│   ├── historyRoutes.js
│   └── notificationRoutes.js
├── controllers/              # Controladores del frontend
├── views/                    # Vistas del frontend
├── utils/
│   └── idHelper.js          # Helper para IDs MongoDB
├── data-import/              # Datos iniciales
│   ├── users.json
│   └── projects.json
├── index.html               # Página principal
├── style.css                # Estilos CSS
├── app.js                   # Lógica principal del frontend
├── server.js                # Servidor Express
└── package.json             # Dependencias del proyecto
```

## 🔌 API Endpoints

### Usuarios
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `POST /api/users/login` - Login de usuario
- `POST /api/users` - Crear usuario
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

### Tareas
- `GET /api/tasks` - Obtener todas las tareas
- `GET /api/tasks/:id` - Obtener tarea por ID
- `POST /api/tasks` - Crear tarea
- `POST /api/tasks/search` - Buscar tareas con filtros
- `GET /api/tasks/project/:projectId` - Tareas por proyecto
- `GET /api/tasks/user/:userId` - Tareas por usuario
- `GET /api/tasks/stats/summary` - Estadísticas de tareas
- `PUT /api/tasks/:id` - Actualizar tarea
- `DELETE /api/tasks/:id` - Eliminar tarea

### Proyectos
- `GET /api/projects` - Obtener todos los proyectos
- `GET /api/projects/:id` - Obtener proyecto por ID
- `POST /api/projects` - Crear proyecto
- `PUT /api/projects/:id` - Actualizar proyecto
- `DELETE /api/projects/:id` - Eliminar proyecto

### Comentarios
- `GET /api/comments` - Obtener todos los comentarios
- `GET /api/comments/task/:taskId` - Comentarios por tarea
- `POST /api/comments` - Crear comentario
- `PUT /api/comments/:id` - Actualizar comentario
- `DELETE /api/comments/:id` - Eliminar comentario

### Historial
- `GET /api/history` - Obtener todo el historial
- `GET /api/history/task/:taskId` - Historial por tarea
- `POST /api/history` - Crear entrada de historial

### Notificaciones
- `GET /api/notifications` - Obtener todas las notificaciones
- `GET /api/notifications/user/:userId` - Notificaciones por usuario
- `GET /api/notifications/user/:userId/unread` - Conteo de no leídas
- `POST /api/notifications` - Crear notificación
- `PUT /api/notifications/user/:userId/read` - Marcar como leídas
- `PUT /api/notifications/:id` - Actualizar notificación
- `DELETE /api/notifications/:id` - Eliminar notificación

## 🎨 Personalización del Diseño

El diseño utiliza variables CSS para facilitar la personalización. Edita `style.css`:

```css
:root {
    --primary: hsl(217, 91%, 60%);      /* Color principal */
    --bg-primary: hsl(0, 0%, 98%);      /* Fondo principal */
    --text-primary: hsl(0, 0%, 9%);     /* Texto principal */
    /* ... más variables */
}
```

## 🌙 Modo Oscuro

La aplicación está configurada permanentemente en modo oscuro. Para cambiar esto, modifica la clase en `index.html`:

```html
<!-- Modo oscuro permanente -->
<body class="dark-mode">

<!-- Para modo claro -->
<body>
```

## 📱 Características Responsivas

- **Desktop (>768px)**: Formularios en 2 columnas
- **Tablet/Mobile (≤768px)**: Formularios en 1 columna
- Navegación por pestañas optimizada para móviles
- Tablas con scroll horizontal en pantallas pequeñas

## 🔒 Seguridad

- Las contraseñas deben ser hasheadas en producción
- Implementar autenticación JWT para APIs
- Validar y sanitizar todas las entradas del usuario
- Configurar CORS apropiadamente
- Usar variables de entorno para credenciales sensibles

## 🚧 Desarrollo

### Scripts disponibles

```bash
npm start       # Inicia el servidor en modo producción
npm run dev     # Inicia el servidor en modo desarrollo
```

### Agregar nuevas funcionalidades

1. Crear modelo en `models-mongoose/`
2. Crear rutas en `routes/`
3. Crear modelo del frontend en `models/`
4. Crear controlador en `controllers/`
5. Crear vista en `views/`
6. Actualizar `app.js` según sea necesario

## 📝 Notas Técnicas

- El servidor corre en el puerto 3000 por defecto
- La base de datos se llama `ProfRobert` en MongoDB
- Los IDs de MongoDB se manejan automáticamente con `idHelper.js`
- Las peticiones del frontend van a `http://localhost:3000/api`

## 🐛 Solución de Problemas

### Error de conexión a MongoDB
- Verifica que la URI de conexión sea correcta
- Asegúrate de que tu IP esté en la lista blanca de MongoDB Atlas
- Comprueba las credenciales de usuario

### El servidor no inicia
- Verifica que el puerto 3000 esté disponible
- Asegúrate de que todas las dependencias estén instaladas
- Revisa los logs de error en la consola

### Los estilos no se cargan
- Verifica que `style.css` esté en la ruta correcta
- Limpia la caché del navegador
- Comprueba la consola del navegador para errores

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👥 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📧 Contacto

Para preguntas o sugerencias, por favor abre un issue en el repositorio.

---

**Desarrollado con ❤️ usando Node.js, Express y MongoDB**
