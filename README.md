# React Native Snack Bar component.

Material Design "Snack Bar" component for Android and iOS.

![demo](https://user-images.githubusercontent.com/20282558/63748265-45afc780-c8be-11e9-9e29-b59936f41418.gif)


Snackbars are used for displaying a brief message to the user, along with an optional action.
<br/> 
They animate up from the bottom of the screen and then disappear shortly afterward.
<br/>


| Props                  | Required      | Default Value |
| -------------          | ------------- | ------------- |                                                      
| **children**           | No            |               |
| **visible**            | Yes           | false         |
| **duration**           | No            | 3             |
| **autoHide**           | No            | true          |
| **snackBarType**       | No            | INFO          |
| **buttonVisible**      | No            | true          |
| **buttonStyle**        | No            | -             |
| **renderButton**       | No            | -             |
| **buttonText**         | Yes           | -             |
| **buttonTextStyle**    | No            | -             |
| **messageText**        | Yes           | -             |
| **messageTextStyle**   | No            | -             |
| **showAnimDuration**   | No            | 200           |
| **hideAnimDuration**   | No            | 200           |
| **imageVisible**       | No            | false         |
| **source**             | No            | -             |
| **resizeMode**         | No            | stretch       |
| **onPress**            | No            | -             |
| **onChangeVisible**    | Yes           | -             |
| **useNativeDriver**    | No            | true          |


## Install

```
npm install --save @farzad.zare/snackbar-react-native
```

## Usage

```
import SnackBar from "@farzad.zare/snackbar-react-native";

render(){
    return (
        <View
            style={{ flex : 1 }}>
            
            <SnackBar
                onChangeVisible={(visible) => this.setState({visible})}
                visible={this.state.visible}            
                buttonText={"Show Message"}
                messageText={"Message Text"}
                snackBarType={SnackBar.SnackBarType.INFO}
            />

        </View>
    );
};
```
## Custom View Snack Bar
```
import SnackBar from "@farzad.zare/snackbar-react-native";

render(){
    return (
        <View
            style={{flex : 1}}>
            
            <SnackBar
                onChangeVisible={(visible) => this.setState({visible})}
                visible={this.state.visible}>

                <View>
                    ...
                </View>

            </SnackBar>


        </View>
    );
};
```
## Tags

* React Native
* Java Script
* NodeJs
* SnackBar
* iOS
* Android
* Message
* Animate

## Support
* farzad.zare@live.com