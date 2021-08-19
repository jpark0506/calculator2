import React from 'react';
import {View} from 'react-native';
import { TestIds, BannerAd, BannerAdSize} from '@react-native-firebase/admob';
import  unit_id  from '../../Constant/id';
function Banner({devmode}) {
    if(devmode){
        return(
            <View>

            </View>
        )
    }else{
        return (
            <BannerAd
            unitId={unit_id}
            size={BannerAdSize.SMART_BANNER}
            requestOptions={{
            requestNonPersonalizedAdsOnly: true,}}
            onAdLoaded={() => {
            console.log('Advert loaded');}}
            onAdFailedToLoad={(error) => {
            console.error('Advert failed to load: ', error);}}
            />
        )
    }
    
}

export default Banner
