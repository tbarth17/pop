Pop.ApplicationController = Ember.Controller.extend({
	userID: null,

	actions:{
		logOut: function(){
			Pop.fireRef.unauth();
			this.set('userID', '');
			localStorage.clear();
			this.transitionToRoute('index');
		},
		logIn: function(){
			this.transitionToRoute('index');
		}
	}
})