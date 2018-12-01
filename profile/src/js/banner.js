const scrollButton = (anchor) => {
  console.log(anchor.clientHeight, anchor.offsetHeight, anchor.scrollHeight);
  window.scrollTo(0, anchor.clientHeight);
}

module.exports = {
  scrollButton
}
