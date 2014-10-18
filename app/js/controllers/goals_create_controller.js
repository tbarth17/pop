Pop.GoalsCreateController = Ember.Controller.extend({
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
        endGoal: this.get('endGoal')
      });
      goal.get('steps').addObjects( this.get('steps') );
      goal.save();
      this.set('name', '');
      this.set('endGoal', '');
      var shortGoal = this.store.createRecord('shortTermGoal', {});
      var step = this.store.createRecord('step', {});
      step.get('shortGoals').addObject(shortGoal);
      this.set('steps', [step]);
    }
}

});
