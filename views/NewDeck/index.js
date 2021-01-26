import React from 'react';
import { StyleSheet, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { connect } from "react-redux";
import Header from '../../components/Header';
import { addNewDeck, getDeckById, fetchGetDecks } from "../../actions";


class NewDeck extends React.Component {
 state = {
     title: '',
 }
 async onPressSubmit() {
     this.setState({title: ''})
     const deck = await this.props.dispatch(addNewDeck(this.state.title))
     await this.props.dispatch(getDeckById(deck.id))
     await this.props.dispatch(fetchGetDecks())
     this.props.navigation.navigate('DeckSingle', {
        deck
          });
 }
  render() {
    const { title} = this.state
    return (
        <View >
        <Header title="New Deck" />
        <View style={{justifyContent: 'center', padding: 20}}>
            <TextInput label="Title" value={title} onChangeText={(text)=> this.setState({title: text})} />
            <Button mode="contained"  style={{marginTop: 20}} disabled={!title.trim()} onPress={this.onPressSubmit.bind(this)}>Submmit</Button>
        </View>
        
      </View>
    );
  }
}

export default connect(null, null)(NewDeck);
