import React, { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import { Tab, TabItemProps } from 'react-native-elements';

type Props = TabItemProps & {
    app: String,
    title?:
        | string
        | React.ReactElement<
              {},
              | string
              | ((
                    props: any
                ) => React.ReactElement<
                    any,
                    | string
                    | any
                    | (new (props: any) => React.Component<any, any, any>)
                >)
              | (new (props: any) => React.Component<any, any, any>)
          >;
};

export const TabItem: FunctionComponent<Props> = (props: Props) => {
    let CTabItem = Tab.Item;
    CTabItem.defaultProps = props;

    const selectedStyles = props.active ? activeStyles : inactiveStyles;

    return (
        <CTabItem
            containerStyle={[defaultStyles.container, selectedStyles.container, props.app === 'HSE' ? defaultStyles.hseColor : props.app === 'Producción' ? defaultStyles.produccionColor : null]}
            titleStyle={[defaultStyles.title, selectedStyles.title]}
        />
    );
};

const defaultStyles = StyleSheet.create({
    container: {
        backgroundColor: '#cbcbcb',
        borderTopWidth: 0
    },
    hseColor:{
        backgroundColor: '#FDAE01'
    },
    produccionColor: {
        backgroundColor: '#55b25f'
    },
    title: {
        color: 'white',
        fontSize: 14,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0
    }
});

const activeStyles = StyleSheet.create({
    container: {},
    title: {
        opacity: 1
    }
});

const inactiveStyles = StyleSheet.create({
    container: {},
    title: {
        opacity: 0.7
    }
});
