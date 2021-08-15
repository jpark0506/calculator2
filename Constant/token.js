import {calculatePermutation,
    calculatePermutationwithRepetition,
    calculateCombination,
    calculateCombinationwithRepetition,
    stirlingNumber} from '../Utils/CalUtils';

    
const tokenH = {
    
        type:2,
        token:"H",
        show:"H",
        value:function(a,b){
            
            return calculateCombinationwithRepetition(a,b);
        }
    
}

const tokenpi = {

    type:2,
        token:"π",
        show:"π",
        value:function(a,b){
            
            return calculatePermutationwithRepetition(a,b);
        }

}



const tokenS = {
    type:8,
    token:"S",
    show:"S",
    value:function(a,b){
        return stirlingNumber(a,b);
    }
}

export default tokens = {
    tokenH, tokenpi, tokenS
}