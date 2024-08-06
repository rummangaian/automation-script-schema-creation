const fs = require("fs");

const attributeList = {
  templateName: "string",
  templateID: "string",
  templateConfig: "string",
  businessStage: {
    templateName: "string",
    templateID: "string",
    templateConfig: "string",
    businessStage: "string",
  },
};

const entityInfo = {
  entityName: "",
  description: "",
  schemaReadAccess: "PUBLIC",
  dataReadAccess: "PUBLIC",
  dataWriteAccess: "PUBLIC",
  metadataReadAccess: "PUBLIC",
  metadataWriteAccess: "PUBLIC",
  universeID: "6690d5e6a2ee7d2b51716cb6",
  tags: {
    BLUE: ["XPX"],
  },
  primaryKey: "",
  execute: "PUBLIC",
  visibility: "PUBLIC",
};

function transformAttributes(attributeList, primaryKeyArray) {
  const result = [];

  const createAttributeObject = (key, value, nestedName = key) => {
    const attribute = {
      name: key,
      nestedName: nestedName,
      type: {
        type:
          typeof value === "object" && !Array.isArray(value) ? "object" : value,
      },
      required:
        primaryKeyArray.includes(key) ||
        (typeof value === "object" && !Array.isArray(value)),
      reference: false,
      childAttributes: [],
      access: "PUBLIC",
    };

    if (typeof value === "object" && !Array.isArray(value)) {
      for (const nestedKey in value) {
        const nestedValue = value[nestedKey];
        attribute.childAttributes.push(
          createAttributeObject(
            nestedKey,
            nestedValue,
            `${nestedName}.${nestedKey}`
          )
        );
      }
    }

    return attribute;
  };

  for (const key in attributeList) {
    const value = attributeList[key];
    result.push(createAttributeObject(key, value));
  }

  return result;
}

function generateFinalObject(attributeList, entityInfo) {
  const primaryKeyArray = Array.isArray(entityInfo.primaryKey)
    ? entityInfo.primaryKey
    : [entityInfo.primaryKey];

  return {
    entityName: entityInfo.entityName,
    description: entityInfo.description,
    schemaReadAccess: entityInfo.schemaReadAccess,
    dataReadAccess: entityInfo.dataReadAccess,
    dataWriteAccess: entityInfo.dataWriteAccess,
    metadataReadAccess: entityInfo.metadataReadAccess,
    metadataWriteAccess: entityInfo.metadataWriteAccess,
    universes: [entityInfo.universeID],
    tags: entityInfo.tags,
    attributes: transformAttributes(attributeList, primaryKeyArray),
    primaryKey: primaryKeyArray,
    execute: entityInfo.execute,
    visibility: entityInfo.visibility,
  };
}

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
const fileName = `newSchemaFolder/${entityInfo.entityName.replace(
  /\s+/g,
  ""
)}.json`;

const finalObject = generateFinalObject(attributeList, entityInfo);
saveJsonToFile(finalObject, fileName);
