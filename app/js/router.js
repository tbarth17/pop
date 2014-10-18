Pop.Router.map(function() {
  this.route('goalsCreate', {path: '/goalForm'});
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
