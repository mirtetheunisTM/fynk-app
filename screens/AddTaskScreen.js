import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BackButton from '../components/BackButton';
import DatePicker from '../components/DatePicker';
import FormInput from '../components/FormInput';
import ImportanceRating from '../components/ImportanceRating';
import PrimaryButton from '../components/PrimaryButton';
import TaskTypeDropdown from '../components/TaskTypeDropdown';
import theme from '../theme';

const API_URL = "https://fynk-backend.onrender.com/tasks";

export default function AddTaskScreen() {
    const navigation = useNavigation();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState(new Date());
    const [importance, setImportance] = useState(0);
    const [categoryId, setCategoryId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

        const handleAddTask = async () => {
            setErrorMessage("");
            if (!title || !description || !categoryId) {
                setErrorMessage("Please fill in all required fields.");
                return;
            }

            try {
                const token = await AsyncStorage.getItem("authToken");
                const userId = 1; // Pas dit aan indien nodig

                if (!token) {
                    setErrorMessage("No token found. Please log in.");
                    return;
                }

                const taskData = {
                    userId,
                    title,
                    description,
                    importance,
                    dueDate: deadline.toISOString(),
                    categoryId,
                };

                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(taskData),
                });

                if (response.ok) {
                    console.log("Success", "Task added successfully!");
                    navigation.goBack(); // Terug naar het vorige scherm
                } else {
                    setErrorMessage("Failed to add task.");
                }
            } catch (error) {
                setErrorMessage("Something went wrong.");
            }
    };

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

              {/* Error Message */}
              {errorMessage? <Text style={styles.errorText}>{errorMessage}</Text> : null}

              {/* Input values */}
              <View style={styles.input}>
                <Text style={[theme.fonts.caption, { fontWeight: 'bold' }]}>Describe your task</Text>
                <FormInput placeholder="Title" value={title} onChangeText={setTitle} style={{marginBottom: -2}}/>
                <TaskTypeDropdown selectedCategory={categoryId} setCategory={setCategoryId} />
                <FormInput placeholder="Description" style={{height: 120}} value={description} onChangeText={setDescription}/>
              </View>

              {/* Deadline */}
              <View style={styles.input}>
                <Text style={[theme.fonts.caption, { fontWeight: 'bold' }]}>Deadline</Text>
                <DatePicker value={deadline} onChange={setDeadline} />
              </View>

              {/* Rating */}
              <View style={styles.input}>
                <Text style={[theme.fonts.caption, { fontWeight: 'bold' }]}>Rate task importance</Text>
                <ImportanceRating value={importance} onChange={setImportance} />
              </View>

              <PrimaryButton title="Add to todo list" onPress={handleAddTask} style={{ marginTop: 24 }} />
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
      },
      errorText: {
        color: 'red',
        textAlign: 'center',
        marginVertical: 8,
    },
});