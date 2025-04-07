const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, "Name is required"], 
        minlength: [3, "Name must be at least 3 characters"], 
        maxlength: [50, "Name must be at most 50 characters"] 
    },
    email: { 
        type: String, 
        required: [true, "Email is required"], 
        unique: true, 
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"] 
    },
    phone: { 
        type: String, 
        required: [true, "Phone number is required"], 
        match: [/^\d{8,11}$/, "Phone number must be between 10 to 15 digits"] 
    },
    password: { 
        type: String, 
        required: [true, "Password is required"], 
        minlength: [8, "Password must be at least 6 characters"], 
        maxlength: [12, "Password must be at most 20 characters"]
    }
}, { timestamps: true }); // Automatically adds createdAt & updatedAt

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Skip if password is not modified

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
