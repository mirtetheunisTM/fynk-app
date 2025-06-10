import { Image, StyleSheet, Text, View } from "react-native";
import theme from "../theme";

export default function ProductCard({ image, title, description, price }) {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.img} />
      <View style={styles.info}>
        <Text style={[theme.fonts.body, styles.title]}>{title}</Text>
        <Text style={theme.fonts.caption}>{description}</Text>
      </View>
      <View style={styles.priceWrapper}>
        <Text style={[theme.fonts.body, styles.price]}>{price}</Text>
      <Image source={require("../assets/icons/CoinIcon.png")} style={styles.coin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.creme,
    borderRadius: 24, // groter
    padding: 20,
    alignItems: "center",
    width: "48%",
    marginBottom: 16,
   
  },
  img: {
    width: 64,
    height: 64,
    marginBottom: 8,
    resizeMode: "contain",
    backgroundColor: "#F1F1F1",
   }, // achtergrondkleur
  info: {
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontWeight: "bold",
  },
  priceWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  price: {
    fontWeight: "bold",
  },
  coin: {
    width: 18,
    height: 18,
  },
});