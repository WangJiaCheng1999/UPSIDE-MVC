
/*
This class is for data extraction and simple data analysis
 */

    
//Average timeUse calculation, values should be an array
function aveCal(values) {
    let total = 0;
    for (let i = 0; i < values.length; i++) {
        total += values[i];
    }
    return total / values.length;
}

//Average accuracy calculation,Useful for all data with boolean values.
function aveAccuracyCal(values) {
    let trueCount = 0;
    for (let i = 0; i < values.length; i++) {
        if (values[i] === true) {
            trueCount ++;
        } 
    }
    return trueCount/values.length;
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

//Get the Accuracy in each round
function getAveAccuracyMap(allData) {
    let round = 1;
    let aveAccuracyMap = new Map();

    for (value of allData.values()) {
        let accuracyArray = [];
        for (let m of value) {
            accuracyArray.push(m.get("Success"));
        }
        aveAccuracyMap.set("Round" + round, aveAccuracyCal(accuracyArray));
        round++;
    }
    
    return aveAccuracyMap;
}

//Get overall image count
function  getOverallImageType(allData){
    let imageTypeCount = new Map();
    let global = 0;
    let local = 0;
    let neither = 0;
    
    for (value of allData.values()) {
        for (let m of value) {
            if(m.get("ImageType") === "Local"){
                local += 1;
            }            
            if(m.get("ImageType") === "Global"){
                global += 1;
            }            
            if(m.get("ImageType") === "Neither"){
               neither += 1; 
            }
        }
    }
    
    imageTypeCount.set("Global",global);
    imageTypeCount.set("Local",local);
    imageTypeCount.set("Neither",neither);
    
    return imageTypeCount;
}

//Get Overall Image Accuracy
function getOverallImageAccuracy(allData){
    let overallCount = getOverallImageType(allData);
    let imageAccuracy = new Map();
    
    let global = 0;
    let local = 0;
    let neither = 0;

    for (value of allData.values()) {
        for (let m of value) {
            if(m.get("ImageType") === "Local" && m.get("Success") === true){
                local += 1;
            }
            if(m.get("ImageType") === "Global" && m.get("Success") === true){
                global += 1;
            }
            if(m.get("ImageType") === "Neither" && m.get("Success") === true){
                neither += 1;
            }
        }
    }
    
    imageAccuracy.set("Global",global/overallCount.get("Global"));
    imageAccuracy.set("Local",local/overallCount.get("Local"));
    imageAccuracy.set("Neither",neither/overallCount.get("Neither"));
    
    return imageAccuracy;
}


//Return a map that contain the count of different image types in allData and the accuracy of those different
//types of images
function getImageAccuracyMap(allData){
    
    let round = 1;
    
    //The count of different types of image
    let allImageAccuracyMap = new Map();
    
    //Percentage of images in which the subjects successfully responded or judged
    let allImageTypeCountMap = new Map();
    
    //The map that will contain both map to return
    let sum = new Map();
    
    for(value of allData.values()){
        let imageTypeCountMap = new Map();
        let imageAccuracyMap = new Map();
        
        let localImageType = 0;
        let localAccuracyCount = 0;
        
        let globalImageType = 0;
        let globalAccuracyCount = 0;
        
        let neitherImageType = 0;
        let neitherAccuracyCount = 0;
        
        for(let m of value){
            if(m.get("ImageType") === "Global"){
                globalImageType++;
                let a = m.get("Success");
                if(a){
                    globalAccuracyCount++;
                }
            }
            if(m.get("ImageType") === "Local"){
                neitherImageType++;
                let a = m.get("Success");
                if(a){
                    localAccuracyCount++;
                }
            }
            if(m.get("ImageType") === "Neither"){
                neitherImageType++;
                let a = m.get("Success");
                if(a){
                    neitherAccuracyCount++;
                }
            }

        }

        imageTypeCountMap.set("Global",globalImageType);
        imageTypeCountMap.set("Local",localImageType);
        imageTypeCountMap.set("Neither",neitherImageType);
        
        //In case of the value is Infinity.
        if(globalImageType !== 0){
            imageAccuracyMap.set("Global",globalAccuracyCount/globalImageType);
        }else {
            imageAccuracyMap.set("Global",0);
        }
        
        if(localImageType !== 0){
            imageAccuracyMap.set("Local",localAccuracyCount/localImageType);
        }else {
            imageAccuracyMap.set("Local", 0);
        }

        if(neitherImageType !== 0){
            imageAccuracyMap.set("Neither",neitherAccuracyCount/neitherImageType);
        }else {
            imageAccuracyMap.set("Neither", 0);
        }
        
        allImageTypeCountMap.set("Round"+round, imageTypeCountMap);
        allImageAccuracyMap.set("Round"+round, imageAccuracyMap);
        
        round++;
    }
    
    sum.set("Count",allImageTypeCountMap);
    sum.set("Accuracy", allImageAccuracyMap);
    
    return sum;
}

//Get one round's whole data, this function will return a array that contains 10 maps
function getSingleRoundData(round,allData){
    round = "Round"+round;
    return allData.get(round);
}

//Get JSON Data from root and return the data in a Map
function getAllData(TotalRound,fileList) {
    let dataList = new Map();
    let localHost = window.location.protocol + "//"+window.location.host;

    //Iterate through all the JSON data on the server and save the data into a map
    for (let i = 1; i < TotalRound + 1; i++) {
        $.ajax({
            type: "GET",
            url: localHost+"/JData/"+fileList[i-1],
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
                console.log("JSON data not found." + this.url);
            }
        });
    }
    console.log(dataList);
    return dataList;
}


