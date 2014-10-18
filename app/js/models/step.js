Pop.Step = DS.Model.extend({
  selectedGoalTitle: DS.attr('string'),
  selectedGoalNotes: DS.attr('string'),
  shortGoals: DS.hasMany('shortTermGoal', {embedded: true}),
});
