export function calculateResult(unit){
    if(unit.operator == "+"){
        result = unit.firstnum + unit.lastnum;
    }else if(unit.operator == '-'){
        result = unit.firstnum - unit.lastnum;
    }else if(unit.operator == '×'){
            result = unit.firstnum * unit.lastnum;
    }else if(unit.operator == "÷"){
        if(unit.lastnum ==0){
            result = "error"
        }else{
            result = unit.firstnum / unit.lastnum;
        }
    }
    return result
}
export function isOperator(operator){
    if(operator=="+"||operator=="-"||operator=="×"||operator=="÷"||operator=="="){
        return true
    }else{
        return false
    }
}
export function unclickable(operator){
    if(operator =="("||operator==")"){
        return true;
    }else{
        return false;
    }
}
export function isLong(length){
    if(0<length<=8){
        return false
    }
    else if(length>8){
        return true
    }
}