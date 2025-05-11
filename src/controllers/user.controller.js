import User from '../models/user.model.js'

export const userController = async (req, res) => {
    User.findOne({ _id: req.params.id })
        .select('-password -__v')
        .then((user) => res.json({ user: user }))
        .catch((err) => {
            return res.status(404).json({ error: 'User not found: ' + err })
        })
}

export const allUsersController = async (req, res) => {
    await User.find({ sex: { $ne: req.query.sex } })
        .select('-password')
        .then((users) => {
            return res.json(users)
        })
        .catch((err) => res.status(404).json({ error: 'User not found: ' + err }))
}
// update current user
export const updateUserController = async (req, res) => {
    try {
        User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true }, (err, result) => {
            if (err) {
                return res.status(422).json({ message: err })
            }
            res.json({ user: result })
        }).select('-__v -password')
    } catch (e) {
        console.log(e)
    }
}

export const userUpdateProfileImage = async (req, res) => {
    try {
        User.findByIdAndUpdate(req.user._id, { $set: { image: req.body.image } }, { new: true }, (err, result) => {
            if (err) {
                return res.status(422).json({ error: 'pic cannot post' })
            }
            res.json(result)
        })
    } catch (e) {
        console.log(e)
    }
}

// search query
export const searchUsersHandler = async (req, res) => {
    let userPattern = new RegExp(`^${req.body.query}`)
    try {
        const user = await User.find({ email: { $regex: userPattern } }).select('_id email')
        await res.json({ user })
    } catch (e) {
        console.error(e)
    }
}
