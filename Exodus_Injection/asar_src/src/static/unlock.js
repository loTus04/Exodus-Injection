{
  const script = '../app/unlock/index.js'
  if (typeof require === 'function') {
    require(script)
  } else {
    import(script)
  }
}
