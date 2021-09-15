import React, {useReducer} from 'react';

const StatusMessages = ({messages}) =>
  messages.length ? (
    <div id="messages" role="alert">
      {messages.map((m, i) => (
        <div key={i}>{maybeLink(m)}</div>
      ))}
    </div>
  ) : (
    ''
  );

const maybeLink = (m) => {
  const piDashboardBase = 'https://dashboard.stripe.com/test/payments';
  return (
    <span dangerouslySetInnerHTML={{__html: m.replace(
      /(pi_(\S*)\b)/g,
      `<a href="${piDashboardBase}/$1" target="_blank">$1</a>`
    )}}></span>
  )
};

// Small hook for adding a message to a list of messages.
const useMessages = () => {
  // helper for displaying status messages.
  return useReducer((messages, message) => {
    // Embed link
    return [...messages, message];
  }, []);
};

export default StatusMessages;
export {useMessages};