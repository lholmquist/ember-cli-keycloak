/* jshint node: true */

module.exports = {
    normalizeEntityName: function () {},
    afterInstall: function () {
        return this.addBowerPackageToProject('keycloak', '~2.2.1');
    }
};

