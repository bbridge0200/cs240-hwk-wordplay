class Wordplay{

    constructor(dictionary){
        const dictionaryMap = {}; //(word, word.length) pairs for words smaller than 6 letters)
        const sixLetterDictMap = [];//array of all 6 letter words
        const rootWord = "";
        const myDict = dictionary;
    }
    
    
    
    
    
    makeDictionary(){
        for(word of this.myDict){
            const length = word.length;
            if(length < 6){
            dictionaryMap[word] = word.length;
            }
            if(length === 6){
                sixLetterDictMap.push(word);
            }
        }
    }
    pickRootWord(){
        let rand = Math.floor(Math.random()*(sixLetterDictMap.length + 1)); 
        rootWord = sixLetterDictMap[rand];
    }
    
    findAllSubsets(word){ //pass in rootWord because this may alter it???
        let subsets = [rootWord]; // hold all combinations 
        for(let i = 0; (i < word.length); i++){
            let letterAtI = word.substr(i, 1);
            let leftoverLetters = word.replace(letterAtI, "");
            
            for(j=0; j<leftoverLetters.length; j++){
                
                let letterAtJ = leftoverLetters.substr(j, 1);
                let twoLetterCombo = letterAtI + letterAtJ;
                let newLeftoverLetters = leftoverLetters.replace(letterAtJ, "");
                subsets.concat(makeCombos(twoLetterCombo, newLeftoverLetters, []));

                
            }
        }
        return subsets;
    }

    makeCombos(currentCombo, leftoverLetters, subSet){//return a combo
        if(leftoverLetters.length === 1){
            return subSet;
        }
        else{
            for(let i = 0; i< leftoverLetters.length; i ++){
                let letter = leftoverLetters.substr(i,1);
                let newCurrCombo = currentCombo + letter;
                let newLeftOvers = leftoverLetters.replace(letters, "");
                subSet.push(newCurrentCombo);
                this.makeCombos(newCurrCombo, newLeftOvers, subSet);

            }
        }
        


    }
    
    


}


