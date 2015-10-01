'use strict';
module.exports = function(grunt) {
  return {
    main: {
      files: [
      {
        cwd: '',
        src: 'src/tmpl/index.html',
        dest: 'public/index.html'
      },
      { src : 'node_modules/leaflet/dist/leaflet.css', dest :'public/css/leaflet.css'}
      ]
    }
  };
};
