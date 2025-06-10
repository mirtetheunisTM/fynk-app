import { FlatList, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import TaskDropdown from "../components/TasksDropDown";
import theme from "../theme";

const TASKS = [
	{ id: "1", title: "Deadline Drama", priority: "High", color: theme.colors.pink },
	{ id: "2", title: "Future me problem", priority: "Medium", color: theme.colors.primaryPurple},
	{ id: "3", title: "Quick fix", priority: "Medium", color: theme.colors.lila},
	{ id: "4", title: "Nice, not necessary", priority: "Low", color: theme.colors.creme },
];

export default function BraindumpScreen() {
	return (
		<View style={styles.container}>
			<Text style={[theme.fonts.h1, { marginBottom: 8 }]}>Brain Dump</Text>
			<Text style={[theme.fonts.h3, { marginBottom: 24 }]}>Your todo list</Text>
			<FlatList
				data={TASKS}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<TaskDropdown
						title={item.title}
						priority={item.priority}
						color={item.color}
					/>
				)}
				contentContainerStyle={{ gap: 16, marginBottom: 32 }}
				showsVerticalScrollIndicator={false}
			/>
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
	taskContainer: {
		borderRadius: 24,
		padding: 24,
		marginBottom: 0,
	},
	taskRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	taskTitle: {
		flex: 1,
		color: "#1C2133",
	},
	priorityBadge: {
		backgroundColor: "#F5F6F8",
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 4,
		marginLeft: 8,
	},
	priorityText: {
		color: "#1C2133",
		fontWeight: "500",
		fontSize: 16,
	},
	dropdownContent: {
		marginTop: 16,
		padding: 12,
		backgroundColor: "#fff",
		borderRadius: 12,
		elevation: 2,
	},
	addButton: {
		marginTop: "auto",
		marginBottom: 32,
		borderRadius: 16,
	},
});