import { Platform } from "react-native";
const theme = {
	colors: {
		textPrimary: '#24292e',
		textSecondary: '#586069',
		primary: '#0366d6',
		transparent: 'rgba(80, 80, 80, 0.15)',
		transparentMenu: 'rgba(80, 80, 180, 0.15)',
    textWhite: '#ffffff',
		error: '#d73a4a'
	},
	fontSizes: {
		body: 14,
		subheading: 16,
	},
	fonts: {
		main: Platform.OS === 'android' ? 'Roboto' : Platform.OS === 'ios' ? 'Arial' : 'System'
	},
	fontWeights: {
		normal: '400',
		bold: '700',
	},
	padding: {
		paddingSmall: 10,
	},

};

export default theme;
