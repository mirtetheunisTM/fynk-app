import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import theme from "../theme";

export default function ProductCard({ image, title, description, price, ...rest }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("ProductDetail", { product: { image, title, description, price, ...rest } })}
      activeOpacity={0.9}
    >
      <Image source={image} style={styles.img} />
      <View style={styles.info}>
        <Text style={[theme.fonts.body, styles.title]}>{title}</Text>
        <Text style={theme.fonts.caption}>{description}</Text>
      </View>
      <View style={styles.priceWrapper}>
        <Text style={[theme.fonts.body, styles.price]}>{price}</Text>
        <Image source={require("../assets/icons/CoinIcon.png")} style={styles.coin} />
      </View>
    </TouchableOpacity>
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
    width: 100,
    height: 100,
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