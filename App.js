import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const questions = [{
  question: 'What is your favorite food?',
  options: [
    'Soylent',
    'Asian',
    'Tomatoes',
  ]
},
{
  question: 'Pick a flower.',
  options: [
    'Soylent',
    'Rose',
    'Tulip',
    'Good'
  ]
}]

const matchResults = {
  [0]: 'Zach',
  [1]: 'Zach1',
  [2]: 'Zach2',
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      questionIndex: 0,
      tempName: null,
      name: null,
      score: 0,
      resultMessage: null
    }
  }

  _handleNameChange = text => this.setState({
    tempName: text
  })

  _handleOptionPress = index => {
    const { questionIndex, score } = this.state;

    // Soylent 0
    if (questionIndex === 0 && index === 0) {
      this.setState({
        questionIndex: questions.length,
        resultMessage: 'Goodbye.'
      })
      return;
    }

    // Soylent 1
    if (questionIndex === 1 && index === 0) {
      this.setState({
        questionIndex: questions.length,
        resultMessage: 'Begone bot'
      })
      return;
    }

    let newQuestionIndex = questionIndex + 1;
    let newScore = (score + index) / (questionIndex + 1);

    let newState = {
      questionIndex: newQuestionIndex,
      score: newScore
    }

    if (newQuestionIndex === questions.length) {
      let closestMatchIndex = 0;
      let minimumDifference = 100;
      for (let i = 0; i < 3; i++) {
        const diff = Math.abs(newScore - i);
        if (diff < minimumDifference) {
          closestMatchIndex = i;
          minimumDifference = diff;
          if (minimumDifference === 0) break;
        }
      }
      newState.resultMessage = 
        `You matched with ${matchResults[closestMatchIndex]}! Have fun!`;
    }
    this.setState(newState)
  }

  _handleNameDone = () => {
    const { tempName } = this.state;
    if (tempName === 'Andy') {
      this.setState({
        questionIndex: questions.length,
        resultMessage: `Shouldn't you be on Tinder?`,
        name: tempName,
        tempName: null
      })
      return;
    }
    this.setState({ name: tempName, tempName: null })
  }

  _renderNameInput = () => {
    const { tempName, name } = this.state;
    return (
      <View style={{ alignItems: 'center' }}>
        <TextInput
          placeholder={`What's your name?`}
          style={styles.nameInput}
          selectionColor='#F0217B'
          onChangeText={this._handleNameChange}
          editable={name === null}/>
         {tempName !== null &&
           <TouchableOpacity 
             style={[styles.optionButton]}
             disabled={tempName === null}
             onPress={this._handleNameDone}>
             <Text style={styles.optionText}>DONE</Text>
           </TouchableOpacity>
         }
      </View>
    )
  }

  _renderOptions = () => {
    const { questionIndex } = this.state;
    return (
      <View style={{ width: '100%' }}>
        <Text>{questions[questionIndex].question}</Text>
        {questions[questionIndex].options.map((a, i) => (
          <TouchableOpacity 
            style={styles.optionButton}
            key={a}
            onPress={() => this._handleOptionPress(i)}>
            <Text style={styles.optionText}>{a}</Text>
          </TouchableOpacity>
        ))}
      </View>
     )
  }

  render() {
    const { questionIndex, name, resultMessage } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Title</Text>
        {this._renderNameInput()}
        {name && questionIndex < questions.length && this._renderOptions()}
        {resultMessage &&
          <Text style={styles.result}>{resultMessage}</Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
  },
  nameInput: {
    fontSize: 20,
    color: '#F0217B',
    marginBottom: 15
  },
  title: {
    position: 'absolute',
    top: 60
  },
  optionButton: {
    backgroundColor: '#F0217B', 
    width: '100%', 
    height: 50,
    justifyContent: 'center',
    paddingLeft: 25,
    paddingRight: 25,
    margin: 10,
    borderRadius: 12
  },
  optionText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600'
  },
  result: {
    color: '#F0217B',
    fontSize: 35,
    fontWeight: '600'
  }
});
