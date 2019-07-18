const rl = require('readline');

/**
* Ask for user input
* returns a promise
* the answer must be given
*/
module.exports = function(question) {
  const r = rl.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise((resolve, reject) => {
    r.question(question + '\n', function(answer) {
      r.close()

      if (answer) resolve(answer)
      else { reject('No answer!') }
    })
  })
}
