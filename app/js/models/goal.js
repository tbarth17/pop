Pop.Goal = DS.Model.extend({
  name: DS.attr('string'),
  skillSet: DS.attr('string'),
  backStory: DS.attr('string'),
  passion: DS.attr('string'),
  marketNeeds: DS.attr('string'),
  steps: DS.hasMany('step', {embedded: true})
});
