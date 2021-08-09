import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class AddDetails extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Add Details</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height:"100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
