import { Image, StyleSheet, Text, View } from "react-native";
import theme from "../theme";

export default function EmptyState({ page, message }) {
    const getImage = (page) => {
        switch (page) {
            case "friends":
                return require("../assets/images/empty/friends.png");
            case "home":
                return require("../assets/images/empty/password.png");
            case "notifications":
                return require("../assets/images/empty/notifications.png");
            case "password":
                return require("../assets/images/empty/password.png");
            case "tasks":
                return require("../assets/images/empty/tasks.png");
            case "stats":
                return require("../assets/images/empty/data.png");
            case "sessions":
                return require("../assets/images/empty/data.png");
            default:
                return require("../assets/images/empty/friends.png");
        }
    }

    return (
        <View style={styles.container}>
            <Image source={getImage(page)} style={styles.image} />
            <Text style={[theme.fonts.body, styles.message]}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 270,
        height: 270,
        marginBottom: 12,
    },
    message: {
        textAlign: "center",
    },
});