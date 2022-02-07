document.addEventListener('DOMContentLoaded', () => {
//all code within here  
function getDogs() {fetch('http://localhost:3000/dogs',{
  method: 'GET',
  headers:
  {
    "Content-type" : "application/json",
    }
})
.then (response => {return response.json()})
.then (function(data){
  let dogArray = data
  let tableBody = document.getElementById("table-body");
  for (let dog of dogArray){
        let dogName = dog.name
        let dogBreed = dog.breed 
        let dogId = dog.id 
        let dogSex = dog.sex 
    //create rows
        let trDogRow = document.createElement("tr")
        trDogRow.className = dogName
        trDogRow.id = dogId
    //create data in row    
        let tdDogName = document.createElement('td')
        tdDogName.className = dogName
        tdDogName.textContent = dogName
        let tdDogBreed = document.createElement('td');
        tdDogBreed.textContent = dogBreed
        tdDogBreed.className = dogName
        let tdDogSex = document.createElement('td');
        tdDogSex.textContent = dogSex
        tdDogSex.className = dogName
    //create edit button
        let editButton = document.createElement('button');
        editButton.textContent = "Edit dog"
        editButton.addEventListener('click', handleEdit)
        editButton.id = "editButton"

    //append table
        tableBody.append(trDogRow);
        trDogRow.append(tdDogName, tdDogBreed, tdDogSex, editButton)

        
  }
})
}

getDogs()
dogIdArray = []

function handleEdit(e){

  let button = e.target
  let dogRow = button.parentElement
  let dogName = dogRow.className
  dogIdArray.unshift(dogRow.id)
  console.log(dogIdArray)
  let editButton = document.getElementById('editButton')
  let dogForm = document.getElementById("dog-form");
  let editDogInfo = document.getElementsByClassName(`${dogName}`)
  let dogFormName = editDogInfo[1].textContent
  let dogFormBreed = editDogInfo[2].textContent
  let dogFormSex = editDogInfo[3].textContent
  let dogFormNameBox = document.getElementsByName("name")//.placeholder = ''
  let dogFormBreedBox = document.getElementsByName("breed")
  let dogFormSexBox = document.getElementsByName("sex")
  let submitButton = document.querySelector(value = "Submit")
  dogForm.addEventListener("submit", handleDogEditSubmit)
  dogFormNameBox[0].placeholder = dogFormName
  dogFormBreedBox[0].placeholder = dogFormBreed
  dogFormSexBox[0].placeholder = dogFormSex
  //console.log(dogFormNameBox[0].placeholder)
}

function handleDogEditSubmit(e){
  //e.preventDefault()
  console.log(e.target.parentElement)
 
 let newDogName = e.target[0].value
 let newDogBreed = e.target[1].value
 let newDogSex = e.target[2].value
 let dogId = dogIdArray[0]
 let getDogs = fetch(`http://localhost:3000/dogs/${dogId}`,{
  method: 'PATCH',
  headers:
  {
    "Content-type" : "application/json",
    },
  body:JSON.stringify(
  {
    "name" : newDogName,
    "breed" : newDogBreed,
    "sex" : newDogSex
  })
})

.then (response => {return response.json()})
.then (function(data){
  console.log(data)
  getDogs()
}

)


}

//all code within here  
})