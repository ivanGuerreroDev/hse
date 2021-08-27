import React, {Component} from 'react';
import {Button, View} from 'react-native';
import {connect} from 'react-redux';
import {RootState} from 'state/store/store';
import {DocumentoFactory} from 'utils/formulariodinamico/DocumentoFactory';
import {IDocumento, IFormulario} from 'utils/types/formulariodinamico';
import {
  CompositeNavigationProp,
  NavigationProp,
} from '@react-navigation/native';
import {
  MainFrameStackParamList,
  RootMainStackParamList,
} from 'utils/types/navigations';

import Layout from 'views/MainFrame/layaut';

type Props = {
  formularios: IFormulario[];
  documentos: IDocumento[];
  navigation: CompositeNavigationProp<
    NavigationProp<MainFrameStackParamList, 'Documents'>,
    NavigationProp<RootMainStackParamList>
  >;
};

class Notifications extends Component<Props> {
  render() {
    return (
      <Layout>
        <View>
          {this.props.formularios.map((formulario, index) => (
            <Button
              key={index * 2}
              title={formulario.title}
              onPress={() => {
                this.props.navigation.navigate('FormularioDinamico', {
                  documento: DocumentoFactory.createFromFormulario(formulario),
                });
              }}
            />
          ))}
          {this.props.documentos?.map((documento, index) => (
            <Button
              key={index * 2 + 1}
              color="red"
              title={documento.title}
              onPress={() => {
                this.props.navigation.navigate('FormularioDinamico', {
                  documento: documento,
                });
              }}
            />
          ))}
        </View>
      </Layout>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    formularios: state.formularios.formularios,
    documentos: state.documentos.documentos,
  };
};

export default connect(mapStateToProps, null)(Notifications);
