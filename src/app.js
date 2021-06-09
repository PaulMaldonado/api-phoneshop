import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

// Rutas para productos
import productRoutes from './routes/product.routes';

// Rutas de autenticación
import userRoutes from './routes/user.routes';
import dashboardRoutes from './routes/user.routes';

app.use(cors());
// middleware dotenv
dotenv.config();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    next()
});

// Middleware para las rutas de productos
app.use('/api/auth', userRoutes);
app.use('/api/product', productRoutes);

// Middleware para las rutas de autenticación
app.use('/api/dashboard', dashboardRoutes);

export default app;