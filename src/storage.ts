import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveJobs = (jobs:any)=>
  AsyncStorage.setItem("jobs",JSON.stringify(jobs));

export const loadJobs = async()=>{
  const j=await AsyncStorage.getItem("jobs");
  return j?JSON.parse(j):[];
};

// OFFLINE QUEUE
export const addToQueue=async(action:any)=>{
  const q=await getQueue();
  q.push(action);
  await AsyncStorage.setItem("queue",JSON.stringify(q));
};

export const getQueue=async()=>{
  const q=await AsyncStorage.getItem("queue");
  return q?JSON.parse(q):[];
};

export const clearQueue=()=>
  AsyncStorage.removeItem("queue");
