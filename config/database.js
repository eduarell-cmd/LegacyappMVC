// Configuración de conexión a MongoDB
const mongoose = require('mongoose');

// En Vercel usa la variable de entorno; en local la URI por defecto
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Eduardo12:holapapu@clustereduardo.hw818rh.mongodb.net/ProfRobert?retryWrites=true&w=majority&appName=ClusterEduardo';

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) return; // Ya conectado (serverless)
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        if (typeof process.env.VERCEL === 'undefined') {
            console.log('✅ MongoDB conectado exitosamente a la base de datos: ProfRobert');
        }
    } catch (error) {
        console.error('❌ Error al conectar a MongoDB:', error.message);
        if (typeof process.env.VERCEL === 'undefined') {
            process.exit(1);
        }
        throw error;
    }
};

module.exports = connectDB;
