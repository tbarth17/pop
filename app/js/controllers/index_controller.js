Pop.IndexController = Ember.Controller.extend({
    needs: ['application'],
    userID: Ember.computed.alias('controllers.application.userID'),
    actions: {

        login: function() {
            var that = this;
            Pop.fireRef.authWithPassword({
                email: this.get('email'),
                password: this.get('pass'),
            }, function(err, authData) {
                console.log(authData.uid);
                that.set('userID', authData.uid);
                that.transitionToRoute('clientsView');
            });
        }

    },

});