import React, { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  Text,
  StyleSheet,
} from "react-native";
import { getJobs, syncQueue } from "../api";
import { saveJobs, loadJobs } from "../storage";
import JobItem from "../components/JobItem";

export default function Jobs({ navigation }: any) {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);

    const cached = await loadJobs();
    if (cached?.length) setJobs(cached);

    const fresh = await getJobs();
    if (fresh) {
      setJobs(fresh);
      saveJobs(fresh);
    }

    setLoading(false);
  };

  useEffect(() => {
    load();
    syncQueue();

    const t = setInterval(load, 8000);
    return () => clearInterval(t);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.header}>My Jobs</Text>

      <FlatList
        data={jobs}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={load} />
        }
        keyExtractor={(j) => j.id}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <JobItem
            job={item}
            onPress={() => navigation.navigate("Detail", { job: item })}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    fontWeight: "700",
    padding: 16,
  },
});
