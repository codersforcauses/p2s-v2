import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import minifyTheme from 'minify-css-string';

Vuetify.config.silent = process.env.NODE_ENV === 'production';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#BD342D',
        secondary: '#2F2F2F',
        info: '#6abecf',
        success: '#82cf6a',
        warning: '#f1d778',
        error: '#ff4848',
        grey: '#9E9E9E',
      },
      dark: {
        primary: '#F87F79',
        secondary: '#E3E3E3',
        info: '#6abecf',
        success: '#82cf6a',
        warning: '#f1d778',
        error: '#ff4848',
        grey: '#9E9E9E',
      },
    },
    options: {
      customProperties: true,
      minifyTheme,
    },
  },
});
