import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import theme from "../theme";

export default function TaskDropdown({ title, priority, color }) {
  const [open, setOpen] = useState(false);

  return (
    <View style={[styles.taskContainer, { backgroundColor: color }]}>
      <TouchableOpacity
        style={styles.taskRow}
        onPress={() => setOpen(!open)}
        activeOpacity={0.8}
      >
        <Text style={[theme.fonts.h3, styles.taskTitle]}>{title}</Text>
        <View style={styles.priorityBadge}>
          <Text style={styles.priorityText}>{priority}</Text>
        </View>
        <Feather
          name={open ? "chevron-up" : "chevron-down"}
          size={24}
          color="#1C2133"
          style={{ marginLeft: 8 }}
        />
      </TouchableOpacity>
      {open && (
        <View style={styles.dropdownContent}>
          <Text style={theme.fonts.body}>Meer details of acties hier...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 0,
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskTitle: {
    flex: 1,
    color: "#1C2133",
  },
  priorityBadge: {
    backgroundColor: "#F5F6F8",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginLeft: 8,
  },
  priorityText: {
    color: "#1C2133",
    fontWeight: "500",
    fontSize: 16,
  },
  dropdownContent: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 2,
  },
});