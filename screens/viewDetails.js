import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  FlatList,
} from "react-native";
import db from "../config_firestore";
import { ListItem } from "react-native-elements";

export default class ViewDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      details: "",
    };
  }

  getStudentName = () => {
    this.datatRef = db.collection("Student").onSnapshot((snapshot) => {
      var studentList = snapshot.docs.map((document) => document.data());
      this.setState({
        details: studentList,
      });
    });
  };

  componentDidMount() {
    this.getStudentName();
  }

  renderItem = ({ item, idx }) => (
    <ListItem
      bottomDivider
      {...console.log(item.name)}
      onPress={() => {
        this.props.navigation.navigate("Details", { planet_name: item.name });
      }}
    >
      <ListItem.Content>
        <ListItem.Title>{`Student Name: ${item.name}`}</ListItem.Title>
        <ListItem.Subtitle>{`Number: ${item.contact}`}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  keyExtractor = (item, index) => index.toString();

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
        <View style={{ alignSelf: "center" }}>
          <ScrollView style={styles.display}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.details}
              renderItem={this.renderItem}
            />
          </ScrollView>
        </View>

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
