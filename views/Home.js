import React, {useState,useEffect,useRef} from 'react';
import { Text, View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import {css} from '../assets/css/Css';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import config from '../config';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';

export default function App() {
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const mapEl=useRef(null);/*
    const [distance,setDistance]=useState(null);*/
    const [price1,setPrice1]=useState(null);
    const [price2,setPrice2]=useState(null);
    const [price3,setPrice3]=useState(null);
  
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync(Location);
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
        setLocation(location);
        setOrigin({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.000922,
          longitudeDelta: 0.000421
      })
          
    })();
    }, []);
    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }
  
    
    return (
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}style={css.container}>
        <MapView style={css.map}
            initialRegion={origin}
            showsUserLocation={true}
            zoomEnabled={true}
            loadingEnabled={true}
            ref={mapEl}
  >
  {destination &&
    <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={config.googleApi}
            strokeWidth={3}
            onReady={result=>{
            setDistance(result.distance);
            setPrice1(result.distance*3.25);
            setPrice2(result.distance*5.15);
            setPrice3(result.distance*6.95);
           mapEl.current.fitToCoordinates(
               result.coordinates,{
                   edgePadding:{
                       top:50,
                       bottom:50,
                       left:50,
                       right:50
                      }
                    }
                )
               }
             }
        />
            }
         </MapView>
       
  
        <View style={css.search}>
        <GooglePlacesAutocomplete
            placeholder='Para onde vamos?'
            onPress={(data, details = null) => {
            setDestination({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.000922,
                longitudeDelta: 0.000421
            });
        }}
        query={{
            key: config.googleApi,
            language: 'pt-br',
        }}
        enablePoweredByContainer={false}
        fetchDetails={true}
        styles={{
          listView:{backgroundColor:'#fff', zIndex:10},
          container:{position:'absolute',width:'100%'}
          
      }}
    />
    
      {distance &&
      <View style={css.distance}>
      <Text style={css.distance__text}>Distância: {distance.toFixed(2).replace('.',',')}km</Text>
      <TouchableOpacity style={css.price1}>
          <Text style={css.price1__text}> Maxim R${price1.toFixed(2).replace('.',',')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={css.price2}>
          <Text style={css.price2__text}> 99 R${price2.toFixed(2).replace('.',',')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={css.price3}>
          <Text style={css.price3__text}> Uber R${price3.toFixed(2).replace('.',',')}</Text>
      </TouchableOpacity>
  </View>
  }
  
        </View>
      </KeyboardAvoidingView>
    );
  }