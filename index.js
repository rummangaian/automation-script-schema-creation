async function sqltomap(arr) {
    let final = "";
    var bqDef1 = "SELECT ROUND(`entity.dmaAnnualPoliceBudget`*0.5, 2) as dmaAnnualPoliceBudgetForCommunications, `entity.dma` as dma, `entity.dmaConsidered` as dmaConsidered, `entity.dmaAnnualPoliceBudget` as dmaAnnualPoliceBudget FROM t_65f183a0c81a936c2eea0033_t";
    var bqDef2 = "SELECT ROUND(`data.dmaAnnualPoliceBudgetForCommunications`*5, 2) as smartDevices, `data.dmaAnnualPoliceBudgetForCommunications` as dmaAnnualPoliceBudgetForCommunications, `data.dma` as dma, `data.dmaConsidered` as dmaConsidered, `data.dmaAnnualPoliceBudget` as dmaAnnualPoliceBudget FROM table_65f81a5fc23f600fa6e93258";
    var bqDef3 = "SELECT ROUND(`data.smartDevices`*50, 2) as totalSmartDevices, `data.smartDevices` as smartDevices, `data.dmaAnnualPoliceBudgetForCommunications` as dmaAnnualPoliceBudgetForCommunications, `data.dma` as dma, `data.dmaConsidered` as dmaConsidered, `data.dmaAnnualPoliceBudget` as dmaAnnualPoliceBudget FROM table_65f82ff8c23f600fa6e93262";
    // var bqDef1 =
    //   "SELECT ROUND(`entity.noOfHouseholds`*0.45, 0) as noOfSmartHouseholds, ROUND(`entity.noOfHouseholds`*0.45, 0)*5 as totalSmartDevicesInHouseholds, `entity.dma` as dma, `entity.states` as states, `entity.dmaConsidered` as dmaConsidered, `entity.tvHomes` as tvHomes, `entity.noOfHouseholds` as noOfHouseholds, `entity.totalNoOfRestaurants` as totalNoOfRestaurants, `entity.totalNoOfOldAgeHomes` as totalNoOfOldAgeHomes, `entity.totalNoOfHospitals` as totalNoOfHospitals, `entity.totalNoOfRestaurants`*20 as totalNoOfDevicesInRestaurant, `entity.totalNoOfOldAgeHomes`*50 as totalNoOfDevicesInOldAgeHomes, `entity.totalNoOfHospitals`*1000 as totalNoOfDevicesInHospital, ROUND(`entity.noOfHouseholds`*0.45, 0)+`entity.totalNoOfRestaurants`+`entity.totalNoOfOldAgeHomes`+`entity.totalNoOfHospitals` as totalHouseholds, ROUND(`entity.noOfHouseholds`*0.45, 0)*5+`entity.totalNoOfRestaurants`*20+`entity.totalNoOfOldAgeHomes`*50+`entity.totalNoOfHospitals`*1000 as totalSmartDevices FROM t_65f3052331e25f0062e71c00_t";
    // var bqDef2 =
    //   "SELECT ROUND((`data.totalSmartDevices`)*0.02*0.10, 0) as overallCostForDevicesFixed, ROUND(ROUND((`data.totalSmartDevices`)*0.02*0.10, 0)*0.001, 2) as discountedNexusCostFixed, ROUND(ROUND((`data.totalSmartDevices`)*0.02*0.10, 0)*0.15, 0) as meteredSaaS, ROUND(ROUND(5*0.04*0.05*`data.totalHouseholds`, 2), 0) as subscriptionRevenue, ROUND(ROUND((10/1000)*1*0.85*0.04*30*`data.totalHouseholds`, 2), 0) as adRevenue, ROUND( ROUND((`data.totalSmartDevices`)*0.02*0.10, 0) + ROUND(ROUND((`data.totalSmartDevices`)*0.02*0.10, 0)*0.001, 2) + ROUND(ROUND((`data.totalSmartDevices`)*0.02*0.10, 0)*0.15, 0) + ROUND(ROUND(5*0.04*0.05*`data.totalHouseholds`, 2), 0) + ROUND(ROUND((10/1000)*1*0.85*0.04*30*`data.totalHouseholds`, 2), 0), 0) as monthlyData, `data.totalNoOfOldAgeHomes` as totalNoOfOldAgeHomes, `data.totalNoOfDevicesInRestaurant` as totalNoOfDevicesInRestaurant, `data.dma` as dma, `data.totalSmartDevicesInHouseholds` as totalSmartDevicesInHouseholds, `data.totalNoOfDevicesInHospital` as totalNoOfDevicesInHospital, `data.states` as states, `data.totalNoOfHospitals` as totalNoOfHospitals, `data.noOfSmartHouseholds` as noOfSmartHouseholds, `data.noOfHouseholds` as noOfHouseholds, `data.totalNoOfDevicesInOldAgeHomes` as totalNoOfDevicesInOldAgeHomes, `data.totalHouseholds` as totalHouseholds, `data.totalSmartDevices` as totalSmartDevices, `data.dmaConsidered` as dmaConsidered, `data.tvHomes` as tvHomes, `data.totalNoOfRestaurants` as totalNoOfRestaurants FROM table_65f84095c23f600fa6e93265";
    function sqlQueryToMap(sqlQuery) {
      const regex = /(?:\bas\s)(\w+)\b/g;
      let match;
      const resultMap = {};
  
      while ((match = regex.exec(sqlQuery)) !== null) {
        const alias = match[1];
        console.log(match);
        resultMap[match[1]] = match[0];
      }
  
      return resultMap;
    }
    // var temp2 = bqDef1;
    // var q = sqlQueryToMap(bqDef1);
    // console.log(q);
    // return;
    // var p = convertSQLToMap(temp2);
    // console.log("SQL QUERY", q);
    bqDef1 = bqDef1.replace("SELECT", "");
    bqDef2 = bqDef2.replace("SELECT", "");
    // bqDef3 = bqDef3.replace("SELECT", "");
    let temp = "";
    [bqDef1, temp] = bqDef1.split("FROM");
    let table = temp;
    [bqDef2, temp] = bqDef2.split("FROM");
    // [bqDef3, temp] = bqDef3.split("FROM");
    bqDef1.replaceAll("SELECT", "");
    bqDef2.replaceAll("SELECT", "");
    // bqDef3.replaceAll("SELECT", "");
    let j1 = bqDef1
      .replaceAll(", `", ", $`")
      .replaceAll(", ROUND(", ", $ROUND(")
      .split(", $")
      .map((d, i) => {
        return d.split(" as ").map((e, j) => {
          let k = e.replaceAll(" ", "");
          return k;
        });
      });
    let j2 = bqDef2
      .replaceAll(", `", ", $`")
      .replaceAll(", ROUND(", ", $ROUND(")
      .split(", $")
      .map((d, i) => {
        return d.split(" as ").map((e, j) => {
          let k = e.replaceAll(" ", "");
          return k;
        });
      });
    console.log("SPLITTED", j1, j2);
    // let j3 = bqDef3.replaceAll(", `", ", ``").split(", `").map((d,i)=>{return d.split(" as ").map((e,j)=>{let k = e.replaceAll(" ", ""); return k})});
    // console.log("SPLIT 3",bqDef3, j3)
    let m = new Map();
    j1.map((d, i) => {
      // let strIndex = d[0].indexOf("`");
      // let endIndex = d[0].indexOf("`", strIndex+1);
      // let temp = d[1].replaceAll(" ", "");
      m.set(d[1], d[0]);
    });
    console.log("FINAL", bqDef1);
    console.log("MAP1", m);
    j2.map((d, i) => {
      if (m.has(d[1])) {
        // m.set(d[1], [...m.get(d[1]), d[0]]);
      } else {
        console.log("TEMP", d[0]);
        temp = d[0];
        // temp = temp.replaceAll("`", "");
        temp = temp.replaceAll("SELECT", "");
        temp = temp.replaceAll("data.", "");
        let strIndex = temp.indexOf("`");
        let endIndex = temp.indexOf("`", strIndex + 1);
        let temp2 = temp.substring(strIndex + 1, endIndex);
        console.log("TEMP2", temp2);
        let temp3 = m.get(temp2);
        temp = temp.replaceAll("`" + temp2 + "`", temp3);
        console.log("TEMP", temp);
        // bqDef1 = bqDef1 +", "+ temp + " as " + d[1];
        m.set(d[1], temp);
      }
    });
    // console.log("SECOND", bqDef1, bqDef2);
    console.log("MAP2", m);
    // j3.map((d,i)=>{
    //   if(m.has(d[1])){
    //     // m.set(d[1], [...m.get(d[1]), d[0]]);
    //     console.log("d[1]", d[1])
    //   }
    //   else {
    //     console.log("TEMP", d[0]);
    //     temp = d[0];
    //     // temp = temp.replaceAll("`", "");
    //     temp = temp.replaceAll("SELECT", "");
    //     temp = temp.replaceAll("data.", "");
    //     let strIndex = temp.indexOf("`");
    //     let endIndex = temp.indexOf("`", strIndex+1);
    //     let temp2 = temp.substring(strIndex+1, endIndex);
    //     console.log("TEMP2",temp2);
    //     let temp3 = m.get(temp2);
    //     temp = temp.replaceAll("`"+temp2+"`", temp3);
    //     console.log("TEMP", temp);
    //     // bqDef1 = bqDef1 +", "+ temp + " as " + d[1];
    //     console.log("MAPPED", d[1], temp)
    //     m.set(d[1], temp);
    //   }
    // })
    // j1.map((d,i)=>{
    //   // console.log(d.search())
    //   let strIndex = d.indexOf("`");
    //   let endIndex = d.indexOf("`", strIndex+1);
    //   let str2Index = d.indexOf(".");
    //   m.set(d.substring(str2Index+1, endIndex), [d.substring(strIndex+1, endIndex)]);
    // })
    // j2.map((d,i)=>{
    //   // console.log(d.search())
    //   let strIndex = d.indexOf("`");
    //   let endIndex = d.indexOf("`", strIndex+1);
    //   let str2Index = d.indexOf(".");
    //   if(m.has(d.substring(str2Index+1, endIndex))){
    //   m.set(d.substring(str2Index+1, endIndex), [...m.get(d.substring(str2Index+1, endIndex)), d.substring(strIndex+1, endIndex)]);
    //   }else {
    //   m.set(d.substring(str2Index+1, endIndex), d.substring(strIndex+1, endIndex));
    //   }
    // })
    // j.map((d,i)=>{
    //   d.replace("select", "");
    //   d.replace("from", "");
    //   // d.replace("SELECT", "");
    //   // d.replace("FROM", "");
    // })
    console.log("ARR", j1, j2);
    console.log("MAP", m);
    for (let i of m) {
      console.log("MAPPDATA", i);
      final += ` ${i[1]} as ${i[0]}, `;
    }
    final = final.substring(0, final.length - 2);
    final = "SELECT " + final + " FROM " + table;
    console.log("Final", final);
  }
  async function createCombinedBQ() {
    let final = "";
    let bqDef1 =
      "SELECT ROUND(`{{entity.noOfHouseholds}}`*[[percentOfHouseholdsContainingSmartDevices]], 0) as totalSmartHouseholds, `{{entity.dma}}` as dma, `{{entity.noOfHouseholds}}` as noOfHouseholds, `{{entity.dmaConsidered}}` as dmaConsidered, `{{entity.states}}` as states FROM t_65f3052331e25f0062e71c00_t";
    let bqDef2 =
      "SELECT ROUND(`{{data.totalSmartHouseholds}}`*[[avgNoOfSmartDevicesInEachHousehold]], 0) as totalSmartDevicesInHouseholds, `{{data.totalSmartHouseholds}}` as totalSmartHouseholds, `data.dma` as dma, `data.dmaConsidered` as dmaConsidered, `data.states` as states FROM t_65f3052331e25f0062e71c00_t";
    let arr = [bqDef1];
    let m = new Map();
    function sqlQueryToMap(sqlQuery) {
      const regex = /(?:\bas\s)(\w+)\b/g;
      let match;
      const resultMap = [];
      while ((match = regex.exec(sqlQuery)) !== null) {
        resultMap.push(match[1]);
      }
      return resultMap;
    }
    function checkColumns(sqlQuery, m) {
      var i = 0;
      // while (sqlQuery.indexOf("{{data.") > 0 && i<10) {
      //   i++;
      //   let strIndex = sqlQuery.indexOf("{{data.");
      //   let endIndex = sqlQuery.indexOf("{", strIndex + 1);
      //   let t = sqlQuery.substring(strIndex + 2, endIndex - 2);
      //   t = t.replaceAll("data.", "");
      //   let t2 = m.get(t);
      //   sqlQuery = sqlQuery.replaceAll(`{{data.${t}}}`, t2);
      //   console.log(i,t2, t)
      // }
      i = 0;
      while (sqlQuery.indexOf("`data.") > 0 && i < 10) {
        i++;
        let strIndex = sqlQuery.indexOf("`data.");
        let endIndex = sqlQuery.indexOf("`", strIndex + 1);
        let t = sqlQuery.substring(strIndex + 1, endIndex);
        t = t.replaceAll("data.", "");
        let t2 = m.get(t);
        sqlQuery = sqlQuery.replaceAll(`\`data.${t}\``, t2);
        // console.log(i, t2, t);
      }
      return sqlQuery;
    }
    function splitQueryAndMap(arr, sqlQuery, m, isLast = false) {
      let t1 = "";
      let t2 = "";
      if (isLast) {
        [t1, t2] = sqlQuery.split(` as ${arr}`);
        // console.log(t1,t2);
        if (t2 == undefined) {
          [t1, t2] = sqlQuery.split(` AS ${arr}`);
        }
      } else {
        [t1, t2] = sqlQuery.split(` as ${arr},`);
        if (t2 == undefined) {
          [t1, t2] = sqlQuery.split(` AS ${arr},`);
        }
        // console.log(t1,t2);
      }
      let n = arr.replaceAll(" ", "");
    //   console.log("TRIMMED ALL", n, t1, m);
      t1 = checkColumns(t1, m);
      t1 = t1.replaceAll(" ", "");
      m.set(n, t1);
  
      return t2;
    }
    var table = "";
    for (let i in arr) {
      // console.log(i, arr[i]);
    //   arr[i] = arr[i].replaceAll("", "`data.");
    //   arr[i] = arr[i].replaceAll("}}", "`");
      arr[i] = arr[i].replaceAll(" AS ", " as ");
      var q = sqlQueryToMap(arr[i]);
      console.log("SQLQUERYTOMAP", q);
    //   return;
    //   console.log(i, arr[i], q);
    //   return;
      var temp = arr[i];
      temp = temp.replaceAll("select", "");
      temp = temp.replaceAll("SELECT", "");
      var t2 = temp.split(" FROM ");
      if (t2.length == 1) {
        t2 = temp.split(" from ");
      }
      if (i == 0) {
        table = t2[1];
        temp = t2[0];
      } else {
        temp = t2[0];
      }
      console.log("DELETED SELECT AND FROM ", temp);
    //   return ;
      for (let j in q) {
        if (j == q.length - 1) {
          temp = splitQueryAndMap(q[j], temp, m, true);
        } else {
          temp = splitQueryAndMap(q[j], temp, m, false);
        }
      }
    }
    return;
    for (let i of m) {
      final += " " + i[1] + " as " + i[0] + ", ";
    }
    final = final.substring(0, final.length - 2);
    final += " FROM " + table;
    final = "SELECT " + final.replaceAll("`data.", "`entity.");
    console.log(m, final);
    return final;
  }
  createCombinedBQ();