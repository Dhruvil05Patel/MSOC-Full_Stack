const express = require('express');
const router = express.Router();

const User = require('../models/model');

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

router.post('/users', async (req, res) => {
  try {
    const { name, age, wieght } = req.body;
    const newUser = new User({ name, age, wieght });
    await newUser.save();
    res.status(200).json({
      success: true,
      user: newUser
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

router.put('/users/:id', async (req, res)=>{
    const {id} = req.params;
    const {name, age, wieght} = req.body;
    try{
        const updatedUser = User.findByIdAndUpdate(id, {name, age, wieght});
        if(!updatedUser){
            res.json({
                message : "User Not Found"
            })
        res.status(200).json({
            success : true,
            user : updatedUser
        })
        }
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : err.message 
        })
    }
})

module.exports = router;