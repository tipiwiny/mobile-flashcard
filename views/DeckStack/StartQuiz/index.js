import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Title,
  Colors,
  Paragraph,
  Button,
  Subheading,
  FAB
} from "react-native-paper";
import { connect } from "react-redux";

import { getDeckById } from "../../../actions";
import { clearLocalNotification, setLocalNotification } from "../../../utils/helper";

class StartQuiz extends React.Component {
  state = {
    current: 0,
    correctAnswers: 0,
    showAnswer: false,
  };

  async componentDidMount() {
    const { deck } = this.props.route.params;
    await this.props.dispatch(getDeckById(deck.id));
    this.setState({ total: this.props.deck.questions.length });
  }
  onPressShowAnswer() {
    this.setState({ showAnswer: !this.state.showAnswer });
  }
  onPressCorrect() {
    this.setState({ correctAnswers: this.state.correctAnswers + 1 });
    this.onPressNextQuestion();
  }
  async onPressNextQuestion() {
    const { deck } = this.props.route.params;
    if(this.state.current >= (deck.questions.length - 1)) await this.clearNotification()
    this.setState({ current: this.state.current + 1 });
  }

  async clearNotification() {
    await clearLocalNotification()
    await setLocalNotification()
  }

  onPressResetQuiz() {
    this.setState({
      current: 0,
      correctAnswers: 0,
    });
  }

  renderQuiz() {
    const { deck } = this.props;
    const { current } = this.state;
    const { showAnswer } = this.state;
    const question = deck ? deck.questions[current] : {};
    return (
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <Title style={styles.title}>{question.question}</Title>
        </View>
        <View style={styles.answerContainer}>
          <Button  icon="lock-question" mode="text" styles={styles.answerButton} onPress={this.onPressShowAnswer.bind(this)}>Answer</Button>
          {showAnswer ? <Paragraph>{question.answer}</Paragraph> : undefined}
        </View>
        <View style={styles.buttonContainer}>
            <FAB
              icon="hand-pointing-up"
              small
              style={styles.buttonActions}
              onPress={this.onPressCorrect.bind(this)}
            />
            <FAB
              icon="hand-pointing-down"
              small
              style={styles.buttonActions}
              onPress={this.onPressNextQuestion.bind(this)}
            />
        </View>

        <Paragraph>
          {current + 1} / {deck.questions.length} questions
        </Paragraph>
      </View>
    );
  }
  renderCompletedQuiz() {
    const { deck } = this.props;
    const { correctAnswers } = this.state;
    return (
      <View style={styles.container}> 
        <View  style={[styles.containerTitle, {alignItems: 'center', color: 'white'}]}>
        <Title>Completed Quiz</Title>
        <Subheading>
          Your scoring:{" "}
          {Math.round((correctAnswers / deck.questions.length) * 100)} %
        </Subheading>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', margin: 20, paddingHorizontal: 20}}>
        <Button mode="contained" onPress={this.onPressResetQuiz.bind(this)}>Reset Quiz</Button>
        <Button  mode="contained" onPress={() => this.props.navigation.goBack()}>
          Go to Back
        </Button>
        </View>

      </View>
    );
  }
  render() {
    const { deck } = this.props;
    const { current } = this.state;
    const view =
      current >= deck.questions.length
        ? this.renderCompletedQuiz()
        : this.renderQuiz();
    return view;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  containerTitle: {
    backgroundColor: Colors.blue500,
    width: "100%",
    flex: 4,
    justifyContent: "center",
  },
  title: {
    color: "white",
    textAlign: "center",
  },
  answerContainer:{
    width: "100%",
    flex: 2,
    position : 'relative',
    alignItems: 'center'
  },
  answerButton: {
    width: '50%', flex: 1, position: 'absolute' , top: '50%' , left: 10
  },
  answer:{
    width: '50%',
    textAlign: 'center', flex: 1
  },
  buttonContainer : {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 20
  },
});
function mapStateToProps({ decks }) {
  return {
    deck: decks.deck,
  };
}

export default connect(mapStateToProps)(StartQuiz);
