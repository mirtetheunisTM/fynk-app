import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import BackButton from "../components/BackButton";
import FriendCard from "../components/FriendCard";
import FriendProfileModal from "../components/FriendProfileModal";
import SearchBar from "../components/SearchBar";
import theme from "../theme";

export default function AllFriendsScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredFriends, setFilteredFriends] = useState([]); // Initialize with an empty array

    const friends = [
      { profileImage: require("../assets/images/Robbe.jpg"), name: "Robbe", level: "Goldfish", streak: "3", progress: 0.6, active: true },
      { profileImage: require("../assets/images/Ella.jpg"), name: "Ella", level: "Einstein", streak: "15", progress: 0.3, active: true },
      { profileImage: require("../assets/images/Laura.jpg"), name: "Laura", level: "Monkey Brain", streak: "6", progress: 0.9, active: false },
      { profileImage: require("../assets/images/Sam.jpg"), name: "Sam", level: "Baby Brain", streak: "2", progress: 0.5, active: false },
    ];

    const searchFriends = async (query) => {
        try {
            const token = await AsyncStorage.getItem("authToken");

            if (!token) {
                console.error("Geen token gevonden. Log in opnieuw.");
                return;
            }

            const response = await fetch("https://fynk-backend.onrender.com/friends/search", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: query }),
            });

            if (response.ok) {
                const data = await response.json();
                setFilteredFriends(data.data || []);
            } else {
                console.error("Fout bij zoeken naar vrienden.");
            }
        } catch (err) {
            console.error("Error searching friends:", err);
        }
    };

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredFriends(friends || []); // Ensure friends is defined
        } else {
            searchFriends(searchQuery);
        }
    }, [searchQuery]);

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
                <SearchBar onChangeText={(query) => {
                    setSearchQuery(query);
                    console.log("Search query updated:", query);
                }} />
                <Image source={require("../assets/images/mascottes/friends.png")} style={styles.img} />
            </View>

            <ScrollView>
              {searchQuery.trim() === "" ? (
                // Show Online and Offline sections when no search query
                <>
                  <View style={styles.section}>
                      <Text style={[theme.fonts.h3, { marginBottom: 16 }]}>Online</Text>
                      {filteredFriends.filter(friend => friend.active).map((friend, index) => (
                        <FriendCard 
                          key={index} 
                          profileImage={friend.profileImage || require("../assets/images/Ella.jpg")}
                          friendName={friend.friendName || "Ella"}
                          level={friend.level || "Einstein"}
                          streak={friend.streak || "0"}
                          progress={friend.progress || 0}
                          active={friend.active}
                          onPress={() => { setSelectedFriend(friend); setModalVisible(true); }} 
                        />
                      ))}
                  </View>

                  <View style={styles.section}>
                      <Text style={[theme.fonts.h3, { marginBottom: 16 }]}>Offline</Text>
                      {filteredFriends.filter(friend => !friend.active).map((friend, index) => (
                        <FriendCard 
                          key={index} 
                          profileImage={friend.profileImage || require("../assets/images/Robbe.jpg")}
                          friendName={friend.name || "Unknown"}
                          level={friend.level || "Einstein"}
                          streak={friend.streak || "0"}
                          progress={friend.progress || 0}
                          active={friend.active}
                          onPress={() => { setSelectedFriend(friend); setModalVisible(true); }} 
                        />
                      ))}
                  </View>
                </>
              ) : (
                // Show only search results when a query is entered
                filteredFriends.map((friend, index) => (
                  <FriendCard 
                    key={index} 
                    profileImage={friend.profileImage || require("../assets/images/Robbe.jpg")}
                    friendName={friend.name || "Ella"}
                    level={friend.level || "Einstein"}
                    streak={friend.streak || "0"}
                    progress={friend.progress || 0}
                    active={friend.active}
                    onPress={() => { setSelectedFriend(friend); setModalVisible(true); }} 
                  />
                ))
              )}
            </ScrollView>

            {/* Modal - Wordt geopend bij klik op een FriendCard */}
            {selectedFriend && (
              <FriendProfileModal 
                visible={modalVisible} 
                onClose={() => setModalVisible(false)} 
                user={selectedFriend}
                friendshipStatus="none"
              />
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
