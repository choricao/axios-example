const URL = 'https://petdibs.herokuapp.com/pets';

const loadPets = () => {
  const petList = $('#pet-list');
  petList.empty();

  // promise: then & catch
  axios.get(URL)
    .then((response) => {
      console.log('inside the .then');
      response.data.forEach((pet) => {
        petList.append(`<li>${pet.name}</li>`);
      });
    })
    .catch((error) => {
      console.log(error);
    })

    console.log('This is after .get');
}

$(document).ready(() => {
  $('#load').click(loadPets);
})
