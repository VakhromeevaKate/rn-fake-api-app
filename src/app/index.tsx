import { useEffect, useState } from "react";
import { Platform, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getUsers, type User } from "@/api/users";
import { getProducts, type Product } from "@/api/products";
import { HintRow } from "@/components/hint-row";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { WebBadge } from "@/components/web-badge";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";

export default function HomeScreen() {
  const [users, setUsers] = useState<Array<User>>([]);
  const [products, setProducts] = useState<Array<Product>>([]);

  useEffect(() => {
    getUsers().then((users) => {
      if (users.data) {
        setUsers(users.data);
      }
    });
    getProducts().then((products) => {
      if (products.data) {
        setProducts(products.data);
      }
    });
  }, []);

  const renderUser = (user: User) => {
    return (
      <HintRow
        key={user.id}
        title={user.firstName}
        hint={<ThemedText type="code">{user.email}</ThemedText>}
      />
    );
  };

  const renderProduct = (product: Product) => {
    return (
      <HintRow
        key={product.id}
        title={product.name}
        hint={<ThemedText type="code">{product.price}</ThemedText>}
      />
    );
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <ThemedText type="title" style={styles.title}>
            Список&nbsp;пользователей
          </ThemedText>
        </ThemedView>

        <ThemedText type="code" style={styles.code}>
          get started
        </ThemedText>

        <ScrollView>
          <ThemedView type="backgroundElement" style={styles.stepContainer}>
            {users.map((user) => renderUser(user))}
          </ThemedView>
        </ScrollView>

        <ThemedView style={styles.heroSection}>
          <ThemedText type="title" style={styles.title}>
            Список&nbsp;продуктов
          </ThemedText>
        </ThemedView>

        <ScrollView>
          <ThemedView type="backgroundElement" style={styles.stepContainer}>
            {products.map((product) => renderProduct(product))}
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
});
