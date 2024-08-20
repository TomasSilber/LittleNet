import multer from 'multer';
import path from 'path';

// Configuración de Multer para manejar la subida de imágenes
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada archivo
    }
});

const upload = multer({ storage: storage });

export default upload;
