
import * as SecureStore from "expo-secure-store";

const KEY = "FAKE_API_TOKEN";

export async function saveToken(value: string): Promise<void> {
  await SecureStore.setItemAsync(KEY, value);
}

export async function getToken(): Promise<string | undefined> {
  const result = await SecureStore.getItemAsync(KEY);

  if (result) {
    return result;
  }

  return undefined;
}

export async function deleteToken(): Promise<void> {
  await SecureStore.deleteItemAsync(KEY);
}
