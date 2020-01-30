exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('dogs')
    .truncate()
    .then(function() {
      return knex('dogs').insert([
        { name: 'jasper' },
        { name: 'albi' },
        { name: 'amber' },
        { name: 'rocky' },
      ]);
    });
};