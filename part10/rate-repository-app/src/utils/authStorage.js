import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
	constructor(namespace = 'auth') {
		this.namespace = namespace;
	}

	async getAccessToken() {
		// Get the access token for the storage

		const accessToken = await AsyncStorage.getItem(
			`${this.namespace}:accessToken`
		);

		return accessToken ? accessToken : '';
	}

	async setAccessToken(accessToken) {
		await AsyncStorage.setItem(
			`${this.namespace}:accessToken`,
			JSON.stringify(accessToken)
		);
	}

	async removeAccessToken() {
		await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
	}
}

// log storage

// AsyncStorage.getAllKeys((err, keys) => {
//   AsyncStorage.multiGet(keys, (error, stores) => {
//     stores.map((result, i, store) => {
//       console.log({ [store[i][0]]: store[i][1] });
//       return true;
//     });
//   });
// });

export default AuthStorage;
