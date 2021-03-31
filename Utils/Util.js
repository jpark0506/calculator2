import {Alert} from 'react-native'
import {calculateCombination, calculateCombinationwithRepetition, calculatePermutation, calculatePermutationwithRepetition} from './CalUtils'
import MMKVStorage from "react-native-mmkv-storage";
import moment from 'moment';
import 'moment/locale/ko';
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
    let index=[-1,-1,-1,-1,-1];
    let cnt=0;
    let filtercnt=0;
    let result = data;
    
    for(operator of op){
        index[cnt] = data.toString().indexOf(operator)
        console.log(index)
        let count=0;
        //indexof를 이용해서 문자열 개수 세기
        while (index[cnt] != -1) {
          count++;
          index[cnt] = data.toString().indexOf(operator, index[cnt] + 1);
        }

        if(count>0){
          if(count >1){
              console.log("Only One Operator Can Be Used");
              createOneButtonDialog("Error","Only One Operator Can Be Used");
              index[cnt] = -2;
              result = 0;
          }else{
            //여기서부터 작업 시작
            index[cnt] = data.toString().indexOf(operator)
          }
        }
        cnt++
    }
    
    //연산자가 여러개 쓰였는지 확인
    for(element of index){
      if(element>-1){
        filtercnt++;
      }
    }
    if(filtercnt>1){
      //여기서 연산자 2개 거름
      result = 0;
      createOneButtonDialog("Syntax Error","only one operator can be used");
    }else{
      //여기는 연산자가 하나 일때 공략
      for(element of index){
        if(element>0 && element != data.length-1 && element!=-1){
        let front = parseInt(data.toString().slice(0,element))
        let back = parseInt(data.toString().slice(element+1))
        const MMKV = new MMKVStorage.Loader().initialize();
        const date = moment().format('YYYY-MM-DD HH:mm:ss').toString();
          if(data[element] == 'P'){
            //일부러 명시적 typecasting 사용
            MMKV.setString(date, result);
            result = calculatePermutation(front,back)

          }

          else if(data[element] == 'C'){
            MMKV.setString(date, result);
            result = calculateCombination(front,back)
          }

          else if(data[element] == 'S'){
            
          }

          else if(data[element] == 'H'){
            MMKV.setString(date, result);
            result = calculateCombinationwithRepetition(front,back)
            
          }

          else if(data[element] == 'π'){
            MMKV.setString(date, result);
            result = calculatePermutationwithRepetition(front,back)
          }

        }else if(element==0 ||data.length-1 == element && element!=-1){
          console.log("this operator has to be in the middle")
          createOneButtonDialog("Syntax Error" ,"this operator has to be in the middle");
        }else if(element == -1){
          console.log("doesn't have operator")
        }
    }
    return result;
  }
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
        return false
    }
    else if(length>6){
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
