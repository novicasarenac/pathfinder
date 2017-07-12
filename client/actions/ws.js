/* eslint import/prefer-default-export: "Off" */

import { push } from 'react-router-redux';

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

      case 'RECOMMENDED_REPOS': {
        const { repos } = jsonMessage;

        dispatch({ type: 'RECOMMENDED_REPOS', repos });
        break;
      }

      case 'EXPLORE_RECOMMENDED_REPOS': {
        const { repos } = jsonMessage;

        dispatch({ type: 'EXPLORE_RECOMMENDED_REPOS', repos });
        dispatch(push('/explore-result'));
        break;
      }

      default:
        throw new Error('Unknown action type.');
    }
  };
}
