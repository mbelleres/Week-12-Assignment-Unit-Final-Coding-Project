//To run server:
//cd into the project directory
//run: json-server --watch db.json

/*** STATE ***/
// When we're connecting an appto a backend, the state starts out empty
let guitarList = []


/*** FETCHING ***/
// Communiate with the Back-End (get data, send data)

async function fetchGuitarList() {
    // Fetch the guitars from the Back-End API
    const response = await fetch("http://localhost:3000/guitars")
    const fetchedGuitars = await response.json() // parses and unsmooshes the data
    // Put the guitars into state
    guitarList = fetchedGuitars
    // Re-render based on the state
    renderGuitarList()
}

fetchGuitarList()

/*** RENDERING ***/
// Make the User Interface match what the data state (data) says it should

const guitarsContainer = document.getElementById("guitars-container")

// Afred the Butler 
function renderGuitarList() {
    // Clear out whatever we rendered last time
    guitarsContainer.innerHTML = ""
    // show each guitar in the guitars container
    for(let i = 0; i < guitarList.length; i++) {

        /*** LISTENING ***/
        const deleteGuitar = async () => {
            // update the API on the backend
            await fetch("http://localhost:3000/guitars/" + guitarList[i].id, {
                method: "DELETE"
            })
            // update the state on the frontend
            guitarList.splice(i, 1)
            // Re-render (call the rendering function again)
            // AFRED, make our page match our state!
            renderGuitarList()

        }

        // add divs and cool bootstrap classes
        const div = document.createElement("div")
        div.className = "border bg-light p-3 m-3"
        div.innerHTML = `
            <h3>${guitarList[i].genre}</h3>
            <p>${guitarList[i].guitartype}</p>
            <button class="btn btn-danger">Delete</button>
        `
        div.querySelector("button").addEventListener("click", deleteGuitar)
        guitarsContainer.append(div)
    }
}

/*** LISTENING ***/

const genreInput = document.getElementById("genre-input")
const guitartypeInput = document.getElementById("guitartype-input")

async function createGuitar(event) {
    event.preventDefault() // don't refresh the page
  
    // grab the data from the form and make the new guitar
    const newGuitarData = {
        genre: genreInput.value,
        guitartype: guitartypeInput.value,
    }

    // clear out the inputs
    genreInput.value = ""
    guitartypeInput.value = ""

    // update backend
    const response = await fetch("http://localhost:3000/guitars", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newGuitarData) // smooshify AKA stringify it into JSON
    })
    const createdGuitarWithId = await response.json()

    // update frontend state
    guitarList.push(createdGuitarWithId)

    // re-render
    // YELL FOR AFRED TO DO IT
    renderGuitarList()
}