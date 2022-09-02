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
          <a href="#" onclick="newsDisplay('${category.category_id}')">${category.category_name}</a>
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
}



const displayNews = (newsinfo) =>{
    const itemContainer = document.getElementById('items')
    itemContainer.innerHTML =`<p>${newsinfo.length} items found for category Entertainment</p>`
    const newsContainer = document.getElementById('newsContainer')
    newsContainer.innerHTML = ``
    for(let news of newsinfo){
    const newsDiv = document.createElement('div')
    newsDiv.innerHTML = `
       
        <a href="#" class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100">
        <img class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="${news.thumbnail_url}" alt="">
        <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-1xl font-bold tracking-tight text-gray-900">${news.title}</h5>
            <p class="mb-3 font-normal text-gray-700 ">${news.details.slice(0, 300)}....</p>
            <div class="flex">
               <img class="object-cover h-12 rounded-t-lg  rounded-lg" src="${news.author.img}" alt="">
               <div class="mx-4">
               <p>${news.author.name ? news.author.name: 'No name'}</p>
               <p>${news.author.published_date.slice(0,10)}</p>
               </div>
               
               
               <i class="fa-regular fa-eye mt-4"><span class="mx-2">${news.rating.number}</span></i>
               <svg aria-hidden="true" class="w-5 h-5 mt-3 mx-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              
            
            </div>
        </div>
       </a>
    `
    newsContainer.appendChild(newsDiv)
   }
 
 
}
newsCategoryLoad()