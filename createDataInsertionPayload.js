const fs = require("fs")
const schema = {
    "status": "success",
    "msg": "EntitySchema created",
    "schemaId": "66b0c2fe4a52ce31278b9643",
    "entitySchema": {
        "name": "Marco Research Dataset Schema",
        "primaryKey": [
            "datasetId"
        ],
        "attributes": [
            {
                "name": "datasetName",
                "nestedName": "datasetName",
                "type": {
                    "type": "string"
                },
                "required": false,
                "reference": false,
                "sensitive": false,
                "videos": [],
                "childAttributes": []
            },
            {
                "name": "datasetId",
                "nestedName": "datasetId",
                "type": {
                    "type": "string"
                },
                "required": true,
                "reference": false,
                "sensitive": false,
                "videos": [],
                "childAttributes": []
            },
            {
                "name": "datasetMetadata",
                "nestedName": "datasetMetadata",
                "type": {
                    "type": "json"
                },
                "required": false,
                "reference": false,
                "sensitive": false,
                "videos": [],
                "childAttributes": []
            },
            {
                "name": "datasetDesc",
                "nestedName": "datasetDesc",
                "type": {
                    "type": "string"
                },
                "required": false,
                "reference": false,
                "sensitive": false,
                "videos": [],
                "childAttributes": []
            },
            {
                "name": "workspaceId",
                "nestedName": "workspaceId",
                "type": {
                    "type": "string"
                },
                "required": false,
                "reference": false,
                "sensitive": false,
                "videos": [],
                "childAttributes": []
            }
        ],
        "draft": false,
        "universes": [
            "6690d5e6a2ee7d2b51716cb6"
        ],
        "javascriptFunctions": {},
        "tenantsWithReadDataAccess": {
            "65cdc7d922280900018331c8": [
                "65cdc7d922280900018331c8"
            ]
        },
        "tenantsWithWriteDataAccess": [
            "65cdc7d922280900018331c8"
        ],
        "tidbStatus": {
            "tablePresent": false,
            "remark": "Table not yet created"
        },
        "neo4jSchemaNodeStatus": {},
        "additionalMetaData": {},
        "tags": {
            "BLUE": [
                "XPX"
            ]
        },
        "oltponly": false
    },
    "tenantID": "65cdc7d922280900018331c8"
}


const attributes = schema.entitySchema.attributes.reduce((acc, attr) => {
    acc[attr.name] = attr.type.type;
    return acc;
}, {});

function saveJsonToFile(jsonObject, fileName) {
    const jsonString = JSON.stringify(jsonObject, null, 2);
    fs.writeFile(fileName, jsonString, (err) => {
      if (err) {
        console.error("Error writing to file", err);
      } else {
        console.log(`File has been saved as ${fileName}`);
      }
    });
  }
  
  // Remove spaces from entityName for file name
  const fileName = `instances.json`;
  
  saveJsonToFile(attributes, fileName);

