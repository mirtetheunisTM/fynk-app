import { Feather } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../theme';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

export default function Success({ title, message, image, action, action2, closable, onClose, toast }) {
    return (
        <View style={[styles.container, toast && styles.toast]}>
            {closable && <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Feather name="x" size={24} color="#999" />
            </TouchableOpacity>}
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
            {image && <Image source={image} style={styles.image} />}
            {action && <PrimaryButton title={action.title} onPress={action.onPress} style={{ marginTop: 8 }} />}
            {action2 && <SecondaryButton title={action2.title} onPress={action2.onPress} style={{ marginTop: 8 }} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#CDFFEB',
        borderRadius: 16,
        marginVertical: 16,
    },
    toast: {
        position: 'absolute',
        top: 48,
        left: 20,
        right: 20,
        zIndex: 100,
        elevation: 100,
        flex: 0,
        marginVertical: 0,
    },
    closeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
    },
    image: {
        width: 50,
        height: 50,
        marginBottom: 12,
        resizeMode: 'contain',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: theme.colors.darkBlue,
        textAlign: 'center',
        marginBottom: 4,
    },
    message: {
        fontSize: 16,
        color: theme.colors.darkBlue,
        textAlign: 'center',
        fontWeight: '400',
    },
});