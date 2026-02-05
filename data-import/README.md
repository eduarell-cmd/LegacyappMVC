# Instrucciones para importar datos a MongoDB

## Pasos para importar los datos:

1. **Primero, asegúrate de tener MongoDB Compass o mongoimport instalado**

2. **Importar Usuarios:**
   ```bash
   mongoimport --uri "mongodb+srv://Eduardo12:holapapu@clustereduardo.hw818rh.mongodb.net/ProfRobert?retryWrites=true&w=majority&appName=ClusterEduardo" --db ProfRobert --collection users --file users.json --jsonArray
   ```

3. **Importar Proyectos:**
   ```bash
   mongoimport --uri "mongodb+srv://Eduardo12:holapapu@clustereduardo.hw818rh.mongodb.net/ProfRobert?retryWrites=true&w=majority&appName=ClusterEduardo" --db ProfRobert --collection projects --file projects.json --jsonArray
   ```

## Nota importante:
- Los archivos `tasks.json`, `comments.json`, `history.json` y `notifications.json` están vacíos porque estos datos se generan dinámicamente cuando se usan las funcionalidades de la aplicación.
- Si prefieres usar MongoDB Compass:
  1. Conecta a tu cluster
  2. Selecciona la base de datos `ProfRobert` (o créala si no existe)
  3. Crea las colecciones: `users`, `projects`, `tasks`, `comments`, `history`, `notifications`
  4. Importa los archivos JSON correspondientes usando la opción "Import Data"

## Estructura de la base de datos:
- **Base de datos:** ProfRobert
- **Colecciones:**
  - users
  - projects
  - tasks
  - comments
  - history
  - notifications
