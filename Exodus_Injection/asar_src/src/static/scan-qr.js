{
  const script = '../app/scan-qr/index.js'
  if (typeof require === 'function') {
    require(script)
  } else {
    import(script)
  }
}
