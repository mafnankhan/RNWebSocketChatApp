import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import {View} from 'react-native';

import ChatBox from './ChatBox';
import ChatThreads from './ChatThreads';
let socket = null;
let globalChannels = null;

const Chat = props => {
  const {serverUrl, wsUrl} = props;
  const [channel, setChannel] = useState(null);
  const [channels, setChannels] = useState(null);

  const loadChannels = () => {
    fetch(`${serverUrl}/getChannels`).then(async response => {
      let data = await response.json();
      setChannels(data.channels);
      globalChannels = data.channels;
    });
  };

  const connection = () => {
    if (channel) {
      handleChannelSelect(channel.id);
    }
  };

  const channelCallback = channel => {
    let ch = channels;
    let cc = globalChannels;
    if (ch) {
      ch.forEach(c => {
        if (c.id === channel.id) {
          c.participants = channel.participants;
        }
      });
    } else {
      cc.forEach(c => {
        if (c.id === channel.id) {
          c.participants = channel.participants;
        }
      });
    }
    if (ch) {
      globalChannels = ch;
      setChannels(ch);
    } else {
      globalChannels = cc;
      setChannels(cc);
    }
  };

  const message = message => {
    let nc = channels;
    let cc = globalChannels;

    if (nc) {
      nc.forEach(c => {
        if (c.id === message.channel_id) {
          if (!c.messages) {
            c.messages = [message];
          } else {
            c.messages.push(message);
          }
        }
      });
    } else {
      cc.forEach(c => {
        if (c.id === message.channel_id) {
          if (!c.messages) {
            c.messages = [message];
          } else {
            c.messages.push(message);
          }
        }
      });
    }

    if (nc) {
      globalChannels = nc;
      setChannels(nc);
    } else {
      globalChannels = cc;
      setChannels(cc);
    }
  };

  const handleChannelSelect = id => {
    let ch = globalChannels.find(c => {
      return c.id === id;
    });
    setChannel(ch);
    socket.emit('channel-join', id, ack => {});
  };

  const handleSendMessage = (channel_id, text, user) => {
    socket.emit('send-message', {
      channel_id,
      text,
      senderName: socket.id,
      id: user,
    });
  };

  const configureSocket = () => {
    socket = io.connect(serverUrl, {
      transports: ['polling'],
      reconnection: true,
      reconnectionDelay: 500,
      jsonp: false,
      reconnectionAttempts: 5,
    });

    socket.on('connection', connection);

    socket.on('channel', channelCallback);

    socket.on('message', message);
  };

  useEffect(() => {
    loadChannels();
    configureSocket();
  }, [serverUrl]);

  return (
    <View style={{height: '100%'}}>
      {channels && !channel && (
        <ChatThreads
          channels={channels}
          onSelectChannel={handleChannelSelect}
        />
      )}
      {channel ? (
        <ChatBox onSendMessage={handleSendMessage} channel={channel} />
      ) : null}
    </View>
  );
};

export default Chat;
