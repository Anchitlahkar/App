import React from "react";
import ViewDetails from "../screens/viewDetails";
import AddDetails from "../screens/addDetails";
import NoteScreen from "../screens/noteScreen";
import { StyleSheet, View, Image, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StudentDetailsScreen from "../screens/StudentDetails";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "black",
        },
        headerTitleStyle: {
          color: "#ffffff",
          fontWeight: "bold",
        },
        tabBarShowLabel: false,
        tabBarStyle: [styles.bottomTabStyle, styles.shadowStyle],
      }}
    >
      {/* View Details */}
      <Tab.Screen
        name="Student List"
        component={ViewDetails}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ marginLeft: 7 }}>
              <Image
                source={require("../assets/icons/list.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "blue" : "#ffffff",
                  alignSelf: "center",
                }}
              />
              <Text style={{ color: focused ? "blue" : "#ffffff" }}>
                Student_List
              </Text>
            </View>
          ),
        }}
      />

      {/* Notes */}
      <Tab.Screen
        name="Notes"
        component={NoteScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/icons/notes.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "blue" : "#ffffff",
                  alignSelf: "center",
                }}
              />
              <Text style={{ color: focused ? "blue" : "#ffffff" }}>Notes</Text>
            </View>
          ),
        }}
      />

      {/* Add Student */}
      <Tab.Screen
        name="New Entry"
        component={AddDetails}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/icons/text.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  alignSelf: "center",
                  tintColor: focused ? "blue" : "#ffffff",
                }}
              />
              <Text style={{ color: focused ? "blue" : "#ffffff" }}>
                New_Entry
              </Text>
            </View>
          ),
        }}
      />

  
      {/* Student Details */}
      <Tab.Screen name="details" component={StudentDetailsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/icons/details.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  alignSelf: "center",
                  tintColor: focused ? "blue" : "#ffffff",
                }}
              />
              <Text style={{ color: focused ? "blue" : "#ffffff" }}>
                Student Details
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  bottomTabStyle: {
    position: "absolute",
    backgroundColor: "#000000",
    height: "9.5%",
    elevation: 0,
  },

  shadowStyle: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },

    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
