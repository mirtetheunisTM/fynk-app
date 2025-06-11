import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import theme from '../theme';

const TASK_TYPES = [
  { id: 'study', title: 'Study & Review', emoji: '🧠' },
  { id: 'write', title: 'Write & Create', emoji: '📝' },
  { id: 'admin', title: 'Quick tasks & admin', emoji: '📋' },
  { id: 'life', title: 'Life stuff', emoji: '👨‍👩‍👧‍👦' },
  { id: 'me', title: 'Me Time', emoji: '😌' },
];

const API_URL = "https://fynk-backend.onrender.com/categories";

export default function TaskTypeDropdown({ selectedCategory, setCategory }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [taskTypes, setTaskTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleDropdown = () => setIsExpanded((prev) => !prev);
  const handleSelect = (id) => setCategory(id);

  useEffect(() => {
    const fetchCategories = async () => {
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
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          setTaskTypes(data.data || []);
          console.log("Types: ", data.data);
        } else {
          setError("Fout bij het ophalen van categorieën.");
          console.log("Error: ", error);
        }
      } catch (error) {
        setError("Kan categorieën niet ophalen.");
        console.log("Error: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getImage = (category_id) => {
        category_id = Number(category_id);
        switch (category_id) {
            case 1: return require('../assets/images/mascottes/study.png');
            case 2: return require('../assets/images/mascottes/write.png');
            case 3: return require('../assets/images/mascottes/admin.png');
            case 4: return require('../assets/images/mascottes/life.png');
            case 5: return require('../assets/images/mascottes/me.png');
            default: return require('../assets/images/mascottes/wave.png');
        }
    };

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
          {taskTypes.map((item) => (
            <TouchableOpacity
              key={item.category_id}
              style={styles.taskItem}
              onPress={() => handleSelect(item.category_id)}
            >
              {/* Radio */}
              <View style={styles.radioCircle}>
                {selectedCategory === item.category_id && <View style={styles.radioDot} />}
              </View>

              {/* Emoji */}
              <Image source={getImage(item.category_id)} style={styles.emoji} />

              {/* Title */}
              <Text style={[theme.fonts.body, styles.title]}>{item.name}</Text>

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
    borderWidth: 3,
    borderColor: theme.colors.lila,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 10,
    backgroundColor: theme.colors.lightPurple,
  },
  emoji: {
    height: 24,
    width: 24,
  },
  title: {
    flex: 1,
  },
});
