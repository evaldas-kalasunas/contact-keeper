const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')
const { check, validationResult } = require('express-validator');

const User = require('../models/User')


// @route POST api/users
// @desc Register a user
// @access Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include valid email').isEmail(),
    check('password', 'Please enter password with 6 or more characters')
        .isLength({ min: 6})
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errros: errors.array() })
    }

   const {name, email, password} = req.body

   try {
       let user = await User.findOne({ email })

       if (user) {
           return res.status(400).json({message: 'User already exists'})
       }

       user = new User({
           name,
           email,
           password
       });

       // encrypting password
       const salt = await bcrypt.genSalt(10);

       user.password = await bcrypt.hash(password, salt);

       await user.save();

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
       console.log(error.message);
       res.status(500).send('Server error');
   }
    
})

module.exports = router