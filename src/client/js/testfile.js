let input = document.getElementById('country'); 
  function sum(input){
    if(input.length >=0 ){
        return input
    } else{
        console.log('Enter valid country code!')
    }
  }
  module.exports = sum;