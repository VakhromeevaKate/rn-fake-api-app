
import * as ScreenCapture from "expo-screen-capture";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { saveToken } from "@/api/secureStore";
import { ThemedText } from "@/components/themed-text";

type AuthScreenProps = {
  onLogin: () => void;
};

const TEST_LOGIN = "student";
const TEST_PASSWORD = "student123";

export default function AuthScreen({ onLogin }: AuthScreenProps) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Защита от скриншотов на мобильных устройствах.
  // В браузере защита не включается.
  useEffect(() => {
    if (Platform.OS === "web") {
      return;
    }

    let isActive = true;

    const enableProtection = async () => {
      try {
        if (isActive) {
          await ScreenCapture.preventScreenCaptureAsync();
        }
      } catch (error) {
        console.warn("Ошибка защиты экрана:", error);
      }
    };

    enableProtection();

    return () => {
      isActive = false;

      ScreenCapture.allowScreenCaptureAsync().catch(() => {});
    };
  }, []);

  // Проверка логина и пароля.
  const handleLogin = async () => {
    setError("");

    if (!login.trim() || !password) {
      setError("Заполните логин и пароль");
      return;
    }

    if (
      login.trim().toLowerCase() !== TEST_LOGIN ||
      password !== TEST_PASSWORD
    ) {
      setError("Неверный логин или пароль");
      return;
    }

    try {
      setIsLoading(true);

      console.log("1. Проверка данных пройдена");

      await saveToken("fake-auth-token");

      console.log("2. Токен успешно сохранён");

      onLogin();

      console.log("3. Авторизация завершена");
    } catch (err) {
      console.error("Ошибка авторизации:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Не удалось выполнить вход"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.logo}>
              <ThemedText style={styles.logoText}>+</ThemedText>
            </View>

            <ThemedText style={styles.title}>
              Добро пожаловать
            </ThemedText>

            <ThemedText style={styles.subtitle}>
              Войдите в аккаунт, чтобы продолжить
            </ThemedText>
          </View>

          <View style={styles.form}>
            <ThemedText style={styles.label}>
              Логин
            </ThemedText>

            <TextInput
              style={styles.input}
              value={login}
              onChangeText={setLogin}
              placeholder="Введите логин"
              placeholderTextColor="#999999"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
            />

            <ThemedText style={styles.label}>
              Пароль
            </ThemedText>

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                placeholder="Введите пароль"
                placeholderTextColor="#999999"
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
                onSubmitEditing={handleLogin}
                returnKeyType="done"
              />

              <Pressable
                onPress={() =>
                  setIsPasswordVisible(!isPasswordVisible)
                }
                style={styles.showPasswordButton}
              >
                <ThemedText style={styles.showPasswordText}>
                  {isPasswordVisible ? "Скрыть" : "Показать"}
                </ThemedText>
              </Pressable>
            </View>

            {error ? (
              <ThemedText style={styles.error}>
                {error}
              </ThemedText>
            ) : null}

            <Pressable
              style={({ pressed }) => [
                styles.loginButton,
                pressed && styles.loginButtonPressed,
                isLoading && styles.disabledButton,
              ]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <ThemedText style={styles.loginButtonText}>
                  Войти
                </ThemedText>
              )}
            </Pressable>
          </View>

          <ThemedText style={styles.footer}>
            Для тестового входа используйте данные,
            указанные в задании.
          </ThemedText>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },
  keyboard: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "600",
    lineHeight: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#172033",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#718096",
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#263247",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    height: 54,
    borderWidth: 1,
    borderColor: "#DCE2EA",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#172033",
    backgroundColor: "#FFFFFF",
  },
  passwordContainer: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DCE2EA",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },
  passwordInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#172033",
  },
  showPasswordButton: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  showPasswordText: {
    color: "#2563EB",
    fontSize: 13,
    fontWeight: "600",
  },
  error: {
    color: "#DC2626",
    fontSize: 13,
    marginTop: 12,
  },
  loginButton: {
    height: 54,
    backgroundColor: "#2563EB",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
  },
  loginButtonPressed: {
    opacity: 0.8,
  },
  disabledButton: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  footer: {
    textAlign: "center",
    color: "#8A94A6",
    fontSize: 12,
    marginTop: 28,
    lineHeight: 18,
  },
});
