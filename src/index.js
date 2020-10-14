function check(str, bracketsConfig) {
    const bracketsCount = bracketsConfig.length;
    const bracketsCounter = [];
    const bracketsArray = str.split('');

    while (bracketsArray.length > 0){
        const currentBracket = bracketsArray.shift();
        const currentBracketSet = getCurrentBracketSet(currentBracket);
        const currentBracketType = getCurrentBracketType(currentBracketSet, currentBracket);
        const openBracket = bracketsConfig[currentBracketSet][0];

        switch(currentBracketType){
            case 'pair': if (!pairBracketExec(currentBracket)) return false; break;
            case 'open': bracketsCounter.push(currentBracket); break;
            case 'close': if (!removeBracket(openBracket)) return false; break;
            default: return false;
        }
    }

    return bracketsCounter.length > 0 ? false : true;

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

    function pairBracketExec(currentBracket){
        if (bracketsCounter.length > 0 && bracketsCounter[bracketsCounter.length - 1] === currentBracket){
            return removeBracket(currentBracket);
        } else {
            bracketsCounter.push(currentBracket);
        }
        return true;
    }

    function removeBracket(previousBracket){
        return previousBracket === bracketsCounter.pop() ? true : false;
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
}

module.exports = check;
