import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import bcrypt from 'bcrypt';

const userSchema = new Schema({
   username: {
       type: String,
       required: [true, 'El nombre de usuario es obligatorio'],
       unique: true
   },

   name: {
       type: String,
       required: [true, 'El nombre es obligatorio']
   },

   email: {
       type: String,
       required: [true, 'El correo electronico es obligatorio'],
       unique: true
   },

   password: {
       type: String,
       required: [true, 'La contraseña es obligatoria']
   }
});

// Método para encryptar la contraseña
userSchema.statics.passwordEncrypted = async (password) => {
    const salt = await bcrypt.genSalt(10);

    return await bcrypt.hash(password, salt);
};

// Método para comparar contraseña de usuario
userSchema.statics.comparePassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
};

export default model('User', userSchema);