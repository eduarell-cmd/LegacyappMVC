# Task Manager Legacy - MongoDB Migration

Aplicación de gestión de tareas migrada de localStorage a MongoDB.

## 🚀 Instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Importar datos iniciales a MongoDB:**
   
   Usando mongoimport:
   ```bash
   mongoimport --uri "mongodb+srv://Eduardo12:holapapu@clustereduardo.hw818rh.mongodb.net/ProfRobert?retryWrites=true&w=majority&appName=ClusterEduardo" --db ProfRobert --collection users --file data-import/users.json --jsonArray
   
   mongoimport --uri "mongodb+srv://Eduardo12:holapapu@clustereduardo.hw818rh.mongodb.net/ProfRobert?retryWrites=true&w=majority&appName=ClusterEduardo" --db ProfRobert --collection projects --file data-import/projects.json --jsonArray
   ```

   O usando MongoDB Compass:
   - Conecta a tu cluster
   - Selecciona la base de datos `ProfRobert` (o créala si no existe)
   - Las colecciones se crearán automáticamente cuando se usen, o puedes crearlas manualmente: `users`, `projects`, `tasks`, `comments`, `history`, `notifications`
   - Importa los archivos JSON desde la carpeta `data-import/`

3. **Iniciar el servidor:**
   ```bash
   npm start
   ```
   
   O en modo desarrollo:
   ```bash
   npm run dev
   ```

4. **Abrir la aplicación:**
   - Abre `index.html` en tu navegador
   - O sirve los archivos estáticos con un servidor HTTP (ej: `python -m http.server 8080`)

## 📁 Estructura del Proyecto

```
LegacyappMVC/
├── config/
│   └── database.js          # Configuración de conexión MongoDB
├── models-mongoose/          # Modelos Mongoose (backend)
│   ├── User.js
│   ├── Task.js
│   ├── Project.js
│   ├── Comment.js
│   ├── History.js
│   └── Notification.js
├── models/                   # Modelos del frontend (API calls)
│   ├── userModel.js
│   ├── taskModel.js
│   ├── projectModel.js
│   ├── commentModel.js
│   ├── historyModel.js
│   └── notificationModel.js
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
│   └── idHelper.js          # Helper para manejar IDs MongoDB
├── data-import/              # Datos iniciales para importar
│   ├── users.json
│   └── projects.json
├── server.js                 # Servidor Express
├── package.json
└── index.html
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

## 🔑 Credenciales por defecto

- **Admin:** usuario: `admin`, contraseña: `admin`
- **Usuario 1:** usuario: `user1`, contraseña: `user1`
- **Usuario 2:** usuario: `user2`, contraseña: `user2`

## 📝 Notas

- El servidor corre en `http://localhost:3000` por defecto
- La aplicación frontend debe hacer peticiones a `http://localhost:3000/api`
- Los IDs de MongoDB se manejan automáticamente usando el helper `idHelper.js`
- La base de datos se llama `ProfRobert` en MongoDB

## 🛠️ Tecnologías

- **Backend:** Node.js, Express, Mongoose
- **Base de datos:** MongoDB Atlas
- **Frontend:** HTML, CSS, JavaScript vanilla
- **Arquitectura:** MVC
