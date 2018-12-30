// header
const
  header = document.getElementById('header'),
  banner = document.getElementById('banner'),
  navLinks = document.getElementsByClassName('nav-link');
// icon toggle
const
  nav = document.getElementById('nav'),
  iconToggler = document.getElementById('icon-toggler'),
  iconLineOne = document.getElementById('icon-line-one'),
  iconLineTwo = document.getElementById('icon-line-two'),
  iconLineThree = document.getElementById('icon-line-three'),
  body = [...document.getElementsByTagName('body')][0],
  head = document.getElementById('head'),
  toggleArgs = [nav, iconLineOne, iconLineTwo, iconLineThree, iconToggler, body];
// skills
const
  activeBorders = document.getElementsByClassName('active-border');
  circles = document.getElementsByClassName('circle'),
  precs = document.getElementsByClassName('prec'),
  precdegs = [270, 220, 300, 200, 180, 160],
  precElementsInfo = [];
  for (let i = 0; i < precdegs.length; i++) {
    precElementsInfo.push({
      target: circles[i],
      args: [activeBorders[i], precs[i], precdegs[i]]
    })
  }
// projects
const
  fixedContainer = document.getElementById('fixed-container'),
  projectCatalogList = document.querySelectorAll('.fixed-container > ul > li > a'),
  projectList = document.getElementsByClassName('project'),
  projectContainer = document.getElementById('projects');

// function
var navChange = require('./js/icon-toggler');
var {percentageControl, allSkillsTurnWrapper} = require('./js/skills-prec');
var AOS = require('aos');
var { scrollButton } = require('./js/banner');
require('./scss/main.scss')
require('./js/canvas');

window.onload = function() {
  // aos
  AOS.init();
  window.addEventListener('resize', () => {AOS.refresh()})
  // header
  iconToggler.addEventListener('click', () => {navChange(...toggleArgs)});
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', () => {navChange(...toggleArgs)});
  }
  // skills
  precElementsInfo.forEach((element) => {
    element.target.addEventListener('mouseover', () => {percentageControl(...element.args)});
  });
  // when scroll to skills section, allSkillsTurn
  allSkillsTurnWrapper(precElementsInfo);
}

window.onscroll = () => {
  // ---header---
    // header scroll fixed
    var bannerTop = banner.getBoundingClientRect().top;
    if ( bannerTop < 40) {
      header.classList.add('header--fixed');
      head.classList.add('head--fixed');
      banner.classList.add('banner--fixed');
    } else {
      header.classList.remove('header--fixed');
      head.classList.remove('head--fixed');
      banner.classList.remove('banner--fixed');
    }

  // ---Projects---
  // project catalog scroll
  var
    projectFourRectTop = projectList[3].getBoundingClientRect().top,
    projectContainerRectTop = projectContainer.getBoundingClientRect().top;

  function clearStyle(projectCatalogList) {
    for (let j = 0; j < 4; j++) {
      projectCatalogList[j].style.borderLeft = null;
      projectCatalogList[j].style.color = null;
    }
  }

  for (let i = 0; i < 4; i++) {
    // if project catalog is around project title 100px, add borderleft
    if (projectList[i].getBoundingClientRect().top > -100 && projectList[i].getBoundingClientRect().top < 100) {
      clearStyle(projectCatalogList);
      projectCatalogList[i].style.borderLeft = "2px solid white";
      projectCatalogList[i].style.color = "white";
    }
  }

  if (projectContainerRectTop >= 0) {
    // make sure is projectone having style
    fixedContainer.style.position = 'absolute'
    clearStyle(projectCatalogList);
    projectCatalogList[0].style.borderLeft = "2px solid white";
    projectCatalogList[0].style.color = "white";
    // if window above projects
  }

  if (projectContainerRectTop < 0 && projectFourRectTop>= -20) {
    // contact projects -> increase margin
    fixedContainer.style.marginTop = '0px';
    fixedContainer.style.position = 'fixed';
  }

  if (projectFourRectTop < -60){
    // make sure is projectfour having style
    clearStyle(projectCatalogList)
    projectCatalogList[3].style.borderLeft = "2px solid white";
    projectCatalogList[3].style.color = "white";
    // margin to 100px above projectFour position
    var marginRange = projectFourRectTop - projectContainerRectTop + 60 ;
    fixedContainer.style.position = 'absolute';
    fixedContainer.style.marginTop = `${marginRange}px`;
  }
}
