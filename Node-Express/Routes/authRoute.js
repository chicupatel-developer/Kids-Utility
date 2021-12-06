const router = require('express').Router();
const bcrypt = require('bcrypt');
const path = require('path');

const checkUserName = (usersCollection, body) => {
    var userFound = null;
    usersCollection.findIndex(function (user, index) {
        if (user.userName == body.userName) {
            userFound = user;
        }
    });
    return userFound;
};

router.route('/login').post(async (req, res) => {

    var jsonDatabaseFile = '\JSONDatabase\\UserDB.json';
    // var jsonDatabaseFile = './UserDB.json';
    const body = req.body;
    const fs = require("fs");
    var usersCollection = [];
    try {
        fs.readFile(jsonDatabaseFile, 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err);
            } else {
                obj = JSON.parse(data); //now it an object         
                // console.log(obj.table);
                usersCollection = obj.table;

                if (checkUserName(usersCollection, body) == null) {
                    return res.status(400).json({ error: "Invalid UserName!" })
                }
                else {
                    var __FOUND = usersCollection.findIndex(function (user, index) {
                        if (user.userName == body.userName) {
                            console.log('input password : ' + body.password);
                            console.log('db enc-password : ' + user.password);
                            bcrypt.compare(body.password, user.password)
                                .then(doMatch => {
                                    if (doMatch) {
                                        return res.status(200).json({ message: "Valid UserName / Password!", parentEmail: user.email });
                                    } else {
                                        return res.status(400).json({ error: "Invalid Password!" })
                                    }
                                }).catch(err => {
                                    console.log(err);
                                })
                        }
                    });
                }
            }
        });
    } catch (err) {
        console.log(err);
        return;
    }
});

router.route('/usercreate').post(async (req, res) => {

    // var jsonDatabaseFile = './JSONDatabase/UserDB.json';
    var jsonDatabaseFile = '\JSONDatabase\\UserDB.json';
    fs = require('fs');
    var usersCollection = [];
    var obj = {
        table: []
    };

    var user = req.body;
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);
    console.log(user);

    fs.readFile(jsonDatabaseFile, function (err, data) {
        if (data == undefined) {
            console.log('Database Offline!');
            return res.status(400).json({ error: "Database Offline!" });
        }
        if (data.length == 0) {
            console.log("File is empty!");
            obj.table.push(user); //add some data  
            json = JSON.stringify(obj); //convert it back to json
            fs.writeFile(jsonDatabaseFile, json, 'utf8', err => {
                if (err) {
                    console.log('Error writing file', err)
                    return res.status(400).json({ error: "Error Creating User Account!" });
                } else {
                    console.log('Successfully wrote file')
                    return res.status(200).json({ message: "Success!" });
                }
            });
        } else {
            console.log("File is not empty!");
            fs.readFile(jsonDatabaseFile, 'utf8', function readFileCallback(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    obj = JSON.parse(data); //now it an object   
                    usersCollection = obj.table;

                    // check for username already exist or not!
                    if (checkUserName(usersCollection, req.body) != null) {
                        return res.status(400).json({ error: "Duplicate UserName!" })
                    }

                    obj.table.push(user); //add some data  
                    json = JSON.stringify(obj); //convert it back to json
                    fs.writeFile(jsonDatabaseFile, json, 'utf8', err => {
                        if (err) {
                            console.log('Error writing file', err)
                            return res.status(400).json({ error: "Error Creating User Account!" });
                        } else {
                            console.log('Successfully wrote file')
                            return res.status(200).json({ message: "Success!" });
                        }
                    }); // write it back                    
                }
            });
        }
    })
});


module.exports = router;