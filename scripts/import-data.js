/**
 * Script para importar users.json y projects.json a la base de datos ProfRobert
 * Uso: node scripts/import-data.js
 */
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MONGODB_URI = 'mongodb+srv://Eduardo12:holapapu@clustereduardo.hw818rh.mongodb.net/ProfRobert?retryWrites=true&w=majority&appName=ClusterEduardo';

// Esquemas inline para no depender del orden de carga de modelos
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, required: true, trim: true }
}, { timestamps: true });

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);
const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

async function importData() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Conectado a ProfRobert\n');

        const dataDir = path.join(__dirname, '..', 'data-import');

        // Importar usuarios
        const usersPath = path.join(dataDir, 'users.json');
        if (fs.existsSync(usersPath)) {
            const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
            await User.deleteMany({});
            await User.insertMany(usersData);
            console.log(`✅ Importados ${usersData.length} usuarios en la colección 'users'`);
        } else {
            console.log('⚠️ No se encontró data-import/users.json');
        }

        // Importar proyectos
        const projectsPath = path.join(dataDir, 'projects.json');
        if (fs.existsSync(projectsPath)) {
            const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
            await Project.deleteMany({});
            await Project.insertMany(projectsData);
            console.log(`✅ Importados ${projectsData.length} proyectos en la colección 'projects'`);
        } else {
            console.log('⚠️ No se encontró data-import/projects.json');
        }

        console.log('\n✅ Importación completada.');
    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

importData();
