import { LinearGradient } from "expo-linear-gradient";
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
  {
    id: "2",
    image: require("../assets/images/mascottes/double-xp.png"),
    title: "Double XP Session",
    description: "Next session earns 2× XP",
    price: 1,
  },
  {
    id: "3",
    image: require("../assets/images/mascottes/weekend-warrior.png"),
    title: "Weekend Warrior",
    description: "+50% XP for a Saturday or Sunday session",
    price: 1,
  },
  {
    id: "4",
    image: require("../assets/images/mascottes/comeback-mode.png"),
    title: "Comeback Mode",
    description: "If user skipped yesterday, completing 2 sessions today restores streak",
    price: 1,
  },
];

const PURCHASED = [];
const USED = [];

export default function ShopScreen() {
  const [tab, setTab] = useState(0);

  return (
    <View style={styles.container}>
      {/* Background gradient */}
      <LinearGradient
        colors={['rgba(252,252,252,0)', '#FCFCFC', '#C4CFFF', '#9C80FF']}
        locations={[0, 0.6, 0.9, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradientBackground}
      />

      <Text style={[theme.fonts.h1, { marginBottom: 16 }]}>Booster Shop</Text>
      <BalanceCard balance={3} />
      <ShopTabs
        tabs={["Shop", "Your boosters"]}
        activeTab={tab}
        onTabPress={setTab}
      />
      {tab === 0 ? (
        <FlatList
          data={SHOP_PRODUCTS}
          renderItem={({ item }) => <ProductCard {...item} />}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.productsList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View>
          <Text style={[theme.fonts.h3, { marginBottom: 8 }]}>Purchased</Text>
          <FlatList
            data={PURCHASED}
            numColumns={2}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <BoosterCard {...item} onActivate={() => {}} />
            )}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.productsList}
          />
          <Text style={[theme.fonts.h3, { marginVertical: 8 }]}>Used</Text>
          <FlatList
            data={USED}
            numColumns={2}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <BoosterCard {...item} />
            )}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.productsList}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.2,
    zIndex: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F9FF",
    position: 'relative',
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  columnWrapper: {
    justifyContent: "space-between",
    gap: 12,
  },
  productsList: {
    paddingBottom: 32,
    paddingTop: 8,
  },
});