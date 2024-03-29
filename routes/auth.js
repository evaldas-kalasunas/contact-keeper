const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator');

const User = require('../models/User')



// @route GET api/auth
// @desc Get logged in user
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        // return user data except password
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }
})

// @route POST api/auth
// @desc Auth user & get token
// @access Public
router.post('/', [
    check('email', 'Please include valid email').isEmail(),
    check('password', 'Password is required').exists()  
], 
async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errros: errors.array() })
    }

    const {email, password} = req.body

    try {
        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials'})
        }

        const isMatched = await bcrypt.compare(password, user.password)

        if(!isMatched) {
            return res.status(400).json({ message: 'Invalid Credentials'})
        }

        const payload = {
            user: {
                id: user.id,
 
            }
        }
 
        jwt.sign(payload, config.get('jwtSecret'),
        {
         expiresIn: 360000
        }, (error, token) => {
         if (error) throw error
 
         res.json({ token })
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})

module.exports = router