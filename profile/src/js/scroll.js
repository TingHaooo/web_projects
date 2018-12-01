AOS = require('aos');

AOS.init();
window.addEventListener('resize', () => {AOS.refresh()})
document.addEventListener('aos:in:skill', ({ detail }) => {
  console.log(detail);
  precElementsInfo.forEach((element) => {
    percentageControl(...element.args)
  });
});
