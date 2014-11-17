Pop.Router.map(function() {
  this.route('goalsCreate', {path: '/goalForm'});
  this.resource('goals', function(){
    this.route('view', {path: ':goal_id'});
  });
  this.route('clientsView', {path: '/clientsView'});
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
  model: function(params) {
    return this.store.find('goal', params.goal_id);
  }
});

Pop.ClientsViewRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('goal');
  }
});

Pop.IndexRoute = Ember.Route.extend({
    beforeModel: function() {
            this.transitionTo('goalsCreate');
    }
});
