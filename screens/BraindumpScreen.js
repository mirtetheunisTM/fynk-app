import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import TaskDropdown from "../components/TasksDropDown";
import theme from "../theme";

const CATEGORIES = [
	{ id: "1", title: "Deadline Drama", color: theme.colors.pink },
	{ id: "2", title: "Future me problem", color: theme.colors.primaryPurple },
	{ id: "3", title: "Quick fix", color: theme.colors.lila },
	{ id: "4", title: "Nice, not necessary", color: theme.colors.creme },
];

const API_URL = "https://fynk-backend.onrender.com/tasks";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExIiwiZW1haWwiOiJhbGljZUBleGFtcGxlLmNvbSIsImlhdCI6MTc0OTU1OTMzNywiZXhwIjoxNzQ5NTYyOTM3fQ.izoJm3p5puduWefFP6JugJnvuKb-udGBQnBgPzuyoAU";

export default function BraindumpScreen() {
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch(API_URL, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${TOKEN}`,
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(data => {
				setTasks(data.data || []);
				setLoading(false);
			})
			.catch(err => {
				setError("Kan taken niet ophalen.");
				setLoading(false);
			});
	}, []);

	// Helper: taken per categorie filteren
	const getTasksForCategory = (categoryTitle) =>
		tasks.filter(task => (task.category || "").toLowerCase() === categoryTitle.toLowerCase());

	return (
		<View style={styles.container}>
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
							// Geef de taken van deze categorie door als prop
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
	container: {
		flex: 1,
		backgroundColor: "#F8F9FF",
		paddingHorizontal: 20,
		paddingTop: 48,
	},
	addButton: {
		marginTop: "auto",
		marginBottom: 32,
		borderRadius: 16,
	},
});