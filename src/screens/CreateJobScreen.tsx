import React,{useState} from "react";
import {View,TextInput,Button} from "react-native";
import {createJob} from "../api";

export default function Create({navigation}:any){
 const [t,setT]=useState("");
 const [d,setD]=useState("");

 return(
  <View style={{padding:20,gap:10}}>
   <TextInput placeholder="Title" onChangeText={setT} style={{borderWidth:1}}/>
   <TextInput placeholder="Desc" onChangeText={setD} style={{borderWidth:1}}/>
   <Button title="Create" onPress={async()=>{
     await createJob(t,d);
     navigation.goBack();
   }}/>
  </View>
 );
}
