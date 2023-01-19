import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainFrameStackParamList } from 'utils/types/navigations';

import { connect } from 'react-redux';
import { RootState } from 'state/store/store';
import { IMenu } from 'utils/types/menu';

import Layout from 'views/MainFrame/layaut';
/* import Config from 'react-native-config'; */
import { FadeInImage } from 'components/FadeImage/FadeInImage';

type Props = {
    navigation: StackNavigationProp<MainFrameStackParamList>;
    menu: IMenu[] | any[];
};
class Menu extends Component<Props> {
    render() {
        return (
            <Layout>
                <View style={styles.container}>
                    <FlatList
                        style={styles.list}
                        numColumns={2}
                        keyExtractor={(item) => item.Id}
                        data={this.props.menu[0]}
                        renderItem={({ item }) => {
                            const iconmenu =
                                item.NombreMenu === 'Observaciones'
                                    ? require('components/Assets/Menu/observaciones.png')
                                    : item.NombreMenu === 'Inspecciones'
                                    ? require('components/Assets/Menu/inspecciones.png')
                                    : item.NombreMenu === 'Capacitaciones'
                                    ? require('components/Assets/Menu/capacitaciones.png')
                                    : '';

                            let tintColor;
                            let opacity = 1;
                            if (!item.Estado) {
                                tintColor = '#808080';
                                opacity = 0.7;
                            }
                            return (
                                <TouchableOpacity
                                    style={{ ...styles.card, opacity }}
                                    onPress={() => {
                                        item.Estado &&
                                            this.props.navigation.navigate(
                                                'SubMenu',
                                                {
                                                    titulo: item.NombreMenu
                                                }
                                            );
                                    }}
                                >
                                    <View style={styles.cardHeader} />

                                    <FadeInImage
                                        uri={iconmenu}
                                        image={{
                                            ...styles.cardImage,
                                            tintColor
                                        }}
                                    />

                                    <View style={styles.cardFooter}>
                                        <View style={styles.aling}>
                                            <Text style={{ ...styles.text }}>
                                                {item.NombreMenu}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
            </Layout>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        menu: state.menus.menus
    };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginHorizontal: 1
    },
    list: {
        alignSelf: 'center'
    },
    card: {
        backgroundColor: '#FFFFFF',
        flexBasis: '42%',
        marginVertical: 5,
        marginHorizontal: 5,
        borderRadius: 5,
        width: 260,
        height: 160
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 15,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1
    },
    cardImage: {
        height: 70,
        width: 70,
        alignSelf: 'center'
    },
    cardFooter: {
        paddingTop: 20,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1
    },
    text: {
        fontSize: 15,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        fontFamily: 'PTSans-Bold',
        fontWeight: 'bold',
        color: '#808080'
    },
    aling: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});
