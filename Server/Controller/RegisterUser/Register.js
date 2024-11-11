const User = require('../../Models/UsersModel/UsersModel');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, photoUrl } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already registered' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user payload
        const newUser = new User({
            name,
            email,
            photoUrl,
            password: hashedPassword
        });

        // Save the user to the database
        const result = await newUser.save();

        return res.status(201).json({
            message: 'User registered successfully',
            data: result,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Server error',
            error: true
        });
    }
};

module.exports = registerUser;
