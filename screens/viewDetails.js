import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';
import db from '../config_firestore';
import { ListItem, SearchBar } from 'react-native-elements';

export default class ViewDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      details: [],
      text: '',
      showDetails: [],
      feesDetails: [],
    };
  }

  getStudentName = () => {
    this.datatRef = db.collection('Student').onSnapshot((snapshot) => {
      var studentList = snapshot.docs.map((document) => document.data());
      this.setState({
        details: studentList,
        showDetails: studentList,
      });
    });
  };

  search = (text) => {
    var { details } = this.state;
    var searchDetails = [];

    for (var data in details) {
      if (
        text
          .split(' ')[0]
          .toLowerCase()
          .includes(details[data].name.split(' ')[0].toLowerCase())
      ) {
        searchDetails.push(details[data]);
      }
    }
    if (text === 'fees') {
      for (var data_preList in details) {
        if (this.state.details[data_preList].fees === true) {
          searchDetails.push(details[data_preList]);
        }
      }
    }
    console.log(text);
    text === ''
      ? this.setState({ showDetails: details })
      : this.setState({ showDetails: searchDetails });
  };

  renderItem = ({ item, idx }) => (
    <ListItem
      bottomDivider
      onPress={() => {
        this.props.navigation.navigate('Student Details', {
          full_details: item,
        });
      }}>
      <View>
        <ListItem.Content>
          <ListItem.Title>{`Student Name: ${item.name}`}</ListItem.Title>
          <ListItem.Subtitle>{`Number: ${item.contact}`}</ListItem.Subtitle>
        </ListItem.Content>
      </View>
      {item.fees ? (
        <Text style={{ color: 'green', fontSize: 25 }}>•</Text>
      ) : (
        <Text></Text>
      )}
    </ListItem>
  );

  updateSearch = (text) => {
    this.setState({ text });
    this.search(text);
  };

  componentDidMount() {
    this.getStudentName();
  }

  keyExtractor = (item, index) => index.toString();

  render() {
    const { text } = this.state;
    return (
      <View style={(styles.container, { height: this.state.windowHeight })}>
        <SafeAreaView />

        {/* Search Area */}

        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={text}
        />

        {/* Item Display */}
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.showDetails}
          renderItem={this.renderItem}
        />

        {/* precaution */}
        <View style={{ height: '10%' }}>
          <Text> </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
