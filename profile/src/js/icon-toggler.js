module.exports= function navChange(nav, iconLineOne, iconLineTwo, iconLineThree, iconToggler, body) {
  nav.classList.toggle('open');
  iconLineOne.classList.toggle('icon-line-one-change');
  iconLineTwo.classList.toggle('icon-line-two-change');
  iconLineThree.classList.toggle('icon-line-three-change');
  iconToggler.classList.toggle('icon-toggler-fixed');
  body.classList.toggle('overflow-hidden');
}
