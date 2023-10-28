import React from 'react'
import {TouchableOpacity,Image , Text , StyleSheet, Dimensions} from "react-native"
import { Category } from '../../models'
import { useNavigation} from '@react-navigation/native'


const { width, height} = Dimensions.get('window')
type categoryItemProps = {
  item:Category
}

function index({item}:categoryItemProps) {
  const navigation = useNavigation()

  return ( 
    <TouchableOpacity onPress={()=> navigation.navigate("CategoryDetails",{category:item})}
     style={{width:90,height:90,flexDirection:'column',alignItems:'center',marginTop:10,justifyContent:'space-between'}}>
      <Image style={{width:70, height:70, borderRadius:8, }} 
        source={{uri:item.src}}/>
      <Text style={{fontSize:12, color:'#616161', fontWeight:'500'}} >{item.name}</Text>

    </TouchableOpacity>
  )
}


export default index;