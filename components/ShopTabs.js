import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import theme from "../theme";

export default function ShopTabs({ tabs, activeTab, onTabPress }) {
  return (
    <View style={[styles.tabs, tabs.length > 2 && { gap: 8}]}>
      {tabs.map((tab, idx) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === idx && styles.activeTab]}
          onPress={() => onTabPress(idx)}
        >
          <Text style={[theme.fonts.h3, activeTab === idx && styles.activeText]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 24,
    justifyContent: "center",
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: theme.colors.primaryPurple,
    borderBottomWidth: 5,
    borderRadius: 8,
  },
  activeText: {
    color: theme.colors.darkBlue,
    fontWeight: "bold",
  },
});