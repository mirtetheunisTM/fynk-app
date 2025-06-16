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

const API_URL = "https://fynk-backend.onrender.com/categories";

// Mapping van category_id naar mascotte-afbeelding
const mascotteImages = {
  1: require('../assets/images/mascottes/study.png'),
  2: require('../assets/images/mascottes/write.png'),
  3: require('../assets/images/mascottes/admin.png'),
  4: require('../assets/images/mascottes/life.png'),
  5: require('../assets/images/mascottes/me.png'),
};

export default function TaskTypeDropdown({ selectedCategory, setCategory }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [taskTypes, setTaskTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleDropdown = () => setIsExpanded((prev) => !prev);

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
        } else {
          setError("Fout bij het ophalen van categorieën.");
        }
      } catch (error) {
        setError("Kan categorieën niet ophalen.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Vind de geselecteerde categorie
  const selected = taskTypes.find((type) => type.category_id === selectedCategory);

  return (
    <View style={styles.wrapper}>
      {/* Dropdown header */}
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownHeader}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          {selected && (
            <Image source={mascotteImages[selected.category_id]} style={styles.emoji} />
          )}
          <Text style={[theme.fonts.body, styles.dropdownHeaderText]}>
            {selected ? selected.name : "Type of task"}
          </Text>
        </View>
        <Feather name={isExpanded ? 'chevron-up' : 'chevron-down'} size={20} color={theme.colors.darkBlue} />
      </TouchableOpacity>

      {/* Dropdown list */}
      {isExpanded && (
        <View style={styles.dropdownList}>
          {taskTypes.map((item) => (
            <TouchableOpacity
              key={item.category_id}
              style={styles.taskItem}
              onPress={() => {
                setCategory(String(item.category_id)); // <-- forceer string
                setIsExpanded(false);
              }}
            >
              {/* Radio */}
              <View style={styles.radioCircle}>
                {selectedCategory === item.category_id && <View style={styles.radioDot} />}
              </View>
              {/* Mascotte */}
              <Image source={mascotteImages[item.category_id]} style={styles.emoji} />
              {/* Title */}
              <Text style={[theme.fonts.body, styles.title]}>{item.name}</Text>
              {/* Info icon */}
              <Feather name="info" size={18} color={theme.colors.primaryPurple} />
            </TouchableOpacity>
          ))}
        </View>
      )}
      {/* Geen extra tekst onderaan! */}
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
    marginLeft: 8,
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
    marginRight: 8,
  },
  title: {
    flex: 1,
  },
});
