import KeyboardSpacer from 'react-native-keyboard-spacer';
import React, { Component } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
  }

  componentDidMount(){
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

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

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
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1
          }}
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
