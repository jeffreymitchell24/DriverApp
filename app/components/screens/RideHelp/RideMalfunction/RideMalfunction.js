import React, {Component} from 'react'
import {View, ScrollView, Alert, Platform, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import isEmpty from 'lodash/isEmpty'
import ImagePicker from 'react-native-image-picker'
import {Formik} from 'formik'

import {requestMainPermissions} from 'helpers/permission'
import {TextInputView} from 'components/blocks'
import {Home} from 'navigation/routeNames'
import {
    Photo,
    Button,
    SectionHeader,
    HelpCenterSection,
    Spinner
} from 'components/ui'
import {colors, metrics} from 'theme'

const validationSchema = Yup.object().shape({
    plate: Yup.string()
        .trim()
        .required('This field is required.'),
    description: Yup.string()
        .trim()
        .required('This field is required.')
})

const androidOptions = {
    cancelButtonTitle: 'Cancel',
    title: 'License Photo',
    mediaType: 'photo',
    quality: 0.6,
    maxHeight: 800,
    storageOptions: {
        skipBackup: true,
        cameraRoll: true
    },
    noData: true
}

const iosOptions = {
    cancelButtonTitle: 'Cancel',
    title: 'License Photo',
    mediaType: 'photo',
    noData: true,
    quality: 0.6,
    maxHeight: 800,
    storageOptions: {
        skipBackup: true,
        cameraRoll: true,
        waitUntilSaved: true
    }
}

class RideMalfunction extends Component {
    inputRefs = {}

    componentDidUpdate(prevProps) {
        const {error, requestPending} = this.props

        if (prevProps.requestPending && !requestPending) {
            if (error) {
                if (Platform.OS == 'ios') {  setTimeout(() => Alert.alert('Error', error), 200)}
                else { Alert.alert('Error', error)}
            } else {
                if (Platform.OS == 'ios') {
                    setTimeout(
                        () =>
                            Alert.alert(
                                '',
                                'Your report has been submitted',
                                [{text: 'OK', onPress: this.onConfirm}],
                                {cancelable: false}
                            ),
                        200
                    )
                } else {
                    Alert.alert(
                        '',
                        'Your report has been submitted',
                        [{text: 'OK', onPress: this.onConfirm}],
                        {cancelable: false}
                    )
                }
            }
        }
    }

    componentWillUnmount() {
        this.props.onResetPhotos('rideMalfunctionPhotos')
    }

    onConfirm = () => {
        const {navigation} = this.props

        navigation.navigate(Home)
    }

    onSubmit = ({plate, description}) => {
        const {onSubmitReport, ride = {}, photos} = this.props

        onSubmitReport({data: {photos, plate, description}, carId: ride.id})
    }

    onPhotoPress = async index => {
        let granted = await requestMainPermissions(true)

        console.log(index)
        console.log(granted)
        if (granted) {
            const {onSavePhoto} = this.props

            ImagePicker.showImagePicker(
                Platform.OS === 'android' ? androidOptions : iosOptions,
                response => {
                    onSavePhoto({
                        type: 'rideMalfunctionPhotos',
                        index,
                        photoUri: response.uri
                    })
                }
            )
        }
    }

    renderForm = ({
                      setFieldTouched,
                      handleChange,
                      handleSubmit,
                      errors,
                      values,
                      touched
                  }) => {
        let buttonActive =
            isEmpty(errors) &&
            touched.plate &&
            touched.description &&
            this.props.photos.length === 4 &&
            !this.props.photos.includes(undefined)

        console.log(values)
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.form}>
                    <TextInputView
                        key={'plate'}
                        keyboardType={'default'}

                        autoCapitalize={'characters'}
                        containerStyle={styles.textInput}
                        error={touched.plate && errors.plate}
                        label={'License plate'}
                        name={'plate'}
                        placeholder={'e.g. FYT 1274'}
                        returnKeyType={'next'}
                        value={values.plate.toUpperCase()}
                        onBlur={() => setFieldTouched('plate')}
                        onChangeText={handleChange('plate')}
                        onSubmitEditing={() => this.inputRefs['description'].focus()}
                    />

                    <View style={styles.photoListContainer}>
                        <SectionHeader title={'Upload photo (mandatory)'}/>

                        <View style={styles.photoList}>
                            <View style={styles.photoContainer}>
                                <Photo
                                    imageUri={this.props.photos[0]}
                                    onPress={() => this.onPhotoPress(0)}
                                />
                            </View>

                            <View style={styles.photoContainer}>
                                <Photo
                                    imageUri={this.props.photos[1]}
                                    onPress={() => this.onPhotoPress(1)}
                                />
                            </View>

                            <View style={styles.photoContainer}>
                                <Photo
                                    imageUri={this.props.photos[2]}
                                    onPress={() => this.onPhotoPress(2)}
                                />
                            </View>

                            <View style={styles.photoContainer}>
                                <Photo
                                    imageUri={this.props.photos[3]}
                                    onPress={() => this.onPhotoPress(3)}
                                />
                            </View>
                        </View>
                    </View>

                    <TextInputView
                        blurOnSubmit
                        error={touched.description && errors.description}
                        inputRef={input => {
                            this.inputRefs['description'] = input
                        }}
                        keyboardType={'default'}
                        label={'Description'}
                        maxLength={1000}
                        multiline
                        name={'description'}
                        placeholder={'What’s wrong with the car?'}
                        showLimit
                        value={values.description}
                        onBlur={() => setFieldTouched('description')}
                        onChangeText={handleChange('description')}
                        key={'description'}

                    />
                </View>

                <Button
                    disabled={!buttonActive}
                    title={'SUBMIT REPORT'}
                    onPress={handleSubmit}
                />
            </ScrollView>
        )
    }

    render() {
        return (
            <HelpCenterSection>
                <Formik
                    initialValues={{plate: '', description: ''}}
                    ref={node => (this.formik = node)}
                    render={this.renderForm}
                    validateOnBlur
                    validationSchema={validationSchema}
                    onSubmit={this.onSubmit}
                />

                <Spinner color={colors.red} visible={this.props.requestPending}/>
            </HelpCenterSection>
        )
    }
}

RideMalfunction.propTypes = {
    error: PropTypes.string,
    navigation: PropTypes.object,
    photos: PropTypes.array,
    requestPending: PropTypes.bool,
    ride: PropTypes.object,
    onResetPhotos: PropTypes.func,
    onSavePhoto: PropTypes.func,
    onSelectPhoto: PropTypes.func,
    onSubmitReport: PropTypes.func
}

export default RideMalfunction

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: colors.white,
        justifyContent: 'space-between'
    },

    form: {
        paddingTop: metrics.contentMargin
    },

    textInput: {
        marginBottom: 0
    },

    photoListContainer: {
        paddingTop: metrics.contentMargin,
        paddingBottom: metrics.contentMarginSmall
    },

    photoList: {
        paddingTop: metrics.contentMarginSmall,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    photoContainer: {
        marginBottom: 8
    }
})
