const URL = 'https://petdibs.herokuapp.com/pets';

const reportStatus = (message) => {
  $('#status-message').html(message);
}

const loadPets = () => {
  const petList = $('#pet-list');
  petList.empty();

  reportStatus('Loading Pets! Please Wait...');

  // promise: then & catch
  axios.get(URL)
    .then((response) => {
      console.log('inside the .then');
      response.data.forEach((pet) => {
        petList.append(`<li>${pet.name}</li>`);
      });
      reportStatus('Pets Loaded!')
    })
    .catch((error) => {
      console.log(error);
      reportStatus(`Error: ${error.message}`);
    })

    console.log('This is after .get');
}

$(document).ready(() => {
  $('#load').click(loadPets);
})
