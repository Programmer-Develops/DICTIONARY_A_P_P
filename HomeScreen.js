import * as React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Header } from 'react-native-elements';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      word: '',
      definition: '',
    };
  }

  getWord = (word) => {
    var searchKeyword = word.toLowerCase();
    var url =
      'https://rupinwhitehatjr.github.io/dictionary/' + searchKeyword + '.json';
    return fetch(url)
      .then((data) => {
        if (data.status === 200) {
          return data.json();
        } else {
          return null;
        }
      })
      .then((response) => {
        var responseObject = response;
        if (responseObject) {
          var wordData = responseObject.definitions[0];
          var definition = wordData.description;
          var lexicalCategory = wordData.wordtype;
          this.setState({
            word: this.state.text,
            definition: definition,
            lexicalCategory: lexicalCategory,
          });
        } else {
          this.setState({
            word: this.state.text,
            definition: 'Not Found',
          });
        }
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={"crimson"}
          centerComponent={{
            text: 'Dictionary App',
            style: {
              color: "orange",
              fontSize: 25,
              fontFamily: 'jokerman',
              width: 313,
              textAlign: 'center',
            },
          }}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => {
            this.setState({
              text: text,
              word: 'Loading...',
              lexicalCategory: '',
              examples: [],
              definition: '',
            });
          }}
          value={this.state.text}
        />{' '}
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({ isSearchPressed: true });
            this.getWord(this.state.text);
          }}>
          {' '}
          <Text style={styles.textIn}> Search </Text>{' '}
        </TouchableOpacity>{' '}
        <Text style={{ fontSize: 18 }}>{this.state.word}</Text>
        <Text style={styles.definition}>{this.state.definition}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    width: 200,
    height: 100,
    borderWidth: 5,
    borderTopColor: "white",
    borderRightColor: "green",
    borderBottomColor: "orange",
    borderLeftColor: "blue",
    margin: 50,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  searchButton: {
    width: 140,
    height: 90,
    borderRadius: 50,
    borderWidth: 5,
    borderTopColor: '#da3132',
    borderBottomColor: '#5fae21',
    borderLeftColor: '#906fed',
    borderRightColor: '#51fde2',
    backgroundColor: "seagreen",
    justifyContent: 'center',
  },
  textIn: {
    textAlign: 'center',
    fontFamily: 'times',
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: "skyblue",
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  definition: {
    fontSize: 18,
    alignSelf: "Top",
    textAlign: 'center',
  },
});
