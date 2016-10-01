import Ember from 'ember';
import KeycloakRouteMixin from 'ember-cli-keycloak/mixins/keycloak-route';
import { module, test } from 'qunit';

module('Unit | Mixin | keycloak route');

// Replace this with your real tests.
test('it works', function(assert) {
  let KeycloakRouteObject = Ember.Object.extend(KeycloakRouteMixin);
  let subject = KeycloakRouteObject.create();
  assert.ok(subject);
});
