import React from "react";
import {View,Text,TouchableOpacity} from "react-native";

export default function JobItem({job,onPress}:any){
 return(
  <TouchableOpacity onPress={onPress}>
   <View style={{
    backgroundColor:"#fff",
    padding:16,
    margin:10,
    borderRadius:12,
    elevation:3
   }}>
    <Text style={{fontSize:18,fontWeight:"600"}}>
      {job.title}
    </Text>
    <Text>{job.description}</Text>
    <Text style={{marginTop:6,fontWeight:"bold"}}>
      {job.status}
    </Text>
   </View>
  </TouchableOpacity>
 );
}
