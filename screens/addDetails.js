import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import db from "../config_firestore";
import { CheckBox } from "react-native-elements";

export default class AddDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      st_name: "",
      fa_name: "",
      ma_name: "",
      number: "",
      address: "",
      fees: false,
      doa: "", //doa: Date of Addmision
      windowHeight: Dimensions.get("window").height,
    };
  }

  AddStudent = (message) => {
    db.collection("Student").add({
      name: this.state.st_name,
      father_name: this.state.fa_name,
      mother_name: this.state.ma_name,
      contact: this.state.number,
      address: this.state.address,
      fees: this.state.fees,
      date_of_addmission: this.state.doa,
    });
    this.AddFees();
    alert(message);
  };

  AddFees = () => {
    if (this.state.fees === true) {
      db.collection("Fees").add({
        name: this.state.st_name,
        Jan: "not-paid",
        Feb: "not-paid",
        Mar: "not-paid",
        Apr: "not-paid",
        May: "not-paid",
        Jun: "not-paid",
        Jul: "not-paid",
        Aug: "not-paid",
        Sep: "not-paid",
        Oct: "not-paid",
        Nov: "not-paid",
        Dec: "not-paid",
      });
    }
  };

  checkDetails = (alertText) => {
    this.state.st_name === ""
      ? alert("Please fill up all the details")
      : this.state.fa_name === ""
      ? alert("Please fill up all the details")
      : this.state.ma_name === ""
      ? alert("Please filll up all the details")
      : this.state.number === ""
      ? alert("Please fill up all the details")
      : this.AddStudent(alertText);
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />

        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            alignSelf: "center",
            marginTop: 20,
          }}
        >
          Add Required Details Below:{" "}
        </Text>

        {/* Data input */}
        <View
          style={
            this.state.windowHeight > 700
              ? { alignSelf: "center", marginTop: "5%", alignItems: "center" }
              : styles.ButtonView
          }
        >
          <TouchableOpacity
            onPress={() => {
              this.state.windowHeight > 700
                ? console.log("not acceptable")
                : this.checkDetails("Student Added Successfully");
            }}
          >
            {this.state.windowHeight > 700 ? (
              <Text> </Text>
            ) : (
              <Text style={styles.buttonText}>Add Student</Text>
            )}
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.display}>
          <View style={[styles.InputView, { marginTop: 15 }]}>
            <TextInput
              style={styles.TextInputStyle}
              placeholder="Student Name"
              onChangeText={(text) => {
                this.setState({ st_name: text });
              }}
            />
            <TextInput
              style={styles.TextInputStyle}
              placeholder="Father's Name"
              onChangeText={(text) => {
                this.setState({ fa_name: text });
              }}
            />
            <TextInput
              style={styles.TextInputStyle}
              placeholder="Mother's Name"
              onChangeText={(text) => {
                this.setState({ ma_name: text });
              }}
            />
            <TextInput
              style={styles.TextInputStyle}
              placeholder="Phone No"
              onChangeText={(text) => {
                this.setState({ number: text });
              }}
            />
            <TextInput
              style={styles.TextInputStyle}
              placeholder="Address"
              onChangeText={(text) => {
                this.setState({ address: text });
              }}
            />
            <TextInput
              style={styles.TextInputStyle}
              placeholder="Date of Addimssion"
              onChangeText={(text) => {
                this.setState({ doa: text });
              }}
            />
            <CheckBox
              center
              title="Fees"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={this.state.fees}
              onPress={() => {
                this.setState({
                  fees: !this.state.fees,
                });
              }}
            />

            <View
              style={
                this.state.windowHeight > 700
                  ? styles.ButtonView
                  : {
                      alignSelf: "center",
                      marginTop: "5%",
                      alignItems: "center",
                    }
              }
            >
              <TouchableOpacity
                onPress={() => {
                  this.state.windowHeight > 700
                    ? this.checkDetails("Student Added Successfully")
                    : console.log("not acceptable");
                }}
              >
                {this.state.windowHeight > 700 ? (
                  <Text style={styles.buttonText}>Add Student</Text>
                ) : (
                  <Text> </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ height: "20%" }}>
            <Text> </Text>
          </View>
        </ScrollView>
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
    height: 45,
    width: "80%",
    padding: 10,
    margin: 10,
    alignItems: "center",
  },
  InputView: {
    alignItems: "center",
  },
  ButtonView: {
    alignSelf: "center",
    marginTop: "5%",
    backgroundColor: "#016afb",
    borderRadius: 10,
    width: 170,
    height: 35,
    alignItems: "center",
  },
  display: {
    alignSelf: "center",
    width: "100%",
    maxHeight: 750,
  },
  buttonText: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#fff",
  },
});
