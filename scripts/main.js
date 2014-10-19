(function(){
	'use strict';
	window.Pop = Ember.Application.create();

	Pop.fireRef = new Firebase("https://peopleofpromise.firebaseio.com/");

	Pop.ApplicationAdapter = DS.FirebaseAdapter.extend({
	  firebase: Pop.fireRef 
	});

	Ember.Handlebars.registerBoundHelper('dueDate', function() {
	  return moment().format('LL');
	});

})();
Pop.Goal = DS.Model.extend({
  name: DS.attr('string'),
  skillSet: DS.attr('string'),
  backStory: DS.attr('string'),
  passion: DS.attr('string'),
  marketNeeds: DS.attr('string'),
  steps: DS.hasMany('step', {embedded: true})
});

Pop.ShortTermGoal = DS.Model.extend({
  content: DS.attr('string'),
  isComplete: DS.attr('boolean'),
  date: DS.attr('string')
});

Pop.Step = DS.Model.extend({
  selectedGoalTitle: DS.attr('string'),
  selectedGoalNotes: DS.attr('string'),
  shortGoals: DS.hasMany('shortTermGoal', {embedded: true}),
});

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
Pop.GoalsCreateController = Ember.Controller.extend({
  needs: ['application'],

  goalTitles: [
  {label: 'Skill Building', value: 'Skill Building'},
  {label: 'Brainstorming', value: 'Brainstorming'},
  {label: 'Prototyping', value: 'Prototyping'},
  {label: 'Customer Development', value: 'Customer Development'},
  {label: 'Business Development', value: 'Business Development'}
  ],

  actions: {
    addStep: function(){
      var shortTermGoal = this.store.createRecord('shortTermGoal', {});
      var step = this.store.createRecord('step', {});
      step.get('shortGoals').addObject(shortTermGoal);
      this.get('steps').addObject(step);
    },

    createGoal: function() {
      var shortTermGoal = this.store.createRecord('shortTermGoal', {
        content: this.get('shortGoalItem')
      });
      console.log(shortTermGoal);
      var goal = this.store.createRecord("goal", {
        name: this.get('name'),
        skillSet: this.get('skillSet'),
        backStory: this.get('backStory'),
        passion: this.get('passion'),
        marketNeeds: this.get('marketNeeds')
      });
      goal.get('steps').addObjects( this.get('steps') );
      goal.save();
      this.set('name', '');
      this.set('backStory', '');
      this.set('skillSet', '');
      this.set('passion', '');
      this.set('marketNeeds', '');
      var shortGoal = this.store.createRecord('shortTermGoal', {});
      var step = this.store.createRecord('step', {});
      step.get('shortGoals').addObject(shortGoal);
      this.set('steps', [step]);
    }
}

});

Pop.StepController = Ember.ObjectController.extend({

  actions: {
    addShortGoal: function() {
        var shortGoal = this.store.createRecord('shortTermGoal', {});
        this.get('shortGoals').addObject(shortGoal);
    }
  }
});

Pop.GoalsViewController = Ember.Controller.extend({
  actions: {
    updateRequirements: function(){
      
    }
  }
});

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
                if(authData){
                    console.log(authData.uid);
                    that.set('userID', authData.uid);
                    that.transitionToRoute('clientsView');
                }
                else{
                    alert(err.message);
                }
            });
        }

    },

});
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

Pop.ApplicationRoute = Ember.Route.extend({
    beforeModel: function() {
        if (this.controllerFor('application').get('userID')) {
            this.transitionTo('goals.view');
        }
    }
});
