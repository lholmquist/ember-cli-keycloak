import Ember from 'ember';

export default Ember.Service.extend({
    _kcInit () {
        return new Ember.RSVP.Promise((resolve, reject) => {

            this.keycloak.init().success(() => {
                console.log('success on init');

                this.keycloak.loadUserProfile();
                return resolve(this.keycloak);
            }).error((err) => {
                console.log('error on init', err);
                return reject();
            });
        });
    },
    init () {
        this._super(...arguments);

        this.keycloak = new Keycloak('/keycloak.json');
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
            // Keycloak has already been initialized
            if (this.keycloak.clientId) {
                if (this.keycloak.authenticated) {
                    // They are logged in
                    // Resolve,  maybe shou
                    return resolve(this.keycloak);
                }

                // They are not loggged in after init, so do the login
                this.keycloak.login();
                return;
            } else {
                // Keycloak has not yet been initalized, so we need to call the init function
                this.keycloak.init().success(() => {
                    // Keycloak is now initialized
                    // We check to see if they are authenticated since this could be from a redirect
                    if (this.keycloak.authenticated) {
                        // They are logged in
                        // Resolve,  maybe should check the token?
                        return resolve(this.keycloak);
                    }

                    // They are not loggged in after init, so do the login
                    this.keycloak.login();
                    return;
                }).error((err) => {
                    console.log('Keycloak init failed', err);
                    return reject(err);
                });
            }
        });
    }
});
