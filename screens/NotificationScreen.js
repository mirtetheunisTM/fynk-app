import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import BackButton from "../components/BackButton";
import BuddyRequest from "../components/BuddyRequest";
import CheerNotification from "../components/CheerNotification";
import theme from "../theme";

export default function NotificationScreen() {
    const user = {
      profileImage: require("../assets/images/Laura.jpg"),
      friendName: "Laura",
      level: "Einstein",
      progress: 0.1,
      streak: "17",
    }

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
                    <Text style={[theme.fonts.h1, styles.title]}>Notifications</Text>
                </View>
            </View>

            <ScrollView>
              {/* Cheers section */}
              <View style={styles.section}>
                  <Text style={[theme.fonts.h3, { marginBottom: 16 }]}>Cheers</Text>
                  <CheerNotification profileImage={require("../assets/images/Robbe.jpg")} friendName="Robbe" sessionDescription="Cheered your Beast Mode session" timeAgo="Just now" />
              </View>

              {/* Requests section */}
              <View style={styles.section}>
                  <Text style={[theme.fonts.h3, { marginBottom: 16 }]}>StudyBuddy request</Text>
                  <BuddyRequest user={user} requestId={1}/>
              </View>
            </ScrollView>
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
  section: {
    flexDirection: 'column',
    alignItems: 'left',
    marginBottom: 24,
  },
});
