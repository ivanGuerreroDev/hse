import { isElement } from 'lodash';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text } from "react-native";
import { Header, Icon, Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignatureScreen from "react-native-signature-canvas";
import {connect} from 'react-redux';
import {RootState} from 'state/store/store';

interface Props {
  controlBridge: any;
  onCancel: any;
  onSuccess: any;
}

const SignComponent = (props: Props) => {
  const {
    controlBridge,
    onCancel,
    onSuccess,
  } = props;

  const ref = useRef();
  const [puntaje, setPuntaje] = useState([])

  const handleOK = (signature: any) => {
    onSuccess(signature);
  };
  const handleConfirm = () => {
    ref?.current?.readSignature();
  };

  const handleClear = () => {
    ref?.current?.clearSignature();
  };

  const style = `.m-signature-pad--footer {display: none; margin: 0px;}`;

  useEffect(()=>{
    controlBridge?.factory?.documento?.pages?.forEach(page=>{
      page?.controls?.forEach(control=>{
        if(control?.outputValue && typeof control?.outputValue === 'string'){
          const hasNota = control?.outputValue?.includes('Nota:')
          if(hasNota){
            setPuntaje(control.outputValue.split('\n'))
          }
        }
      })
    })
  },[])

  return (
    <SafeAreaView style={{backgroundColor: 'fff', flex: 1}}>
      <Header
        backgroundColor='#FDAE01'
        containerStyle={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
        leftComponent={
          <Icon type='material' name='close' color='white'
            onPress={() => onCancel()}/>
        }
        centerComponent={{ text: controlBridge?.getDataValueCode(), style: { color: '#fff', fontSize: 22 } }}
      />
      <View style={styles.container}>
        <View style={styles.row}>
          <View>
            <Text style={styles.puntajeLabel}>Nota: <Text style={[styles.bold, styles.puntajeText]}>{parseFloat(puntaje?.[0]?.split(':')?.[1])?.toFixed(1)?.replace('.',',')||''}</Text></Text>
          </View>
          <View>
            <Text style={styles.puntajeLabel}>Porcentaje: <Text style={[styles.bold, styles.puntajeText]}>{puntaje?.[1]?.split(':')?.[1]||''}</Text></Text>
          </View>
        </View>
        <Text>Estoy de acuerdo con la evaluación y firmo conforme:</Text>
        <SignatureScreen ref={ref} onOK={handleOK} webStyle={style} backgroundColor='rgba(255,255,255,1)'/>
        <View style={styles.buttons}>
          <Button title="BORRAR TODO" onPress={handleClear} buttonStyle={styles.buttonDelete} titleStyle={{color:'#FDAE01'}}/>
          <Button
            title="GUARDAR"
            onPress={handleConfirm}
            buttonStyle={styles.buttonSave}
            titleStyle={{color:'#fff'}}
            icon={
              <Icon
                name="save"
                size={20}
                color="white"
              />
            }
          />
        </View>
    </View>

    </SafeAreaView>
  )
}
const mapStateToProps = (state: RootState) => {
  return {
    resources: state.resources.resources,
    documentos: state.documentos.documentos,
  };
};
export default SignComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 250,
    padding: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 15
  },
  bold:{
    fontWeight: "bold"
  },
  puntajeLabel: {
    fontSize: 22
  },
  puntajeText:{
    fontSize: 26
  },
  buttons:{
    width: '100%'
  },
  buttonDelete:{
    width: '100%',
    backgroundColor: 'transparent',
    marginBottom: 20
  },
  buttonSave:{
    width: '100%',
    flexDirection:'column',
    backgroundColor: '#FDAE01'
  }
});
