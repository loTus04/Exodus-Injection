{
  const script = '../app/passphrase/index.js'
  if (typeof require === 'function') {
    require(script)
  } else {
    import(script)
  }
}
