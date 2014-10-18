window.Pop = Ember.Application.create();

Pop.ApplicationAdapter = DS.FirebaseAdapter.extend({
  firebase: new Firebase("https://peopleofpromise.firebaseio.com/")
});
