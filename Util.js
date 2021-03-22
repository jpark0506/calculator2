import {Alert} from 'react-native'
import {calculateCombination, calculateCombinationwithRepetition, calculatePermutation, calculatePermutationwithRepetition} from './CalUtils'
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

export function checkHasString(data){
    const op = ["P","C","S","H","π"]
    let index=0;
    let result = data;
    for(operator of op){
        index = data.toString().indexOf(operator)
        let count=0;

        //indexof를 이용해서 문자열 개수 세기
        while (index != -1) {
          count++;
          index = data.toString().indexOf(operator, index + 1);
        }

        if(count>0){
          if(count >1){
              console.log("Only One Operator Can Be Used");
              createOneButtonDialog("Error","Only One Operator Can Be Used");
              index = -2;
              result = 0;
          }else{
            index = data.toString().indexOf(operator)
            break;
          }
        }
    }

      if(index>0 && index != data.length-1 && index!=-1){
        let front = parseInt(data.toString().slice(0,index))
        let back = parseInt(data.toString().slice(index+1))

          if(data[index] == 'P'){
            //일부러 명시적 typecasting 사용
              result = calculatePermutation(front,back)
             
          }

          else if(data[index] == 'C'){
            result = calculateCombination(front,back)
          }

          else if(data[index] == 'S'){
            
          }

          else if(data[index] == 'H'){
            result = calculateCombinationwithRepetition(front,back)
            
          }

          else if(data[index] == 'π'){
            result = calculatePermutationwithRepetition(front,back)
          }

        }else if(index==0 ||data.length-1 == index && index!=-1){
          console.log("this operator has to be in the middle")
          createOneButtonDialog("Syntax Error" ,"this operator has to be in the middle");
        }else if(index == -1){
          console.log("doesn't have operator")
    }
    return result;
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
export const createOneButtonDialog = (title,message) =>
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
