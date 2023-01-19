import React, { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import { Tab, TabItemProps } from 'react-native-elements';

type Props = TabItemProps & {
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
            containerStyle={[defaultStyles.container, selectedStyles.container]}
            titleStyle={[defaultStyles.title, selectedStyles.title]}
        />
    );
};

const defaultStyles = StyleSheet.create({
    container: {
        backgroundColor: '#FDAE01',
        borderTopWidth: 0
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
