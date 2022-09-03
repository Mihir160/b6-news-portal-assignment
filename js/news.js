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
          <a href="#" onclick="newsDisplay('${category.category_id}')" class="hover:text-blue-700 ">${category.category_name}</a>
        </li>
        </ul>
        `
        categoryConatainer.appendChild(categoryDiv)
    }
 }

const newsDisplay = (category_id) =>{
    
   const url = ` https://openapi.programming-hero.com/api/news/category/${category_id}`
    console.log(url)
   try{
    fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.data))
   }catch(error){
    console.log(error)
   }
   toggleSpinner(true);
}



const displayNews = (newsinfo) =>{
    // console.log(newsinfo)
    const itemContainer = document.getElementById('items')
    itemContainer.innerHTML =`<p class="bg-slate-300 p-4 lg:mx-32 rounded-lg"">${newsinfo.length === 0 && toggleSpinner(false) ? '' :newsinfo.length} items Found</p>`
    const newsContainer = document.getElementById('newsContainer')
    // total_view sort
    newsinfo.sort((a, b) => b.total_view - a.total_view);
    //no news
    const noNews = document.getElementById('no-found-message')

        if(newsinfo.length === 0){
            console.log(newsinfo.length)
            noNews.classList.remove('hidden')
        }

        else{
            noNews.classList.add('hidden')
        }
    newsContainer.innerHTML = ``
    // display news
    newsinfo.forEach(news =>{
    const newsDiv = document.createElement('div')
    newsDiv.innerHTML = `
        <div class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl">
        <img class="object-cover w-full h-96  rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="${news.thumbnail_url}" alt="">
        <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-1xl font-bold tracking-tight text-gray-900">${news.title}</h5>
            <p class="mb-3 font-normal text-gray-700 ">${news.details.slice(0, 100)}....</p>
            <div class="flex items-center">
               <img class="object-cover h-8 rounded-t-lg  rounded-lg" src="${news.author.img}" alt="">
               <div class="mx-4">
               <p>${news.author.name === null || news.author.name ===""? 'No name': news.author.name}</p>
               <p>${news.author.published_date}</p>
               </div>
               <i class="fa-regular fa-eye mt-2"><span class="mx-2 text-sm">${news.total_view ? news.total_view : 'No View'}</span></i>
               <label onclick="newDetailsModal('${news._id}')" for="my-modal-3" class="modal-button hover:text-blue-800 font-medium mt-2 mx-8"><i class="fa-solid fa-arrow-right"></i></label>
            </div>
        </div>
        </div>
      
    `
    newsContainer.appendChild(newsDiv)
    toggleSpinner(false);
   })
 
   
}



// modal
const newDetailsModal = (ids) =>{
    url = `https://openapi.programming-hero.com/api/news/${ids}`
    // console.log(url)
    try{ fetch(url)
        .then(res =>res.json())
        .then(data => displayNewDetails(data.data[0]))
    }
    catch(error){
        console.log(error)
    }
   
}
// modal details
const  displayNewDetails = (data) =>{
       console.log(data)
       const DetailsContainer = document.getElementById('newsDetails')
       DetailsContainer.innerHTML =`
       <div class=" items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl">
       <img class="lg:mx-28 md:mx-28  w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="${data.thumbnail_url}" alt="">
       <div class="flex flex-col justify-between p-4 leading-normal">
           <h5 class="mb-2 text-1xl font-bold tracking-tight text-gray-900">${data.title}</h5>
           <p class="mb-3 font-normal text-gray-700 ">${data.details}</p>
           <div class="flex items-center">
              <img class="object-cover h-8 rounded-t-lg  rounded-lg" src="${data.author.img}" alt="">
              <div class="mx-4">
              <p>${data.author.name === null || data.author.name ===""? 'No name': data.author.name}</p>
              <p>${data.author.published_date}</p> 
           </div>
           <i class="fa-regular fa-eye mt-2"><span class="mx-2 text-sm">${data.total_view ? data.total_view : 'No View'}</span></i>
       </div>
       </div>

       `
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
 newsDisplay('08')
newsCategoryLoad()