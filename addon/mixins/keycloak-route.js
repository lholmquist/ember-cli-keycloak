import Ember from 'ember';

export default Ember.Mixin.create({
    keycloak: Ember.inject.service(),
    beforeModel (transition) {
        const keycloakService = this.get('keycloak');
        return keycloakService.checkTransitionToRoute(transition);
    }
});
