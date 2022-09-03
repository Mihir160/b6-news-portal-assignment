const newsCategoryLoad = () =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    
    try{
        fetch(url)
        .then(res =>res.json())
        .then(data =>categoryDisplay(data.data.news_category))
    }
    catch(error){
        console.log(error)
    }
    
}


const categoryDisplay = (categories) =>{
    const categoryConatainer = document.getElementById('newsCategory')
    for(let category of categories){
        // console.log(category)
        const categoryDiv = document.createElement('div')
        
        categoryDiv.innerHTML = `
        <ul class="mt-8">
        <li>
          <a href="#" onclick="newsDisplay('${category.category_id}')" class="hover:text-blue-700 p-2">${category.category_name}</a>
        </li>
        </ul>
        `
        categoryConatainer.appendChild(categoryDiv)
    }

  
   

}

const newsDisplay = (category_id) =>{
    toggleSpinner(true);
   const url = ` https://openapi.programming-hero.com/api/news/category/${category_id}`
    console.log(url)
   try{
    fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.data))
   }catch(error){
    console.log(error)
   }
}



const displayNews = (newsinfo) =>{
    console.log(newsinfo)
    const itemContainer = document.getElementById('items')
    itemContainer.innerHTML =`<p>${newsinfo.length} items found for category Entertainment</p>`
    const newsContainer = document.getElementById('newsContainer')
    // total_view sort
    newsinfo.sort((a, b) => b.total_view - a.total_view);
    newsContainer.innerHTML = ``
    for(let news of newsinfo){
    const newsDiv = document.createElement('div')
    newsDiv.innerHTML = `
       

        <div class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl">
        <img class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="${news.thumbnail_url}" alt="">
        <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-1xl font-bold tracking-tight text-gray-900">${news.title}</h5>
            <p class="mb-3 font-normal text-gray-700 ">${news.details.slice(0, 300)}....</p>
            <div class="flex items-center">
               <img class="object-cover h-8 rounded-t-lg  rounded-lg" src="${news.author.img}" alt="">
               <div class="mx-4">
               <p>${news.author.name ? news.author.name: 'No name'}</p>
               <p>${news.author.published_date}</p>
               </div>
               
               
               <i class="fa-regular fa-eye mt-2"><span class="mx-2 text-sm">${news.total_view ? news.total_view : 'No View'}</span></i>
               <label onclick="newDetailsModal('${news._id}}')" for="my-modal-3" class="modal-button hover:text-blue-800 font-medium mt-2 mx-8"><i class="fa-solid fa-arrow-right"></i></label>
           
            </div>
        </div>
        </div>
      
    `
    newsContainer.appendChild(newsDiv)
    toggleSpinner(false);
   }
 
   
}
// modal
const newDetailsModal = (ids) =>{
    url = `https://openapi.programming-hero.com/api/news/${ids}`
    console.log(url)
    try{ fetch(url)
        .then(res =>res.json())
        .then(data => console.log(data.data[0]))
    }
    catch(error){
        console.log(error)
    }
   
}


const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('hidden')
    }
    else{
        loaderSection.classList.add('hidden');
    }
}
newsCategoryLoad()