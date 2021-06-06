import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';

const ChatThread = props => {
  const {channels, onSelectChannel} = props;
  return (
    <View style={{height: '100%', padding: 2}}>
      {channels.map(c => {
        return (
          <View
            style={{
              borderWidth: 1,
              borderRadius: 6,
              padding: 6,
              marginBottom: 10,
            }}>
            <TouchableWithoutFeedback
              onPress={() => {
                onSelectChannel(c.id);
              }}>
              <Text
                style={{
                  fontSize: 18,
                }}>
                {c.name}
              </Text>
            </TouchableWithoutFeedback>
            <Text
              style={{
                fontSize: 12,
              }}>
              {'Participants: ' + c.participants}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default ChatThread;
