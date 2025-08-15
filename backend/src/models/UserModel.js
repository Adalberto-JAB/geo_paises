import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Para hashear contraseñas

const userSchema = new mongoose.Schema({
 name: {
   type: String,
   required: true,
   trim: true
 },
 email: {
   type: String,
   required: true,
   unique: true, // El email debe ser único
   trim: true,
   lowercase: true // Guarda el email en minúsculas
 },
 password: {
   type: String,
   required: true,
   minlength: [6, 'La contraseña debe tener al menos 6 caracteres y al menos una mayúscula, una minúscula y un número.']
 },
 role: {
   type: String,
   enum: ['editor', 'admin'], // Roles permitidos
   default: 'editor' // Rol por defecto
 },
 // Campo para la URL de la imagen de perfil (generada por DiceBear o subida)
 profilePictureUrl: {
   type: String,
   default: 'https://api.dicebear.com/8.x/adventurer/svg?seed=default' // URL por defecto de DiceBear
 },
 // Campos para la recuperación de contraseña
 resetPasswordToken: {
   type: String,
   select: false // No se incluirá en las consultas a menos que se solicite explícitamente
 },
 resetPasswordExpire: {
   type: Date,
   select: false
 }
}, {
 timestamps: true // Añade createdAt y updatedAt automáticamente
});

// Middleware de Mongoose para hashear la contraseña antes de guardar
userSchema.pre('save', async function (next) {
 if (!this.isModified('password')) { // Solo hashear si la contraseña ha sido modificada
   next();
 }
 const salt = await bcrypt.genSalt(10);
 this.password = await bcrypt.hash(this.password, salt);
});

// Método para comparar la contraseña ingresada con la contraseña hasheada
userSchema.methods.matchPassword = async function (enteredPassword) {
 return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;