import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../theme';

export default function DatePicker({ value, onChange }) {
  const [open, setOpen] = useState(false);

  const togglePicker = () => setOpen((prev) => !prev);

  const handleChange = (event, selectedDate) => {
    const currentDate = selectedDate || value;
    setOpen(Platform.OS === 'ios'); // On Android close on select
    onChange(currentDate);
  };

  const formattedDate = value.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdown} onPress={togglePicker}>
            <View style={styles.leftGroup}>
                <Feather name="calendar" size={20} color={theme.colors.primaryPurple} />
                <Text style={[theme.fonts.body, styles.dateText]}>{formattedDate}</Text>
            </View>
            <Feather name={open ? 'chevron-up' : 'chevron-down'} size={20} color={theme.colors.darkBlue} />
        </TouchableOpacity>


      {open && (
        <View style={styles.pickerWrapper}>
          <DateTimePicker
            value={value}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'calendar'}
            minimumDate={new Date()}
            maximumDate={maxDate}
            onChange={handleChange}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.creme,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  dateText: {
    color: theme.colors.darkBlue,
  },
  pickerWrapper: {
    marginTop: 8,
  },
});
