window.onload = () => {
  // progress bar
  const scrollProgressBar = () => {
    const progressBar = document.querySelector('.progressBar');
    const section = document.querySelector('body');
    let scrollDistance = -(section.getBoundingClientRect().top);
    let progressPercentage =
        (scrollDistance /
            (section.getBoundingClientRect().height -
                document.documentElement.clientHeight)) * 100;

    let val = Math.floor(progressPercentage);
    progressBar.style.width = val + '%';

    if (val < 0) {
        progressBar.style.width = '0%';
    }
  };

  // slider
  $(".slider-slick").slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    // autoplay: true,
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
        settings: "unslick"

      }]
  });

    // filters
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
              filteredProducts = [];
              filterButtons.forEach(button => {
                const attr = button.getAttributeNode('data-filter-name').value;
                const firstItem = data.find(item => item.category === attr);
                if (firstItem) filteredProducts.push(firstItem);
              });
            }

            const wrapper = document.querySelector('.tile_list');
            while (wrapper.lastElementChild) {
              wrapper.removeChild(wrapper.lastElementChild);
            }

            appendTiles(filteredProducts.slice(0, 7))
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
            filteredProducts = [];
            filterButtons.forEach(button => {
              const attr = button.getAttributeNode('data-filter-name').value;
              const firstItem = data.find(item => item.category === attr);
              if (firstItem) filteredProducts.push(firstItem);
            });
            appendTiles(filteredProducts)
        })
        .catch(err => console.error(err));

    // form validation
    const form = document.forms["registration"];
    let errors = [];

    // add error to the html
    const addErrorElement = (errorObj) => {
      const input = document.getElementById(errorObj.id);
      let errorP = document.createElement('div');
      errorP.className = "field-error";
      errorP.id =`error-field-${errorObj.id}`;
      errorP.innerText = errorObj.text;
      input.parentNode.insertBefore(errorP, input.nextSibling);
    };

    // valide forms
    const validation = (event) => {
      let errorObj = null;

      errors.forEach(item => {
        const el = document.getElementById(item);
        if (el) {
          el.remove();
        };
      });
      errors = [];
      ["name", "surname", "email"].forEach(field => {
        errorObj = null;
        if (!form[field].value) {
          errorObj = {
            id: field,
            text: `${field} should not be empty!`
          }
          errors.push(`error-field-${field}`)
        };
        if (field === 'name' || field === 'surname') {
          const regName = /^[a-zA-Z]+$/;
          const isError = !regName.test(form[field].value);
          if (isError) {
            errorObj = {
              id: field,
              text: `${field} should contain only latin characters, start with uppercase, no number allowed!`
            }
            errors.push(`error-field-${field}`)
          }
        }
        if (field === 'email') {
          const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          const isError = !regEmail.test(form[field].value);
          if (isError) {
            errorObj = {
              id: field,
              text: `You have entered an invalid email address!`
            }
            errors.push(`error-field-${field}`)
          }
        };

        if (errorObj) {
          addErrorElement(errorObj);
        }
      })
    };
    // save to local storage
    const saveToLocalStorage = () => {
      const form = document.forms["registration"];
      let data = [];
      ["name", "surname", "email"].forEach(item => {
        data.push({
          id: item,
          value: form[item].value
        })
      });
      localStorage.setItem("registration", JSON.stringify(data));
    };

    // dicount window
    const showDiscountWindow = () => {
      const form = document.forms["registration"];
      const name = form['name'].value;
      const discountWindow = document.getElementById('discount-modal');
      const discountText = `Today ${new Date().toISOString().split('T')[0]} for user with name ${name} discount 120%!`;
      const title = document.createElement('span');
      title.textContent = discountText;
      discountWindow.append(title)
      discountWindow.classList.add('active');
      setTimeout(() => {discountWindow.classList.remove('active')}, 5000)
    };

    // Listeners
    window.addEventListener('scroll', scrollProgressBar);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      validation(e);
      if (!errors.length) {
        saveToLocalStorage();
        showDiscountWindow();
      }
    });

}