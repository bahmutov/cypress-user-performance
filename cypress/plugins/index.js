// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
require('console.table')

module.exports = (on, config) => {
  on('task', {
    saveMeasures (measures) {
      const filtered = measures.filter(s => Boolean(s)).map(({duration}, k) => ({
        test: k + 1,
        'duration (ms)': Math.round(duration)
      }))

      console.table('Page load timings', filtered)

      return null
    }
  })
}
