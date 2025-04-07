const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/usermode');

// 🔹 LOGIN USER
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid email or password" });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid email or password" });

        // Generate JWT Token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ msg: "Login successful", token });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
};

module.exports = { loginUser };
