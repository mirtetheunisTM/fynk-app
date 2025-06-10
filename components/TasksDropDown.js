import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import theme from "../theme";
import TodoItemComplete from "./TodoItemComplete";

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
          <Text style={theme.fonts.caption}>{priority}</Text>
        </View>
        <Feather
          name={open ? "chevron-up" : "chevron-down"}
          size={24}
          color={theme.colors.darkBlue}
          style={{ marginLeft: 8 }}
        />
      </TouchableOpacity>
      {open && (
        <View style={styles.dropdownContent}>
          <TodoItemComplete text={"Shop for twenty minutes."}/>
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
  },
  priorityBadge: {
    backgroundColor: theme.colors.creme,
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
  },
});