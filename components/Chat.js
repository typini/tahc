import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

export default class Chat extends Component {
  constructor(props) {
    super(props);
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
        <Text>Hello {this.props.navigation.state.params.name}!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center"
  }
});
