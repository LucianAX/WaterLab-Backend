const getIndexes = (arr) => {
    let indexesArr = [];
    
    for (let index in arr) {
        indexesArr.push(index);
    }

    return indexesArr;
}

// max is included
const getRandomInt = (max) => {
    max++;
    return Math.floor(Math.random() * max);
}


function getRandomWarningsArray(startArr) {
    //4 arrays will be used: 1 with start values, 1 with indexes of the start values arr, 1 with indexes of the result arr, 1 with the values of the result array

    // const startArr = ['ph_value', 'temperature_celsius', 'electric_conductivity'];
    let resultArr = [];
    let resultArrIndexes = [];

    // create an array that stores indexes of the start array.
    // Each index will be removed if it has to be added to the array with result indexes
    let indexesArr = getIndexes(startArr);
    const howManyValues = getRandomInt(startArr.length - 1) + 1;

    for (let i = 0; i < howManyValues; i++) {
        let virtualIndex = getRandomInt(indexesArr.length - 1);
        
        let actualIndex = indexesArr[virtualIndex];
        resultArrIndexes.push(actualIndex);

        indexesArr.splice(virtualIndex, 1);
    }

    //sorts array with result indexes using a compare function
    resultArrIndexes.sort( (a, b) => { return a - b } ); 
    resultArrIndexes.forEach(index => resultArr.push(startArr[index]) );
    return resultArr;
}


module.exports = getRandomWarningsArray;

