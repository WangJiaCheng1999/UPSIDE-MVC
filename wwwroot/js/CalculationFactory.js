
//Average calculation
//values should be an arrary of number
function aveCal(values) {
    let total = 0;
    for (let i = 0; i < values.length; i++) {
        total += values[i];
    }
    return total / values.length;   

}

//Find the biggest number in values from map and return the key(round).
function findBiggestValue(map) {
    let biggestValue = 0;

    for (let m of map.entries()) {
        if (biggestValue == 0) {
            biggestValue = m[1];
            biggestRound = "Round1";
        } else if (m[1] > biggestValue) {
            biggestValue = m[1];
            biggestRound = m[0];
        }
    }

    return (biggestRound);

}

//Find the smallest number in values from map and return the key(round).
function findBiggestValue(map) {
    let smallestValue = 0;

    for (let m of map.entries()) {
        if (smallestValue == 0) {
            smallestValue = m[1];
            smallestRound = "Round1";
        } else if (m[1] < smallestValue) {
            smallestValue = m[1];
            smallestRound = m[0];
        }
    }

    return (smallestRound);

}

//Median calculation
function medCal() {

}