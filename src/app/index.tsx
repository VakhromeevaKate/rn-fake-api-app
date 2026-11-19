
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  deleteToken,
  getToken,
} from "@/api/secureStore";
import { getUsers, type User } from "@/api/users";

import AuthScreen from "@/components/auth-screen";
import { HintRow } from "@/components/hint-row";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { WebBadge } from "@/components/web-badge";
import {
  BottomTabInset,
  MaxContentWidth,
  Spacing,
} from "@/constants/theme";

export default function HomeScreen() {
  const [users, setUsers] = useState<Array<User>>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getToken();
        setIsAuthenticated(Boolean(token));
      } catch (error) {
        console.error("Ошибка проверки авторизации:", error);
        setIsAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const loadUsers = async () => {
      try {
        const response = await getUsers();

        if (response.data) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error("Ошибка загрузки пользователей:", error);
      }
    };

    loadUsers();
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      await deleteToken();
      setUsers([]);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Ошибка выхода:", error);
    }
  };

  const renderUser = (user: User) => {
    return (
      <HintRow
        key={user.id}
        title={user.firstName}
        hint={
          <ThemedText type="code">
            {user.email}
          </ThemedText>
        }
      />
    );
  };

  if (isCheckingAuth) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <AuthScreen
        onLogin={() => setIsAuthenticated(true)}
      />
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <ThemedText type="title" style={styles.title}>
            Список пользователей
          </ThemedText>

          <Pressable
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <ThemedText style={styles.logoutText}>
              Выйти
            </ThemedText>
          </Pressable>
        </ThemedView>

        <ThemedText type="code" style={styles.code}>
          get started
        </ThemedText>

        <ScrollView style={styles.scrollView}>
          <ThemedView
            type="backgroundElement"
            style={styles.stepContainer}
          >
            {users.map((user) => renderUser(user))}
          </ThemedView>
        </ScrollView>

        {Platform.OS === "web" && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: "center",
  },
  code: {
    textTransform: "uppercase",
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
  scrollView: {
    width: "100%",
  },
  logoutButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#2563EB",
  },
  logoutText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
