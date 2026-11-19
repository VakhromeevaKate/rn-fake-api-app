
const KEY = "FAKE_API_TOKEN";

export async function saveToken(value: string): Promise<void> {
  localStorage.setItem(KEY, value);
}

export async function getToken(): Promise<string | undefined> {
  return localStorage.getItem(KEY) ?? undefined;
}

export async function deleteToken(): Promise<void> {
  localStorage.removeItem(KEY);
}
