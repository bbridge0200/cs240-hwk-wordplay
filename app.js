

   //User interx/running the game: 
    
//wp.pickRootWord();
        this.dictMap = new Map(); //(word, word.length) pairs for words smaller than 6 letters)
        this.sixLetterDict = [];//array of all 6 letter words
        this.rootWord = "";
        this.workingWordSubset = new Map();
        this.lengthOfDict = dictionary.length;
    
        makeDictionary();
        pickRootWord();
        console.log(rootWord);
    
    
    function makeDictionary(){
        for(let i = 0; i < (this.lengthOfDict); i++){
            const word = dictionary[i];
            const length = word.length;
            if(length <= 6){
            dictMap.set(word, word.length);
            }
            if(length === 6){
                sixLetterDict.push(word);
            }
        }
        
    }
    function pickRootWord(){
        console.log(sixLetterDict);
        let rand = Math.floor(Math.random()*(sixLetterDict.length )); 
        console.log(rand);
        rootWord = sixLetterDict[rand];
    }
    
    function findAllSubsets(){ //pass in rootWord because this may alter it???
        let subsets = []; // hold all combinations 

        for(let i = 0; (i < rootWord.length); i++){
            let letterAtI = rootWord.substr(i, 1);
            let leftoverLetters = rootWord.replace(letterAtI, "");
            
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
        if(leftoverLetters.length < 1){
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
        if(dictMap.has(word)){
            workingWordSubset.set(word, stringifyWords(word));
        }
    }

    function stringifyWords(word){
        let str = "";
        for(let i = 0; i < word.length; i ++){
            str + "- ";
        }
        
        return str;
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
    





