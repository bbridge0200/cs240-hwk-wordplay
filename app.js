

   //User interx/running the game: 
    
//wp.pickRootWord();
        this.dictMap = new Map(); //(word, word.length) pairs for words smaller than 6 letters)
        this.sixLetterDict = [];//array of all 6 letter words
        this.rootWord = "";
        this.workingWordSubset = new Map();
        this.lengthOfDict = dictionary.length;
        //console.log(stringifyWords("xxx"));
        
        makeDictionary();
        pickRootWord();
        console.log(rootWord);
        findAllSubsets();
        console.log(workingWordSubset); 
        console.log(scramble(rootWord));
        console.log(scramble(rootWord));
        console.log(scramble(rootWord));
        console.log(scramble(rootWord));
        /* let x = findAllSubsets();
        for (let i = 0; i < (x.length); i ++){
            //console.log(x[i]);
        }
         */
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
        let rand = Math.floor(Math.random()*(sixLetterDict.length )); 
        rootWord = sixLetterDict[rand];
    }
    
    function findAllSubsets(){ 
        // hold all combinations 

        for(let i = 0; (i < rootWord.length); i++){
            let letterAtI = rootWord.substr(i, 1);
            //console.log("letterAtI ");
            //console.log(letterAtI);
            let leftoverLetters = rootWord.replace(letterAtI, "");
            //console.log("leftoverletters ");
            //console.log(leftoverLetters);
            
           
            makeCombos(letterAtI, leftoverLetters, []);

                
            
        }
    }

    function makeCombos(currentCombo, leftoverLetters, subSet){//return a combo
        if(leftoverLetters.length < 1){
            //console.log("all done");
            return true;
            
        }
        else{
            //console.log("forloop");
            for(let i = 0; i< leftoverLetters.length; i ++){
                let letter = leftoverLetters.substr(i,1);
                //console.log("letter");
                //console.log(letter);
                let newCurrCombo = currentCombo + letter;
                //console.log("new curr combo");
                //console.log(newCurrCombo);
                let newLeftOvers = leftoverLetters.replace(letter, "");//splice and replace with nothing
                //console.log("newleftovers");
                //console.log(newLeftOvers);
                if((dictMap.has(newCurrCombo)) && (newCurrCombo.length > 2)){
                    workingWordSubset.set(newCurrCombo, stringifyWords(newCurrCombo));
                    //console.log("pushed");
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
        return arrString.join('');

    }
    





