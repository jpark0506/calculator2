import React from 'react'

function HOC(FilterComponent) {

    function DevController(props){
        //Navigation 전달
        return <FilterComponent
        navigation = {props.navigation} 
        route = {props.route}></FilterComponent>
    }
    return DevController
}

export default HOC
