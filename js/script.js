// search form 

let searchForm = document.querySelector(".search-form")
let searchBtn = document.querySelector("#search-btn")

searchBtn.onclick = () => {
    searchForm.classList.toggle("active")
}




  document.addEventListener("click", function(e) {
    if (!searchBtn.contains(e.target) && !searchForm.contains(e.target)) {
      searchForm.classList.remove("active");
    }
  });
// shopping chart 

let shopCart = document.querySelector(".shopping-cart")
let cartBtn = document.querySelector("#cart-btn")

cartBtn.onclick = () => {
  shopCart.classList.toggle("active")
  
}

  document.addEventListener("click", function(e) {
    if (!cartBtn.contains(e.target) && !shopCart.contains(e.target)) {
      shopCart.classList.remove("active");
    }
  });
/// login 

let loginForm = document.querySelector(".login-form")
let userIcon = document.querySelector("#user-btn")

userIcon.onclick = () => {
    open("../implmentation version/login.html")
  }
  ;
  
  
  document.addEventListener("click", function(e) {
    if (!userIcon.contains(e.target) && !loginForm.contains(e.target)) {
      loginForm.classList.remove("active");
    }
  });
  
  
  /// navbar 
  
  let navbar = document.querySelector(".navbar")
  let menuBtn = document.querySelector("#menu-btn")

  menuBtn.onclick = () => {
    navbar.classList.toggle("active")
  }


  document.addEventListener("click", function(e) {
    if (!menuBtn.contains(e.target) && !navbar.contains(e.target)) {
      navbar.classList.remove("active");
    }
  });


// / Api for product 




async function getData() {
  let productSection = document.querySelector(".products-container");
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();
  
  products.map(ele => {
    // card
    let divCard = document.createElement("div");
    divCard.setAttribute("class", "card col-md-3 m-2");
    divCard.setAttribute("id", "show");

    // image
    let img = document.createElement("img");
    img.setAttribute("class", "card-img-top");
    img.setAttribute("src", ele.image);
    divCard.appendChild(img);

    // card body
    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    divCard.appendChild(cardBody);

    // title
    let title = document.createElement("h5");
    title.setAttribute("class", "title");
    title.textContent = ele.title.slice(0, 25);
    cardBody.appendChild(title);

    // description
    let description = document.createElement("p");
    description.setAttribute("class", "card-text");
    description.textContent = ele.description.slice(0, 150) + "...";
    cardBody.appendChild(description);

    // price
    let price = document.createElement("span");
    price.setAttribute("class", "price");
    price.innerText = `Price:$${ele.price}`;
    cardBody.appendChild(price);

    // add button to card
    let btn = document.createElement("a");
    btn.setAttribute("class", "btn");
    btn.innerText = "Add to Cart";
    cardBody.appendChild(btn);

    productSection.appendChild(divCard);

    btn.addEventListener("click", () => {
      addToCart(ele.image, ele.price, ele.title);
    });
  });
}

let shoppingCart = document.querySelector(".shopping-cart");//
let totalDiv; // total price container
let total = 0; // total price of product
let cartProduct  = {}; // create object for every product
let checkoutBtn; // checkout button

function addToCart(img, price, title) {
  // add total div 
  if (!totalDiv) {
    totalDiv = document.createElement("div");
    totalDiv.setAttribute("class", "total");
    shoppingCart.appendChild(totalDiv); 
  }

  // add checkout button 
  if (!checkoutBtn) {
    checkoutBtn = document.createElement("a");
    checkoutBtn.setAttribute("class", "btn");
    checkoutBtn.textContent = "Checkout";
    shoppingCart.appendChild(checkoutBtn); 
  }
   checkoutBtn.addEventListener("click" , () => {
    open("https://github.com/ezzatabanoub27/FrontMarket/tree/mainfile:///C:/Users/Abanoub/Desktop/paypal/index.htm" , "_blank")
   })
  // update total price
  total += price;
  totalDiv.innerHTML = `Total: $${total.toFixed(2)}`;

  // If choice the them product 
  if (cartProduct[title]) {
    cartProduct[title].count++;
    if(cartProduct[title].count > 2)
    {
      alert("The quantity is not enough")  
      cartProduct[title].count = 2
    }
    cartProduct[title].countSpan.textContent = `qty: ${cartProduct[title].count}`;
  } else {
    // Create item box
    let box = document.createElement("div");
    box.setAttribute("class", "box");

    let icon = document.createElement("i");
    icon.setAttribute("class", "fas fa-trash");
    box.appendChild(icon);

    let cartImg = document.createElement("img");
    cartImg.setAttribute("src", img);
    box.appendChild(cartImg);

    let content = document.createElement("div");
    content.setAttribute("class", "content");
    box.appendChild(content);

    let productTitle = document.createElement("h3");
    productTitle.textContent = title.slice(0, 15) + "..";
    content.appendChild(productTitle);

    let productPrice = document.createElement("span");
    productPrice.setAttribute("class", "price");
    productPrice.textContent = `$${price}`;
    content.appendChild(productPrice);

    let productCount = document.createElement("span")
    productCount.setAttribute("class", "quantity")
    productCount.textContent = "qty: 1"
    content.appendChild(productCount)

    cartProduct[title] = {
      count: 1,
      price: price,
      box: box,
      countSpan: productCount  // bracket notation ass
    }
    checkoutBtn.addEventListener("click" , () => {
          open("pay/pay", '_blank')
    })

    // add box before totalDiv
    shoppingCart.insertBefore(box, totalDiv);

    // remove item
    icon.addEventListener("click", () => {
      total -= cartProduct[title].count * price
      totalDiv.innerHTML = `Total: $${total.toFixed(2)}`
      box.remove()
      delete cartProduct[title]
    });
  }
}



getData();



/// slider for home 

let sectionHome = document.querySelector(".home")

let sliderImg =["../image/s4.jpg","../image/s2.jpg","../image/s3.jpg","../image/s1.jpg"]
let currentIndex = 0
setInterval (() => {
    sectionHome.style.backgroundImage = `url(${sliderImg[currentIndex]})`
    currentIndex++
     
    if(currentIndex >= sliderImg.length)
    {
      currentIndex =0
    }

}, 4000)



///// ratting
let ratting = document.querySelectorAll(".ratting")

ratting.forEach(ele => {
  let stars = ele.querySelectorAll("i")
  let selectedIndex = -1

  stars.forEach((star, index) => {
    star.addEventListener("mouseover", () => {
      stars.forEach((s, i) => {
        if (i <= index) {
          s.style.color = "gold"
        } else {
          s.style.color = "#eee"
        }
      })
    })

    star.addEventListener("click", () => {
      selectedIndex = index
    })
  })

  ele.addEventListener("mouseout", () => {
    stars.forEach((star, i) => {
      if (i <= selectedIndex) {
        star.style.color = "gold"
      } else {
        star.style.color = "#eee"
      }
    })
  })
})

