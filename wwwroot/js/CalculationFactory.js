
//Average calculation, values should be an array
function aveCal(values) {
    let total = 0;
    for (let i = 0; i < values.length; i++) {
        total += values[i];
    }
    return total / values.length;
    
}

//Get the Average time used in each round
function getAveTimeUseMap(allData) {
    let round = 1;
    let aveTimeUseMap = new Map();
    
    for(value of allData.values()) {
        let timeUseArray = [];
        for (let m of value) {
            timeUseArray.push(m.get("TimeUse"));
        }
        aveTimeUseMap.set("Round" + round, aveCal(timeUseArray));
        round++;
    }
    return aveTimeUseMap;
}



//Get JSON Data from root and return the data in a Map
function getAllData(TotalRound) {
    let dataList = new Map();
    
    //Iterate through all the JSON data and save the experimental data to the map
    for (let i = 1; i < TotalRound + 1; i++) {
        $.ajax({
            type: "GET",
            url: "https://localhost:5001/JData/Round" + i + ".json",
            cache: false,
            async: false,
            success: function (data) {
                let Round = "Round" + i;
                let roundsInfo = [];
                for (let j = 0; j < data.length; j++) {
                    let singleRoundInfo = new Map();
                    singleRoundInfo.set("TimeUse", data[j].TimeUse);
                    singleRoundInfo.set("Success", data[j].Success);
                    singleRoundInfo.set("ImageType", data[j].ImageType);
                    singleRoundInfo.set("ImageDetail", data[j].ImageDetail);
                    singleRoundInfo.set("OverTime", data[j].OverTime);
                    roundsInfo.push(singleRoundInfo);
                }
                dataList.set(Round, roundsInfo);
            },
            error: function () {
                console.log("JSON data may not found.")
            }
        });
    }

    return dataList;
}


