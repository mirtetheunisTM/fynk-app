import { Modal, StyleSheet, Text, View } from "react-native";
import theme from "../theme";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

export default function WarningPopup({ visible, onCancel, onConfirm, message }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.text}>{message}</Text>
          <View style={styles.buttonRow}>
            <SecondaryButton title="Cancel" onPress={onCancel} style={styles.btn} />
            <PrimaryButton title="Yes" onPress={onConfirm} style={styles.btn} />
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
  popup: {
    backgroundColor: "#FFD6D6",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    width: "80%",
  },
  text: {
    ...theme.fonts.h3,
    color: theme.colors.darkBlue,
    textAlign: "center",
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 8,
  },
  btn: {
    flex: 1,
  },
});