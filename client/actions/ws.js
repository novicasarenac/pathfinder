/* eslint import/prefer-default-export: "Off" */

export function onWsMessage(message) {
  return (dispatch) => {
    const jsonMessage = JSON.parse(message);

    switch (jsonMessage.type) {
      case 'CONNECTED': {
        const { id } = jsonMessage;

        dispatch({ type: 'SOCKET_CONNECTED', id });
        break;
      }

      case 'LANG_STATS': {
        const { percentages } = jsonMessage;

        dispatch({ type: 'LANGUAGE_USAGE_STATS', percentages });
        break;
      }

      case 'SIMILAR_FRIENDS': {
        const { friends } = jsonMessage;

        dispatch({ type: 'SIMILAR_FRIENDS_STATS', friends });
        break;
      }

      default:
        console.log(message);
    }
  };
}
