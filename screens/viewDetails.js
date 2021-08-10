import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image
} from "react-native";
import db from "../config_firestore";

export default class ViewDetails extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />

        {/* Search Area */}
        <View style={[styles.InputView, { margin: 10 }]}>
          <TextInput
            style={styles.TextInputStyle}
            autoCorrect={true}
            multiline={true}
            placeholder="Search"
            onChangeText={(text) => {
              this.setState({ text: text });
            }}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.addNote();
            }}
          >
            <Image
              source={require("../assets/icons/search.png")}
              resizeMode="contain"
              style={{
                width: 45,
                height: 45,
              }}
            />
          </TouchableOpacity>
        </View>

        {/* Item Display */}
        <ScrollView style={styles.display}>
          <Text>ViewDetails</Text>
        </ScrollView>

        {/* precaution */}
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
  display: {
    alignSelf: "center",
    width: "100%",
    maxHeight: 750,
  },
});
