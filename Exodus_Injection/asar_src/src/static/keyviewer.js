{
  const script = '../app/keyviewer/index.js'
  if (typeof require === 'function') {
    require(script)
  } else {
    import(script)
  }
}
