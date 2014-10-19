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
