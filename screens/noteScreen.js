import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import db from "../config_firebase";
import firebase from "firebase";

export default class NoteScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
      num: 0,
      notes: [],
    };
  }

  addNote = () => {
    var noteRef = db.ref(`notes/${this.state.num + 1}/`);
    noteRef.on("value", (data) => {
      var items = data.val();
    });

    noteRef.update({
      data: this.state.text,
      num: this.state.num + 1,
    });

    this.setState({
      text: "",
      num: this.state.num + 1,
    });
  };

  clearTask = () => {
    var dataRef = db.ref("/");
    dataRef.on("value", (data) => {
      var dataList = data.val();
    });

    dataRef.update({
      notes: "",
    });

    this.setState({
      notes: [],
      num: 0,
    });
  };

  updateInfo = () => {
    var notesInfo = [];

    var dataRef = db.ref("notes/");
    dataRef.on("value", (data) => {
      var dataList = data.val();

      for (var data in dataList) {
        notesInfo.push(dataList[data]);
      }

      this.setState({
        notes: notesInfo,
        num: notesInfo.length,
      });
      notesInfo = [];
    });
  };

  componentDidMount() {
    this.updateInfo();
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={[styles.InputView, { margin: 10 }]}>
            <TextInput
              style={styles.TextInputStyle}
              autoCorrect={true}
              multiline={true}
              placeholder="Text"
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
                source={require("../assets/icons/add.png")}
                resizeMode="contain"
                style={{
                  width: 45,
                  height: 45,
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={{ width: "100%" }}>
            <TouchableOpacity
              style={styles.Clearbutton}
              onPress={() => {
                this.clearTask();
              }}
            >
              {this.state.notes.length === 0 ? (
                <Text></Text>
              ) : (
                <Text>Clear Notes</Text>
              )}
            </TouchableOpacity>
          </View>

          <ScrollView style={[styles.display]}>
            {this.state.notes.map((data) => (
              <View style={styles.listItems} key={data.num.toString()}>
                <Pressable
                  delayLongPress={1500}
                  onLongPress={() => {
                    console.log("longpress");
                    this.model(data.num);
                  }}
                >
                  <Text>{`• ${data.data}`}</Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
          <View style={{ height: "20%" }}>
            <Text> </Text>
          </View>
        </View>
      </SafeAreaView>
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
    borderWidth: 2,
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
  button: {
    padding: 20,
    marginRight: "5%",
  },

  Clearbutton: {
    alignItems: "center",
  },

  listItems: {
    alignSelf: "center",
    padding: 10,
    marginVertical: 10,
    borderColor: "black",
    borderWidth: 1,
    width: "80%",
    borderRadius: 10,
  },
  display: {
    alignSelf: "center",
    width: "100%",
    maxHeight: 750,
  },
});
