var settings = {
    tables: {
        "interest": {
            csvFile: "./data/Interests.csv",
            tableName: "test1Interest",
            key: "id",
            schema: [
               "id",
               "category",
               "name"
            ],
            map: {
                "category": "Interest Category", 
                "name": "Interest"
            }
            
        },
        "career": {
            csvFile: "./data/Careers.csv",
            tableName: "test1Career",
            key: "interest",
            schema: [
               "interest",
               "careers"
            ],
            map: {
                "interest": "Interests"
            }
            
        },
        "rolemodels": {
            csvFile: "./data/Role Models.csv",
            tableName: "test1Rolemodels",
            key: "career",
            schema: [
               "career",
               "description",
               "rolemodels"
            ],
            map: {
                "career": "Career 1 From List", 
                "career2": "Career 2 From List", 
                "blurb": "Blurb",
                "businessaffiliation": "Business Affiliation",  
                "canhelppeople1": "Can help people (1)",
                "canhelppeople2": "Can help people (2)",
                "classestotake1": "Classes to take (1)",
                "classestotake2": "Classes to take (2)",
                "classestotake3": "Classes to take (3)",
                "firstname": "First Name",
                "image": "Image",
                "jobtitle": "Job Title",
                "lastname": "Last Name",
                "source": "Source",
                "video": "Video",
                "videotitle": "Video Title",
                "websitelink": "Website (Link)",
                "websitetexttodisplay": "Website (text to display)"
            }
            
        }
    },
    desciptionSubSet: [ "canhelppeople1", "canhelppeople2", "classestotake1", "classestotake2", "classestotake3", "collegestovisit1", "collegestovisit2", "video", "videotitle"],
    imageURL: "http://i.pravatar.cc/300"
};

module.exports = settings;