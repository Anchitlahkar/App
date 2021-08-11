import React from "react";
import Tabs from "./component/bottomTab";
import StudentDetailsScreen from "./screens/StudentDetails";
import UpdateDetailsScreen from './screens/UpdateDetails'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Tabs}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Student Details" component={StudentDetailsScreen} />
        <Stack.Screen name="Update Details" component={UpdateDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
