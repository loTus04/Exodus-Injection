{
  const script = '../app/network/index.js'
  if (typeof require === 'function') {
    require(script)
  } else {
    import(script)
  }
}
