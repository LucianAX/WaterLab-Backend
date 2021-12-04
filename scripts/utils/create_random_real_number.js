// Returns a random number between min (included) and max (not included) with the desired no. of floating decimals
const getRandomRealNumber = (min, max, desiredDecimals) => {
    let longDigitsVal = Math.random() * (max - min) + min;
    return Number(longDigitsVal.toFixed(desiredDecimals));
}

module.exports = getRandomRealNumber;