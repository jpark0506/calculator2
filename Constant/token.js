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
            
            return calculateCombinationwithRepetition(parseInt(a),parseInt(b));
        }
    
}

const tokenpi = {

    type:2,
        token:"π",
        show:"π",
        value:function(a,b){
            
            return calculatePermutationwithRepetition(parseInt(a),parseInt(b));
        }

}



const tokenS = {
    type:8,
    token:"S",
    show:"S",
    value:function(a,b){
        return stirlingNumber(parseInt(a),parseInt(b));
    }
}

export default tokens = {
    tokenH, tokenpi, tokenS
}