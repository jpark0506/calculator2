import {Alert} from 'react-native'
export function calculateResult(unit){
    if(unit.operator == "+"){
        result = parseInt(unit.firstnum) + parseInt(unit.lastnum);
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
//누를 수 없는 버튼을 정함
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
