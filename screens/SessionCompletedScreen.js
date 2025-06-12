import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../theme';

export default function SessionCompletedScreen() {
    const tasksFinished = 3;
    const tasksTotal = 5;

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

            <PrimaryButton title="Continue" onPress={() => { }} />
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