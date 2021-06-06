import React, {useState, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {View} from 'react-native';
const user = Date.now();

const ChatBox = props => {
  const {onSendMessage, channel} = props;
  const [messages, setMessage] = useState([]);

  useEffect(() => {
    const {messages} = channel;
  }, []);

  const onSend = (messages = []) => {
    const {text, user} = messages[0];

    onSendMessage(channel.id, text, user);

    setMessage(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  };

  return (
    <View style={{height: '100%'}}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: user,
        }}
      />
    </View>
  );
};

export default ChatBox;
