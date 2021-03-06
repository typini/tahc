import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import firebase from "firebase";
import "firebase/firestore";

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

/**
* All the custom actions class
* @exports CustomActions
*/
export default class CustomActions extends Component {
  constructor(props){
    super(props);
  }

  /**
  * User selects photo from library, image is sent to uploadImage function
  * @function pickImage
  * @returns null
  */
  pickImage = async () => {
    try{
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted"){
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images
        }).catch(err => console.log(err.message));
        if (!result.cancelled){
          const imageUrl = await this.uploadImage(result.uri);
          this.props.onSend({ image: imageUrl });
        }
      }
    } catch(err) {
      console.log(err.message);
    }
  }

  /**
  * User takes a photo with camera, image sent to uploadImage function
  * @function takePhoto
  * @returns null
  */
  takePhoto = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions. CAMERA);
      if(status === "granted"){
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images
        }).catch(err => console.log(err.message));
        if (!result.cancelled){
          const imageUrl = await this.uploadImage(result.uri);
          this.props.onSend({ image: imageUrl });
        }
      }
    } catch(err) {
      console.log(err.message);
    }
  }

  /**
  * Sets the lat and lon of User's location to props via props function
  * @async
  * @function getLocation
  * @returns null
  */
  getLocation = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === "granted"){
        let result = await Location.getCurrentPositionAsync({}).catch(
          err => console.log(err.message)
        );
        if (result) {
          this.props.onSend({
            location: {
              longitude: result.coords.longitude,
              latitude: result.coords.latitude
            }
          });
        }
      }
    } catch(err){
      console.log(err.message);
    }
  }

  /**
  * Selected image is uploaded to Firebase
  * @async
  * @function uploadImage
  * @param string uri
  * @returns string imageUrl
  */
  uploadImage = async (uri) => {
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function(err) {
          console.log(err);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });
      let uriParts = uri.split('/');
      let imageName = uriParts[uriParts.length - 1];
      const ref = firebase.storage().ref().child(`${imageName}`);
      const snapshot = await ref.put(blob);
      blob.close();
      const imageUrl = await snapshot.ref.getDownloadURL();
      return imageUrl;
    } catch(err){
      console.log(err.message);
    }
  }

  /**
  * Action Sheet Details and Menu
  * @async
  * @function getLocation
  * @returns function bySwitch/Case
  */
  onActionPress = () => {
    const options = ['Choose Image from Library', 'Take Picture', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            return this.pickImage();
          case 1:
            return this.takePhoto();
          case 2:
            return this.getLocation();
          case 3:
            return null;
          default:
        }
      }
    );
  }

  render(){
    return(
      <TouchableOpacity
        style={styles.container}
        onPress={this.onActionPress}>
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#333",
    borderWidth: 2,
    flex: 1
  },
  iconText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "transparent",
    textAlign: "center"
  }
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func
};
