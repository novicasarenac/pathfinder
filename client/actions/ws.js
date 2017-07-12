/* eslint import/prefer-default-export: "Off" */

import { push } from 'react-router-redux';

export function onWsMessage(message) {
  return (dispatch, getState) => {
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

      case 'INTERESTING_PEOPLE': {
        const { people } = jsonMessage;

        dispatch({ type: 'INTERESTING_PEOPLE', people });
        break;
      }

      case 'RECOMMENDED_REPOS': {
        const { repos } = jsonMessage;

        dispatch({ type: 'RECOMMENDED_REPOS', repos });
        break;
      }

      case 'EXPLORE_RECOMMENDATION': {
        const { repos, people } = jsonMessage;

        dispatch({ type: 'EXPLORE_RECOMMENDATION', repos, people });
        dispatch(push('/explore-result'));
        break;
      }

      default:
        throw new Error('Unknown action type.');
    }
  };
}
