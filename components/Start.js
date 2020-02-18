import KeyboardSpacer from 'react-native-keyboard-spacer';
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, Alert, Button, View, ImageBackground, TouchableOpacity } from 'react-native';

const COLOR1 = "#090C08",
      COLOR2 = "#474056",
      COLOR3 = "#8A95A5",
      COLOR4 = "#B9C6AE",
      THEMECOLOR = "#757083";

export default class Start extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      colorScheme: ''
    };
  }

  render() {
    return(
      <ImageBackground source={require('../assets/backgroundImage.png')} style={styles.startBackground}>
        {/*ImageBackground encompasses the entire Start screen.*/}

        <Text style={styles.startTitle}>MOOR TAHC</Text>

        {/*Interactive Screen begins here*/}
        <View style={styles.startScreen}>
          {/*Row 1 of 3: User Name*/}
          <View style={styles.startRow}>
            <TextInput
              style={styles.startName}
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
              placeholder="Your Name"
            />
          </View>
          {/*Row 2 of 3: Select Background Color*/}
          <View style={styles.startRow}>
            <Text style={styles.chooseColorsText}>Choose Background Color:</Text>
            <View style={styles.startColors}>
              <TouchableOpacity
                style={[styles.colorButton, styles.color1]}
                onPress={() => this.setState({ colorScheme: `${COLOR1}`})}
              />
              <TouchableOpacity
                style={[styles.colorButton, styles.color2]}
                onPress={() => this.setState({ colorScheme: `${COLOR2}`})}
              />
              <TouchableOpacity
                style={[styles.colorButton, styles.color3]}
                onPress={() => this.setState({ colorScheme: `${COLOR3}`})}
              />
              <TouchableOpacity
                style={[styles.colorButton, styles.color4]}
                onPress={() => this.setState({ colorScheme: `${COLOR4}`})}
              />
            </View>
          </View>
          {/*Row 3 of 3: Start Button*/}
          <View style={styles.startRow}>
            {/*Buttons have limited properties in React Native*/}
            <Button
              color={`${THEMECOLOR}`}
              title="Start Chatting"
              onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, colorScheme: this.state.colorScheme })}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  startBackground: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  startTitle: {
    flex: 1,
    alignItems: "center",
    fontSize: 45,
    fontWeight: "600",
    color: "#FFF",
    marginTop: 80
  },
  startScreen: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    height: "44%",
    width: "88%",
    paddingTop: 14,
    paddingBottom: 14,
    marginBottom: 30
  },
  startRow: {
    flex: 1,
    height: 70,
    width: "88%",
    justifyContent: "center"
  },
  startName: {
    fontSize: 16,
    fontWeight: "300",
    color: `${THEMECOLOR}`,
    borderWidth: 1.5,
    borderColor: `${THEMECOLOR}`,
    width: "100%",
    opacity: .5,
    height: 50,
    paddingLeft: 15,
    paddingRight: 15
  },
  chooseColorsText: {
    fontSize: 16,
    fontWeight: "300",
    color: `${THEMECOLOR}`,
    opacity: 1
  },
  startColors: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    margin: 8
  },
  colorButton: {
    height: 44,
    width: 44,
    borderRadius: 22
  },
  selectedColorButton: {
    borderColor: `${THEMECOLOR}`,
    borderWidth: 3,
    height: 50,
    width: 50,
    borderRadius: 25
  },
  color1: {
    backgroundColor: `${COLOR1}`
  },
  color2: {
    backgroundColor: `${COLOR2}`
  },
  color3: {
    backgroundColor: `${COLOR3}`
  },
  color4: {
    backgroundColor: `${COLOR4}`
  },
  startButton: {
    fontSize: 68,
    fontWeight: "600",
    color: "#333",
    backgroundColor: `${THEMECOLOR}`,
    width: "88%",
    height: 80
  }
});
