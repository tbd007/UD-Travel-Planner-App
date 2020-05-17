let city = document.getElementById('city').value;
let weather =  document.getElementById('weatherdata').innerHTML;
let showlocation= document.getElementById('showlocation').innerHTML;
let tripdate= document.getElementById('start').value;


  
function getMyDateValue(e) {
  // Get the date value from the srcElement of the event
 var tripdate = e.srcElement.value;
 console.log(tripdate);
 return tripdate;
}
 
   // Add an event listener to my date field 
 document.getElementById("start").addEventListener("blur", getMyDateValue);


let d= Date.parse(tripdate);
const e= d+86400000;
const f = new Date(e);
const g = f.toLocaleDateString();
let end_date= g.split(".").reverse().join("-");
let h = end_date.substring(5,9);
let k = tripdate.substring(5,10)
console.log(tripdate)
console.log(h)
console.log(k)

function getDiff(){
var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 

    if(mm<10) 
    {
        mm='0'+mm;
    } 
    today = yyyy+'-'+mm+'-'+dd;

    //start_date = today;
    
    var diff =  Math.floor(
        (
            Date.parse(
                tripdate.replace(/-/g,'\/')
        ) - Date.parse(
                today.replace(/-/g,'\/')
        )               
        ) / 86400000);
    return diff;
 };

let days=getDiff();
console.log(days);

function handleSubmit(event) {
    event.preventDefault();
    var element = document.getElementById('tripdet');
    while (element.firstChild) {
    element.removeChild(element.firstChild);
}

    element.appendChild(document.createTextNode('Have a great time in'));

    var myHeaders = new Headers();
    myHeaders.append("Cookie", "__cfduid=d88c3b1a90c6c7a4fea01e54ba2e42d551589229895; anonymous_user_id=e1ab9c13-8313-4261-ab24-732bfef00ea3");

    var requestOptions = {
     method: 'GET',
     headers: myHeaders,
     redirect: 'manual'
};
    var baseURL = 'https://pixabay.com/api/?key=16498996-0f6bf46abae67fbc41a48e725&q=';
    var city = document.getElementById('city').value;
    var append = '&image_type=photo';
    var url = baseURL+city+append;
    console.log(url);
    fetch(url, requestOptions)
    .then(response => response.text())
    .then(response => {
        const pic = JSON.parse(response);
        console.log(pic);    
        let mainpic=pic.hits[0].largeImageURL;
        document.getElementById('mainpic').innerHTML = `<img class="mainimg" src=${mainpic}>`;
        }) 
    .catch(error => console.log('error', error));




    var requestOptions = {
        method: 'POST',
        redirect: 'manual'
      };

    var base = 'https://secure.geonames.net/postalCodeSearchJSON?placename='  ;
    var end = '&maxRows=10&username=tbd82';
    var code = '&country=';
    let country = document.getElementById('countryCode').value;
    let geourl= base+city+code+country+end;
    //console.log(geourl);

    
      fetch(geourl, requestOptions)
        .then(response => response.text())
        .then(response =>{
            const data = JSON.parse(response);
            console.log(data);
            let lat = data.postalCodes[0].lat;
            let lon = data.postalCodes[0].lng;

            var myHeaders = new Headers();
             var requestOptions = {
             method: 'POST',
            headers: myHeaders,
            redirect: 'manual'
            };
            
            const starturl= 'https://api.weatherbit.io/v2.0/current?';
            let coords='&';
            let fill = '&tp=daily'
            const key= '&key=26ae9063bb3a405f9e9ba923caed9fd1';
            let weatherurl= starturl+'lat='+lat+coords+'lon='+lon+key;
            //console.log(weatherurl);

            const forcurl= 'https://api.weatherbit.io/v2.0/normals?';
            let forecasturl= forcurl+'lat='+lat+coords+'lon='+lon+'&start_day='+k+'&end_day='+h+fill+key;
            console.log(forecasturl);


            if (days < 7){
            fetch(weatherurl, requestOptions)
              .then(response => response.text())
              .then(response => {
              const weather = JSON.parse(response);
              console.log(weather);    
              let temp=weather.data[0].temp;
              let desc=weather.data[0].weather.description;
    
              document.getElementById('weatherdata').innerHTML = `Current weather: ${temp}°C ${desc}`;
              document.getElementById('showlocation').innerHTML = `${city}`;
              document.getElementById('showdate').innerHTML = `${tripdate}`;
              
              })
              .catch(error =>{
                console.log(error);
              });  
             
            } else {
              fetch(forecasturl, requestOptions)
              .then(response => response.text())
              .then(response => {
              const weather = JSON.parse(response);
              console.log(weather);    
              let temp=weather.data[0].max_temp;
              let desc=weather.data[0].min_temp;
                
              document.getElementById('weatherdata').innerHTML = `Typical weather for travel date: max ${temp}°C, min ${desc}°C`;
              document.getElementById('showlocation').innerHTML = `${city}`;
              document.getElementById('showdate').innerHTML+=`${tripdate} : Departure in ${days} days!`;
              }) 
              .catch(error => console.log('error', error));
            }
        })        
        .catch(error => console.log('error', error));             
};


 function addTrip(event) {
    event.preventDefault();
    var city = document.getElementById('city').value;
    document.getElementById('date').innerHTML+=`<p>${tripdate} : Departure in ${days} days!</p>`;
    document.getElementById('location').innerHTML=`<p>${city}</p>`;   
 }


const form = document.getElementById('add_details')
const ul = document.querySelector('ul')
const button = document.querySelector('#clearitems')
const button2 = document.getElementById('printitems');
const input = document.getElementById('item')
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

localStorage.setItem('items', JSON.stringify(itemsArray))


const liMaker = text => {
    const li = document.createElement('li')
    li.textContent = text
    ul.appendChild(li)
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault()
    
    itemsArray.push(input.value)
    localStorage.setItem('items', JSON.stringify(itemsArray))
    liMaker(input.value)
    input.value = ''
    
  })

  button.addEventListener('click', e=> {
    e.preventDefault();
    localStorage.clear()
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild)
    }
  }) ;

  button2.addEventListener('click', e =>{
    e.preventDefault();
    window.print();
  });



    
  

export {handleSubmit}
export {addTrip}
export {getDiff}



