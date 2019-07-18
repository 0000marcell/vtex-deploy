module.exports = function(data, templatename) {
  const x = data.indexOf('<applicationexceptionobject>') + 28
  const y = data.indexOf('</applicationexceptionobject>')
  const obj = JSON.parse(data.substr(x, y - x))
  return `Couldn't save template (${templatename}): ${obj.message}`
}
