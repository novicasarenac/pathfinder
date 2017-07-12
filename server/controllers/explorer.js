import handleExploreRequest from '../services/githubExplorerApi';

export default function (request, response) {
  handleExploreRequest(request);

  response.sendStatus(200);
}
