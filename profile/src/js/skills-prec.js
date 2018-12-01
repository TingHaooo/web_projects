function percentageControl(border, prec, deg, colorOne = 'rgb(227, 227, 227)', colorTwo = '#4D97D7') {
  //set image-background : linear-gradient degree
  var basicDegOne = 90, basicDegTwo = 90, currentDeg = 0;
    //Loop setTimeout function for delay circle rotate
    function degLoop (currentDeg) {

      setTimeout(function() {
        //get score form deg
        var
          score  = (Math.floor((10 * currentDeg / 360) * 100) / 100).toString();
          integer = score.split('.')[0],
          fractionalNumber = score.split('.')[1];
        if (fractionalNumber) prec.innerHTML = integer + '.' + fractionalNumber.fontsize('3');
        //rotate first image-background if deg <= 180
        if (currentDeg <= 180){
          border.style.backgroundImage = [
            `linear-gradient(${basicDegOne++}deg, transparent 50%, ${colorOne} 50%)`,
            `linear-gradient(90deg, ${colorOne} 50%, transparent 50%)`
          ];
        }
        //rotate second image-background if deg > 180
        if (currentDeg > 180) {
          border.style.backgroundImage = [
            `linear-gradient(${basicDegTwo++}deg, transparent 50%, ${colorTwo} 50%)`,
            `linear-gradient(90deg, ${colorOne} 50%, transparent 50%)`
          ];
        }
        // if not finished rotate yet, continue recursion
        if (deg > currentDeg) {
          currentDeg++;
          degLoop(currentDeg);
        }

      }, 1);
  }

  //start Loop
  degLoop(currentDeg);
}


//all skills turn
function allSkillsTurnWrapper (precElementsInfo) {
  const allSkillsTurn = () => {
    precElementsInfo.forEach((element) => {
      percentageControl(...element.args)
    });
    document.removeEventListener('aos:in:skill', allSkillsTurn);
  }

  document.addEventListener('aos:in:skill', allSkillsTurn);
}


module.exports = {
  allSkillsTurnWrapper,
  percentageControl
}
