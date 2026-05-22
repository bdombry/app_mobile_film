import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";

type RecommendationType = "movie" | "series" | "";

type FormState = {
  title: string;
  type: RecommendationType;
  genre: string;
  creator: string;
  year: string;
  rating: string;
  comment: string;
};

export default function RecommendScreen() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    title: "",
    type: "",
    genre: "",
    creator: "",
    year: "",
    rating: "",
    comment: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const commentLength = useMemo(
    () => form.comment.trim().length,
    [form.comment],
  );

  const updateField = <K extends keyof FormState>(
    key: K,
    value: FormState[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = () => {
    const errors: string[] = [];
    const yearNumber = Number(form.year);
    const ratingNumber = form.rating === "" ? NaN : Number(form.rating);

    if (!form.title.trim()) errors.push("Le titre est obligatoire.");
    if (!form.type) errors.push("Le type est obligatoire.");
    if (!form.genre.trim()) errors.push("Le genre est obligatoire.");
    if (!form.year.trim()) {
      errors.push("L'année est obligatoire.");
    } else if (
      !Number.isInteger(yearNumber) ||
      yearNumber < 1888 ||
      yearNumber > 2100
    ) {
      errors.push("L'année doit être un nombre valide.");
    }
    if (!form.rating.trim()) {
      errors.push("La note personnelle est obligatoire.");
    } else if (
      Number.isNaN(ratingNumber) ||
      ratingNumber < 0 ||
      ratingNumber > 5
    ) {
      errors.push("La note doit être comprise entre 0 et 5.");
    }
    if (form.comment.trim().length < 20) {
      errors.push("Le commentaire doit contenir au moins 20 caractères.");
    }

    if (errors.length > 0) {
      setErrorMessage(errors.join(" "));
      setSuccessMessage("");
      return;
    }

    setErrorMessage("");
    setSuccessMessage(`Recommandation envoyée pour ${form.title.trim()}.`);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <ThemedText style={styles.backButtonText}>Retour</ThemedText>
          </Pressable>

          <ThemedText type="title" style={styles.title}>
            Recommander un titre
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Remplis le formulaire pour proposer un film ou une série.
          </ThemedText>

          {errorMessage ? (
            <ThemedView style={[styles.messageBox, styles.errorBox]}>
              <ThemedText style={styles.errorText}>{errorMessage}</ThemedText>
            </ThemedView>
          ) : null}

          {successMessage ? (
            <ThemedView style={[styles.messageBox, styles.successBox]}>
              <ThemedText style={styles.successText}>
                {successMessage}
              </ThemedText>
            </ThemedView>
          ) : null}

          <ThemedView style={styles.card}>
            <ThemedText style={styles.label}>Titre *</ThemedText>
            <TextInput
              value={form.title}
              onChangeText={(value) => updateField("title", value)}
              placeholder="Ex: Inception"
              placeholderTextColor="rgba(127,127,127,0.8)"
              style={styles.input}
            />

            <ThemedText style={styles.label}>Type *</ThemedText>
            <View style={styles.row}>
              {[
                { value: "movie", label: "Film" },
                { value: "series", label: "Série" },
              ].map((item) => {
                const selected = form.type === item.value;
                return (
                  <Pressable
                    key={item.value}
                    onPress={() =>
                      updateField("type", item.value as RecommendationType)
                    }
                    style={[styles.chip, selected && styles.chipActive]}
                  >
                    <ThemedText
                      style={selected ? styles.chipTextActive : styles.chipText}
                    >
                      {item.label}
                    </ThemedText>
                  </Pressable>
                );
              })}
            </View>

            <ThemedText style={styles.label}>Genre *</ThemedText>
            <TextInput
              value={form.genre}
              onChangeText={(value) => updateField("genre", value)}
              placeholder="Ex: Science-fiction"
              placeholderTextColor="rgba(127,127,127,0.8)"
              style={styles.input}
            />

            <ThemedText style={styles.label}>Réalisateur / créateur</ThemedText>
            <TextInput
              value={form.creator}
              onChangeText={(value) => updateField("creator", value)}
              placeholder="Nom du réalisateur ou créateur"
              placeholderTextColor="rgba(127,127,127,0.8)"
              style={styles.input}
            />

            <View style={styles.dualRow}>
              <View style={styles.dualField}>
                <ThemedText style={styles.label}>Année *</ThemedText>
                <TextInput
                  value={form.year}
                  onChangeText={(value) =>
                    updateField("year", value.replace(/[^0-9]/g, ""))
                  }
                  placeholder="2026"
                  keyboardType="number-pad"
                  placeholderTextColor="rgba(127,127,127,0.8)"
                  style={styles.input}
                />
              </View>

              <View style={styles.dualField}>
                <ThemedText style={styles.label}>Note personnelle *</ThemedText>
                <TextInput
                  value={form.rating}
                  onChangeText={(value) =>
                    updateField("rating", value.replace(/[^0-9.]/g, ""))
                  }
                  placeholder="0 - 5"
                  keyboardType="decimal-pad"
                  placeholderTextColor="rgba(127,127,127,0.8)"
                  style={styles.input}
                />
              </View>
            </View>

            <ThemedText style={styles.label}>Commentaire *</ThemedText>
            <TextInput
              value={form.comment}
              onChangeText={(value) => updateField("comment", value)}
              placeholder="Donne ton avis en quelques phrases..."
              placeholderTextColor="rgba(127,127,127,0.8)"
              multiline
              textAlignVertical="top"
              style={[styles.input, styles.textArea]}
            />
            <ThemedText style={styles.counter}>
              {commentLength} / 20 caractères minimum
            </ThemedText>

            <Pressable onPress={handleSubmit} style={styles.submitButton}>
              <ThemedText style={styles.submitText}>
                Envoyer la recommandation
              </ThemedText>
            </Pressable>
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  content: {
    gap: Spacing.three,
    paddingVertical: Spacing.four,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.two,
    backgroundColor: "rgba(0,0,0,0.08)",
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  title: {
    marginTop: Spacing.one,
  },
  subtitle: {
    fontSize: 13,
    opacity: 0.75,
    lineHeight: 18,
  },
  messageBox: {
    padding: Spacing.three,
    borderRadius: Spacing.two,
    borderWidth: 1,
  },
  errorBox: {
    borderColor: "rgba(200,0,0,0.3)",
    backgroundColor: "rgba(200,0,0,0.08)",
  },
  successBox: {
    borderColor: "rgba(0,128,0,0.3)",
    backgroundColor: "rgba(0,128,0,0.08)",
  },
  errorText: {
    fontSize: 13,
    lineHeight: 18,
  },
  successText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
  },
  card: {
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: Spacing.two,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.12)",
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    backgroundColor: "rgba(255,255,255,0.95)",
    fontSize: 14,
  },
  textArea: {
    minHeight: 110,
  },
  row: {
    flexDirection: "row",
    gap: Spacing.two,
    flexWrap: "wrap",
  },
  chip: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.12)",
  },
  chipActive: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  chipText: {
    fontSize: 13,
  },
  chipTextActive: {
    fontSize: 13,
    color: "#fff",
  },
  dualRow: {
    flexDirection: "row",
    gap: Spacing.two,
  },
  dualField: {
    flex: 1,
    gap: Spacing.one,
  },
  counter: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: -Spacing.one,
  },
  submitButton: {
    marginTop: Spacing.one,
    backgroundColor: "#5E5CE6",
    borderRadius: Spacing.two,
    paddingVertical: Spacing.three,
    alignItems: "center",
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
