import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function JobItem({ job, onPress }: any) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          backgroundColor: "#fff",
          marginVertical: 8,
          marginHorizontal: 12,
          padding: 16,
          borderRadius: 12,
          elevation: 3,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "600" }}>
          {job.title}
        </Text>

        <Text style={{ color: "#666", marginTop: 6 }}>
          {job.description}
        </Text>

        <Text
          style={{
            marginTop: 10,
            fontWeight: "600",
            color:
              job.status === "Completed"
                ? "green"
                : job.status === "Accepted"
                ? "orange"
                : "#333",
          }}
        >
          {job.status}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
