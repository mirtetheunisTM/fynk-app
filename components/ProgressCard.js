import { Image, StyleSheet, Text, View } from 'react-native';
import theme from '../theme';

const ProgressCard = ({ title, image, heading, description, footer, footerText, style }) => {
  return (
    <View style={[styles.cardContainer, style]}>
      <Text style={theme.fonts.h3}>{title}</Text>
      <View style={styles.cardContent}>
        <Image source={image} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={theme.fonts.h3}>{heading}</Text>
          <Text style={theme.fonts.caption}>{description}</Text>
        </View>
      </View>
      {footer && <View style={styles.footer}>{footer}</View>}
      {footerText && <Text style={theme.fonts.caption}>{footerText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: theme.colors.creme,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
    gap: 8,
    backgroundColor: theme.colors.creme,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  detailsContainer: {
    flex: 1,
  },
  footer: {
    marginTop: 8,
  },
});

export default ProgressCard;
