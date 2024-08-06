Marco_Workspace = {
  workspaceName: "string",
  workspaceId: "string",
  workspaceDesc: "string",
  preferredCurrency: "string",
  planLanguage: "string",
  noOfSparators: "number",
  businessStage: "string",
  fiscalYearCycle: "string",
  firstYearOfForecast: "string",
  lengthOfForecast: "string",
  monthlyDetails: "string",
  multiMonthsCharges: "string",
  signature: "string",
  owner: "string",
  users: "json",
  lastUpdated: "string",
  createdAt: "string",
};

team_member = {
  memberName: "string",
  memberEmail: "string",
  memberId: "string",
  role: "string",
  userSince: "string",
  access: "string",
};

datasets = {
  datasetName: "string",
  datasetDesc: "string",
  datasetId: "string",
  datasetMetadata: {},
  workspaceId: "string",
};

combineDatasetConfiguration = {
  configurationName: "string",
  configurationID: "string",
  combinedDatasetName: "string",
  resultantUsecase: "string", //(ex TAM , Modals)
  baseTableID: "string",
  joinTableID: "string",
  joinType: "string", //(inner , full , left , right )
  baseField: "string",
  joinField: "string",
  conditionBuilder: "string", // (= , < , > )
};

combineDatasetConfiguration = {
  configurationName: "string",
  configurationID: "string",
  combinedDatasetName: "string",
  resultantUsecase: "string",
  baseTableID: "string",
  joinTableID: "string",
  joinType: "string",
  baseField: "string",
  joinField: "string",
  conditionBuilder: "string",
};

query = {
  queryId: "string",
  queryName: "string",
  queryDesc: "string",
  query_type: "string", //(Tam , Modal)
  query_resultant: "string",
  query_template: "string",
};

query = {
  queryId: "string",
  queryName: "string",
  queryDesc: "string",
  queryType: "string",
  queryResultant: "string",
  queryTemplate: "string",
};

bigQueryDroppedTam = {
  tamName: "string",
  tamDesc: "string",
  aliasNames: "json",
  parentDatasetID: "string",
  parentSchemaIDMetaData: "string",
  resultantQueryString: "string",
  startTime: "string",
  endTime: "string",
  frequency: "string",
  type: "string"(ex - schedules, one - time),
  resultantTAMID: "string",
  queryID: "string", //(what query are we actually dropping)
  querytype: "string", //(TAM , )
  resultantQueryType: "string",
};

bigQueryDroppedTam = {
  tamName: "string",
  tamDesc: "string",
  tamId: "string",
  aliasNames: "json",
  parentDatasetID: "string",
  parentSchemaIDMetaData: "string",
  resultantQueryString: "string",
  startTime: "string",
  endTime: "string",
  frequency: "string",
  type: "string",
  resultantTAMID: "string",
  queryID: "string",
  querytype: "string",
  resultantQueryType: "string",
};

bigQueryDroppedModal = {
  businessModalName: "string",
  businessModalDesc: "string",
  resultantBusinessModalID: "string",
  aliasNames: "json",
  parentTamID: "string",
  parentSchemaIDMetaData: "string",
  resultantQueryString: "string",
  startTime: "string",
  endTime: "string",
  frequency: "string",
  type: "string"(ex - schedules, one - time),
  queryID: "string", //(what query are we actually dropping)
  querytype: "string", //(Modal , )
  resultantQueryType: "string",
  graphs: "json",
};
bigQueryDroppedModal = {
  businessModalName: "string",
  businessModalDesc: "string",
  businessModalID: "string",
  aliasNames: "json",
  parentTamID: "string",
  parentSchemaIDMetaData: "string",
  resultantQueryString: "string",
  startTime: "string",
  endTime: "string",
  frequency: "string",
  type: "string",
  queryID: "string",
  querytype: "string",
  resultantQueryType: "string",
  graphs: "json",
};

planSchema = {
  businessPlanName: "string",
  businessPlanDesc: "string",
  resultantBusinessPlanID: "string",
  parentModalID: "string",
  parentSchemaIDMetaData: "string",
  graphs: "json",
  planConfig: "string",
};

proposalSchema = {
  businessProposalID: "string",
  productID: "string",
  businessProposalName: "string",
  businessProposalDesc: "string",
  parentPlanID: "string",
  lastUpdatedAt: "string",
  createdAt: "string",
  owner: "string",
  status: "string",
  createdBy: "json",
  parentSchemaIDMetaData: "json",
  graphs: "json",
  planConfig: "json",
  organizationName: "string",
  organizationID: "string",
};

graph = {
  graphID: "string",
  graphName: "string",
  graphYAxis: "string",
  graphXAxis: "string",
  graphType: "string",
  businessStage: "string",
  graphData: "json",
};

template = {
  templateName: "string",
  templateID: "string",
  templateConfig: "string",
  businessStage: "string",
};

configureMatricsData = {
  matricsType: "string", //appMatrics , tamMatrics
  capType: "string", //tamCapm , appCap , demography , adaptionRate
  rateCard: "string",
  meteredRequired: "boolean",
  meteredValue: "number",
  fixedRequired: "boolean",
  fixedValue: "number",
  fixedUnit: "string",
  subscriptionRequired: "boolean",
  subscriptionValue: "number",
  subscriptionUnit: "string",
  adRevenueRequired: "boolean",
  adRevenueValue: "number",
  dataAsCurrencyRequired: "boolean",
  dataAsCurrencyValue: "number",
  cityList:"json"
};


configureMatricsData = {
  matricsId:"string",
  businessModalID:"string",
  matricsType: "string", 
  capType: "string", 
  rateCard: "string",
  meteredRequired: "boolean",
  meteredValue: "number",
  fixedRequired: "boolean",
  fixedValue: "number",
  fixedUnit: "string",
  subscriptionRequired: "boolean",
  subscriptionValue: "number",
  subscriptionUnit: "string",
  adRevenueRequired: "boolean",
  adRevenueValue: "number",
  dataAsCurrencyRequired: "boolean",
  dataAsCurrencyValue: "number",
  cityList:"json"
};


a = {
  name:"",
  desc:"",
  primaryKey:"",
  attributes:{
      templateName: "string",
      templateID: "string",
      templateConfig: "string",
      businessStage: "string",
  }
}