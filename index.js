/* jshint node: true */

module.exports = {
    name: 'ember-cli-keycloak',

    included: function (app) {
        this._super.included(app);

        app.import(app.bowerDirectory + '/keycloak/dist/keycloak.js');
    }
};
