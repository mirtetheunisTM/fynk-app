// set up base of screen
import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, View } from "react-native";
import BackButton from "../components/BackButton";
import FriendCard from "../components/FriendCard";
import SearchBar from "../components/SearchBar";
import theme from "../theme";

export default function AllFriendsScreen() {
    return (
        <View style={styles.container}>
            {/* Background gradient */}
            <LinearGradient colors={['rgba(252,252,252,0)', '#FCFCFC', '#C4CFFF', '#9C80FF']}
                      locations={[0, 0.6, 0.9, 1]}
                      start={{ x: 0.5, y: 0 }}
                      end={{ x: 0.5, y: 1 }}
                      style={styles.gradientBackground} />
            
            {/* Header Section */}
            <View style={styles.headerSection}>
                <View style={styles.headerRow}>
                    <BackButton />
                    <Text style={[theme.fonts.h1, styles.title]}>All studybuddies</Text>
                </View>
                <SearchBar />
                <Image source={require("../assets/images/mascottes/friends.png")} style={styles.img} />
            </View>

            {/* Online section */}
            <View style={styles.section}>
                <Text style={[theme.fonts.h3, { marginBottom: 16 }]}>Online</Text>
                <FriendCard profileImage={require("../assets/images/Robbe.jpg")} friendName="Robbe" level="Goldfish" streak="3" progress={0.6} />
                <FriendCard profileImage={require("../assets/images/Ella.jpg")} friendName="Ella" level="Einstein" streak="15" progress={0.3} />
            </View>

            {/* Offline section */}
            <View style={styles.section}>
                <Text style={theme.fonts.h3}>Offline</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.2,
    zIndex: 0,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutral,
    position: 'relative',
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 32,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 24,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    marginLeft: -24, 
  },
  img: {
    width: 242,
    height: 155,
    alignSelf: 'center',
    resizeMode: "contain",
    marginTop: 24,
  },
  section: {
    flexDirection: 'column',
    alignItems: 'left',
    marginBottom: 24,
  },
});