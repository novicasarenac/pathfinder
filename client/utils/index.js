import Languages from 'json-loader!yaml-loader!../public/languages.yml';

export default {
  getColorForLanguage(language) {
    if (language === 'Other') {
      return '#8f9696';
    }

    return Languages[language].color;
  }
};
