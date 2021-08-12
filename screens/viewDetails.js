import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
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
      details: [],
      text: "",
      showDetails: []
    };
  }

  getStudentName = () => {
      this.datatRef = db.collection("Student").onSnapshot((snapshot) => {
        var studentList = snapshot.docs.map((document) => document.data());
        this.setState({
          details: studentList,
          showDetails: studentList,
        });
      });
  };

  search = (text) => {
    var {details} = this.state
    var searchDetails = []

    for (var data in details){
      if(text.includes(details[data].name)){
        searchDetails.push(details[data])
      }
    }
    searchDetails.length === 0 ?
      this.setState({showDetails: details})
      : this.setState({showDetails: searchDetails})
  };

  renderItem = ({ item, idx }) => (
    <ListItem
      bottomDivider
      onPress={() => {
        this.props.navigation.navigate("Student Details", {
          full_details: item,
        });
      }}
    >
      <ListItem.Content>
        <ListItem.Title>{`Student Name: ${item.name}`}</ListItem.Title>
        <ListItem.Subtitle>{`Number: ${item.contact}`}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  componentDidMount() {
    this.getStudentName();
  }

  keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <View style={(styles.container, { height: this.state.windowHeight })}>
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
              this.search(this.state.text);
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
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.showDetails}
          renderItem={this.renderItem}
        />

        {/* precaution */}
        <View style={{ height: "10%" }}>
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
