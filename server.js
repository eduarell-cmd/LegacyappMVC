// Servidor Express para API REST + frontend estático
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a MongoDB
connectDB();

// Middleware de logging para debug
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Rutas API (antes del estático para que /api no sirva archivos)
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/history', require('./routes/historyRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));

// Servir archivos estáticos desde carpetas específicas
app.use('/models', express.static(path.join(__dirname, 'models')));
app.use('/views', express.static(path.join(__dirname, 'views')));
app.use('/controllers', express.static(path.join(__dirname, 'controllers')));
app.use('/utils', express.static(path.join(__dirname, 'utils')));

// Servir archivos específicos de la raíz que necesita el frontend
app.get('/app.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'app.js'), { 'Content-Type': 'application/javascript' });
});
app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'style.css'), { 'Content-Type': 'text/css' });
});

// Raíz: enviar index.html (debe ir después de las rutas API y estáticos)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
