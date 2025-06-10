import { Image, StyleSheet, Text, View } from "react-native";
import theme from "../theme";

export default function BalanceCard({ balance }) {
  return (
    <View style={styles.card}>
    
      <View style={styles.balanceRow}>
          <Text style={[theme.fonts.h3, { marginBottom: 4 }]}>Ready to buy?</Text>
        <Text style={theme.fonts.body}>Current balance:</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={[theme.fonts.h2, { marginLeft: 8 }]}>{balance}</Text>
        <Image source={require("../assets/icons/CoinIcon.svg")} style={styles.coin} />
         </View>
      </View>
      <Image source={require("../assets/images/mascottes/coin.png")} style={styles.img} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F1F1F1",
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  balanceRow: {
    flexDirection: "column",
    alignItems: "center",
  },
  coin: {
    width: 18,
    height: 18,
    marginLeft: 4,
  },
  img: {
    width: 100,
    height: 100,
    marginLeft: 16,
    resizeMode: "contain",
  },
});