const User = require('../../Models/UsersModel/UsersModel')

const SearchUser = async (req, res) => {
    try {
        const { search } = req.body;
        const query = new RegExp(search, 'i', 'g');

        const user = await User.find({
            '$or': [
                { name: query },
                { email: query }
            ]
        }).select('-password')
        res.status(200).json({
            User: user,
            success: true
        })
    } catch (error) {
        res.status(404).json(
            {
                message: error.message || error,
                error: true,
            }
        )
    }



}
module.exports = SearchUser