(function(){
	'use strict';
	window.Pop = Ember.Application.create();

	Pop.fireRef = new Firebase("https://peopleofpromise.firebaseio.com/");

	Pop.ApplicationAdapter = DS.FirebaseAdapter.extend({
	  firebase: Pop.fireRef
	});
})();
