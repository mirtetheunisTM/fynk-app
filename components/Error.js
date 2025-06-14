import { Feather } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../theme';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

export default function Error({ title, message, image, action, action2, closable }) {
    const onClose = () => {
        console.log('Close button pressed');
    };

    return (
        <View style={styles.container}>
            {/* Close button */}
            {closable && <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Feather name="x" size={24} color="#999" />
            </TouchableOpacity>}

            <Text style={[theme.fonts.caption, {fontWeight: 'bold'}]}>{title}</Text>
            <Text style={theme.fonts.caption}>{message}</Text>
            {image && <Image source={image} style={styles.image} /> }
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
        backgroundColor: theme.colors.error,
        borderRadius: 16,
        marginVertical: 16,
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
});