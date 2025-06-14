import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';
import theme from '../theme';

export default function StatCard({ title, tag, tagColor, icon, image }) {
  return (
    <View style={styles.card}>
      <Text style={[theme.fonts.caption, { fontWeight: 'bold', alignSelf: 'center' }]}>{title}</Text>
      <View style={[styles.tag, { backgroundColor: tagColor || theme.colors.lila }]}>
        {icon && <Ionicons name={icon} size={16} color={theme.colors.darkBlue} style={styles.icon} />}
        {image && <Image source={image} style={styles.image} />}
        <Text style={[theme.fonts.caption, { fontWeight: 'bold'}]}>{tag}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: theme.colors.creme,
    borderRadius: 16,
    padding: 12,
    justifyContent: 'center',
  },
  tag: {
    marginTop: 16,
    padding: 8,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  icon: {
    marginRight: 6,
  },
  image: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6,
  },
});
