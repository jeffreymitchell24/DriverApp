import React, { Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native'
import VersionNumber from 'react-native-version-number'
import PropTypes from 'prop-types'
import {icons} from 'images'
import {ProfileDetails, ChangePassword, TermsConditions, PrivacyPolicy, ProfileCamera, Home} from 'navigation/routeNames'
import { Section, SectionHeader, SectionContent, NavButton } from 'components/ui'
import styles from './styles'

const ListItem = ({text, icon, onPress}) => (
  <TouchableOpacity style={styles.listItem} onPress={onPress}>
    <View style={styles.iconContainer}>
      <Image source={icons[icon]} style={styles.listItemIcon} />
    </View>
    <Text style={styles.listItemText}>{text}</Text>
  </TouchableOpacity>
)

ListItem.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  onPress: PropTypes.func
}

class ProfileMain extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <NavButton icon='arrowLeft' imageStyle={{height: 14, width: 16}} onPress={() => navigation.navigate(Home)} />
    }
  }

  onLogOut = () => {

  }

  onPhotoPress = () => {
    this.props.navigation.navigate(ProfileCamera)
  }

  onNavigateTo = (route) => {
    this.props.navigation.navigate(route)
  }

  render () {
    let userImage = null
    let userName = 'Your Name'
    return (
      <ScrollView contentContainerStyle={styles.container} style={{flex: 1}}>
        <View style={styles.profileInfo}>
          <TouchableOpacity style={styles.photoContainer} onPress={this.onPhotoPress}>
            {
              userImage
                ? (
                  <Image source={{uri: userImage}} style={styles.profileImage} />
                ) : (
                  <Image source={icons['camera']} style={styles.iconCamera} />
                )
            }
          </TouchableOpacity>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <Section>
          <SectionHeader title='PROFILE' />
          <SectionContent>
            <ListItem icon='user' text='Personal Details' onPress={() => this.onNavigateTo(ProfileDetails)} />
          </SectionContent>
        </Section>
        <Section>
          <SectionHeader title='SECURITY' />
          <SectionContent>
            <ListItem icon='lock' text='Change Password' onPress={() => this.onNavigateTo(ChangePassword)} />
          </SectionContent>
        </Section>
        <Section>
          <SectionHeader title='ABOUT US' />
          <SectionContent style={styles.socialList}>
            <ListItem icon='star' text='Rate us on the App Store' />
            <ListItem icon='instagram' text='Follow us on Instagram' />
            <ListItem icon='facebook' text='Like us on Facebook' />
            <ListItem icon='twitter' text='Follow us on Twitter' />
            <ListItem icon='book' text='Privacy policy' onPress={() => this.onNavigateTo(PrivacyPolicy)} />
            <ListItem icon='document' text={`Terms & conditions`} onPress={() => this.onNavigateTo(TermsConditions)} />
          </SectionContent>
        </Section>
        <View style={styles.footer}>
          <TouchableOpacity onPress={this.onLogOut} >
            <Text style={styles.logOutText}>Log Out</Text>
          </TouchableOpacity>
          <Text style={styles.appVersionText}>Version {VersionNumber.appVersion}</Text>
        </View>
      </ScrollView>
    )
  }
}

ProfileMain.propTypes = {
  navigation: PropTypes.object
}

export default ProfileMain
