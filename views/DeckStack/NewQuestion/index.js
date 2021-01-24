import React from 'react';
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { connect } from "react-redux";

import {saveCardToDeck, getDeckById} from '../../../actions'

class NewQuestion extends React.Component {
  state = {
    question: '',
    answer: ''
  }

  async onPressSubmit() {
    const {question, answer} = this.state
    const {deck} = this.props.route.params
    await this.props.dispatch(saveCardToDeck(deck.id, {question, answer}))
    await this.props.dispatch(getDeckById(deck.id));
    this.props.navigation.goBack()

  }
  render() {
    const { question, answer} = this.state
    return (
      <View>
        <TextInput label="Title" value={question} onChangeText={(text)=> this.setState({question: text})} />
        <TextInput label="Answer" value={answer} onChangeText={(text)=> this.setState({answer: text})} />
        <Button mode="contained" onPress={this.onPressSubmit.bind(this)} disabled={!question.trim() || !answer.trim()}>Submmit</Button>
      </View>
    );
  }
}

export default connect(null, null)(NewQuestion);
