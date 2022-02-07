import { StatusBar } from 'expo-status-bar';
import {StyleSheet} from "react-native";

const css = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00FFFFFF',
        justifyContent: 'center'
    },
    map:{
        height: '60%'
       
        
    },
    search:{
        
        height: '40%',
        
        
        
       
    },
    distance:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        padding: 10
    },
    distance__text:{
        fontSize:20,
        fontWeight:'bold'
    },
    price1:{
        backgroundColor: '#FFFF00',
        padding: 7,
        borderRadius:4,
        marginTop:30,
        justifyContent:'center',
        alignItems: 'center'
    },
    price1__text:{
        color:'black',
        fontWeight: 'bold',
        fontSize: 20
        

    },
    price2:{
        backgroundColor: '#000',
        padding: 7,
        borderRadius:4,
        marginTop:30,
        justifyContent:'center',
        alignItems: 'center'
    },
    price2__text:{
        color:'#FFD700',
        fontWeight: 'bold',
        fontSize: 20

    },
    price3:{
        backgroundColor: '#708090',
        padding: 7,
        borderRadius:4,
        marginTop:30,
        justifyContent:'center',
        alignItems: 'center'
    },
    price3__text:{
        color:'#fff',
        fontWeight: 'bold',
        fontSize: 20
    }
});
export {css};