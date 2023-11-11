
const promise = require('promise');
const bcrypt = require("bcrypt")
const { mongoose } = require('mongoose');
const { response } = require('express');

const user = {
    name: String,
    email: String,
    pass: String,

   
}

const userModel = mongoose.model("Users", user)
const room = {
    user1: String,
    user2 :String
}
const roomModel = mongoose.model("Rooms",room)
module.exports = {

    Signup: (userData) => {
        return new Promise(async (resolve, reject) => {
            
            const query = userModel.where({ email: userData.email });
            const user = await query.findOne();
            if (!user) {
                console.log(userData);
                bcrypt.hash(userData.Pass, 10, async (err, hash) => {
                    if (hash) {
                        const small = new userModel({
                            name: userData.Username,
                            email: userData.email,
                            pass: hash
                        });
                         await small.save();
                        // console.log(dbuser);
                         
                        resolve(response.user = true)
                    }
                    else {
                        console.log(err);
                    }

                });

            } else {
                response.message = "email is already used"
                resolve(response)
            }
        })
    },
    Login: (userData) => {
        return new Promise(async(resolve, reject) => {
            const query = userModel.where({ email: userData.email });
            await query.findOne().then(async(user) => {
                if (user) {

                    await bcrypt.compare(userData.Pass, user.pass).then((res) => {
                        if (res) {
                            response.user = {
                                name: user.name,
                                email: user.email,
                                _id: user._id
                            }
                            resolve(response)
                        } else {
                            response.message = "Wrong password"
                            resolve(response)
                        }
                    })

                } else {
                    response.message = "email doesn't exist signup!"
                    resolve(response)
                }
             })
           
        })
    },
    getAllUsers: (id) => {
      return  new Promise(async(resolve, reject) => {
          const  users = await userModel.find({})
           
            if (users) {
               
                const response = [];

                await users.forEach(user => {
                   if (user._id != id) {
                       user = {
                           name: user.name,
                           email: user.email,
                           _id: user._id
                       }
                       response.push(user);
                   }
                })
                
                resolve(response)

            }
           
           
        })
    },
    getRoomId: (users,id) => {
        
        return new Promise(async(resolve, reject) => {
            const query = roomModel.where({ user1: id, user2 : users.user2 });
            const room = await query.findOne();
            if (room) {
                resolve(room._id)
            } else {
                const query = roomModel.where({ user1: users.user2, user2: id });
                const room = await query.findOne();
                if (room) {
                    resolve(room._id)
                    
                } else {
                    const room = new roomModel({
                        user1: users.user2,
                        user2 : id
                    });
                    const roomcreated =  await room.save();
                    resolve(roomcreated._id)
                        

                }
            }
            
        })
    },


    getAllRoomId: (id) => {

        return new Promise(async (resolve, reject) => {
            
            const rooms = await roomModel.find({ $or: [{ user1: id }, { user2: id }]});
            if (rooms) {
                resolve(rooms)
                // console.log(rooms);
            } 

        })
    }
}