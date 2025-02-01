const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const dogsContainer = document.getElementById("dog-image-container");
const breedUrl = "https://dog.ceo/api/breeds/list/all";
const breedList = document.getElementById("dog-breeds");
const breedFilter = document.getElementById("breed-dropdown")

document.addEventListener("DOMContentLoaded", () => {
    fetch(imgUrl)
        .then((res) => res.json())
        .then((json) => {
            let messages = json["message"];
            messages.forEach((message) => {
                let img = document.createElement("img");
                img.src = message;
                dogsContainer.append(img)
            })
        });

    fetch(breedUrl)
        .then((res) => res.json())
        .then((json) => {
            let breeds = json["message"]
            for (const breed in breeds){
                //if the breed has an empty array, use the breed key as the li text
                if (breeds[breed].length === 0){
                    let li = document.createElement("li")
                    li.textContent = breed;
                    breedList.append(li);

                    //add click listener to change li element to green
                    //this needs to be here or else the event listener will be added before the elements are created
                    li.addEventListener('click', () => {
                        li.style.color = 'green'
                    })
                }
                else {
                    //for breeds with an array, add separate items for each subbreed to make them distinct
                    breeds[breed].forEach((subbreed) => {
                        let li = document.createElement("li")
                        li.textContent = `${breed}, ${subbreed}`
                        breedList.append(li);

                        //add click listener to change li element to green
                        li.addEventListener('click', () => {
                            li.style.color = 'green'
                        })
                    })
                }
            }
        });
        // add event listener for changing the breed filter 
        breedFilter.addEventListener("change", () => {
            let list = document.querySelectorAll("li");
            let filterValue = breedFilter.value;
            
            list.forEach((item) => {
                //set all item hidden property to nothing 
                item.hidden="";
                //hide the item if it's first letter is not equal to the selected filter value
                if (item.textContent[0] !== filterValue) {
                    item.hidden="hidden"
                }
            })
        })
        
})


