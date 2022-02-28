
/**
 * Return a fuction and it will be used to generate the next number of the operation
 * 
 * @param {string} symbol 
 * @param {number} prev 
 */

/**
 * Get a random number from zero to range passed as parameter (default 100)
 * 
 * @param {number} range 
 */
const queryParams = new URLSearchParams(window.location.search);
const dif = queryParams.get('dif') ? queryParams.get('dif') : 'b';

const getRandomNumber = (min,max) => {  

    return  ((Math.random() * (max - min)) + min).toFixed()
}
/**
 * Return an math operation depending of the user's point.
 * 
 * @param {number} points 
 */
//unit 1,2,3
const generateAdditionProblem = (unit,difs) => {
    const lv = 1;
    let question = []
    //check 
    if (unit == 4 && dif =='b')
    {
        
        for (var i = 0; i < 5; i++) {
            question.push(getRandomNumber(0, 10));
        }
        question = question.sort(() => Math.random() - 0.7)
            
    }
    else if (unit == 4 && dif =='i')
    {

        for (var i = 0; i < 9; i++) {
            question.push(getRandomNumber(11, 21));
        }
        question = question.sort(() => Math.random() - 0.4)
    }
    
    else if (unit == 4 && dif =='h')
    {
        for (var i = 0; i < 13; i++) {
            question.push(getRandomNumber(22, 30));
        }
        question = question.sort(() => Math.random() - 0.55)
    }
    

   // let firstNumber = getRandomNumber(dif);
    let symbol = "+";
    //let secondNumber = getRandomNumber(dif);
    //let problem = firstNumber
    //problem += `${secondNumber} ${thirdNumber} ${fourthnumber} ${fivenumber}`
    return {question }
}



export default {
    generateAdditionProblem,
}