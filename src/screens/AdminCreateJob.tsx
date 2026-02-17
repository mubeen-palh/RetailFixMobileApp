import React,{useState} from "react";
import { View,TextInput,Button,Alert } from "react-native";
import { createJob } from "../api";

export default function AdminCreateJob({navigation}:any){
  const [title,setTitle]=useState("");
  const [desc,setDesc]=useState("");

  const submit=async()=>{
    await createJob(title,desc);
    Alert.alert("Created");
    navigation.goBack();
  };

  return(
    <View style={{padding:20,gap:12}}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{borderWidth:1,padding:12,borderRadius:8}}
      />

      <TextInput
        placeholder="Description"
        value={desc}
        onChangeText={setDesc}
        style={{borderWidth:1,padding:12,borderRadius:8}}
      />

      <Button title="Create Job" onPress={submit}/>
    </View>
  );
}
