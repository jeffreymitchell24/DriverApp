import React, {Component} from 'react'
import {Root} from 'navigation/config'
import NavigationService from 'navigation/NavigationService'
import firebase from "react-native-firebase";
import {Linking} from 'react-native'
import {connect} from 'react-redux'

// todo: willl be removed, only for test
const init = async () => {
    const enabled = await
        firebase.messaging().hasPermission();
    if (enabled) {
        // user has permissions
        return true
    } else {
        try {
            await
                firebase.messaging().requestPermission();
            // User has authorised
        } catch (error) {
            // User has rejected permissions
            return false
        }
    }

}
init();
class App extends Component {
    constructor(props) {
        super(props);
        console.log('props',props)
    }
    componentDidMount() {
        Linking.addEventListener('url', this._handleOpenURL.bind(this));
    }
    componentWillUnmount() {
        Linking.removeEventListener('url', this._handleOpenURL.bind(this));
    }
    _handleOpenURL(event) {
        console.log(event.url);
        // const {user} = this.props

        console.log('isAuthed', this.props.isAuthed)
        if(event.url && this.props.isAuthed){
            const screen = event.url.substr(event.url.lastIndexOf('/') + 1)
            setTimeout(()=>{
                console.log('nav to ', screen)
                    NavigationService.navigate(screen,  {hideSplash: true})
               }, 2000)
        }
    }
    render() {
        return (<Root
                ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef)
                }}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return { isAuthed: state.auth.isAuthed };
};
export default connect(mapStateToProps)(App)
