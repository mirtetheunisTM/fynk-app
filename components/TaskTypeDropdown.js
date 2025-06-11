import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import theme from '../theme';

const TASK_TYPES = [
  { id: 'study', title: 'Study & Review', emoji: '🧠' },
  { id: 'write', title: 'Write & Create', emoji: '📝' },
  { id: 'admin', title: 'Quick tasks & admin', emoji: '📋' },
  { id: 'life', title: 'Life stuff', emoji: '👨‍👩‍👧‍👦' },
  { id: 'me', title: 'Me Time', emoji: '😌' },
];

export default function TaskTypeDropdown() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const toggleDropdown = () => setIsExpanded((prev) => !prev);
  const handleSelect = (id) => setSelectedId(id);

  return (
    <View style={styles.wrapper}>
      {/* Dropdown header */}
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownHeader}>
        <Text style={[theme.fonts.body, styles.dropdownHeaderText]}>Type of task</Text>
        <Feather name={isExpanded ? 'chevron-up' : 'chevron-down'} size={20} color={theme.colors.darkBlue} />
      </TouchableOpacity>

      {/* Dropdown list */}
      {isExpanded && (
        <View style={styles.dropdownList}>
          {TASK_TYPES.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.taskItem}
              onPress={() => handleSelect(item.id)}
            >
              {/* Radio */}
              <View style={styles.radioCircle}>
                {selectedId === item.id && <View style={styles.radioDot} />}
              </View>

              {/* Emoji */}
              <Text style={styles.emoji}>{item.emoji}</Text>

              {/* Title */}
              <Text style={[theme.fonts.body, styles.title]}>{item.title}</Text>

              {/* Info icon */}
              <TouchableOpacity>
                <Feather name="info" size={18} color={theme.colors.primaryPurple} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.creme,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  dropdownHeaderText: {
    color: '#727480',
  },
  dropdownList: {
    marginTop: 8,
    gap: 12,
  },
  taskItem: {
    backgroundColor: theme.colors.neutral,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.lila,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.lightPurple,
  },
  emoji: {
    fontSize: 20,
  },
  title: {
    flex: 1,
  },
});
