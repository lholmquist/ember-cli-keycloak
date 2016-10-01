import Ember from 'ember';

export default Ember.Service.extend({
    init () {
        this._super(...arguments);
        this.keycloak = null;
    },
    // Function to setup Keycloak and init it
    keycloakInit (options) {
        this.keycloak = new Keycloak(options);
        return new Ember.RSVP.Promise((resolve, reject) => {
            this.keycloak.init().success(() => {
                resolve(this.keycloak);
            }).error((err) => {
                console.log('Keycloak init failed', err);
                reject(err);
            });
        });
    },
    loadUserProfile () {
        return new Ember.RSVP.Promise((resolve, reject) => {
            this.keycloak.loadUserProfile().success((profile) => {
                return resolve(profile);
            }).error((err) => {
                return reject(err);
            });
        });
    },
    login () {
        return new Ember.RSVP.Promise((resolve, reject) => {
            // Keycloak has already been initialized.
            if (this.keycloak.authenticated) {
                // They are logged in
                // Resolve,  maybe should check the token status eventually
                return resolve(this.keycloak);
            }

            // They are not loggged in after init, so do the login
            this.keycloak.login();
            return reject();
        });
    }
});
