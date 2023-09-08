const mongoose = require("mongoose")
const User = require('../models/users.js')

// Get all users
function getAllUsers(req, res) {
    User.find()
    .select('_id name phone idcard status')
        .then((allUsers) => {
            return res.status(200).json({
                success: true,
                message: 'A list of all users',
                User: allUsers,
            });
        })
    .catch((err) => {
    res.status(500).json({
    success: false,
    message: 'Server error. Please try again.',
    error: err.message,
    });
    });
    
    }

function temp() {
    // User.find({ name: 'Punit'}, function (err, docs) {
    //     if (err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log("First function call : ", docs);
    //     }
    // });
    console.log('hello')
}

module.exports = {
    getAllUsers,
    temp
}