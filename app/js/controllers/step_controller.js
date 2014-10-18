Pop.StepController = Ember.ObjectController.extend({

  actions: {
    addShortGoal: function() {
        var shortGoal = this.store.createRecord('shortTermGoal', {});
        this.get('shortGoals').addObject(shortGoal);
    }
  }
});
