window.onload = () => {
    const filterButtons = document.querySelectorAll('.filter_button');
    let data = [];
    let filteredProducts = [];
    filterButtons.forEach(button => {
        button.onclick = (e) => {
            const categoryAttrValue = e.target.getAttributeNode('data-filter-name').value;
            if (categoryAttrValue !== "all") {
                    filteredProducts = data.filter((product, index) => {
                    return product.category === categoryAttrValue
                });
            } else {
                filteredProducts = data.slice(0, 3);
            }

            const wrapper = document.querySelector('.tile_list');
            while (wrapper.lastElementChild) {
              wrapper.removeChild(wrapper.lastElementChild);
            }
            
            appendTiles(filteredProducts.filter((item, index) => index <= 7))
            filterButtons.forEach(item => item.className = "filter_button")
            e.target.className = "filter_button filter_button__active"
        }
    })

    const appendTiles = function(products) {
        const wrapper = document.querySelector('.tile_list');
        products.forEach(product => {
            const div = document.createElement('div');
            div.className = "tile";
    
            const tileAvatar = document.createElement('div');
            tileAvatar.className = "tile_avatar";
    
            const image = document.createElement('img');
            image.src = product.thumbnail;
    
            const tileContent = document.createElement('div');
            tileContent.className = "tile_content";
    
            const title = document.createElement('span');
            title.textContent = product.title;
    
            const descr = document.createElement('p');
            descr.textContent = product.description;

            tileAvatar.appendChild(image);
            tileContent.appendChild(title);
            tileContent.appendChild(descr);
            div.appendChild(tileAvatar)
            div.appendChild(tileContent);
            wrapper.appendChild(div)
            
        })
    };

    fetch('https://dummyjson.com/products')
        .then(r => r.json())
        .then(res => {
            data = res.products;
            appendTiles(res.products.filter((item, index) => index <= 2))
        })
        .catch(err => console.error(err))

    $(".slider-slick").slick({
 
        // normal options...
        infinite: true,
        slidesToShow: 2,
        slidesToShow: 2,
        slidesToScroll: 2,
        // autoplay: true,
        // centerMode: true,
        
        responsive: [{
       
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              infinite: true
            }
       
          }, {
       
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              dots: true
            }
       
          }, {
       
            breakpoint: 300,
            settings: "unslick" // destroys slick
       
          }]
      });
}