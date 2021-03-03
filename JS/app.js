const select = document.getElementById('breeds');
const card = document.querySelector('.card');
const form = document.querySelector('form');


// FETCH API

function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(res => res.json())
        .catch(error => console.log('Looks like there were a problem', error))
}


Promise.all([
    fetchData('https://dog.ceo/api/breeds/list'),
    fetchData('https://dog.ceo/api/breeds/image/random')
])
.then(data => {
    const breedList = data[0].message;
    const randomImage = data[1].message;

    generateOption(breedList);
    generateImage(randomImage);

})


 


//Function helpers 

function checkStatus(response) {
    if(response.ok) {
        return Promise.resolve(response);
    }
    else {
        return Promise.reject(new Error(response.statusText));
    }
}

function generateOption(data) {
    const options = data.map(item => `
        <option value ='${item}'>${item}</option>
    
    `).join('');
    select.innerHTML = options;
}



function generateImage (data) {
    const html = `
        <img src = '${data}' alt>
        <p>Click to view Images of ${select.value}s</p>
    `;
    card.innerHTML = html;
}


function fetchBreedImage() {
    const breed = select.value;
    const img = card.querySelector('img');
    const p = card.querySelector('p');
    fetchData(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(data => {
        img.src = data.message;
        img.alt =breed;
        p.textContent = `Click to view more ${breed}s`;

    });
}

// Evetn Listener 
select.addEventListener('change',fetchBreedImage);
card.addEventListener('click', fetchBreedImage);
form.addEventListener('submit',postData);
//Post Data


function postData(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;
    const config = {
        method: 'POST' ,
        headers: {
            'Content-type':'application/json'
        },
        body: JSON.stringify({ name,comment})
    };
    fetch('https://jsonplaceholder.typicode.com/comments',config)
    .then(checkStatus)
    .then(res => res.json())
    .then(data => console.log(data))
}