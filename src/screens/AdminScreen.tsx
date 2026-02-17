import React,{useEffect,useState} from "react";
import {View,FlatList,Button} from "react-native";
import {getJobs} from "../api";
import JobItem from "../components/JobItem";

export default function Admin({navigation}:any){
 const [jobs,setJobs]=useState<any[]>([]);

 useEffect(()=>{
  getJobs().then(setJobs);
 },[]);

 return(
  <View style={{flex:1}}>
   <Button title="Create Job"
     onPress={()=>navigation.navigate("Create")}
   />

   <FlatList
    data={jobs}
    keyExtractor={(j)=>j.id}
    renderItem={({item})=>( 
      <JobItem job={item}/>
    )}
   />
  </View>
 );
}
