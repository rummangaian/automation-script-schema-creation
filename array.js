const fs = require("fs");
const path = require("path");
const axios = require("axios");

const entityInfoTemplate = {
  schemaReadAccess: "PUBLIC",
  dataReadAccess: "PUBLIC",
  dataWriteAccess: "PUBLIC",
  metadataReadAccess: "PUBLIC",
  metadataWriteAccess: "PUBLIC",
  universeID: "6690d5e6a2ee7d2b51716cb6",
  tags: {
    BLUE: ["XPX"],
  },
  execute: "PUBLIC",
  visibility: "PUBLIC",
};

const apiEndpoint = 'https://ig.gov-cloud.ai/pi-entity-service/v1.0/schemas';
const authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6InEtMjNmYWxldlpoaEQzaG05Q1Fia1A1TVF5VSJ9.eyJhdWQiOiI0ZTIzNDE5MC05YzFhLTRiMDgtYTkwYy1iNzVmMjAwNGY3ZGQiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vY2ZkYzkxMGQtMzVkMC00YjQxLWE1YmMtNmU3MDdiYWE3ZGJiL3YyLjAiLCJpYXQiOjE3MTIyOTY0MzksIm5iZiI6MTcxMjI5NjQzOSwiZXhwIjoxNzEyMzM5OTM5LCJhaW8iOiJBVVFBdS84V0FBQUE2T2Yram1Gc21vVjVPZkxNd3QvVFF6ZDdvQy9ZYTIxSlczb0Q4U3VkRHc2OG9jMW14cFMyUHByblJscGdIV0d0TEtCdDBIUTczb09yZHB3dXFLaTN4UT09IiwiYXpwIjoiNGUyMzQxOTAtOWMxYS00YjA4LWE5MGMtYjc1ZjIwMDRmN2RkIiwiYXpwYWNyIjoiMCIsIm5hbWUiOiJwcm9kIHVzZXIxIiwib2lkIjoiMWRhYjI4OWItZTZlMi00MmFhLWFhOTUtZTAwODA5YTI2OWI4IiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWFkaXR5YS5rYW5kdV9nYWlhbnNvbHV0aW9ucy5jb21AZ2FpYXR2LmluIiwicmgiOiIwLkFTb0FEWkhjejlBMVFVdWx2RzV3ZTZwOXU1QkJJMDRhbkFoTHFReTNYeUFFOTkwcUFGMC4iLCJyb2xlcyI6WyJWSU5DSV9VU0VSIiwiSE9MQUNSQUNZX1VTRVIiLCJQQVNDQUxfSU5URUxMSUdFTkNFX1VTRVIiLCJCT0xUWk1BTk5fQk9UX1VTRVIiLCJNT05FVF9VU0VSIl0sInNjcCI6IkhPTEFDUkFDWV9TQ09QRSIsInN1YiI6InFmemZCTVRWYjJYd1pvM05yT2NSTHZ2ZTNJeFFJS2t0ZTRtSFI2MkZpT0UiLCJ0aWQiOiJjZmRjOTEwZC0zNWQwLTRiNDEtYTViYy02ZTcwN2JhYTdkYmIiLCJ1dGkiOiJ5ZG03NE5jVFZrS3pvcUxwSTdzX0FBIiwidmVyIjoiMi4wIiwidGVuYW50SWQiOiIxZGFiMjg5Yi1lNmUyLTQyYWEtYWE5NS1lMDA4MDlhMjY5YjgifQ.X9---a8hlVKa4NwrD4Dg3McWstGcbJ1fgE4spKFzXaAYyulbPF6G2D0yqFdGn268VQVX5radBMh_S1F-r8JrLXpoUKaKwcR2xRRJjb8YTHhEkUUqyET6pbeMafk7-LOhfmdEum6E829r0JB8bKJ4SphFVFweq0vYoXKMkSYaUnVdg7ijFLyuc3IjBaqPensqBD_VDOf2Rfw2_MvAQXSY2mKPm9S0JruMGpHsMD_-0wOwZ6Kf_8X76W5041NOseNvG7kxQ0TDoQfSrJLTptvVo4oxHNWVdFErPoy5Atwb3CxWd3Oy2J29Lpxi2OscocToglsQZjdtRpn5bKC5TRI71Q';

async function transformAttributes(attributeList, primaryKeyArray) {
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

async function generateFinalObject(entity, entityInfoTemplate) {
  const primaryKeyArray = Array.isArray(entity.primaryKey)
    ? entity.primaryKey
    : [entity.primaryKey];

  return {
    entityName: entity.entityName,
    description: entity.description,
    schemaReadAccess: entityInfoTemplate.schemaReadAccess,
    dataReadAccess: entityInfoTemplate.dataReadAccess,
    dataWriteAccess: entityInfoTemplate.dataWriteAccess,
    metadataReadAccess: entityInfoTemplate.metadataReadAccess,
    metadataWriteAccess: entityInfoTemplate.metadataWriteAccess,
    universes: [entityInfoTemplate.universeID],
    tags: entityInfoTemplate.tags,
    attributes: await transformAttributes(entity.attributeList, primaryKeyArray),
    primaryKey: primaryKeyArray,
    execute: entityInfoTemplate.execute,
    visibility: entityInfoTemplate.visibility,
  };
}

async function saveJsonToFile(jsonObject, fileName) {
  const jsonString = JSON.stringify(jsonObject, null, 2);
  fs.writeFile(fileName, jsonString, (err) => {
    if (err) {
      console.error("Error writing to file", err);
    } else {
      console.log(`File has been saved as ${fileName}`);
    }
  });
}

async function sendEntityToApi(entity) {
  try {
    const response = await axios.post(apiEndpoint, entity, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "*/*",
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error sending entity to API", error.response.data);
  }
}

async function processJsonFile(inputFilePath) {
  fs.readFile(inputFilePath, "utf8", async (err, data) => {
    if (err) {
      console.error("Error reading file", err);
      return;
    }

    const jsonData = JSON.parse(data);
    if (!jsonData.list || !Array.isArray(jsonData.list)) {
      console.error("Invalid JSON format: 'list' is missing or not an array");
      return;
    }

    for (const [index, entity] of jsonData.list.entries()) {
      const finalObject = await generateFinalObject(entity, entityInfoTemplate);
      const apiResponse = await sendEntityToApi(finalObject);
      const fileName = `apiResponses/${entity.entityName.replace(/\s+/g, "")}_${index}.json`;

      // Ensure the directory exists
      fs.mkdirSync(path.dirname(fileName), { recursive: true });

      await saveJsonToFile(apiResponse, fileName);
    }
  });
}

// Provide the path to your input JSON file here
const inputFilePath = path.join(__dirname, "entities.json");

processJsonFile(inputFilePath);
