import React, { Component } from 'react';
import friends from './friends.json';
import {Jumbotron, Grid, Row, Panel, Col} from 'react-bootstrap';
import top from './top.jpg';
import './App.css';

const style = {
  'height':'200px',
  'text': 'center'
}

class App extends Component {
  state = {friends, 
    score:0
  }

  friendClicker = (id)=>{
    console.log('friend.id,', id)
    let newScore = this.state.score
    let newFriends = [...this.state.friends]
    let correctGuess = false;
    newFriends.forEach(friend => {
      if (id === friend.id) {
        if (friend.clicked) {
          console.log("game is over")
          newScore = 0;
          friend.clicked = false
          console.log(friend)
          
        } else {
          correctGuess = true;
          friend.clicked = true
          console.log("score goes up")
          newScore = this.state.score + 1;
          console.log(newScore)
        }
      } 
    })
    if (correctGuess) {
      this.setState({
        friends:this.shuffleData(newFriends), 
        score: newScore
      })
    } else {
      this.setState({
        friends:this.shuffleData(newFriends), 
        score: newScore
      },function(){
        console.log("State updated", this.state.friends)
      })
    }
  }

  shuffleData = data => {
    let i = data.length - 1;
    while (i > 0) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = data[i];
      data[i] = data[j];
      data[j] = temp;
      i--;
    }
    return data;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={top} className="App-top" alt="top" />
        </header>
        <Grid>
          <Jumbotron>
            <h2>Bondi Hipsters Clicker Game!</h2>
            <h4>Your score is: {this.state.score} </h4>
          </Jumbotron>
          <Row>
            {this.state.friends.map(friend => {
              return (
                <Col sm={3} key={friend.id} onClick={() => this.friendClicker(friend.id)}>
                <Panel>
                  <Panel.Heading>
                    {friend.name}
                  </Panel.Heading>
                  <Panel.Body>
                    <img src={friend.image} style={style} className='img-responsive center-block' alt={friend.name} />
                  </Panel.Body>
                </Panel>
              </Col>
              )
            })}
          </Row>
        </Grid>

      </div>
    );
  }
}

export default App;
