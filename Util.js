import {Alert} from 'react-native'
export function calculateResult(unit){
    //toFixed(args) == 소수점 처리
    if(unit.operator == "+"){
        result = parseInt(unit.firstnum) + parseInt(unit.lastnum);
        result.toFixed(3)
    }else if(unit.operator == '-'){
        result = unit.firstnum - unit.lastnum;
        result.toFixed(3)
    }else if(unit.operator == '×'){
            result = unit.firstnum * unit.lastnum;
            result.toFixed(3)
    }else if(unit.operator == "÷"){
        if(unit.lastnum ==0){
            result = "error"
        }else{
            result = unit.firstnum / unit.lastnum;
            result.toFixed(3)
        }
    }
    return result
}
export const factorial = (data) =>{
    const result=1;
    for(i=1; i<=data; i++){
        result = result*i;
    }
    return result;
}
   
export const calculatePermutation = (first, last) => {
    let result = 1
    console.log("first : "+first,"last : "+last)
    if(first>last){
        result = factorial(first)/factorial(first-last)
        console.log("Permutation : "+result)
    }else if(first==last){
        result = factorial(first)
    }else if(first<last){
        result = -1
    }
    return result
}  




//누를 수 없는 버튼을 알림
export const createUnclickableDialog = () =>
    Alert.alert(
      "Unclickable",
      "don't click this button",
      [
        {
          text: "OK",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
      ]
    );
export const createOneButtonDialog = (title,message,) =>
    Alert.alert(
      title,
      message,
      [
        {
          text: "OK",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
      ]
    );
//누를 수 없는 버튼을 정함
export function unclickable(operator){
    if(operator =="("||operator==")"){
        return true;
    }else{
        return false;
    }
}
export function handleTextLength(length){
    console.log("isLongf"+length)
    //이건 수학이 아녀 준혁아 0<=length<=8이 말이되냐!!
    if(0<=length && length<=6){
        console.log("false"==length)
        return false
    }
    else if(length>6){
        console.log("true"==length)
        return true
    }
}
//연산자인가 아닌가 판단
export function isOperator(operator){
    if(operator=="+"||operator=="-"||operator=="×"||operator=="÷"||operator=="="){
        console.log("It is an operator")
        return true
    }else{
        console.log("It is not an operator")
        return false
    }
}
