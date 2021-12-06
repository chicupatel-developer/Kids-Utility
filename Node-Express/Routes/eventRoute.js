const router = require('express').Router();

router.route('/delete').post(async (req, res) => {

    var jsonDatabaseFile = '\JSONDatabase\\EventDB.json';
    fs = require('fs');
    var obj = {
        table: []
    };

    var event = req.body;

    fs.readFile(jsonDatabaseFile, function (err, data) {
        if (data == undefined) {
            console.log('Database Offline!');
            return res.status(400).json({ error: "Database Offline!" });
        }
        if (data.length == 0) {
            console.log("File is empty!");
            return res.status(400).json({ error: "File is empty!" });
        } else {
            console.log("File is not empty!");
            fs.readFile(jsonDatabaseFile, 'utf8', function readFileCallback(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    obj = JSON.parse(data); //now it an object   
                    // find object                    
                    const removeIndex = obj.table.findIndex(item => item.id === event.id);
                    // remove object
                    obj.table.splice(removeIndex, 1);

                    json = JSON.stringify(obj); //convert it back to json
                    fs.writeFile(jsonDatabaseFile, json, 'utf8', err => {
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

router.route('/edit').post(async (req, res) => {

    var jsonDatabaseFile = '\JSONDatabase\\EventDB.json';
    fs = require('fs');
    var obj = {
        table: []
    };

    var event = req.body;

    fs.readFile(jsonDatabaseFile, function (err, data) {
        if (data == undefined) {
            console.log('Database Offline!');
            return res.status(400).json({ error: "Database Offline!" });
        }
        if (data.length == 0) {
            console.log("File is empty!");
            return res.status(400).json({ error: "File is empty!" });
        } else {
            console.log("File is not empty!");
            fs.readFile(jsonDatabaseFile, 'utf8', function readFileCallback(err, data) {
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
                    fs.writeFile(jsonDatabaseFile, json, 'utf8', err => {
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

router.route('/create').post(async (req, res) => {

    var jsonDatabaseFile = '\JSONDatabase\\EventDB.json';
    fs = require('fs');
    var obj = {
        table: []
    };

    var event = req.body;

    fs.readFile(jsonDatabaseFile, function (err, data) {
        if (data == undefined) {
            console.log('Database Offline!');
            return res.status(400).json({ error: "Database Offline!" });
        }
        if (data.length == 0) {
            console.log("File is empty!");
            obj.table.push(event); //add some data  
            json = JSON.stringify(obj); //convert it back to json
            fs.writeFile(jsonDatabaseFile, json, 'utf8', err => {
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
            fs.readFile(jsonDatabaseFile, 'utf8', function readFileCallback(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    obj = JSON.parse(data); //now it an object         
                    obj.table.push(event); //add some data  
                    json = JSON.stringify(obj); //convert it back to json
                    fs.writeFile(jsonDatabaseFile, json, 'utf8', err => {
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

router.route('/').get(async (req, res) => {

    var jsonDatabaseFile = '\JSONDatabase\\EventDB.json';
    const fs = require("fs");
    var eventCollection = [];
    try {
        fs.readFile(jsonDatabaseFile, 'utf8', function readFileCallback(err, data) {
            if (data == undefined) {
                console.log('Event Empty!');
                return res.status(400).json({ error: "Event Empty!" });
            }

            if (err) {
                console.log("Database Not Ready!");
            } else {
                obj = JSON.parse(data); //now it an object   
                eventCollection = obj.table;
                res.json(eventCollection);
            }
        });
    } catch (err) {
        console.log(err);
        return;
    }
});

module.exports = router;