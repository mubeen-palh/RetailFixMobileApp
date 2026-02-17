import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { acceptJob, completeJob } from "../api";

export default function SyncScreen() {
  const [count, setCount] = useState(0);

  const load = async () => {
    const q = await AsyncStorage.getItem("queue");
    const arr = q ? JSON.parse(q) : [];
    setCount(arr.length);
  };

  useEffect(() => { load(); }, []);

  const sync = async () => {
    const q = await AsyncStorage.getItem("queue");
    if (!q) return;

    const arr = JSON.parse(q);

    for (const a of arr) {
      if (a.type === "accept") await acceptJob(a.jobId);
      if (a.type === "complete") await completeJob(a.jobId);
    }

    await AsyncStorage.removeItem("queue");
    load();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Pending Actions: {count}</Text>
      <Button title="Sync Now" onPress={sync} />
    </View>
  );
}
