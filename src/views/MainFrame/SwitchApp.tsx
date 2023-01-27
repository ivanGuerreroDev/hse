import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	Pressable
} from 'react-native';
import { Icon } from 'react-native-elements';

type Props = {
	navigation: {
		navigate: any;
		push: any;
		popToTop: any;
		canGoBack: any
	};
};

class SwitchApp extends Component<Props> {
	render() {
		const { navigation } = this.props;
		if(navigation.canGoBack()){
			navigation.popToTop()
		}
		
		return (
			<View style={styles.container}>
				<Pressable onPress={() => navigation.navigate('MainFrame')}>
					<View style={[styles.containerAppBox, { backgroundColor: '#fdae01' }]}>
						<Image
							source={require('components/Assets/DownMenu/hse-iso.png')}
							style={styles.icon}
							resizeMode="contain"
						/>
						<Text style={styles.text}>hse</Text>
					</View>
				</Pressable>
				<Pressable onPress={() => navigation.navigate('Produccion')}>
					<View style={[styles.containerAppBox, { backgroundColor: '#55b25f' }]}>
						<Icon size={50} style={styles.icon} type="metarial" name="settings" color={'#fff'} />
						<Text style={[styles.text, { fontSize: 30 }]}>Producción</Text>
					</View>
				</Pressable>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},
	containerAppBox: {
		height: 150,
		width: 300,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 30,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.53,
		shadowRadius: 2.62,
		elevation: 4,
	},
	icon: {
		width: 50,
		height: 50,
		marginRight: 10
	},
	text: {
		fontSize: 40,
		fontWeight: 'bold',
		color: '#FFF'
	}
});

export default SwitchApp;
