import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Button, Text } from "react-native";
import { Header, Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignatureScreen from "react-native-signature-canvas";
import {connect} from 'react-redux';
import {RootState} from 'state/store/store';

interface Props {
  controlBridge: any;
  onCancel: any;
  onSuccess: any;
  resources: any;
}

const SignComponent = (props: Props) => {
  const {
    controlBridge,
    onCancel,
    onSuccess,
    resources
  } = props;

  const ref = useRef();

  const handleOK = (signature: any) => {
    console.log(signature);
    onSuccess(signature);
  };
  const handleConfirm = () => {
    console.log("end");
    ref?.current?.readSignature();
  };

  const handleClear = () => {
    ref?.current?.clearSignature();
  };

  const style = `.m-signature-pad--footer {display: none; margin: 0px;}`;

  useEffect(()=>{
    console.log("@@ element ", controlBridge.factory.Documento)
    controlBridge.factory.Documento.resources.forEach(element => {
      console.log("@@ element ", element)
    });
  },[])

  return (
    <SafeAreaView style={{backgroundColor: 'fff', flex: 1}}>
      <Header
        backgroundColor='#FDAE01'
        containerStyle={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
        centerComponent={{ text: controlBridge.OutputValue?.trabajador, style: { color: '#fff', fontSize: 22 } }}
      />
      <View style={styles.container}>
        <View style={styles.row}>
          <View>
            <Text>Nota: <Text style={styles.bold}>5,0</Text></Text>
          </View>
          <View>
            <Text>Procentaje: <Text style={styles.bold}>100%</Text></Text>
          </View>
        </View>
        <Text>Estoy de acuerdo con la evaluación y firmo conforme:</Text>
        <SignatureScreen ref={ref} onOK={handleOK} webStyle={style}/>
        <View>
          <Button title="BORRAR TODO" onPress={handleClear} />
          <Button title="GUARDAR" onPress={handleConfirm} />
        </View>
    </View>

    </SafeAreaView>
  )
}
const mapStateToProps = (state: RootState) => {
  return {
    resources: state.resources.resources,
  };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(SignComponent);

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
  },
  bold:{
    fontWeight: "bold"
  }
});
