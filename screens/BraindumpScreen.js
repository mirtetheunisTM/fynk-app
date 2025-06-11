import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import TaskDropdown from "../components/TasksDropDown";
import theme from "../theme";

const CATEGORIES = [
	{ id: "1", title: "Deadline Drama", color: theme.colors.pink, priority: "High" },
	{ id: "2", title: "Future me problem", color: theme.colors.primaryPurple, priority: "Medium" },
	{ id: "3", title: "Quick fix", color: theme.colors.lila, priority: "Medium" },
	{ id: "4", title: "Nice, not necessary", color: theme.colors.creme, priority: "Low" },
];

const API_URL = "https://fynk-backend.onrender.com/tasks";

export default function BraindumpScreen() {
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken"); // Haal token op

                if (!token) {
                    setError("Geen token gevonden. Log in opnieuw.");
                    setLoading(false);
                    return;
                }

                const response = await fetch(API_URL, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    console.log("API response:", data);
                    setTasks(data.data || []);
                } else {
                    setError("Fout bij het ophalen van taken.");
                }
            } catch (error) {
                setError("Kan taken niet ophalen.");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

	const getTasksForCategory = (categoryId) =>
	  tasks.filter(task => task.urgency_type.toLowerCase() === categoryId.toLowerCase());

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

			<Text style={[theme.fonts.h1, { marginBottom: 8 }]}>Brain Dump</Text>
			<Text style={[theme.fonts.h3, { marginBottom: 24 }]}>Your todo list</Text>
			{loading && <ActivityIndicator size="large" color={theme.colors.primaryPurple} />}
			{error && <Text style={{ color: "red" }}>{error}</Text>}
			{!loading && !error && (
				<FlatList
					data={CATEGORIES}
					keyExtractor={(item) => item.id}
					renderItem={({ item: category }) => (
						<TaskDropdown
							title={category.title}
							color={category.color}
							priority={category.priority} // <-- priority altijd meegeven!
							tasks={getTasksForCategory(category.title)}
						/>
					)}
					contentContainerStyle={{ gap: 16, marginBottom: 32 }}
					showsVerticalScrollIndicator={false}
				/>
			)}
			<PrimaryButton
				title="Add task"
				onPress={() => {}}
				style={styles.addButton}
			/>
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
		paddingHorizontal: 20,
		paddingTop: 48,
	},
	addButton: {
		marginTop: "auto",
		marginBottom: 32,
		borderRadius: 16,
	},
});