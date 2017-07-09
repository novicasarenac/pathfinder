import yamlParser from 'js-yaml';
import axios from 'axios';

class GithubLanguageColors {
  constructor() {
    this.colors = {};

    axios
      .get(
        'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml'
      )
      .then((response) => {
        this.colors = yamlParser.safeLoad(response.body);
      });
  }

  getColorForLanguage(language) {
    if (language === 'Other') {
      return '#8f9696';
    }

    return this.colors[language].color;
  }
}

export default GithubLanguageColors;
