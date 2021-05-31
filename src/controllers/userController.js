import User from '../models/User';
import jwt from 'jsonwebtoken';
import expressJoi from 'express-joi';

// validar los campos de registro
const registerSchema = {
    username: expressJoi.Joi.types.String().alphanum().min(6).max(255).required(),
    name: expressJoi.Joi.types.String().alphanum().min(6).max(255).required(),
    email: expressJoi.Joi.types.String().alphanum().min(6).max(255).required(),
    password: expressJoi.Joi.types.String().alphanum().min(6).max(1024).required()
};

// validar los campos de login
const loginSchema = {
    email: expressJoi.Joi.types.String().alphanum().min(6).max(255).required().email(),
    password: expressJoi.Joi.types.String().alphanum().min(6).max(1024).required()
};

// Método para registrar nuevo usuario
export const register = async (req, res) => {
    try {
        const { username, name, email, password } = req.body;

        const { registerError } = expressJoi.joiValidate(registerSchema);

        if(registerError) {
            return res.status(400).json({
                message: 'Verifique sus datos, no pudimos registrar al usuario...',
                data: null
            })
        }

        const emailExist = await User.findOne({ email });

        if(emailExist) {
            return res.status(400).json({
                message: 'Error. El email con el que intentas registrarte ya esta en uso.',
                data: null
            })
        }

        const newUser = new User({
            username,
            name,
            email,
            password: await User.passwordEncrypted(password)
        });

        const savedUser = await newUser.save();

        const token = jwt.sign({ id: savedUser._id }, process.env.TOKEN_SECRET, {
            expiresIn: 86400,
        });

        return res.status(200).json({ token });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Token no valido', data: null });
    }
};

// Método para iniciar sesión
export const login = async (req, res) => {
    try {
        const userFound = await User.findOne({  
            email: req.body.email,
        });

        if(!userFound) {
            return res.status(400).json({
                message: 'No se encontro nigun usuario con ese email.',
                data: null
            });
        }

        const matchPassword = await User.comparePassword(req.body.password, userFound.password);

        if(!matchPassword) {
            return res.status(401).json({
                message: 'Contraseña invalida',
                data: null
            })
        }

        const { loginError } = expressJoi.joiValidate(loginSchema);

        if(loginError) {
            return res.status(400).json({
                message: 'Verifica Email/password que sean correctos',
                data: null
            })
        }

        const token = jwt.sign({ id: userFound._id }, process.env.TOKEN_SECRET, {
            expiresIn: 86400,
        });

        return res.status(200).json({ token });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Token invalido!',
            data: null
        })
    }
};

// Método de prueba para verificar que si se pudo iniciar sesión correctamente
export const dashboard = (req, res) => {
    res.json({
        error: null,
        data: {
            message: 'Ruta para usuarios registrado, inicio de sesión correcto!',
            userFound: req.userFound
        }
    });
};