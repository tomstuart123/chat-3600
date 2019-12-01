import React from 'react';
import firebase from './src/firebase/firebase';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
} from 'react-360';

export default class chat_3600 extends React.Component {

  constructor() {
    super();
    this.state = {
      messageList: [],
      userName: '',
      messageDetail: [],
      userArray: [],
    }
  }

  componentDidMount = () => {
    console.log('firebase run')
    const chatrooms = firebase.database().ref('chatrooms');
 
    chatrooms.on('value', (chatroom) => {
      const chatrooms = chatroom.val();
      const chatroomPush = chatrooms['publicRoom'];
      let messageArray = [];
      console.log('run')
      for (let message in chatroomPush) {
        messageArray.push(chatroomPush[message])
      }      
      // when chatroom changes, push the entire chatroom message to state

      this.setState({
        messageList: messageArray,
        userName: '3jsUser1',
        
      })

      
    })
  }

  render() {
      return (
      <View style={styles.panel}>
        <View style={styles.greetingBox}>
          <Text style={styles.greeting}>
            Welcome to Chattr3
          </Text>
          {
          this.state.messageList.map((message) => {
            return (
              <Text style={styles.greeting}>{`${message.userID}`}: {`${message.userMessage}`}</Text>
            )
          })
          }
          
        </View>
        <VrButton>
          <Text>+</Text>
        </VrButton>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
    width: 800,
    height: 400,
  },
  greeting: {
    fontSize: 30,
  },
});

AppRegistry.registerComponent('chat_3600', () => chat_3600);
