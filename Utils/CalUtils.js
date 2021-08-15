import {createOneButtonDialog} from './Util';
export const factorial = (data) =>{
    let result=1;
    for(i=1; i<=data; i++){
        result = result*i;
    }
    return result;
}
   
export function calculatePermutation(first, last){
    let result = 1
    console.log("first : "+first,"last : "+last)
    if(first>last){
        result = factorial(first)/factorial(first-last)
        console.log("Permutation : "+result)
    }else if(first==last){
        result = factorial(first)
    }else if(first<last){
        result = 0
        console.log("Syntax Error!","first<last");
    }else if(first<0 || last<0){
        result = 0
        console.log("Syntax Error!","Can't caculate Negative Numbers")
    }
    return result
}
export function calculatePermutationwithRepetition(first, last){
    let result = 1
    console.log("first : "+first,"last : "+last)
    if(first<0||last<0){
        result = 0
        console.log("Syntax Error!","first<last");
    }else{
        for(i=0; i<last; i++){
            result = result*first
        }
    }
    return result
}
export function calculateCombination(first,last){
     let result = calculatePermutation(first,last)
     if(result != 0){
         result = result/factorial(last)
     }
     return result
}
export function calculateCombinationwithRepetition(first,last){
    let result = calculateCombination(first+last-1,last)
    return result
}

export function stirlingNumber(first,last){
    if(first === last){
        return 1;
    }
    else if(last === 1){
        return 1;
    }else if(first-1 === last){
        return calculateCombination(first,2);
    }   
    return stirlingNumber(first-1, last-1)+ last*stirlingNumber(first-1,last);
}