var AWS = require("aws-sdk");
var fs = require("fs");
var parse = require('csv-parse');
var settings = require('./settings');

AWS.config.update({
  region: "us-west-2" //configure to your region
});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

// utils
function importData(csv_file, callback) {
    console.log("Importing data into DynamoDB. Please wait.");

    rs = fs.createReadStream(csv_file);
    parser = parse({
        columns : true,
        delimiter : ','
    }, function(err, data) {

        callback(err, data)
    });
    rs.pipe(parser);
}

function putData(params) {
    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add entry. Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded.");
       }
    });
}

// import data functions
function importIntrestsData() {
    importData(settings.tables['interest'].csvFile, function(err, data) {

        data.forEach(function(obj) {
            var map = settings.tables['interest'].map;
            var item = {id: obj.Interest};
            Object.keys(map).forEach(function(key) {
                item[key] = obj[map[key]];
            });
            var params = {
                TableName: settings.tables['interest'].tableName,
                Item: item
            };
            putData(params);
        });
    });
}

function importCareerData() {
    importData(settings.tables['career'].csvFile, function(err, data) {

        data.forEach(function(obj) {
            var careers = [];
            Object.keys(obj).forEach(function(prop) {
                if (settings.tables['career'].schema.indexOf(prop) === -1 && obj[prop].trim().length !== 0) {
                    careers.push(obj[prop]);
                }
            });
            var params = {
                TableName: settings.tables['career'].tableName,
                Item: {
                    "interest": obj[settings.tables['career'].map['interest']],
                    "careers":  careers
                }
            };
            putData(params);
        });
    });
}

function createCareerHelper(career, obj, map) {

    function getRoleModel() {
        var roleModle = {};
        Object.keys(map).forEach( function(key) {
            if (key !== "career" && key !== "career2")
            roleModle[key] = obj[map[key]];
        });
        roleModle.image = settings.imageURL;
        return roleModle;
    }

    function getDescription() {
        var description = {};
        Object.keys(map).forEach( function(key) {
            if (settings.desciptionSubSet.indexOf(key) !== -1) {
                description[key] = obj[map[key]];
            }
        });
        return description;
    }

    if (career) {
        career.rolemodels.push(getRoleModel());
        career.description.push(getDescription());
    } else {
        career = {career: obj[map["career"]], rolemodels: [getRoleModel()], description: [getDescription()]};
    }
    return career;
}

function importRoleModelsData() {
    importData(settings.tables['rolemodels'].csvFile, function(err, data) {

        var entries = {};
        var map = settings.tables['rolemodels'].map;
        data.forEach(function(obj) {
            entries[obj[map["career"]]] = createCareerHelper(entries[obj[map["career"]]], obj, map);
            if (obj[map["career2"]].trim().length > 0) {
                entries[obj[map["career2"]]] = createCareerHelper(entries[obj[map["career2"]]], obj, map);
            }
        });

        Object.keys(entries).forEach(function(key) {
            var params = {
                TableName: settings.tables['rolemodels'].tableName,
                Item: entries[key]
            };
            putData(params);
        });
    });
}

// create table functions 
function createTable(params, callback) {
    dynamodb.createTable(params, function(err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
            callback(err);
        }
        else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
            callback(null, data);
        }
    });
}

var callCount = 0;
Object.keys(settings.tables).forEach(function(key) {
    var table = settings.tables[key];
    var params = {
        TableName : table.tableName,
        KeySchema: [       
            { AttributeName: table.key, KeyType: "HASH"},  //Partition key
        ],
        AttributeDefinitions: [       
            { AttributeName: table.key, AttributeType: "S" }
        ],
        ProvisionedThroughput: {       
            ReadCapacityUnits: 10, 
            WriteCapacityUnits: 10
        }
    };

    createTable(params, function(err, data) {
        if (++callCount === Object.keys(settings.tables).length) {
            setTimeout(function() {
                importIntrestsData();
                importCareerData();
                importRoleModelsData();
            }, 10000);
        }
    });
});
