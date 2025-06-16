import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import EmptyState from "../components/EmptyState";
import OverlayLoader from "../components/OverlayLoader";
import PrimaryButton from "../components/PrimaryButton";
import Success from "../components/Success";
import TaskDetailModal from "../components/TaskDetailModal";
import TaskDropdown from "../components/TasksDropDown";
import WarningPopup from "../components/WarningPopup";
import theme from "../theme";

const CATEGORIES = [
	{ id: "1", title: "Deadline Drama", color: theme.colors.pink, priority: "High" },
	{ id: "2", title: "Future me problem", color: theme.colors.primaryPurple, priority: "Medium" },
	{ id: "3", title: "Quick fix", color: theme.colors.lila, priority: "Medium" },
	{ id: "4", title: "Nice, not necessary", color: theme.colors.creme, priority: "Low" },
];

const API_URL = "https://fynk-backend.onrender.com/tasks/status/todo";

export default function BraindumpScreen() {
	const navigation = useNavigation();

	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedTask, setSelectedTask] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [showWarning, setShowWarning] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);

	const fetchTasks = async () => {
		try {
			const token = await AsyncStorage.getItem("authToken");

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

	// **Haal taken op bij eerste render**
	useEffect(() => {
		fetchTasks();
	}, []);

	// **Herlaad taken wanneer gebruiker terugkeert naar het scherm**
	useFocusEffect(
		useCallback(() => {
			fetchTasks();
		}, [])
	);

	const getTasksForCategory = (categoryId) =>
	  tasks.filter(task => String(task.category_id) === String(categoryId));

	const handleDelete = () => setShowWarning(true);
	const confirmDelete = async () => {
	  if (!selectedTask) return;
	  try {
	    const token = await AsyncStorage.getItem("authToken");
	    const response = await fetch(`https://fynk-backend.onrender.com/tasks/${selectedTask.task_id}`, {
	      method: "DELETE",
	      headers: {
	        "Authorization": `Bearer ${token}`,
	        "Content-Type": "application/json"
	      }
	    });
	    if (response.ok) {
	      fetchTasks();
	      setShowSuccess(true); // <-- Toon succesmelding!
	    } else {
	      setError("Verwijderen mislukt.");
	    }
	  } catch (e) {
	    setError("Verwijderen mislukt.");
	  }
	  setShowWarning(false);
	  setModalVisible(false);
	};

	useEffect(() => {
		if (showSuccess) {
			const timer = setTimeout(() => setShowSuccess(false), 2500);
			return () => clearTimeout(timer);
		}
	}, [showSuccess]);

	return (
		<View style={styles.container}>
			{/* Loader Overlay */}
      		<OverlayLoader visible={loading} />

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
	
			{error && <Text style={{ color: "red" }}>{error}</Text>}

			{/* Empty state */}
			{!loading && !error && tasks.length === 0 && (
				<EmptyState page="tasks" message="Nothing to see here. You haven’t created any tasks." />
			)}

			{/* Todo list with categories */}
			{!loading && !error && tasks.length > 0 && (
				<FlatList
					data={CATEGORIES}
					keyExtractor={(item) => item.id}
					renderItem={({ item: category }) => (
						<TaskDropdown
							title={category.title}
							color={category.color}
							priority={category.priority}
							tasks={getTasksForCategory(category.id)}
							onTaskPress={(task) => {
								setSelectedTask(task);
								setModalVisible(true);
							}}
						/>
					)}
					contentContainerStyle={{ gap: 16, marginBottom: 32 }}
					showsVerticalScrollIndicator={false}
				/>
			)}
			<PrimaryButton
				title="Add task"
				onPress={() => navigation.navigate("AddTask")}
				style={styles.addButton}
			/>
			<TaskDetailModal
				visible={modalVisible}
				onClose={() => setModalVisible(false)}
				task={selectedTask}
				onEdit={async (updatedTask) => {
					const token = await AsyncStorage.getItem("authToken");
					// Zet categoryId (camelCase) voor de backend
					const body = {
						...updatedTask,
						categoryId: String(updatedTask.category_id), // <-- forceer string
					};
					await fetch(`https://fynk-backend.onrender.com/tasks/${updatedTask.task_id}`, {
						method: "PUT",
						headers: {
							"Authorization": `Bearer ${token}`,
							"Content-Type": "application/json"
						},
						body: JSON.stringify(body)
					});
					await fetchTasks();
					setModalVisible(false);
				}}
				onDelete={handleDelete}
			/>
			<WarningPopup
				visible={showWarning}
				onCancel={() => setShowWarning(false)}
				onConfirm={confirmDelete}
				message="Are you sure you want to delete this task?"
			/>
			{showSuccess && (
				<Success
					title="Success!"
					message="Task successfully deleted."
					closable
					onClose={() => setShowSuccess(false)}
					toast
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
		paddingHorizontal: 20,
		paddingTop: 48,
	},
	addButton: {
		marginTop: "auto",
		marginBottom: 32,
		borderRadius: 16,
	},
});