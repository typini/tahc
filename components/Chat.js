import KeyboardSpacer from 'react-native-keyboard-spacer';
import React, { Component } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        loggedInText: 'Hello There'
      });

      this.unsubscribe = this.referenceMessages.onSnapshot(this.onCollectionUpdate);
    });

    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any'
          }
        },
        {
          _id: 2,
          text: `Welcome to MOOR TAHC ${this.props.navigation.state.params.name}!`,
          createdAt: new Date(),
          system: true
        }
      ]
    });
  }

  componentWillUnmount() {
    this.authUnsubscribe();
    this.unsubscribe();
  }

  setUser = (_id, name = "Anonymous") => {
    this.setState({
      user: {
        _id: _id,
        name: name,
        avatar: "https://placeimg.com/140/140/any"
      }
    });
  }

  addMessage(){
    this.referenceMessages.add({
      _id: this.state.messages[0]._id,
      text: this.state.messages[0].text || '',
      createdAt: this.state.messages[0].createdAt,
      user: this.state.user,
      uid: this.state.uid
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }),
    () => {
      this.addMessage();
    });
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach(doc => {
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user
      });
    });
    this.setState({
      messages
    });
  };

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
