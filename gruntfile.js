module.exports = function(grunt) {

  grunt.initConfig({
    release: {
      options: {
        npm: true,
        tagName: 'v<%= version %>',
        commitMessage: 'v<%= version %>',
        github: {
          repo: 'geddski/jsvars-loader',
          usernameVar: 'GITHUB_USERNAME',
          passwordVar: 'GITHUB_PASSWORD'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-release');
};