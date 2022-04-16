import AsyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid Email or Password')
  }
})

// @desc    Register user & get token
// @route   POST /api/users/register
// @access  Public
const registerUser = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const existsUser = await User.findOne({ email })

  if (existsUser) {
    res.status(400)
    throw new Error('User Already Exists')
  }

  const user = await User.create({
    name,
    email,
    password,
    bio: 'we are super proud to educate the developers community and place students in the best companies on the planet. ⭐',
  })

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      bio: user.bio,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid User data')
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private

const getUserProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not Found')
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.bio = req.body.bio || user.bio
    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      bio: updatedUser.bio,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export { authUser, registerUser, getUserProfile, updateUserProfile }
