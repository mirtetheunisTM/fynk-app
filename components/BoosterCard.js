import { Image, StyleSheet, Text, View } from "react-native";
import theme from "../theme";
import PrimaryButton from "./PrimaryButton";

export default function BoosterCard({ image, title, description, price, onActivate }) {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.img} />
      <Text style={theme.fonts.h3}>{title}</Text>
      <Text style={theme.fonts.caption}>{description}</Text>
      <View style={styles.priceRow}>
        <Text style={[theme.fonts.body, styles.price]}>{price}</Text>
        <Image source={require("../assets/icons/CoinIcon.png")} style={styles.coin} />
      </View>
      {onActivate && (
        <PrimaryButton title="Activate" onPress={onActivate} style={styles.button} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.creme,
    borderRadius: 24,
    padding: 20,
    alignItems: "center",
    width: "100%",
    minHeight: 220,
    marginBottom: 0,
  },
  img: {
    width: 80,
    height: 80,
    marginBottom: 8,
    resizeMode: "contain",
    backgroundColor: "#F1F1F1",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 8,
    marginBottom: 8,
  },
  price: {
    fontWeight: "bold",
  },
  coin: {
    width: 18,
    height: 18,
  },
  button: {
    marginTop: 8,
    alignSelf: "stretch",
  },
});