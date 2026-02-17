import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import Login from "./src/screens/LoginScreen";
import Jobs from "./src/screens/JobListScreen";
import Detail from "./src/screens/JobDetailScreen";
import Admin from "./src/screens/AdminScreen";
import Create from "./src/screens/CreateJobScreen";

const Stack=createNativeStackNavigator();

export default function App(){
 return(
  <NavigationContainer>
   <Stack.Navigator>
    <Stack.Screen name="Login" component={Login}/>
    <Stack.Screen name="Jobs" component={Jobs}/>
    <Stack.Screen name="Detail" component={Detail}/>
    <Stack.Screen name="Admin" component={Admin}/>
    <Stack.Screen name="Create" component={Create}/>
   </Stack.Navigator>
  </NavigationContainer>
 );
}
