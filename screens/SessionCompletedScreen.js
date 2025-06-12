import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import RatingPopup from '../components/RatingPopup';
import theme from '../theme';

export default function SessionCompletedScreen() {
    const route = useRoute();
    const { sessionId } = route.params;

    const [tasksFinished, setTasksFinished] = useState(0);
    const [tasksTotal, setTasksTotal] = useState(0);
    const [ratingPopupVisible, setRatingPopupVisible] = useState(false);

    useEffect(() => {
    const fetchTasks = async () => {
            try {
            const token = await AsyncStorage.getItem("authToken");

            if (!token) {
                console.error("Geen token gevonden. Log in opnieuw.");
                return;
            }

            // **Haal ALLE taken op die gelinkt zijn aan de sessie**
            const sessionTasksResponse = await fetch(`https://fynk-backend.onrender.com/sessions/${sessionId}/tasks`, {
                headers: { "Authorization": `Bearer ${token}` },
            });

            const sessionTasksData = await sessionTasksResponse.json();
            const allTasks = sessionTasksData.data || [];
            console.log("All tasks: ", allTasks);

            // **Haal de voltooide taken op**
            const completedTasksResponse = await fetch(`https://fynk-backend.onrender.com/tasks/status/done`, {
                headers: { "Authorization": `Bearer ${token}` },
            });

            const completedTasksData = await completedTasksResponse.json();
            const completedTasks = completedTasksData.data || [];
            console.log("Completed tasks: ", completedTasks);

            // **Vergelijk alle taken met voltooide taken**
            const finishedCount = allTasks.filter(task => completedTasks.some(completedTask => completedTask.task_id === task.task_id)).length;
            console.log("Finished count: ", finishedCount);

            setTasksTotal(allTasks.length);
            setTasksFinished(finishedCount);
            } catch (error) {
            console.error("Fout bij het ophalen van taken:", error);
            }
        };

        fetchTasks();
    }, []);

    const finishedAllTasks = tasksFinished === tasksTotal;

    return (
        <View style={styles.container}>
            {/* Background gradient */}
            <LinearGradient colors={['rgba(252,252,252,0)', '#FCFCFC', '#C4CFFF', '#9C80FF']}
                  locations={[0, 0.6, 0.9, 1]}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={styles.gradientBackground} />

            {/* Content */}
            <View style={styles.text}>
                <Text style={theme.fonts.h1}>
                    You rock!
                </Text>
                <Image source={require("../assets/images/mascottes/party.png")} style={styles.img} />

                <View style={styles.desc}>
                    <Text style={theme.fonts.h2}>
                        You finished {tasksFinished} out of {tasksTotal} tasks
                    </Text>
                    <Text style={theme.fonts.body}>
                        {finishedAllTasks ? "That is awesome! See you next time." : "Next time we'll finish them all!"}
                    </Text>
                </View>
            </View>

            <PrimaryButton title="Continue" onPress={() => setRatingPopupVisible(true)} />

            <RatingPopup sessionId={sessionId} visible={ratingPopupVisible} onClose={() => setRatingPopupVisible(false)} />
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
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.neutral,
        padding: 16,
    },
    text: {
        gap: 24,
        marginBottom: 64,
        alignItems: 'center',
    },
    img: {
        width: 225,
        height: 225,
    },
    desc: {
        alignItems: 'center',
        gap: 8,
    },
});