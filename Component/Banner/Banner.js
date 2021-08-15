import React from 'react'
import { TestIds, BannerAd, BannerAdSize} from '@react-native-firebase/admob';
function Banner() {
    return (
        <BannerAd
        unitId={TestIds.BANNER}
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

export default Banner
