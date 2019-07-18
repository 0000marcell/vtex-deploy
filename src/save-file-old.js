module.exports = async function(filepath) {
  try {
    const authCookie = await getAuthCookie()
    const requestToken = await getRequestToken()
    const host = baseURL.replace(/(http:|https:|\/)/g, '')

    const form = new FormData()
    form.append('Filename', filepath)
    form.append('fileext', '*.jpg;*.png;*.gif;*.jpeg;*.ico;*.js;*.css')
    form.append('folder', '/uploads')
    form.append('Upload', 'Submit Query')
    form.append('requestToken', requestToken)
    form.append('Filedata', createReadStream(filepath))

    const { statusCode } = await new Promise((resolve, reject) => {
      form.submit({
        host,
        'path': '/admin/a/FilePicker/UploadFile',
        'headers': {
          'Cookie': `VtexIdclientAutCookie=${authCookie};`,
          'Content-Type': form.getHeaders()['content-type']
        }
      }, (err, res) => {
        if (err) reject(err)
        resolve(res)
      })
    })

    if (statusCode.toString().substr(0, 1) !== '2') throw new Error(`Couldn\'t save file: ${filepath} (Error: ${statusCode})`)

    return `File: ${filepath} saved!`
  } catch(err) { console.error(err) }
}
