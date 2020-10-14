module.exports = function check(str, bracketsConfig) {
    const bracketsCount = bracketsConfig.length;
    const bracketsCounter = new Array(bracketsCount);
    const bracketsArray = str.split('');

    while (bracketsArray.length > 0){
        const currentBracket = bracketsArray.shift();
        const currentBracketSet = getCurrentBracketSet(currentBracket);
        isSetOrCreateBracketCounter(currentBracketSet);
        const currentBracketType = getCurrentBracketType(currentBracketSet, currentBracket);
        
        switch(currentBracketType){
            case 'pair': bracketsCounter[currentBracketSet].length > 0 ?
                            bracketsCounter[currentBracketSet].pop() :
                            bracketsCounter[currentBracketSet].push(currentBracket); break;
            case 'open': bracketsCounter[currentBracketSet].push(currentBracket); break;
            case 'close': if (bracketsCounter[currentBracketSet].length > 0){
                                bracketsCounter[currentBracketSet].pop();
                            }
                            else{
                                return false;
                            }
                            break;
            default: return false;
        }
    }

    return bracketsCounter[currentBracketSet].length > 0 ? false : true;

    function getCurrentBracketSet(currentBracket) {
        for (let i = 0; i < bracketsCount; i++){
            if (
                currentBracket == bracketsConfig[i][0]
                || currentBracket == bracketsConfig[i][1]
            ) {
                return i;
            }
        }
    }

    function isSetOrCreateBracketCounter(bracketSet) {
        if ( !bracketsCounter[bracketSet]){
            bracketsCounter[bracketSet] = [];
        }
    }

    function getCurrentBracketType(bracketSetIndex, bracket) {
        if (bracketsConfig[bracketSetIndex][0] ===  bracketsConfig[bracketSetIndex][1]) {
            return 'pair';
        }
        if (bracketsConfig[bracketSetIndex][0] === bracket) {
            return 'open';
        }
        return 'close';
    }
};
