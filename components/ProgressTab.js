import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import theme from '../theme';
import ProgressBar from './ProgressBar';
import ProgressCard from './ProgressCard';

const ProgressTab = () => {
  const [currentLevel, setCurrentLevel] = useState(null);
  const [nextLevel, setNextLevel] = useState(null);
  const [currentStreak, setCurrentStreak] = useState(null);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');

        if (!token) {
          console.error('No token found. Please log in again.');
          return;
        }

        // Fetch current level data
        const levelResponse = await fetch('https://fynk-backend.onrender.com/stats/level', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const levelData = await levelResponse.json();
        if (levelResponse.ok) {
          setCurrentLevel(levelData.data);
        } else {
          console.error('Failed to fetch current level:', levelData.message);
        }

        // Fetch next level data
        const nextLevelResponse = await fetch('https://fynk-backend.onrender.com/stats/nextlevelname', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const nextLevelData = await nextLevelResponse.json();
        if (nextLevelResponse.ok) {
          setNextLevel({
            levelName: nextLevelData.data.levelName,
            requiredXP: nextLevelData.data.xpRequired,
            description: "Achieve mastery and unlock your full potential." // Hardcoded description
          });
        } else {
          console.error('Failed to fetch next level:', nextLevelData.message);
        }

        // Hardcode description for current level
        setCurrentLevel(prev => ({
          ...prev,
          description: "A level of focus and determination." // Hardcoded description
        }));

        // Fetch current streak data
        const streakResponse = await fetch('https://fynk-backend.onrender.com/stats/streak', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const streakData = await streakResponse.json();
        if (streakResponse.ok) {
          setCurrentStreak({
            currentStreak: streakData.data,
            daysUntilBest: 5 // Hardcoded value for days until best
          });
        } else {
          console.error('Failed to fetch current streak:', streakData.message);
        }
      } catch (error) {
        console.error('Error fetching progress data:', error);
      }
    };

    fetchProgressData();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        {/* Current Streak Section */}
      {currentStreak && (
        <ProgressCard
          title="Current streak"
          image={require('../assets/images/mascottes/streak.png')}
          heading={`Current streak is ${currentStreak.currentStreak}!`}
          description={`${currentStreak.daysUntilBest} more days till you break your personal best`}
        />
      )}

      {/* Current Level Section */}
      {currentLevel && (
        <ProgressCard
          title="Current level"
          image={require('../assets/images/mascottes/lockedin.png')}
          heading={currentLevel.levelName}
          description={currentLevel.description}
          footer={<ProgressBar progress={currentLevel.progress} style={{ width: '90%' }} />}
          footerText="Keep going to reach the next level!"
        />
      )}

      {/* Next Level Section */}
      {nextLevel && (
        <ProgressCard
          title="Next level"
          image={require('../assets/images/mascottes/sigmalevel.png')}
          heading={nextLevel.levelName}
          description={nextLevel.description}
          footerText={`Unlocks at: ${nextLevel.requiredXP} XP`}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutral,
    marginTop: -32, // Adjust spacing to reduce gap
  },
  contentContainer: {
    padding: 16,
  },
});

export default ProgressTab;