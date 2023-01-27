import React from 'react';
import ControlComponent, { Props } from '../ControlComponent';
import { Modal, ScrollView, View,Platform, Alert, ToastAndroid } from 'react-native';
import { Input, Text } from 'react-native-elements';
import { capitalize } from 'utils';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { RootState } from 'state/store/store';

class TextControl extends ControlComponent {
    state = {
        filter: '',
        onEdit: false,
        color: '',
        cargo: '',
        isReceptor: false,
        errorMessage: ''
    };

    constructor(props: Props) {
        super(props);
        const {controlBridge} = props;
        props.controlBridge.OutputValue = props.controlBridge.property('data')
            ? props.controlBridge.property('data')
            : props.controlBridge.OutputValue;
        
        this.state.isReceptor = controlBridge?.Control?.keywords? controlBridge?.Control?.keywords.filter(e => e?.value === 'contador_estanque').length > 0 : false
    }
    /**
     * controla la renderizacion del componente al traer la propiedad data
     * @returns bolean
     */
    shouldComponentUpdate() {
        const { controlBridge } = this.props;

        if (controlBridge.property('data')) {
            if (controlBridge.OutputValue !== controlBridge.property('data')) {
                controlBridge.OutputValue = controlBridge.property('data');
                return true;
            }
            return false;
        }
        return true;
    }

    validateMaxReceptor () {
        const {controlBridge, contadorUC} = this.props;
        const selectedUC = controlBridge?.factory?.bridgeList?.[0]?.control?.controls?.find(control=>control?.keywords?.filter(e=>e?.value === 'receptor')?.length > 0)?.outputValue
        if(!selectedUC || selectedUC === ''){
            if (Platform.OS === 'ios') {
                Alert.alert('Es necesario seleccionar unidad de consumo.');
            } else {
                ToastAndroid.show(
                    'Es necesario seleccionar unidad de consumo.',
                    ToastAndroid.LONG
                );
            }
            controlBridge.OutputValue = ''
        }else{
            const lastUCData = contadorUC.find((contador: any)=>contador.UnidadConsumo===selectedUC)
            const isNew = lastUCData.UltimoRegistro === 0
            let newData = controlBridge.property('data')
                ? controlBridge.property('data')
                : controlBridge.OutputValue;
            let valid = true;
            if(!isNew){
                valid = lastUCData.UltimoRegistro < newData && newData <= (lastUCData.UltimoRegistro + lastUCData.HoraDistanciaMaxima);
            }   
            if(!valid){
                this.setState({
                    errorMessage: 'Número ingresado es incorrecto'
                })
                controlBridge.OutputValue = ''
            }else{
                this.setState({
                    errorMessage: ''
                })
            }
        }
    }

    render() {
        const { controlBridge, scrollRef } = this.props;
        let autoCompleteList: JSX.Element[] = (
            (controlBridge.property('autocomplete') || []) as Array<string>
        )
            .filter((item) =>
                item
                    .toLowerCase()
                    .includes(
                        (
                            (controlBridge.OutputValue as string) || ''
                        ).toLowerCase()
                    )
            )
            .map((item, index) => {
                const regexpResult =
                    RegExp(
                        `^(.*)(${(
                            (controlBridge.OutputValue as string) || ''
                        ).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})(.*)$`,
                        'i'
                    ).exec(capitalize(item, 3)) || [];
                return (
                    <View key={index} style={{ backgroundColor: '#fff' }}>
                        <Text
                            key={index}
                            style={{
                                paddingHorizontal: 10,
                                paddingVertical: 8
                            }}
                            onPress={() => {
                                controlBridge.OutputValue = item;
                                this.setState({ modalVisible: false });
                                this.setState({ onEdit: false });
                            }}
                        >
                            <Text>{regexpResult[1]}</Text>
                            <Text style={{ fontWeight: 'bold' }}>
                                {regexpResult[2]}
                            </Text>
                            <Text>{regexpResult[3]}</Text>
                        </Text>
                    </View>
                );
            });

        let errorMessage: string =
            this.state.errorMessage === '' ? controlBridge.property('validate') &&
            controlBridge.OutputValue !== undefined
                ? controlBridge.validateOutputValue() || ''
                : ''
            : this.state.errorMessage;

        const errorHeight: number = errorMessage && !this.state.onEdit ? 15 : 0;

        let newData = controlBridge.property('data')
            ? controlBridge.property('data')
            : controlBridge.OutputValue;
        const isReceptor = this.state.isReceptor
        return !controlBridge.property('autocomplete') ? (
            <View style={{ paddingBottom: 25 - errorHeight }}>
                <Input
                    label={controlBridge.property('title')}
                    keyboardType={this.props.app === 'Producción' && isReceptor ? "numeric" : 'default'}
                    placeholder={controlBridge.property('placeholder')}
                    errorMessage={errorMessage}
                    onChangeText={(value) => {
                        (controlBridge.OutputValue = value),
                            this.setState({ onEdit: true });
                    }}
                    value={newData}
                    onBlur={() => {
                        this.setState({ onEdit: false });
                        if(isReceptor){
                            this.validateMaxReceptor()
                        }
                    }}
                    inputContainerStyle={{
                        borderColor: '#0000001F',
                        borderBottomWidth: 1
                    }}
                    labelStyle={{
                        fontSize: 13,
                        color: '#00000099',
                        opacity: 1,
                        fontFamily: 'Roboto-Regular'
                    }}
                    inputStyle={{
                        paddingVertical: 5,
                        fontSize: 15,
                        fontFamily: 'Roboto-Medium',
                        backgroundColor: controlBridge.property('color'),
                        borderRadius: 5
                    }}
                    errorStyle={{
                        paddingTop: 0,
                        marginTop: 1,
                        marginBottom: '2%',
                        height: errorHeight
                    }}
                    placeholderTextColor="#00000061"
                    editable={
                        !controlBridge.property('editable')
                            ? false
                            : !controlBridge.ReadOnly
                    }
                />
            </View>
        ) : (
            <View>
                <Input
                    label={controlBridge.property('title')}
                    placeholder={controlBridge.property('placeholder')}
                    errorMessage={
                        errorMessage ? '- Este campo es requerido' : ''
                    }
                    onChangeText={(value) => {
                        (controlBridge.OutputValue = value),
                            this.setState({ onEdit: true }),
                            this.setState({ modalVisible: true });
                        if (scrollRef !== null) {
                            scrollRef.scrollToEnd({ animated: true });
                        }
                    }}
                    value={newData}
                    onBlur={() => {
                        this.setState({ onEdit: false });

                        if (
                            controlBridge
                                .property('autocomplete')
                                ?.filter(
                                    (x: string) =>
                                        x === controlBridge.OutputValue
                                ).length == 0
                        ) {
                            controlBridge.OutputValue = '';
                        }
                    }}
                    inputContainerStyle={{
                        borderColor: '#0000001F',
                        borderBottomWidth: 1
                    }}
                    labelStyle={{
                        fontSize: 13,
                        color: '#00000099',
                        opacity: 1,
                        fontFamily: 'Roboto-Regular'
                    }}
                    inputStyle={{
                        paddingVertical: 5,
                        fontSize: 15,
                        fontFamily: 'Roboto-Medium',
                        backgroundColor: controlBridge.property('color'),
                        borderRadius: 5
                    }}
                    errorStyle={{
                        paddingTop: 0,
                        marginTop: 1,
                        marginBottom: '2%',
                        height: errorHeight
                    }}
                    placeholderTextColor="#00000061"
                    editable={
                        !controlBridge.property('editable')
                            ? false
                            : !controlBridge.ReadOnly
                    }
                />
                {/* Visor del autocomplete */}
                <View
                    style={{
                        backgroundColor: '#ffffff',
                        position: scrollRef === null ? 'absolute' : 'relative',
                        top: scrollRef === null ? 60 : 0,
                        width: '100%',
                        zIndex: 99,
                        elevation: 99
                    }}
                >
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        nestedScrollEnabled={true}
                        style={{
                            width: '100%',
                            maxHeight: this.state.onEdit ? 200 : 0
                        }}
                    >
                        {autoCompleteList}
                    </ScrollView>
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state: RootState) => {
    return {
        combustibles: state.combustibles.combustibles,
        contadorUC: state.combustibles.contadorUC
    };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(TextControl);


const styles = StyleSheet.create({
    dropdown: {
        // margin: 16,
        marginHorizontal: 13,
        height: 40,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5
    },
    icon: {
        marginRight: 5
    },
    placeholderStyle: {
        fontSize: 13
    },
    selectedTextStyle: {
        marginLeft: 5,
        fontSize: 15,
        fontFamily: 'Roboto-Medium'
    },
    iconStyle: {
        width: 20,
        height: 20
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16
    }
});
 