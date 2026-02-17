import {addToQueue,getQueue,clearQueue} from "./storage";

const BASE="http://10.0.2.2:3000/api/v1";

export type User={id:string,email:string,role:string};

let currentUser:User|null=null;
let lastETag:string|null=null;

export const setUser=(u:User)=>currentUser=u;
export const getUser=()=>currentUser;

// LOGIN
export const login=async(email:string,password:string)=>{
  const r=await fetch(`${BASE}/auth/login`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({email,password})
  });
  const d=await r.json();
  setUser(d);
  return d;
};

// GET JOBS (ETag caching)
export const getJobs=async()=>{
  const r=await fetch(`${BASE}/jobs`,{
    headers:{
      "x-user-id":currentUser!.id,
      "If-None-Match":lastETag||""
    }
  });

  if(r.status===304) return null;

  lastETag=r.headers.get("ETag");
  return r.json();
};

// OFFLINE SAFE ACTION
const doAction=async(url:string)=>{
  try{
    await fetch(url,{
      method:"POST",
      headers:{"x-user-id":currentUser!.id}
    });
  }catch{
    await addToQueue({url});
  }
};

export const syncQueue=async()=>{
  const q=await getQueue();
  for(const a of q){
    await fetch(a.url,{
      method:"POST",
      headers:{"x-user-id":currentUser!.id}
    });
  }
  await clearQueue();
};

export const acceptJob=(id:string)=>
  doAction(`${BASE}/jobs/${id}/accept`);

export const completeJob=(id:string)=>
  doAction(`${BASE}/jobs/${id}/complete`);

export const createJob=(title:string,desc:string)=>
  fetch(`${BASE}/jobs`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "x-user-id":currentUser!.id
    },
    body:JSON.stringify({title,description:desc})
  });
