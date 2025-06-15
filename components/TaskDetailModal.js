import { Feather } from "@expo/vector-icons";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ImportanceRating from "../components/ImportanceRating";
import theme from "../theme";

export default function TaskDetailModal({ visible, onClose, task, onEdit, onDelete }) {
  if (!task) return null;

  // Dummy mascotte image, pas aan op basis van task.type/category_id als je wilt
  const mascotteImg = require("../assets/images/mascottes/study.png");

  // Importance als sterren
  const renderStars = (importance) => {
    const stars = [];
    for (let i = 1; i <= 4; i++) {
      stars.push(
        <Feather
          key={i}
          name="star"
          size={32}
          color={i <= importance ? "#9C80FF" : "#D6D9F5"}
          style={{ marginRight: 4 }}
        />
      );
    }
    return <View style={{ flexDirection: "row", marginTop: 8 }}>{stars}</View>;
  };

  // Dummy focus sessions
  const focusSessions = [
    { name: "Tick Tock", img: require("../assets/images/mascottes/ticktock.png") },
    { name: "Figure it out", img: require("../assets/images/mascottes/figureitout.png") },
  ];

  // Datum formatteren
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  };

  // Weekdag
  const getWeekday = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", { weekday: "long" });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.weekday}>{task.due_date ? getWeekday(task.due_date) : ""}</Text>
              <Text style={styles.date}>{task.due_date ? formatDate(task.due_date) : ""}</Text>
            </View>
            <View style={styles.iconRow}>
              <TouchableOpacity onPress={onEdit}>
                <Feather name="edit-2" size={22} color="#9C80FF" style={{ marginRight: 16 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={onDelete}>
                <Feather name="trash-2" size={22} color="#FF5C5C" style={{ marginRight: 16 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose}>
                <Feather name="x" size={28} color="#A0A4B8" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Mascotte */}
          <View style={styles.mascotteWrapper}>
            <Image source={mascotteImg} style={styles.mascotte} />
          </View>

          {/* Title */}
          <Text style={[theme.fonts.h2, styles.title]}>{task.title}</Text>

          {/* Description */}
          <Text style={styles.sectionLabel}>Description</Text>
          <View style={styles.inputBox}>
            <Text style={theme.fonts.body}>{task.description}</Text>
          </View>

          {/* Type */}
          <Text style={styles.sectionLabel}>Type</Text>
          <View style={styles.inputBox}>
            <Text style={theme.fonts.body}>{task.type || "Study & review"}</Text>
          </View>

          {/* Importance */}
          <Text style={styles.sectionLabel}>Importance</Text>
          <View style={styles.inputBox}>
            <ImportanceRating value={task.importance} disabled />
          </View>

          {/* Recommended Focus Sessions */}
          <Text style={styles.sectionLabel}>Recommended Focus Sessions</Text>
          <View style={styles.focusSessionsRow}>
            {focusSessions.map((fs) => (
              <View key={fs.name} style={styles.focusSession}>
                <View style={styles.focusImgWrapper}>
                  <Image source={fs.img} style={styles.focusImg} />
                </View>
                <Text style={[theme.fonts.caption, { textAlign: "center" }]}>{fs.name}</Text>
              </View>
            ))}
          </View>
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
    width: "92%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  weekday: {
    color: "#A0A4B8",
    fontSize: 16,
    fontWeight: "500",
    textTransform: "lowercase",
    marginBottom: 2,
  },
  date: {
    color: "#1C2133",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  mascotteWrapper: {
    alignItems: "center",
    marginVertical: 12,
  },
  mascotte: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  title: {
    textAlign: "center",
    marginBottom: 12,
  },
  sectionLabel: {
    color: "#A0A4B8",
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 4,
    fontSize: 16,
  },
  inputBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 4,
  },
  focusSessionsRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 8,
  },
  focusSession: {
    alignItems: "center",
    marginRight: 8,
  },
  focusImgWrapper: {
    backgroundColor: "#E6E6FA",
    borderRadius: 16,
    padding: 8,
    marginBottom: 4,
  },
  focusImg: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});