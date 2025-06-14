import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import theme from '../theme';
import EmptyState from './EmptyState';
import StatCard from './StatCard';

const API_URL = "https://fynk-backend.onrender.com/stats"

export default function StatisticsTab() {
    const [stats, setStats] = useState(null);

    const fetchStats = async () => {
        try {
            const token = await AsyncStorage.getItem("authToken");

            if (!token) {
            console.error("Geen token gevonden. Log in opnieuw.");
            return;
            }

            const response = await fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });

            const data = await response.json();

            if (response.ok) {
            setStats(data.data);
            } else {
            console.error("Fout bij ophalen van statistieken:", data.message);
            }
        } catch (error) {
            console.error("Kan statistieken niet ophalen:", error);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const getFocusImage = (mode) => {
        switch (mode) {
            case "Tick Tock": return require("../assets/images/mascottes/ticktock.png");
            case "Monk Mode": return require("../assets/images/mascottes/monkmode.png");
            case "To Do Or Die": return require("../assets/images/mascottes/todoordie.png");
            case "Work Hard Chill Harder": return require("../assets/images/mascottes/workhardchillharder.png");
            case "Beast Mode": return require("../assets/images/mascottes/beastmode.png");
            default: return require("../assets/images/mascottes/ticktock.png");
        }
    };

  return (
    <ScrollView style={styles.container}>

        {/* Empty state */}
        {stats === null && (
            <EmptyState page="stats" message="We don’t have enough data to show anything cool yet.. Start using the app and collect your insights" />
        )}

        {/* Stats */}
        {stats && (
            <ScrollView style={styles.container}>
                {/* Grote kaart - Longest Streak */}
                <View style={styles.largeStatCard}>
                <View>
                    <View style={styles.iconRow}>
                    <Ionicons name="flame" size={28} color={theme.colors.primaryPurple} />
                    <Text style={[theme.fonts.body, { fontWeight: 'bold' }]}>Longest Streak</Text>
                    </View>
                    <View style={styles.tag}>
                    <Text style={[theme.fonts.caption, { fontWeight: 'bold' }]}>{stats.longestStreak} Days</Text>
                    </View>
                </View>
                <Image source={require('../assets/images/mascottes/handsup.png')} style={styles.brainImage} />
                </View>

                {/* Statistiek rijen */}
                <View style={styles.row}>
                <StatCard title="Top Focus Method" tag={stats.topFocusMethod} tagColor={theme.colors.pink} image={getFocusImage(stats.topFocusMethod)} />
                <StatCard title="Your Focus Buddy" tag="Ella" tagColor={theme.colors.pink} image={require('../assets/images/Ella.jpg')} />
                </View>
                <View style={styles.row}>
                <StatCard title="Best Focus Time" tag={stats.bestFocusTime} icon="time-outline" />
                <StatCard title="Best Focus Day" tag={stats.bestFocusDay} icon="calendar-outline" />
                </View>
                <View style={styles.row}>
                <View style={styles.chartCard}>
                    <Text style={[theme.fonts.caption, { marginBottom: 4, fontWeight: 'bold' }]}>Average Focus Session</Text>
                    <View style={styles.infoRow}>
                    <View style={styles.timeTag}>
                        <Text style={[theme.fonts.caption, { fontWeight: 'bold' }]}>{Math.round(stats.averageFocusSession)} min</Text>
                    </View>
                    <View style={styles.chartPlaceholder}>
                        <Text style={[theme.fonts.caption, { fontWeight: 'bold' }]}>|||</Text>
                    </View>
                    </View>
                </View>
                </View>
                <View style={styles.row}>
                <StatCard title="Cheers Given" tag={`${stats.cheersGiven}`} icon="heart" tagColor={theme.colors.neutral}/>
                <StatCard title="Cheers Received" tag={`${stats.cheersReceived}`} icon="heart" tagColor={theme.colors.neutral}/>
                </View>
            </ScrollView>
            )}

    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
  },
  largeStatCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.creme,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tag: {
    marginTop: 16,
    backgroundColor: theme.colors.lightPurple,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: 'flex-start',
    width: '100%',
    alignItems: 'center',
  },
  timeTag: {
    marginTop: 16,
    backgroundColor: theme.colors.lightPurple,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: 'flex-start',
    width: '40%',
    alignItems: 'center',
  },
  brainImage: {
    width: 129,
    height: 100,
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },
  chartCard: {
    flex: 1,
    backgroundColor: theme.colors.creme,
    borderRadius: 12,
    padding: 16,
  },
  chartPlaceholder: {
    height: 40,
    marginTop: 8,
    backgroundColor: theme.colors.lightPurple,
    borderRadius: 8,
    opacity: 0.3,
    width: '55%',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});
