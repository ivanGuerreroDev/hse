import { Component } from 'react';
import { RouteProp } from '@react-navigation/native';
import { RootMainStackParamList } from 'types/navigations';

type Props = {
  route: RouteProp<RootMainStackParamList, 'Modal'>
}

export default class Modal extends Component<Props> {
  render() {
    return this.props.route.params;
  }
}
