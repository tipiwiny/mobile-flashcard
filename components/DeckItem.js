import React from "react";
import { StyleSheet, TouchableOpacity, Animated } from "react-native";
import { Avatar, Card, Divider, Colors } from "react-native-paper";

class DeckItem extends React.Component {
  state = {
    bounceValue: new Animated.Value(1), 
  }
  onPress(deck) {
    const { bounceValue } = this.state
    Animated.sequence([
        Animated.timing(bounceValue, { duration: 200, toValue: 1.04, useNativeDriver: true}),
        Animated.spring(bounceValue, { toValue: 1, friction: 4, useNativeDriver: true})
      ]).start(() => this.props.onPress(deck))
  }
  render() {
    const { deck } = this.props;
    const { bounceValue } = this.state

    return (
      <TouchableOpacity key={deck.id}  onPress={this.onPress.bind(this, deck)}>
        <Animated.View style={{transform: [{scale: bounceValue}]}}>
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
        </Animated.View>
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
