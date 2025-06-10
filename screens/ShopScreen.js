import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import BalanceCard from "../components/BalanceCard";
import BoosterCard from "../components/BoosterCard";
import ProductCard from "../components/ProductCard";
import ShopTabs from "../components/ShopTabs";
import theme from "../theme";

const SHOP_PRODUCTS = [
  {
    id: "1",
    image: require("../assets/images/mascottes/streak-freeze.png"),
    title: "Streak freeze",
    description: "Protects streak for 1 skipped day",
    price: 1,
  },
  // ...meer producten
];
const PURCHASED = [
  // Vul aan met gekochte boosters
];
const USED = [
  // Vul aan met gebruikte boosters
];

export default function ShopScreen() {
  const [tab, setTab] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={[theme.fonts.h1, { marginBottom: 16 }]}>Booster Shop</Text>
      <BalanceCard balance={3} />
      <ShopTabs
        tabs={["Shop", "Your boosters"]}
        activeTab={tab}
        onTabPress={setTab}
      />
      {tab === 0 ? (
        <FlatList
          key="shop"
          data={SHOP_PRODUCTS}
          renderItem={({ item }) => <ProductCard {...item} />}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      ) : (
        <View>
          <Text style={[theme.fonts.h3, { marginBottom: 8 }]}>Purchased</Text>
          <FlatList
            key="purchased"
            data={PURCHASED}
            numColumns={2}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <BoosterCard {...item} onActivate={() => {}} />
            )}
            columnWrapperStyle={{ justifyContent: "space-between" }}
          />
          <Text style={[theme.fonts.h3, { marginVertical: 8 }]}>Used</Text>
          <FlatList
            key="used"
            data={USED}
            numColumns={2}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <BoosterCard {...item} />
            )}
            columnWrapperStyle={{ justifyContent: "space-between" }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FF",
    paddingHorizontal: 20,
    paddingTop: 48,

  },
});