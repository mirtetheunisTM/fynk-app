import { useNavigation } from '@react-navigation/native';
//import { ChevronLeft } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
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
      { id: '1', text: 'Drink water' },
      { id: '2', text: 'Do 10 push-ups' },
      { id: '3', text: 'Stretch for 5 minutes' },
    ]);
  }, []);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()}>
            {/*<ChevronLeft color={theme.colors.darkBlue} size={24} />*/}
            <Text style={theme.fonts.h1}>Back</Text>
          </Pressable>
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
          renderItem={({ item }) => <TodoItem text={item.text} />}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          contentContainerStyle={{ paddingBottom: 120 }}
        />
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonsContainer}>
        <SecondaryButton title="Add Task" onPress={() => {}} />
        <PrimaryButton title="Start Session" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 32,
    backgroundColor: '#fff',
  },
  headerSection: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
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
  buttonsContainer: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 32,
    gap: 12,
  },
});
