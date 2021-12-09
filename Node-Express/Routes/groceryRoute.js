const router = require('express').Router();

router.route('/add').post(async (req, res) => {

    var jsonDatabaseFile = '\JSONDatabase\\groceryDB.json';
    fs = require('fs');
    var obj = {
        table: []
    };

    var grocery = req.body;

    fs.readFile(jsonDatabaseFile, function (err, data) {
        if (data == undefined) {
            console.log('Database Offline!');
            return res.status(400).json({ error: "Database Offline!" });
        }
        if (data.length == 0) {
            console.log("File is empty!");
            obj.table.push(grocery); //add some data
            json = JSON.stringify(obj); //convert it back to json
            fs.writeFile(jsonDatabaseFile, json, 'utf8', err => {
                if (err) {
                    console.log('Error writing file', err)
                    return res.status(400).json({ error: "Error Adding Grocery List Item!" });
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
                    obj.table.push(grocery); //add some data  
                    json = JSON.stringify(obj); //convert it back to json
                    fs.writeFile(jsonDatabaseFile, json, 'utf8', err => {
                        if (err) {
                            console.log('Error writing file', err)
                            return res.status(400).json({ error: "Error Adding Grocery List Item!" });
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

    var jsonDatabaseFile = '\JSONDatabase\\groceryDB.json';
    const fs = require("fs");
    var groceryListItemCollection = [];
    try {
        fs.readFile(jsonDatabaseFile, 'utf8', function readFileCallback(err, data) {
            if (data == undefined) {
                console.log('Grocery Collection Empty!');
                return res.status(400).json({ error: "Grocery Collection Empty!" });
            }

            if (err) {
                console.log("Database Not Ready!");
            } else {
                obj = JSON.parse(data); //now it an object   
                groceryListItemCollection = obj.table;
                res.json(groceryListItemCollection);
            }
        });
    } catch (err) {
        console.log(err);
        return;
    }
});

module.exports = router;