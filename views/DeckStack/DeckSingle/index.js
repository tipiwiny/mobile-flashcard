
import  React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Colors,Subheading, Title } from "react-native-paper";


class DeckSingle extends React.Component {
  onPressAddNewCard(route) {
    const {deck} = this.props.route.params
    this.props.navigation.navigate(route, {
      deck
    });
  }
  render() {
    const {deck} = this.props.route.params
    return (
      <View style={styles.container}>
      <Title style={styles.deckTitle}>{deck.title}</Title>
      <Subheading>{deck.questions.length} cards</Subheading>
      <Button
        mode="contained"
        disabled={deck.questions.length > 0 ? false : true}
        style = {styles.button}
        onPress={this.onPressAddNewCard.bind(this, "StartQuiz")}

      >
        Start Quiz
      </Button>

      <Button
        mode="outlined"
        style = {styles.button}
        onPress={this.onPressAddNewCard.bind(this, "AddCard")}
      >
        Add New Card
      </Button>
      <Button
        style={[styles.buttonDeleteDeck, styles.button]}
        labelStyle={styles.buttonDeleteDeckLabel}
        mode="text"
      >
        Delete Deck
      </Button>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    margin: 15
  },
  buttonDeleteDeckLabel: {
    color: Colors.red500,
    textTransform: "none"
  }
});

export default DeckSingle;