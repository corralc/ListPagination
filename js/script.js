/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
   const studentList = document.querySelectorAll(".student-item");
   const numOfItemsToDisplay = 10;   

   /**
 * Show page function that takes the student list and the page number to display
 *
 * @param {[Collection of HTML Elements]} list - [A list of students to be displayed]
 * @param {[Number]} page - [The page number]
 */
   function showPage(list, page){
      const startIndex = (page * numOfItemsToDisplay) - numOfItemsToDisplay;
      const endIndex = page * numOfItemsToDisplay;   
      const listContainer = document.querySelector(".student-list");
      listContainer.innerHTML = "";//To clear list of students displayed
      const noResult = document.createElement("p");
      noResult.textContent = "Sorry there is no student by that name."
      //If statement to test to see if there is anything to display
      if(list.length > 0){
      for(let i = 0; i < list.length; i++){
         if(i >= startIndex && i < endIndex){
            listContainer.appendChild(list[i]);
         }
      }
      }
      else{
         listContainer.appendChild(noResult);

      }
   }
   

/**
 *Creates and appends pagination links based on the length of list
 *
 * @param {Collection of HTML elements} list - List of students.
 */
function appendPageLinks(list){
   const page = document.querySelector(".page");
   const neededPages = Math.ceil(list.length / numOfItemsToDisplay);
   const paginationDiv = document.createElement("div");
   const paginationUl = document.createElement("ul");
   
   //If the pagination links do not exist yet create them
   if(document.querySelector(".pagination") == null){
      paginationDiv.appendChild(paginationUl);
      paginationDiv.className = "pagination";
      page.appendChild(paginationDiv);
   }//If they do exist remove the pagination links then insert the new set of pagination links
   else{
      const exisitingDiv = document.querySelector(".pagination");
      page.removeChild(exisitingDiv);
      paginationDiv.appendChild(paginationUl);
      paginationDiv.className = "pagination";
      page.appendChild(paginationDiv);
   }

   const div = document.querySelector(".pagination");
   const ul = div.firstElementChild;
   
   //Creates and appends the needed amount of pagination links
   for(let i = 1; i <= neededPages; i++){
      const li = document.createElement("li");
      const newALink = document.createElement("a");
      newALink.textContent = i;
      newALink.href = "#";
      
      if(i === 1){
          newALink.className = "active";
      }

      li.appendChild(newALink);
      ul.appendChild(li);
   }
   
   const paginationLink = document.querySelectorAll(".pagination a");
   
   //Adds an event listener to all pagination links
   for(let i =0; i< paginationLink.length; i++){
   paginationLink[i].addEventListener("click", (e) =>{
     for(let y = 0; y < paginationLink.length; y++){
        //If there is a pagination link that already has an active class remove them
         if(paginationLink[y].className === "active"){
            paginationLink[y].className = "";
         }
      }
      //Sets the targeted pagination link to active
      e.target.className = "active";
      showPage(list, e.target.textContent);
   });
}
}

/**
 *Takes the list of students and creates a search functionality to search for a specified student name
 *
 * @param {Collection of HTML Elements} List - List of students.
 */
function searchStudents (list){
   //Create search HTML
   const searchDiv = document.createElement("div");
   const searchInput = document.createElement("input");
   const searchButton = document.createElement("button");
   const searchParentDiv = document.querySelector(".page-header");
   let inputValue = "";
   
   searchDiv.className = "student-search";
   searchInput.placeholder = "Search for students...";
   searchButton.textContent = "Search";
   searchDiv.appendChild(searchInput);
   searchDiv.appendChild(searchButton);
   searchParentDiv.appendChild(searchDiv);
   //Listens for the given input in the searchbar
   searchInput.addEventListener("keyup", (e) =>{
      inputValue = e.target.value;
   });

   searchButton.addEventListener("click", () =>{
      //New array to put new results in
      const searchList = [];
      //Loop through the given list of students and compare overall student list to given input.
      for(let i =0; i < list.length; i++){
         const studentNames = list[i].querySelector("h3").textContent;
         if(studentNames.includes(inputValue.toLowerCase())){
            //Push student in new list if student name includes the string given
            searchList.push(list[i]);
       }   
      }
    //Display the new array on the pagination link 1  
    showPage(searchList, 1);  
    //Append pagination Link based on number of returned results
    appendPageLinks(searchList);
   });
}

//Function calls

showPage(studentList, 1);
appendPageLinks(studentList);
searchStudents(studentList);
