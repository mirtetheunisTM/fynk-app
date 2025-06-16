import { Ionicons } from "@expo/vector-icons";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import theme from "../theme";
import PrimaryButton from "./PrimaryButton";

export default function SessionDetailModal({ visible, onClose, session }) {
  if (!session) return null;

  // Zet de functie HIER in de component
  const getSessionDetails = (focus_mode_id) => {
    switch (Number(focus_mode_id)) {
      case 1: return { image: require('../assets/images/mascottes/ticktock.png'), description: "Completed a Tick Tock Session" };
      case 2: return { image: require('../assets/images/mascottes/monkmode.png'), description: "Completed a Monk Mode Session" };
      case 3: return { image: require('../assets/images/mascottes/todoordie.png'), description: "Completed a Todo or Die Session" };
      case 4: return { image: require('../assets/images/mascottes/workhardchillharder.png'), description: "Completed a Work Hard Chill Harder Session" };
      case 5: return { image: require('../assets/images/mascottes/beastmode.png'), description: "Completed a Beast Mode Session" };
      case 6: return { image: require('../assets/images/mascottes/figureitout.png'), description: "Completed a Figure It Out Session" };
      default: return { image: require('../assets/images/mascottes/ticktock.png'), description: "Completed a Focus Session" };
    }
  };

  // Haal mascotte en beschrijving op
  const details = getSessionDetails(session.focus_mode_id);

  // Datum helpers
  const dateObj = new Date(session.start_time);
  const day = dateObj.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  const weekday = dateObj.toLocaleDateString("en-GB", { weekday: "long" }).toLowerCase();

  // Dummy taken (vervang door echte taken als beschikbaar)
  const tasks = [
    { id: 1, title: "Complete project presentation", done: true },
    { id: 2, title: "Call Ella", done: true }
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Sluitknop */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="close" size={28} color="#A0A4B8" />
          </TouchableOpacity>
          {/* Datum */}
          <Text style={styles.weekday}>{weekday}</Text>
          <Text style={styles.day}>{day}</Text>
          {/* Mascotte */}
          <Image source={details.image} style={styles.mascotte} />
          {/* Tijd */}
          <Text style={styles.duration}>{session.duration || "45:05"}</Text>
          <Text style={styles.caption}>Minutes focused</Text>
          {/* Info badges */}
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={theme.fonts.caption}>Beast</Text>
            </View>
            <View style={styles.badge}>
              <Text style={theme.fonts.caption}>15:00</Text>
            </View>
            <View style={[styles.badge, { flexDirection: "row", alignItems: "center" }]}>
              <Ionicons name="star" size={16} color={theme.colors.primaryPurple} />
              <Text style={[theme.fonts.caption, { marginLeft: 4 }]}>4</Text>
            </View>
          </View>
          {/* Tasks */}
          <Text style={[theme.fonts.h3, { alignSelf: "flex-start", marginBottom: 8 }]}>Tasks</Text>
          <View style={{ width: "100%" }}>
            {tasks.map(task => (
              <View
                key={task.id}
                style={[
                  styles.task,
                  { backgroundColor: task.id === 1 ? theme.colors.pink : theme.colors.lightPurple }
                ]}
              >
                <Ionicons name="checkmark-circle" size={20} color={theme.colors.darkBlue} style={{ marginRight: 8 }} />
                <Text style={theme.fonts.body}>{task.title}</Text>
              </View>
            ))}
          </View>
          {/* Sluitknop onderaan (optioneel) */}
          <PrimaryButton title="Close" onPress={onClose} style={{ marginTop: 24, alignSelf: "stretch" }} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(28,33,51,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#F8F9FF",
    borderRadius: 32,
    padding: 24,
    width: "90%",
    alignItems: "center",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: 24,
    right: 24,
    zIndex: 2,
  },
  weekday: {
    color: "#A0A4B8",
    fontSize: 16,
    fontWeight: "500",
    textTransform: "lowercase",
    marginBottom: 2,
    alignSelf: "flex-start",
  },
  day: {
    color: "#1C2133",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
    alignSelf: "flex-start",
  },
  mascotte: {
    width: 100,
    height: 100,
    marginBottom: 16,
    resizeMode: "contain",
  },
  duration: {
    ...theme.fonts.h1,
    marginBottom: 8,
  },
  caption: {
    ...theme.fonts.caption,
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 8,
    marginVertical: 16,
  },
  badge: {
    backgroundColor: theme.colors.lila,
    borderRadius: 8,
    padding: 8,
    minWidth: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  task: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
});