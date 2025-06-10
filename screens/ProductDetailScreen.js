import { Image, StyleSheet, Text, View } from "react-native";
import BackButton from "../components/BackButton";
import PrimaryButton from "../components/PrimaryButton";
import theme from "../theme";

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      {/* Back button */}
      <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "stretch" }}>
         <BackButton />
        <Text style={[theme.fonts.h1, styles.title, { flex: 1, textAlign: "center" }]}>Product Detail</Text>
        <View style={{ width: 48 }} /> {/* Spacer to balance BackButton */}
      </View>

      <Image source={product.image} style={styles.img} />
      <View style={styles.row}>
        <Text style={[theme.fonts.h1, styles.title]}>{product.title}</Text>
        <View style={styles.priceWrapper}>
        <Text style={[theme.fonts.h3, styles.price]}>{product.price}</Text>
        <Image source={require("../assets/icons/CoinIcon.png")} style={styles.coin} />
          </View>
      </View>
      <Text style={[theme.fonts.body, styles.desc]}>{product.description}</Text>
       
      {/* Dummy badges */}
      <View style={styles.badges}>
        <View style={styles.badgePink}><Text style={styles.badgeText}>XP</Text></View>
        <View style={styles.badgePurple}><Text style={styles.badgeText}>Available for 22:59</Text></View>
      </View>
      <PrimaryButton title="Purchase" onPress={() => {}} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F1F1",
    alignItems: "center",
    margin: 16,
  },
  title: {
    marginTop: 16,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  img: {
    width: "100%",
    height: "400",
    borderRadius: 32,
    marginBottom: 24,
    resizeMode: "contain",
    backgroundColor: "#fff",
  },
  priceWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginBottom: 8,
    width: "100%",
    justifyContent: "space-between",
  },
  price: {
    fontWeight: "bold",
    marginRight: 4,
  },
  coin: {
    width: 18,
    height: 18,
  },
  desc: {
    color: "#A0A4B8",
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  badges: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
    alignSelf: "flex-start",
  },
  badgePink: {
    backgroundColor: theme.colors.pink,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
  },
  badgePurple: {
    backgroundColor: theme.colors.primaryPurple,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  badgeText: {
    color: "#1C2133",
    fontWeight: "bold",
  },
  button: {
    alignSelf: "stretch",
    marginTop: "auto",
  },
});