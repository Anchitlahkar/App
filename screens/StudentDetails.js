import React from "react";
import { Card } from "react-native-elements/";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Button,
  SafeAreaView,
} from "react-native";
import "react-native-gesture-handler";
import db from "../config_firestore";

export default class StudentDetailsScreen extends React.Component {
  constructor(data) {
    super();
    this.state = {
      details: data.route.params.full_details,
      st_name: data.route.params.full_details.name,
      fees: [],
      windowHeight: Dimensions.get("window").height,
    };
  }

  getDetails = () => {
    db.collection("Fees")
      .where("name", "==", this.state.st_name)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((document) => {
          var data = document.data();
          this.setState({
            fees: data
          });
        });
      });
  };
  

  fees = (fees_t_F) => {
    var fees = this.state.fees;

    if (fees_t_F) {
      return (
        <View style={{ margin: "5%" }}>
          <View style={{ backgroundColor: "red" }}>
            <Card title="Fees">
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 21,
                }}
              >
                Fees
              </Text>

              <Text
                style={styles.cardItem}
              >{`• April:          ${fees.Apr}`}</Text>
              <Text
                style={styles.cardItem}
              >{`• May:          ${fees.May}`}</Text>
              <Text
                style={styles.cardItem}
              >{`• June:         ${fees.Jun}`}</Text>
              <Text
                style={styles.cardItem}
              >{`• July:          ${fees.Jul}`}</Text>
              <Text
                style={styles.cardItem}
              >{`• August:      ${fees.Aug}`}</Text>
              <Text style={styles.cardItem}>{`• September:  ${fees.Sep}`}</Text>
              <Text style={styles.cardItem}>{`• October:    ${fees.Oct}`}</Text>
              <Text style={styles.cardItem}>{`• November:   ${fees.Nov}`}</Text>
              <Text style={styles.cardItem}>{`• December:   ${fees.Dec}`}</Text>
              <Text
                style={styles.cardItem}
              >{`• January:     ${fees.Jan}`}</Text>
              <Text style={styles.cardItem}>{`• February:   ${fees.Feb}`}</Text>
              <Text
                style={styles.cardItem}
              >{`• March:       ${fees.Mar}`}</Text>
            </Card>
          </View>
          <Button
            title="Update Details"
            onPress={() => {
              this.props.navigation.navigate("Update Details", {
                Student_name: this.state.details.name,
              });
            }}
          />
        </View>
      );
    }
  };

  componentDidMount() {
    this.getDetails(this.state.details.fees);
  }

  render() {
    const { details } = this.state;
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <ScrollView>
          <Card title={details.name}>
            <View>
              <Text
                style={{ fontWeight: "bold", fontSize: 21 }}
              >{`Name: ${details.name}`}</Text>
              <Text
                style={[styles.cardItem, { marginTop: 10 }]}
              >{`Father's Name: ${details.father_name}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Mother's Name: ${details.mother_name}`}</Text>
              <Text style={styles.cardItem}>{`Phone: ${details.contact}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Date of birth: ${details.dob}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Date of addmission: ${details.date_of_addmission}`}</Text>
            </View>
          </Card>
          {this.fees(details.fees)}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
  },

  upperContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "yellow",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  button: {
    height: "5%",
    width: "25%",
    marginTop: 20,
    backgroundColor: "blue",
    alignSelf: "center",
    borderRadius: 10,
    alignItems: "center",
  },
  cardItem: {
    fontSize: 18,
    marginTop: 10,
  },
});
