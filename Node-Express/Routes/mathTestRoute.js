const router = require('express').Router();

router.route('/test-result-create').post(async (req, res) => {

    var jsonDatabaseFile = '\JSONDatabase\\TestResultDB.json';
    fs = require('fs');
    var obj = {
        table: []
    };
    obj.table.push(req.body);
    var json = JSON.stringify(obj);

    fs.readFile(jsonDatabaseFile, function (err, data) {
        if (data.length == 0) {
            console.log("File is empty!");
            fs.writeFile(jsonDatabaseFile, json, 'utf8', err => {
                if (err) {
                    console.log('Error writing file', err)
                } else {
                    console.log('Successfully wrote file')
                    res.json("result saved to file!");
                }
            });
        } else {
            console.log("File is not empty!");
            fs.readFile(jsonDatabaseFile, 'utf8', function readFileCallback(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    obj = JSON.parse(data); //now it an object         
                    obj.table.push(req.body); //add some data
                    json = JSON.stringify(obj); //convert it back to json
                    fs.writeFile(jsonDatabaseFile, json, 'utf8', err => {
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

router.route('/my-all-test-result').get(async (req, res) => {
   
    var jsonDatabaseFile = '\JSONDatabase\\TestResultDB.json';
    const fs = require("fs");
    var testResultCollection = [];
    try {
        fs.readFile(jsonDatabaseFile, 'utf8', function readFileCallback(err, data) {
            if (data == undefined) {
                console.log('Test-Result Empty!');
                return res.status(400).json({ error: "Test-Result Empty!" });
            }

            if (err) {
                console.log("Database Not Ready!");
            } else {
                obj = JSON.parse(data); //now it an object   
                testResultCollection = obj.table;
                res.json(testResultCollection);
            }
        });
    } catch (err) {
        console.log(err);
        
        return;
    }
});

module.exports = router;