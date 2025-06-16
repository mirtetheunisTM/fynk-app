import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import theme from "../theme";

const ONBOARDING_STEPS = [
  {
    type: "intro",
    title: "We would like to get to know you",
    subtitle: "How does it work?",
    image: require("../assets/images/mascottes/life.png"),
    description: "Fill in these questions and let the algorithm do its thing. Please make sure to be open and honest.",
    button: "Start",
  },
  {
    type: "question",
    title: "What does your day look like?",
    subtitle: "How would a regular day in your life usually look like?",
    options: [
      "I have class from 8am until 4pm",
      "My schedule depends on the day",
      "I study at home",
      "I have a lot of hobbies outside of school",
    ],
  },
  {
    type: "question",
    title: "What's your biggest challenge to stay focussed?",
    subtitle: "How would a regular day in your life usually look like?",
    options: [
      "I postpone everything until last minute",
      "Easily distracted by my phone/socials",
      "I don't know where to start",
      "I cannot find the motivation to start",
      "I don't know",
    ],
  },
  {
    type: "question",
    title: "How long can you concentrate?",
    subtitle: "How would a regular day in your life usually look like?",
    options: [
      "15 minutes or less",
      "Around 25 minutes",
      "45 until 60 minutes",
      "More than an hour",
    ],
  },
  {
    type: "question",
    title: "When do you feel most productive?",
    subtitle: "How would a regular day in your life usually look like?",
    options: [
      "In the morning (6am - 1pm)",
      "In the afternoon (1pm - 4pm)",
      "In the evening (4pm - 9pm)",
      "Late in the evening (9pm - 11pm)",
      "Differs per day",
    ],
  },
  {
    type: "question",
    title: "What are your most common tasks?",
    subtitle: "How would a regular day in your life usually look like?",
    options: [
      "Study for tests",
      "Homework",
      "Big projects or papers",
      "Making summaries",
      "Read or process notes",
    ],
  },
  {
    type: "question",
    title: "How motivated are you to start this journey?",
    subtitle: "How would a regular day in your life usually look like?",
    options: [
      "0 - I do this because I have to",
      "1 - Not really, but I need to focus",
      "2 - I'm excited to be more productive",
      "3 - Let's GOO",
    ],
  },
  {
    type: "final",
    title: "Thank you for joining fynk",
    subtitle: "Ready to bring you productivity to the next level?",
    image: require("../assets/images/mascottes/party.png"),
    button: "Start",
  },
];

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const current = ONBOARDING_STEPS[step];
  const isFirst = step === 0;
  const isLast = step === ONBOARDING_STEPS.length - 1;

  // Voor progress bar
  const questionSteps = ONBOARDING_STEPS.filter(s => s.type === "question");
  const currentQuestionIdx = questionSteps.findIndex((s, idx) => ONBOARDING_STEPS.indexOf(s) === step);

  const handleNext = () => {
    if (step < ONBOARDING_STEPS.length - 1) {
      setStep(step + 1);
    } else {
      navigation.replace("MainTabs");
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSelect = (option) => {
    setAnswers({ ...answers, [step]: option });
  };

  return (
    <View style={styles.container}>
      {/* Progress bar */}
      {current.type === "question" && (
        <View style={styles.progressBarWrapper}>
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${((currentQuestionIdx + 1) / questionSteps.length) * 100}%` },
              ]}
            />
          </View>
        </View>
      )}

      {/* Intro & Final */}
      {current.type === "intro" && (
        <View style={styles.introWrapper}>
          <Image
            source={require("../assets/images/mascottes/life.png")}
            style={styles.introMascotte}
          />
          <Text style={styles.introTitle}>We would like to get to know you</Text>
          <Text style={styles.introSubtitle}>How does it work?</Text>
          <Text style={styles.introDesc}>
            Fill in these questions and let the algorithm do its thing. Please make sure to be open and honest.
          </Text>
          <PrimaryButton title={current.button} onPress={handleNext} style={styles.introButton} />
        </View>
      )}

      {current.type === "final" && (
        <>
          <Image source={current.image} style={styles.image} />
          <Text style={styles.title}>{current.title}</Text>
          <Text style={styles.subtitle}>{current.subtitle}</Text>
          <PrimaryButton title={current.button} onPress={handleNext} style={{ marginTop: 32 }} />
        </>
      )}

      {/* Questions */}
      {current.type === "question" && (
        <View style={{ width: "100%", flex: 1 }}>
          <Text style={styles.questionTitle}>{current.title}</Text>
          <Text style={styles.questionSubtitle}>{current.subtitle}</Text>
          <FlatList
            data={current.options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.option,
                  answers[step] === item && styles.optionSelected,
                ]}
                onPress={() => handleSelect(item)}
                activeOpacity={0.85}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
            style={{ marginTop: 16 }}
          />
          <Text style={styles.selectHint}>Select the most suitable option (max 1).</Text>
          <View style={styles.buttonRow}>
            <SecondaryButton title="Back" onPress={handleBack} style={{ flex: 1, marginRight: 8 }} disabled={isFirst} />
            <PrimaryButton
              title="Next"
              onPress={handleNext}
              style={{ flex: 1 }}
              disabled={!answers[step]}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutral,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    paddingTop: 48,
  },
  progressBarWrapper: {
    width: "100%",
    marginBottom: 24,
    marginTop: 8,
  },
  progressBarBg: {
    width: "100%",
    height: 6,
    backgroundColor: "#E6E6FA",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: 6,
    backgroundColor: theme.colors.primaryPurple,
    borderRadius: 3,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 24,
    resizeMode: "contain",
    alignSelf: "center",
  },
  title: {
    ...theme.fonts.h1,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    ...theme.fonts.body,
    textAlign: "center",
    marginBottom: 16,
    color: "#888",
  },
  desc: {
    ...theme.fonts.body,
    textAlign: "center",
    marginBottom: 24,
    color: "#888",
  },
  introWrapper: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 32,
    paddingBottom: 32,
  },
  introMascotte: {
    width: width * 0.6,
    height: width * 0.6,
    resizeMode: "contain",
    marginBottom: 32,
  },
  introTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1C2133",
    textAlign: "center",
    marginBottom: 8,
  },
  introSubtitle: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginBottom: 24,
    fontWeight: "500",
  },
  introDesc: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 22,
  },
  introButton: {
    alignSelf: "stretch",
    marginTop: "auto",
    marginBottom: 0,
  },
  questionTitle: {
    ...theme.fonts.h2,
    textAlign: "left",
    marginBottom: 4,
  },
  questionSubtitle: {
    ...theme.fonts.body,
    color: "#888",
    marginBottom: 12,
  },
  option: {
    backgroundColor: "#F1F1F1",
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    alignItems: "center",
  },
  optionSelected: {
    backgroundColor: "#C4CFFF",
  },
  optionText: {
    ...theme.fonts.body,
    color: "#1C2133",
  },
  selectHint: {
    ...theme.fonts.caption,
    color: "#888",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 16,
    width: "100%",
    justifyContent: "space-between",
  },
});