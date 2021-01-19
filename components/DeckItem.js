import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Card, Divider, Colors } from "react-native-paper";

class DeckItem extends React.Component {
  render() {
    const { deck } = this.props;
    return (
      <TouchableOpacity
        key={deck.id}
      >
        <Card.Title
          title={deck.title}
          left={(props) => (
            <Avatar.Icon
              {...props}
              style={styles.avatarIcon}
              icon="folder"
              color={Colors.white}
            />
          )}
          right={(props) => (
            <Avatar.Text
              size={24}
              style={styles.avatarText}
              label={deck.questions.length}
            />
          )}
        />
        <Divider />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "500",
  },
  avatarIcon: {
    backgroundColor: Colors.orange500,
  },
  avatarText: {
    marginRight: 16,
    backgroundColor: Colors.orange100,
  },
});

export default DeckItem;
