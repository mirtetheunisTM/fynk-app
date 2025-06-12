import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ImportanceRating from "../components/ImportanceRating";
import theme from "../theme";
import PrimaryButton from "./PrimaryButton";

export default function RatingPopup({ sessionId, visible, onClose }) {
  const [rating, setRating] = useState(0);
  const navigation = useNavigation();

  const updateSessionRating = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      if (!token) {
        console.error("Geen token gevonden. Log in opnieuw.");
        return;
      }

      const response = await fetch(`https://fynk-backend.onrender.com/sessions/${sessionId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating }),
      });

      if (response.ok) {
        console.log("Sessierating geüpdatet:", rating);
        onClose(); // Sluit de popup
        navigation.navigate("HomeMain"); // Navigeer naar HomeMain
      } else {
        console.error("Fout bij updaten van sessierating:", await response.text());
      }
    } catch (error) {
      console.error("Kan sessierating niet bijwerken:", error);
    }
  };

   return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {/* Titel + Sluitknop op dezelfde lijn */}
          <View style={styles.titleRow}>
            <Text style={[theme.fonts.body, styles.title]}>How productive was this session?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("HomeMain")}>
              <Text style={styles.closeButtonText}>✖</Text>
            </TouchableOpacity>
          </View>

          <ImportanceRating value={rating} onChange={setRating} />
          <PrimaryButton title="Submit" onPress={updateSessionRating} style={{ marginTop: 24 }}/>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: theme.colors.creme,
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderRadius: 12,
    alignItems: "center",
    position: "relative",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", 
    width: "100%",
    marginBottom: 24,
  },
  title: {
    flex: 1,
    textAlign: "left",
    fontWeight: "bold",
  },
  closeButtonText: {
    fontSize: 20,
    color: theme.colors.darkBlue,
  },
});
