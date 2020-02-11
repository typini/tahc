import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, Alert, Button, View, ImageBackground, TouchableOpacity } from 'react-native';

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
                onPress={() => this.setState({ colorScheme: "#090C08"})}
              />
              <TouchableOpacity
                style={[styles.colorButton, styles.color2]}
                onPress={() => this.setState({ colorScheme: "#474056"})}
              />
              <TouchableOpacity
                style={[styles.colorButton, styles.color3]}
                onPress={() => this.setState({ colorScheme: "#8A95A5"})}
              />
              <TouchableOpacity
                style={[styles.colorButton, styles.color4]}
                onPress={() => this.setState({ colorScheme: "#B9C6AE"})}
              />
            </View>
          </View>
          {/*Row 3 of 3: Start Button*/}
          <View style={styles.startRow}>
            {/*Buttons have limited properties in React Native*/}
            <Button
              color="#757083"
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
    color: "#757083",
    borderWidth: 1.5,
    borderColor: "#757083",
    width: "100%",
    opacity: .5,
    height: 50,
    paddingLeft: 15,
    paddingRight: 15
  },
  chooseColorsText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
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
    borderColor: "#757083",
    borderWidth: 3,
    height: 50,
    width: 50,
    borderRadius: 25
  },
  color1: {
    backgroundColor: "#090C08"
  },
  color2: {
    backgroundColor: "#474056"
  },
  color3: {
    backgroundColor: "#8A95A5"
  },
  color4: {
    backgroundColor: "#B9C6AE"
  },
  startButton: {
    fontSize: 68,
    fontWeight: "600",
    color: "#333",
    backgroundColor: "#757083",
    width: "88%",
    height: 80
  }
});
