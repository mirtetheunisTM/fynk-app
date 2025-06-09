import { useNavigation } from '@react-navigation/native';
//import { ChevronLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import BackButton from '../components/BackButton';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import TodoItem from '../components/TodoItem';
import theme from '../theme';


export default function ChooseTasksScreen() {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Dummy data now, replace with API call
    setTasks([
      { id: '1', text: 'Drink water', category: 4 },
      { id: '2', text: 'Complete Math assignment', category: 1 },
      { id: '3', text: 'Read French chapter', category: 2 },
    ]);
  }, []);

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

      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.headerRow}>
          <BackButton />
          <Text style={[theme.fonts.h1, styles.title]}>Choose tasks</Text>
        </View>
        <Text style={[theme.fonts.body, styles.subtitle]}>
          Which tasks would you like to complete?
        </Text>
      </View>

      {/* Todo Items Section */}
      <View style={styles.todoSection}>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TodoItem text={item.text} category={item.category} />}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          contentContainerStyle={{ paddingBottom: 120 }}
        />
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonRow}>
        <SecondaryButton title="Add Task" onPress={() => {}} style={{flex: 1}}/>
        <PrimaryButton title="Start Session" onPress={() => {navigation.navigate('ChooseSession')}} style={{flex: 1}}/>
      </View>
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
    backgroundColor: '#fff',
  },
  headerSection: {
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  backButton: {
      width: 24,
      height: 24,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    marginLeft: -24, 
  },
  subtitle: {
    marginTop: 16,
    textAlign: 'center',
  },
  todoSection: {
    paddingHorizontal: 16,
    marginTop: 32,
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    gap: 12,
    paddingBottom: 40,
  },
});
