const logout =async (req, res) => {
    const options = {
        httpOnly: true,
        sameSite: 'none', // Necessary for cross-origin cookies
        expires: new Date(0), // Clear the cookie
    };

    return res
        .clearCookie('token')
        .status(200)
        .json({ message: 'Logout successful' });
};

module.exports = logout;
