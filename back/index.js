import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url'; // Importa para simular __dirname
import path from 'path'; // Importa el módulo path
import sequelize from './config/database.js';
import router from './routes/router.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Crear una variable que simule __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Configuración para servir archivos estáticos de la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', router);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error('Error detectado:', err);
    res.status(500).json({
        status: 'error',
        message: err.message,
        stack: err.stack, // Añadimos el stack del error para más detalles
    });
});

const initializeDatabase = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log('Database synced successfully.');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

initializeDatabase();

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
