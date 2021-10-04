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
    
    findAllSubsets(){
    
    }
    
    


}


