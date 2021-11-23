const bcrypt = require('bcrypt');
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

let cors = require('cors');
let bodyParser = require('body-parser');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.json()); // for parsing application/json
app.use(cors());


// event
app.post('/api/eventdelete', async (req, res) => {

    fs = require('fs');
    var obj = {
        table: []
    };

    var event = req.body;

    fs.readFile("EventDB.json", function (err, data) {
        if (data == undefined) {
            console.log('Database Offline!');
            return res.status(400).json({ error: "Database Offline!" });
        }
        if (data.length == 0) {
            console.log("File is empty!");
            return res.status(400).json({ error: "File is empty!" });
        } else {
            console.log("File is not empty!");
            fs.readFile('EventDB.json', 'utf8', function readFileCallback(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    obj = JSON.parse(data); //now it an object   
                    // find object                    
                    const removeIndex = obj.table.findIndex(item => item.id === event.id);
                    // remove object
                    obj.table.splice(removeIndex, 1);
                     
                    json = JSON.stringify(obj); //convert it back to json
                    fs.writeFile('EventDB.json', json, 'utf8', err => {
                        if (err) {
                            console.log('Error writing file', err)
                            return res.status(400).json({ error: "Error Creating Event!" });
                        } else {
                            console.log('Successfully wrote file')
                            return res.status(200).json({ message: "Delete Success!" });
                        }
                    }); // write it back                    
                }
            });
        }
    })
});
app.post('/api/eventedit', async (req, res) => {

    fs = require('fs');
    var obj = {
        table: []
    };

    var event = req.body;

    fs.readFile("EventDB.json", function (err, data) {
        if (data == undefined) {
            console.log('Database Offline!');
            return res.status(400).json({ error: "Database Offline!" });
        }
        if (data.length == 0) {
            console.log("File is empty!");
            return res.status(400).json({ error: "File is empty!" });
        } else {
            console.log("File is not empty!");
            fs.readFile('EventDB.json', 'utf8', function readFileCallback(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    obj = JSON.parse(data); //now it an object   
                    // find object                    
                    const removeIndex = obj.table.findIndex(item => item.id === event.id);
                    // remove object
                    obj.table.splice(removeIndex, 1);
                    // add modified object
                    obj.table.push(event); //add some data  
                    json = JSON.stringify(obj); //convert it back to json
                    fs.writeFile('EventDB.json', json, 'utf8', err => {
                        if (err) {
                            console.log('Error writing file', err)
                            return res.status(400).json({ error: "Error Creating Event!" });
                        } else {
                            console.log('Successfully wrote file')
                            return res.status(200).json({ message: "Edit Success!" });
                        }
                    }); // write it back                    
                }
            });
        }
    })
});
app.post('/api/eventcreate', async (req, res) => {

    fs = require('fs');
    var obj = {
        table: []
    };

    var event = req.body;  

    fs.readFile("EventDB.json", function (err, data) {
        if (data == undefined) {
            console.log('Database Offline!');
            return res.status(400).json({ error: "Database Offline!" });
        }
        if (data.length == 0) {
            console.log("File is empty!");
            obj.table.push(event); //add some data  
            json = JSON.stringify(obj); //convert it back to json
            fs.writeFile('EventDB.json', json, 'utf8', err => {
                if (err) {
                    console.log('Error writing file', err)
                    return res.status(400).json({ error: "Error Creating Event!" });
                } else {
                    console.log('Successfully wrote file')
                    return res.status(200).json({ message: "Success!" });
                }
            });
        } else {
            console.log("File is not empty!");
            fs.readFile('EventDB.json', 'utf8', function readFileCallback(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    obj = JSON.parse(data); //now it an object         
                    obj.table.push(event); //add some data  
                    json = JSON.stringify(obj); //convert it back to json
                    fs.writeFile('EventDB.json', json, 'utf8', err => {
                        if (err) {
                            console.log('Error writing file', err)
                            return res.status(400).json({ error: "Error Creating Event!" });
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
app.get('/api/eventget', (req, res) => {
    const fs = require("fs");
    var eventCollection = [];
    try {
        fs.readFile('EventDB.json', 'utf8', function readFileCallback(err, data) {
            if (data == undefined) {
                console.log('Event Empty!');
                return res.status(400).json({ error: "Event Empty!" });
            }

            if (err) {
                console.log("Database Not Ready!");
            } else {
                obj = JSON.parse(data); //now it an object         
                // console.log(obj.table);
                eventCollection = obj.table;
                // console.log('results : ' + testResultCollection);
                // console.log(testResultCollection);
                res.json(eventCollection);
            }
        });
    } catch (err) {
        console.log(err);
        return;
    }
});


// gmail to any
const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'chicupatel222120@gmail.com',
        pass: 'hahahihi',
    },
    secure: true,
});
app.post('/api/text-mail', (req, res) => {
    const { to, subject, text, testName, totalCorrect, totalWrong, testMinutes, testSeconds  } = req.body;
    const mailData = {
        from: 'chicupatel222120@gmail.com',
        to: to,
        subject: subject,
        text: text,        
        html: '<h3><b><u>'+testName+'</u></b></h3><p></p><br>Total Correct : '+totalCorrect+'<br/><br>Total Wrong : '+totalWrong+'<br/><br>Time : '+testMinutes+'M : '+testSeconds+'S <br/>',
    };
    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
});


// Put all API endpoints under '/api'
const checkUserName = (usersCollection, body) => {
    var userFound = null;
    usersCollection.findIndex(function (user, index) {
        if (user.userName == body.userName) {
            userFound = user;
        }
    });
    return userFound;
};
app.post("/api/login", async (req, res) => {    
    const body = req.body;
    const fs = require("fs");
    var usersCollection = [];  
    try {
        fs.readFile('UserDB.json', 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err);
            } else {
                obj = JSON.parse(data); //now it an object         
                // console.log(obj.table);
                usersCollection = obj.table;
              
                if (checkUserName(usersCollection, body)==null) {
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
                                        return res.status(200).json({ message: "Valid UserName / Password!", parentEmail: user.email  });
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
app.post('/api/usercreate', async (req, res) => {

    fs = require('fs');
    var obj = {
        table: []
    };

    var user = req.body;  
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);
    console.log(user);  

    fs.readFile("UserDB.json", function (err, data) {
        if (data == undefined) {
            console.log('Database Offline!');
            return res.status(400).json({ error: "Database Offline!" });
        }
        if (data.length == 0) {
            console.log("File is empty!");            
            obj.table.push(user); //add some data  
            json = JSON.stringify(obj); //convert it back to json
            fs.writeFile('UserDB.json', json, 'utf8', err => {
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
            fs.readFile('UserDB.json', 'utf8', function readFileCallback(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    obj = JSON.parse(data); //now it an object         
                    obj.table.push(user); //add some data  
                    json = JSON.stringify(obj); //convert it back to json
                    fs.writeFile('UserDB.json', json, 'utf8', err => {
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


app.get('/api/testresults', (req, res) => {
    const fs = require("fs");
    var testResultCollection = [];   
    try {
        fs.readFile('TestResultDB.json', 'utf8', function readFileCallback(err, data) {
            if (data == undefined) {
                console.log('Test-Result Empty!');
                return res.status(400).json({ error: "Test-Result Empty!" });
            }

            if (err) {
                console.log("Database Not Ready!");
            } else {
                obj = JSON.parse(data); //now it an object         
                // console.log(obj.table);
                testResultCollection = obj.table;
                // console.log('results : ' + testResultCollection);
                // console.log(testResultCollection);
                res.json(testResultCollection);
            }
        });
    } catch (err) {
        console.log(err);
        return;
    }
});
app.post('/api/testresults', (req, res) => {
    fs = require('fs');    
    var obj = {
        table: []
    };
    obj.table.push(req.body);
    var json = JSON.stringify(obj);

    fs.readFile("TestResultDB.json", function (err, data) {
        if (data.length == 0) {
            console.log("File is empty!");
            fs.writeFile('TestResultDB.json', json, 'utf8', err => {
                if (err) {
                    console.log('Error writing file', err)
                } else {
                    console.log('Successfully wrote file')
                    res.json("result saved to file!");
                }
            });
        } else {
            console.log("File is not empty!");
            fs.readFile('TestResultDB.json', 'utf8', function readFileCallback(err, data) {
                if (err) {
                    console.log(err);                  
                } else {
                    obj = JSON.parse(data); //now it an object         
                    obj.table.push(req.body); //add some data
                    json = JSON.stringify(obj); //convert it back to json
                    fs.writeFile('TestResultDB.json', json, 'utf8', err => {
                        if (err) {
                            console.log('Error writing file', err)
                        } else {
                            console.log('Successfully wrote file')
                            res.json("result saved to file!");
                        }
                    }); // write it back
                }
            });
        }
    })  
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Express - Node js Running on :  ${port}`);

// Error Handling
app.use((req, res, next) => {
    next(createError(404));
});
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});