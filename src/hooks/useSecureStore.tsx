import * as SecureStore from 'expo-secure-store'

const useSecureStore = () => {
  async function setItemAsync(key: string, value: string): Promise<void> {
    await SecureStore.setItemAsync(key, value)
  }
  async function getItemAsync(key: string) {
    return await SecureStore.getItemAsync(key)
  }

  async function deleteItemAsync(key: string) {
    return await SecureStore.deleteItemAsync(key)
  }

  return { setItemAsync, getItemAsync, deleteItemAsync }
}

export default useSecureStore
