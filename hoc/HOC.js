import React from 'react'

function HOC(FilterComponent,devmode) {

    function DevController(props){
        //Navigation 전달
        return <FilterComponent
        navigation = {props.navigation} 
        route = {props.route}
        devmode={props.devmode}></FilterComponent>
    }
    return DevController
}

export default HOC
