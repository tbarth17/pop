Pop.Router.map(function() {
  this.route('goalsCreate', {path: '/goalForm'});
  this.route('goalsView', {path: '/viewGoals'});
});

Pop.GoalsCreateRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this._super(controller, model);
    var shortGoal = this.store.createRecord('shortTermGoal', {});
    var step = this.store.createRecord('step', {});
    step.get('shortGoals').addObject(shortGoal);
    controller.set('steps', [step]);
  }
});

Pop.GoalsViewRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('goal', '-JZZAE9Y5jppFyyUSrS9');
  }
});
