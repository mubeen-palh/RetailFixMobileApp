import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { acceptJob, completeJob } from "../api";

export default function Detail({ route }: any) {
  const [job, setJob] = useState(route.params.job);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.card}>
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.desc}>{job.description}</Text>

        <Text style={styles.section}>Attachments</Text>
        {job.attachments?.map((a: any) => (
          <Text key={a.id} style={styles.attach}>
            📎 {a.fileName}
          </Text>
        ))}

        <Text style={styles.status}>Status: {job.status}</Text>

        {job.status === "Created" && (
          <TouchableOpacity
            style={styles.acceptBtn}
            onPress={() => {
              setJob({ ...job, status: "Accepted" });
              acceptJob(job.id);
            }}
          >
            <Text style={styles.btnText}>Accept Job</Text>
          </TouchableOpacity>
        )}

        {(job.status === "Assigned" || job.status === "Accepted") && (
          <TouchableOpacity
            style={styles.completeBtn}
            onPress={() => {
              setJob({ ...job, status: "Completed" });
              completeJob(job.id);
            }}
          >
            <Text style={styles.btnText}>Complete Job</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
  },
  desc: {
    fontSize: 16,
    color: "#555",
    marginBottom: 15,
  },
  section: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
  },
  attach: {
    marginTop: 6,
    fontSize: 15,
  },
  status: {
    fontSize: 16,
    marginTop: 15,
    fontWeight: "600",
  },
  acceptBtn: {
    backgroundColor: "#22c55e",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },
  completeBtn: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
