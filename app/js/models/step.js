Pop.Step = DS.Model.extend({
  monthlyGoalTitle: DS.attr('string'),
  monthlyGoalNotes: DS.attr('string'),
  shortGoals: DS.hasMany('shortTermGoal', {embedded: true}),
});
