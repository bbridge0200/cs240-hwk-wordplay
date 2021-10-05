
        this.dictMap = new Map(); //(word=> word.length) pairs for words smaller than 6 letters)
        this.sixLetterDict = [];//array of all 6 letter words
        this.rootWord = "";
        this.workingWordSubset = new Map();//stores (word => string to be printed to user)

        
        makeDictionary();
        pickRootWord();
        console.log(scramble(rootWord));
        findAllSubsets();
        workingWordSubset.forEach(function(key,value){
                console.log(key);
        })
        let input = prompt(someString);
        let currCorrGuess = 0;
        while((input != null)&& currCorrGuess < workingWordSubset.size){
            if(input.length < 3 || input.length > 6){
                alert("Your word is the wrong size!");
            }
            if(!dictMap.has(input)){
                alert("Not a valid word!");
            }
        }
        

        
    function makeDictionary(){
        for(let i = 0; (i < dictionary.length); i++){
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
        let rand = Math.floor(Math.random()*(sixLetterDict.length )); 
        rootWord = sixLetterDict[rand];
    }
    
    function findAllSubsets(){ 
        for(let i = 0; (i < rootWord.length); i++){
            let letterAtI = rootWord.substr(i, 1);
            let leftoverLetters = rootWord.replace(letterAtI, "");
            
           
            makeCombos(letterAtI, leftoverLetters, []);

                
            
        }
    }

    function makeCombos(currentCombo, leftoverLetters, subSet){
        if(leftoverLetters.length < 1){
            return true;
            
        }
        else{
            for(let i = 0; i< leftoverLetters.length; i ++){
                let letter = leftoverLetters.substr(i,1);
                let newCurrCombo = currentCombo + letter;
                let newLeftOvers = leftoverLetters.replace(letter, "");
                if((dictMap.has(newCurrCombo)) && (newCurrCombo.length > 2)){
                    workingWordSubset.set(newCurrCombo, stringifyWords(newCurrCombo));
                }
                   
                makeCombos(newCurrCombo, newLeftOvers, subSet);
                
                

            }
        }
        


    }
   

    function stringifyWords(word){
        let str1 = "";
        for(let i = 0; i < word.length; i ++){
            str1 = str1.concat("- ");
        }
        return str1;
    }

    

    


    function scramble(word){
        let arrString = word.split("");
        let length = word.length;
        for(let i = 0; i < length; i++){
            let rand = Math.floor(Math.random()*(length));
            let temp = arrString[rand];
            arrString[rand] = arrString[i];
            arrString[i] = temp;
        }
        if(dictMap.has(arrString)){
            scramble(arrString);
        }
        return arrString.join('');

    }
    





