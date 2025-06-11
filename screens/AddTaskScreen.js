import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BackButton from '../components/BackButton';
import DatePicker from '../components/DatePicker';
import FormInput from '../components/FormInput';
import TaskTypeDropdown from '../components/TaskTypeDropdown';
import theme from '../theme';

export default function AddTaskScreen() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState(new Date());

    return (
        <View style={styles.container}>
              <LinearGradient colors={['rgba(252,252,252,0)', '#FCFCFC', '#C4CFFF', '#9C80FF']}
                  locations={[0, 0.6, 0.9, 1]}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={styles.gradientBackground} />
        
              {/* Header Section */}
              <View style={styles.headerSection}>
                <View style={styles.headerRow}>
                  <BackButton />
                  <Text style={[theme.fonts.h1, styles.title]}>New Task</Text>
                </View>
                <Text style={[theme.fonts.body, styles.subtitle]}>
                  Add a new task to your todo list.
                </Text>
              </View>

              {/* Input values */}
              <View style={styles.input}>
                <Text style={[theme.fonts.caption, { fontWeight: 'bold' }]}>Describe your task</Text>
                <FormInput placeholder="Title" value={title} onChangeText={setTitle} />
                <TaskTypeDropdown />
                <FormInput placeholder="Description" style={{height: 120}} value={description} onChangeText={setDescription}/>
              </View>

              {/* Deadline */}
              <View style={styles.input}>
                <Text style={[theme.fonts.caption, { fontWeight: 'bold' }]}>Deadline</Text>
                <DatePicker value={deadline} onChange={setDeadline} />
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
      },
      headerSection: {
        paddingHorizontal: 16,
        alignItems: 'center',
        marginBottom: 24,
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
      input: {
        flexDirection: 'column',
        gap: 12,
        marginBottom: 24,
      }
});