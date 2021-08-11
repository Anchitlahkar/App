import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

export default class SettingScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View style={{ height: "20%" }}>
          <Text> </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  TextInputStyle: {
    marginLeft: "5%",
    borderColor: "black",
    borderRadius: 15,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    height: 45,
    width: "80%",
    padding: 10,
    margin: 10,
    alignItems: "center",
  },
  InputView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
