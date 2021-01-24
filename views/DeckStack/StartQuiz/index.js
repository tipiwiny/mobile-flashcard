import React from "react";
import { View } from "react-native";
import { Title, Paragraph, Button, IconButton, Subheading } from "react-native-paper";
import { connect } from "react-redux";

import { getDeckById } from "../../../actions";

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
  onPressNextQuestion() {
    this.setState({ current: this.state.current + 1 });
  }

  onPressResetQuiz() {
    this.setState({
      current: 0,
      correctAnswers: 0
    })
  }

  renderQuiz() {
    const { deck } = this.props;
    const { current } = this.state;
    const { showAnswer } = this.state;
    const question = deck ? deck.questions[current] : {};
    return (
      <View>
        <Title>{question.question}</Title>
        <Button onPress={this.onPressShowAnswer.bind(this)}>Answer</Button>
        {showAnswer ? <Paragraph>{question.answer}</Paragraph> : undefined}
        <IconButton
          icon="hand-pointing-up"
          size={20}
          onPress={this.onPressCorrect.bind(this)}
        />
        <IconButton
          icon="hand-pointing-down"
          size={20}
          onPress={this.onPressNextQuestion.bind(this)}
        />
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
      <View>
        <Title>Completed Quiz</Title>
        <Subheading>Your scoring: {Math.round((correctAnswers/(deck.questions.length))* 100)} %</Subheading>
        <Button onPress={this.onPressResetQuiz.bind(this)}>Reset Quiz</Button>
        <Button onPress={() => this.props.navigation.goBack()}>Go to Back</Button>
      </View>
    );
  }
  render() {
    const { deck } = this.props;
    const { current } = this.state;
    const view = current >= deck.questions.length ? this.renderCompletedQuiz(): this.renderQuiz()
    return view
  }
}

function mapStateToProps({ decks }) {
  return {
    deck: decks.deck,
  };
}

export default connect(mapStateToProps)(StartQuiz);
