Pop.GoalsViewController = Ember.Controller.extend({
    dueDate: function(){
    return moment(this.get('model.date')).zone('+0000').format('MMM Do, YYYY');
  }.property('model.date'),
});
