import KeyboardSpacer from 'react-native-keyboard-spacer';
import React, { Component } from "react";
import { StyleSheet, View, Text, Platform, AsyncStorage } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
//The following line was deprecated.  Use import NetInfo from "@react-native-community/netinfo" instead
//import { NetInfoProvider } from 'react-native-netinfo';
import NetInfo from "@react-native-community/netinfo";
import MapView from "react-native-maps";
import CustomActions from './CustomActions';

//Required syntax for incorporating Google's Firebase Database
const firebase = require('firebase');
require('firebase/firestore');

//Screen2 (Chat.js)  export goes here
/**
* The Chat export screen
* @exports Chat
*/
export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      messages: [],
      user: {
        _id: '',
        name: '',
        avatar: ''
      },
      uid: 0
    }

    var firebaseConfig = {
      apiKey: "AIzaSyC9MPefNu_m3jNsAqQ01e8_Vrg_Z5jVK5o",
      authDomain: "tahc-53869.firebaseapp.com",
      databaseURL: "https://tahc-53869.firebaseio.com",
      projectId: "tahc-53869",
      storageBucket: "tahc-53869.appspot.com",
      messagingSenderId: "997240776732",
      appId: "1:997240776732:web:c8812f46d6f61faf4957d9",
      measurementId: "G-2Q43HV9QMV"
    };

    if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }

    this.referenceMessages = firebase.firestore().collection('messages');
  }

  componentDidMount(){
    NetInfo.fetch().then(state => {
      if (state.isConnected){
        this.setState({
          isConnected: true
        });
      }
      if (state.isConnected) {
        try {
          this.authUnsubscribe = firebase.auth().onAuthStateChanged(async user => {
            if (!user) {
              await firebase.auth().signInAnonymously();
            }

            if (this.props.navigation.state.params.name){
              this.setUser(user.uid, this.props.navigation.state.params.name);
            } else {
              this.setUser(user.uid);
            }

            this.setState({
              uid: user.uid,
              loggedInText: `You are online ${this.props.navigation.state.params.name}!`
            });

            this.unsubscribe = this.referenceMessages.orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate);
          });
        } catch (err) {
          console.log(err.message);
        }
      } else {
        this.setState({
          isConnected: false
        });
        this.getMessages();
      }
    });
  }

  componentWillUnmount() {
    this.authUnsubscribe();
    this.unsubscribe();
  }

  //User will be Anonymous by default unless the User provided his/her name.
  /**
  * User info set to state
  * @function setUser
  * @param _id
  * @param name
  * @returns null
  */
  setUser = (_id, name = "Anonymous") => {
    this.setState({
      user: {
        _id: _id,
        name: name,
        avatar: "https://placeimg.com/140/140/any"
      }
    });
  }

  /**
  * Adds most recent message to referenceMessages Collection
  * @function addMessage
  * @returns null
  */
  addMessage(){
    this.referenceMessages.add({
      _id: this.state.messages[0]._id,
      text: this.state.messages[0].text || '',
      createdAt: this.state.messages[0].createdAt,
      user: this.state.user,
      uid: this.state.uid,
      image: this.state.messages[0].image || '',
      location: this.state.messages[0].location || null
    });
  }

  /**
  * Gets all messages inside AsyncStorage
  * @function getMessages
  * @returns null
  */
  getMessages = async () => {
    let messages = [];
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (err){
      console.log(err.message);
    }
  };

  /**
  * Save messages to AsyncStorage
  * @function saveMessages
  * @returns null
  */
  saveMessages = async () => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (err){
      console.log(err.message);
    }
  };

  /**
  * NOT USED!  Deletes all messages in AsyncStorage
  * @function deleteMessages
  * @returns null
  */
  deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem('messages');
    } catch (err){
      console.log(err.message);
    }
  };

  /**
  * Sents current message to State, then sends State to be saved
  * @function onSend
  * @param array messages
  * @returns null
  */
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }),
    () => {
      this.addMessage();
      this.saveMessages();
    });
  }

  /**
  * Gets a snapshot of all current messages in Firebase
  * @function onCollectionUpdate
  * @param object querySnapshot
  * @returns null
  */
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach(doc => {
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
        image: data.image || '',
        location: data.location || null
      });
    });
    this.setState({
      messages
    });
  };

  /**
  * Appends right and left props to the rendered Bubble
  * @function renderBubble
  * @param object props
  * @returns jsx
  */
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#333"
          },
          left: {
            backgroundColor: "#FFB"
          }
        }}
      />
    );
  }

  /**
  * Only renders Toolbar if user is online
  * @function renderInputToolbar
  * @param object props
  * @returns jsx
  */
  renderInputToolbar(props){
    if (this.state.isConnected){
      return(
        <InputToolbar
          {...props}
        />
      );
    }
  }

  /**
  * Adds plus indicator to GiftedChat
  * @function renderCustomActions
  * @param object props
  * @returns jsx
  */
  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  /**
  * Adds Map windows to GiftedChat
  * @function renderCustomView
  * @param object props
  * @returns jsx
  */
  renderCustomView (props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 300,
            height: 200,
            borderRadius: 13,
            margin: 5
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
      );
    }
    return null;
  }

  //Sets the title in the Navigation Bar up top
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name
    };
  };

  render() {
    return(
      <View style={[styles.container, { backgroundColor: this.props.navigation.state.params.colorScheme}]}>
        {/*Background color gets over-writted with the color the user selected from Start screen.*/}
        <Text>{this.state.loggedInText}</Text>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderActions={this.renderCustomActions.bind(this)}
          renderCustomView={this.renderCustomView}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={this.state.user}
        />
        {Platform.OS === "android" ? <KeyboardSpacer topSpacing={55} /> : null }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  }
});
