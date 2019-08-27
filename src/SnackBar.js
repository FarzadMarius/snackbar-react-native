import React from 'react';
import {View,StyleSheet,Animated,TouchableOpacity,Text,Image} from 'react-native';
import PropTypes from 'prop-types';

const SnackHeight = 50;

export default class SnackBar extends React.PureComponent{

    constructor(props){
        super(props);

        this.state = {
            isHideSnack : true,
            showSnack  : new Animated.Value(SnackHeight),
        }

    }

    static SnackBarType = {
        INFO    : 0,
        ERROR   : 1,
        WARNING : 2,
        SUCCESS : 3
    };

    showSnackPanel(){

        if (!this.state.isHideSnack)
            return;

        Animated.timing(this.state.showSnack,{
            duration : this.props.showAnimDuration,
            toValue : 0,
            useNativeDriver : true
        }).start( () => {

            this.props.onChangeVisible(true);

            this.setState({ isHideSnack : false });

            if (this.props.autoHide)
                this.timeout = setTimeout(this.hideSnackPanel.bind(this),this.props.duration * 1000);

        });
    }

    hideSnackPanel(){

        if (this.state.isHideSnack)
            return;

        clearTimeout(this.timeout);

        Animated.timing(this.state.showSnack,{
            duration : this.props.hideAnimDuration,
            toValue : SnackHeight,
            useNativeDriver : true
        }).start( () => {
            this.props.onChangeVisible(false);
            this.setState({ isHideSnack : true })
        });

    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (this.props.visible)
            this.showSnackPanel();
        else
            this.hideSnackPanel();
    }

    render() {

        return (

            <Animated.View
                style={[Styles.Container,{
                    zIndex: 500,
                    transform: [
                        { translateY : this.state.showSnack }
                    ]
                }]}>

                {this.renderElements()}

            </Animated.View>

        );
    }

    renderElements() {

        if (this.props.children !== undefined)
            return this.props.children;
        else {

            return (

                <View
                    style={[Styles.ChildView,{
                        backgroundColor : this.getSnackBackground()
                    }]}>

                    {this.renderButtonElement()}

                    <View
                        style={[Styles.ContentStyle,{
                            flex : this.props.imageVisible ? .6 : .7
                        }]}>

                        <Text
                            style={[Styles.TextStyle,this.props.messageTextStyle]}>
                            {this.props.messageText}
                        </Text>

                    </View>

                    {this.renderImageElement()}

                </View>

            );

        }

    }

    getSnackBackground() {

        switch (this.props.snackBarType) {
            case SnackBar.SnackBarType.INFO    : return 'transparent';break;
            case SnackBar.SnackBarType.SUCCESS : return '#30B140'    ;break;
            case SnackBar.SnackBarType.ERROR   : return '#C60329'    ;break;
            case SnackBar.SnackBarType.WARNING : return '#C78630'    ;break;
        }

    }

    renderButtonElement() {

        if (this.props.renderButton !== null)
            return this.props.renderButton();
        else
            return (
                <TouchableOpacity
                    style={[Styles.ButtonStyle,this.props.buttonStyle]}
                    onPress={this.onButtonPress.bind(this)}>

                    <Text
                        style={[Styles.TextStyle,this.props.buttonTextStyle]}>
                        {this.props.buttonText}
                    </Text>

                </TouchableOpacity>
            );

    }

    renderImageElement() {

        if (!this.props.imageVisible)
            return null;
        else
            return (

                <View
                    style={Styles.ImageViewStyle}>

                    <Image
                        style={Styles.ImageStyle}
                        resizeMode={this.props.resizeMode}
                        source={this.props.source}
                    />

                </View>

            );
    }

    onButtonPress(){

        if (this.props.onPress !== null)
            this.props.onPress();

        this.hideSnackPanel();

    }
}

SnackBar.propsTypes = {
    visible          : PropTypes.bool.isRequired,
    duration         : PropTypes.number,
    autoHide         : PropTypes.bool,
    onChangeVisible  : PropTypes.func.isRequired,
    snackBarType     : PropTypes.number,
    useNativeDriver  : PropTypes.bool,
    buttonVisible    : PropTypes.bool,
    buttonStyle      : PropTypes.object,
    renderButton     : PropTypes.func,
    buttonText       : PropTypes.string.isRequired,
    buttonTextStyle  : PropTypes.object,
    messageText      : PropTypes.string.isRequired,
    messageTextStyle : PropTypes.object,
    showAnimDuration : PropTypes.number,
    hideAnimDuration : PropTypes.number,
    imageVisible     : PropTypes.bool,
    source           : PropTypes.object,
    resizeMode       : PropTypes.oneOf(['cover' , 'contain' , 'stretch' , 'repeat' , 'center']),
    onPress          : PropTypes.func
};

SnackBar.defaultProps = {
    visible          : false,
    duration         : 3,
    autoHide         : true,
    snackBarType     : SnackBar.SnackBarType.INFO,
    useNativeDriver  : true,
    buttonVisible    : true,
    buttonStyle      : null,
    renderButton     : null,
    buttonTextStyle  : null,
    messageTextStyle : null,
    showAnimDuration : 200,
    hideAnimDuration : 200,
    imageVisible     : false,
    source           : null,
    resizeMode       : 'stretch',
    onPress          : null
};

const Styles = StyleSheet.create({

    Container : {
        width : '100%',
        height : SnackHeight,
        backgroundColor : 'rgba(0,0,0,.8)',
        position : 'absolute',
        bottom : 0
    },
    ChildView : {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        alignItems : 'center',
        flexDirection : 'row'
    },
    ButtonStyle : {
        flex : .2,
        height : 40,
        justifyContent: 'center',
        alignItems : 'center'
    },
    TextStyle : {
        fontSize : 12,
        color : 'white'
    },
    ContentStyle : {
        height : 40,
        alignItems : 'flex-end',
        justifyContent: 'center'
    },
    ImageViewStyle : {
        flex : .2,
        height : '100%',
        justifyContent : 'center',
        alignItems : 'center'
    },
    ImageStyle : {
        width : 40,
        height : 40
    }


});