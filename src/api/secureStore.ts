import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const KEY = "FAKE_API_TOKEN";

// expo-secure-store has no web implementation, so fall back to localStorage there
const isWeb = Platform.OS === "web";

export async function saveToken(value: string): Promise<void> {
  if (isWeb) {
    localStorage.setItem(KEY, value);
    return;
  }
  await SecureStore.setItemAsync(KEY, value);
}

export async function getToken(): Promise<string | undefined> {
  let result = isWeb
    ? localStorage.getItem(KEY)
    : await SecureStore.getItemAsync(KEY);
  if (result) {
    return result;
  }
}
