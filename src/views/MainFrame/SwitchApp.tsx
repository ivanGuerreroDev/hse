import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	Pressable
} from 'react-native';
import { Icon } from 'react-native-elements';

import { connect } from 'react-redux';
import { RootState } from 'state/store/store';
import { IMenu } from 'utils/types/menu';

type Props = {
	navigation: {
		navigate: any;
		push: any;
		popToTop: any;
		canGoBack: any
	};
	menu: IMenu[] | any[];
	from: String;
};

class SwitchApp extends Component<Props> {
	state = {
		hasHSE: this.props?.menu?.[0]?.filter((menu: any) => menu?.Sistema === 'HSE')?.length > 0,
		hasProduccion: this.props?.menu?.[0]?.filter((menu: any) => menu?.Sistema === 'Producción')?.length > 0
	};
	constructor(props: Props) {
		super(props);
	}
	componentDidMount(): void {
		if (this.state.hasHSE && !this.state.hasProduccion) {
			this.props.navigation.navigate('MainFrame')
		}
		if (!this.state.hasHSE && this.state.hasProduccion) {
			this.props.navigation.navigate('Produccion')
		}
		if(this.props.from === 'HSE'){this.props.navigation.navigate('Produccion')}
		if(this.props.from === 'Producción'){this.props.navigation.navigate('MainFrame')}
	}

	render() {
		const { navigation } = this.props;
		if (navigation.canGoBack()) {
			navigation.popToTop()
		}

		return (
			<View style={styles.container}>
				{
					this.state.hasHSE && (
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
					)
				}
				{
					this.state.hasProduccion && (
						<Pressable onPress={() => navigation.navigate('Produccion')}>
							<View style={[styles.containerAppBox, { backgroundColor: '#55b25f' }]}>
								<Icon size={50} style={styles.icon} type="metarial" name="settings" color={'#fff'} />
								<Text style={[styles.text, { fontSize: 30 }]}>Producción</Text>
							</View>
						</Pressable>
					)
				}

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		backgroundColor: '#fff'
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

const mapStateToProps = (state: RootState) => {
	return {
		menu: state.menus.menus
	};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SwitchApp);
