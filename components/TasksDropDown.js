import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import theme from "../theme";
import TodoItemComplete from "./TodoItemComplete";

export default function TaskDropdown({ title, color, tasks = [] }) {
  const [open, setOpen] = useState(false);

  return (
    <View style={[styles.taskContainer, { backgroundColor: color }]}>
      <TouchableOpacity
        style={styles.taskRow}
        onPress={() => setOpen(!open)}
        activeOpacity={0.8}
      >
        <Text style={[theme.fonts.h3, styles.taskTitle]}>{title}</Text>
        {/* Optioneel: Toon een badge met prioriteit van de eerste taak */}
        {tasks.length > 0 && (
          <View style={styles.priorityBadge}>
            <Text style={styles.priorityText}>
              {tasks[0].importance ? capitalize(tasks[0].importance) : "Medium"}
            </Text>
          </View>
        )}
        <Feather
          name={open ? "chevron-up" : "chevron-down"}
          size={24}
          color={theme.colors.darkBlue}
          style={{ marginLeft: 8 }}
        />
      </TouchableOpacity>
      {open && (
        <View style={styles.dropdownContent}>
          {tasks.length === 0 ? (
            <Text style={theme.fonts.body}>Geen taken in deze categorie.</Text>
          ) : (
            tasks.map((task) => (
              <View key={task.id}>
                <TodoItemComplete text={task.title} />
              </View>
            ))
          )}
        </View>
      )}
    </View>
  );
}

// Helper functie om hoofdletter te maken
function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
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
    backgroundColor: theme.colors.creme,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginLeft: 8,
  },
  priorityText: {
    color: "#1C2133",
    fontWeight: "500",
    fontSize: 16,
  },
  dropdownContent: {
    marginTop: 16,
    gap: 12,
  },
});