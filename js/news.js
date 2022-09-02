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
//    console.log(url)
   try{
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data.data))
   }catch(error){
    console.log(error)
   }
}

newsCategoryLoad()