import React from "react";
import { ScrollView, View, Text } from "react-native";
import { connect } from "react-redux";
import { fetchGetDecks } from "../../../actions";
import DeckItem from "../../../components/DeckItem";

class DeckList extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchGetDecks());
  }
  onPress(deck) {
    this.props.navigation.navigate("DeckSingle", {
      deck
    });
  }
  render() {
    const { decks } = this.props;
    return (
      <View>
        <ScrollView>
          {decks.map((deck) => (
            <DeckItem deck={deck} key={deck.id} onPress={this.onPress.bind(this)} />
          ))}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps({ decks }) {
  return {
    decks: decks.list,
  };
}

export default connect(mapStateToProps)(DeckList);
