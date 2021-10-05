

   //User interx/running the game: 
    
//wp.pickRootWord();
        this.dictMap = new Map(); //(word, word.length) pairs for words smaller than 6 letters)
        this.sixLetterDictMap = [];//array of all 6 letter words
        this.rootWord = "";
        this.workingWordSubset = [];
        this.lengthOfDict = dictionary.length;
    
        makeDictionary();
    
    
    function makeDictionary(){
        for(let i = 0; i < (this.lengthOfDict); i++){
            const word = dictionary[i];
            const length = word.length;
            if(length < 6){
            dictMap.set(word, word.length);
            }
            if(length === 6){
                sixLetterDictMap.push(word);
            }
        }
        console.log("dictionary Map of words => word length");
        
        dictMap.forEach(function(value,key){console.log("("+ value + ","+ key);})
    
        console.log("six letter dict map, array");
        console.log(sixLetterDictMap.toString());
    }
    function pickRootWord(){
        let rand = Math.floor(Math.random()*(sixLetterDictMap.length + 1)); 
        rootWord = sixLetterDictMap[rand];
    }
    
    function findAllSubsets(word){ //pass in rootWord because this may alter it???
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

    function makeCombos(currentCombo, leftoverLetters, subSet){//return a combo
        if(leftoverLetters.length === 1){
            return subSet;
        }
        else{
            for(let i = 0; i< leftoverLetters.length; i ++){
                let letter = leftoverLetters.substr(i,1);
                let newCurrCombo = currentCombo + letter;
                let newLeftOvers = leftoverLetters.replace(letter, "");//splice and replace with nothing
                subSet.push(newCurrentCombo);
                return this.makeCombos(newCurrCombo, newLeftOvers, subSet);

            }
        }
        


    }
    function addWordIfValid(word){
        if(word in myDict){//null
            workingWordSubset.push(word);
        }
    }

    function stringifyWords(word){
        let str = "";
        for(let i = 0; i < word.length; i ++){
            str + "- ";
        }
        

    }

    function isCorrectGuess(guess){
        if (guess in workingWordSubset){
            return true; 
        }

    }


    function scramble(word){
        let arrString = word.split();
        let length = word.length
        for(let i = 0; i < length; i++){
            let rand = Math.floor(Math.random()*(length));
            let temp = arrString[rand];
            arrString[rand] = arrString[i];
            arrString[i] = temp;
        }
        return arrString.join('');

    }
    





