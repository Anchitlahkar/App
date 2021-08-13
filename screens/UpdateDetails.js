import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Switch,
  Button,
} from "react-native";
import db from "../config_firestore";

export default class UpdateDetailsScreen extends React.Component {
  constructor(data) {
    super();
    this.state = {
      st_name: data.route.params.Student_name,
      fa_name: "",
      ma_name: "",
      phone: "",
      address: "",
      doa: "",
      fees: "",
      Apr: "",
      May: "",
      Jun: "",
      Jul: "",
      Aug: "",
      Sep: "",
      Oct: "",
      Nov: "",
      Dec: "",
      Jan: "",
      Feb: "",
      Mar: "",
      id_name: "",
      id_fees: "",
    };
  }

  getStudentData = () => {
    db.collection("Student")
      .where("name", "==", this.state.st_name)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((document) => {
          var data = document.data();
          this.setState({
            id_name: document.id,
            fa_name: data.father_name,
            ma_name: data.mother_name,
            phone: data.contact,
            address: data.address,
            doa: data.date_of_addmission,
            fees: data.fees,
          });
        });
      });
    db.collection("Fees")
      .where("name", "==", this.state.st_name)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((document) => {
          var data = document.data();
          this.setState({
            Apr: data.Apr,
            May: data.May,
            Jun: data.Jun,
            Jul: data.Jul,
            Aug: data.Aug,
            Sep: data.Sep,
            Oct: data.Oct,
            Nov: data.Nov,
            Dec: data.Dec,
            Jan: data.Jan,
            Feb: data.Feb,
            Mar: data.Mar,
            id_fees: document.id
          });
        });
      });
  };

  updateDetails = () => {
    db.collection("Student").doc(this.state.id_name).update({
      name: this.state.st_name,
      father_name: this.state.fa_name,
      mother_name: this.state.ma_name,
      contact: this.state.phone,
      address: this.state.address,
      date_of_addmission: this.state.doa,
    });

    db.collection("Fees").doc(this.state.id_fees).update({
      Jan: this.state.Jan,
      Feb: this.state.Feb,
      Mar: this.state.Mar,
      Apr: this.state.Apr,
      May: this.state.May,
      Jun: this.state.Jun,
      Jul: this.state.Jul,
      Aug: this.state.Aug,
      Sep: this.state.Sep,
      Oct: this.state.Oct,
      Nov: this.state.Nov,
      Dec: this.state.Dec,
      name: this.state.st_name,
    });

    alert("Details Updated");
  };

  componentDidMount() {
    this.getStudentData();
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <Text style={{ fontSize: 23, fontWeight: "bold", textAlign: "center" }}>
          Student: {this.state.st_name}
        </Text>
        <KeyboardAvoidingView>
          <ScrollView style={styles.display}>
            <View style={[styles.InputView, { marginTop: 15 }]}>
              <TextInput
                style={styles.TextInputStyle}
                placeholder="Student Name"
                onChangeText={(text) => {
                  this.setState({ st_name: text });
                }}
                value={this.state.st_name}
              />
              <TextInput
                style={styles.TextInputStyle}
                placeholder="Father's Name"
                onChangeText={(text) => {
                  this.setState({ fa_name: text });
                }}
                value={this.state.fa_name}
              />
              <TextInput
                style={styles.TextInputStyle}
                placeholder="Mother's Name"
                onChangeText={(text) => {
                  this.setState({ ma_name: text });
                }}
                value={this.state.ma_name}
              />
              <TextInput
                style={styles.TextInputStyle}
                placeholder="Phone No"
                onChangeText={(text) => {
                  this.setState({ phone: text });
                }}
                value={this.state.phone}
              />
              <TextInput
                style={styles.TextInputStyle}
                placeholder="Address"
                onChangeText={(text) => {
                  this.setState({ address: text });
                }}
                value={this.state.address}
              />
              <TextInput
                style={styles.TextInputStyle}
                placeholder="Date of Addimssion"
                onChangeText={(text) => {
                  this.setState({ doa: text });
                }}
                value={this.state.doa}
              />
            </View>
            <View style={{ alignSelf: "center" }}>
              <Text style={{ marginTop: 30, fontSize: 20, fontWeight: "bold" }}>
                Fees Paid
              </Text>

              {/* January */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Text style={{ marginTop: 20, fontSize: 18 }}>January : </Text>
                <Switch
                  style={{ marginTop: 20 }}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  value={this.state.Jan === "paid" ? true : false}
                  onValueChange={() => {
                    this.state.Jan === "paid"
                      ? this.setState({
                          Jan: "not-paid",
                        })
                      : this.setState({
                          Jan: "paid",
                        });
                  }}
                />
              </View>

              {/* February */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Text style={{ marginTop: 20, fontSize: 18 }}>
                  {" "}
                  February :{" "}
                </Text>
                <Switch
                  style={{ marginTop: 20 }}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  value={this.state.Feb === "paid" ? true : false}
                  onValueChange={() => {
                    this.state.Feb === "paid"
                      ? this.setState({
                          Feb: "not-paid",
                        })
                      : this.setState({
                          Feb: "paid",
                        });
                  }}
                />
              </View>

              {/* March */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Text style={{ marginTop: 20, fontSize: 18 }}> March : </Text>
                <Switch
                  style={{ marginTop: 20 }}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  value={this.state.Mar === "paid" ? true : false}
                  onValueChange={() => {
                    this.state.Mar === "paid"
                      ? this.setState({
                          Mar: "not-paid",
                        })
                      : this.setState({
                          Mar: "paid",
                        });
                  }}
                />
              </View>

              {/* April */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Text style={{ marginTop: 20, fontSize: 18 }}> April : </Text>
                <Switch
                  style={{ marginTop: 20 }}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  value={this.state.Apr === "paid" ? true : false}
                  onValueChange={() => {
                    this.state.Apr === "paid"
                      ? this.setState({
                          Apr: "not-paid",
                        })
                      : this.setState({
                          Apr: "paid",
                        });
                  }}
                />
              </View>

              {/* May */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Text style={{ marginTop: 20, fontSize: 18 }}> May : </Text>
                <Switch
                  style={{ marginTop: 20 }}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  value={this.state.May === "paid" ? true : false}
                  onValueChange={() => {
                    this.state.May === "paid"
                      ? this.setState({
                          May: "not-paid",
                        })
                      : this.setState({
                          May: "paid",
                        });
                  }}
                />
              </View>

              {/* June */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Text style={{ marginTop: 20, fontSize: 18 }}>June : </Text>
                <Switch
                  style={{ marginTop: 20 }}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  value={this.state.Jun === "paid" ? true : false}
                  onValueChange={() => {
                    this.state.Jun === "paid"
                      ? this.setState({
                          Jun: "not-paid",
                        })
                      : this.setState({
                          Jun: "paid",
                        });
                  }}
                />
              </View>

              {/* July */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Text style={{ marginTop: 20, fontSize: 18 }}>July : </Text>
                <Switch
                  style={{ marginTop: 20 }}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  value={this.state.Jul === "paid" ? true : false}
                  onValueChange={() => {
                    this.state.Jul === "paid"
                      ? this.setState({
                          Jul: "not-paid",
                        })
                      : this.setState({
                          Jul: "paid",
                        });
                  }}
                />
              </View>

              {/* August */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Text style={{ marginTop: 20, fontSize: 18 }}>August : </Text>
                <Switch
                  style={{ marginTop: 20 }}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  value={this.state.Aug === "paid" ? true : false}
                  onValueChange={() => {
                    this.state.Aug === "paid"
                      ? this.setState({
                          Aug: "not-paid",
                        })
                      : this.setState({
                          Aug: "paid",
                        });
                  }}
                />
              </View>

              {/* September */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Text style={{ marginTop: 20, fontSize: 18 }}>
                  September :{" "}
                </Text>
                <Switch
                  style={{ marginTop: 20 }}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  value={this.state.Sep === "paid" ? true : false}
                  onValueChange={() => {
                    this.state.Sep === "paid"
                      ? this.setState({
                          Sep: "not-paid",
                        })
                      : this.setState({
                          Sep: "paid",
                        });
                  }}
                />
              </View>

              {/* October */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Text style={{ marginTop: 20, fontSize: 18 }}>October : </Text>
                <Switch
                  style={{ marginTop: 20 }}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  value={this.state.Oct === "paid" ? true : false}
                  onValueChange={() => {
                    this.state.Oct === "paid"
                      ? this.setState({
                          Oct: "not-paid",
                        })
                      : this.setState({
                          Oct: "paid",
                        });
                  }}
                />
              </View>

              {/* November */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Text style={{ marginTop: 20, fontSize: 18 }}>November : </Text>
                <Switch
                  style={{ marginTop: 20 }}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  value={this.state.Nov === "paid" ? true : false}
                  onValueChange={() => {
                    this.state.Nov === "paid"
                      ? this.setState({
                          Nov: "not-paid",
                        })
                      : this.setState({
                          Nov: "paid",
                        });
                  }}
                />
              </View>

              {/* December */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Text style={{ marginTop: 20, fontSize: 18 }}>December : </Text>
                <Switch
                  style={{ marginTop: 20 }}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  value={this.state.Dec === "paid" ? true : false}
                  onValueChange={() => {
                    this.state.Dec === "paid"
                      ? this.setState({
                          Dec: "not-paid",
                        })
                      : this.setState({
                          Dec: "paid",
                        });
                  }}
                />
              </View>
            </View>
            <View style={styles.ButtonView}>
              <Button
                title="Update Details"
                onPress={() => {
                  this.updateDetails();
                }}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
});
