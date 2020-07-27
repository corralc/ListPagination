/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
   const studentList = document.querySelectorAll(".student-item");
   const numOfItemsToDisplay = 10;   



/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/
   //Show page function that takes the student list and the page number to display
   //If no students are displayed, it will display a message stating there are no results found
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
   
/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
//Function that appends pagination links based on the length of list
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
//Function that takes the list of students and creates a search functionality to search for a specified student name
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
         if(studentNames.includes(inputValue)){
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
