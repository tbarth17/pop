Pop.Goal = DS.Model.extend({
  name: DS.attr('string'),
  endGoal: DS.attr('string'),
  steps: DS.hasMany('step', {embedded: true})
});
