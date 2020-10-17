const icon = document.querySelector(".icon")
const navList = document.querySelector(".nav-list")
const links = document.querySelectorAll(".nav-list li")
const navbar = document.getElementById("nav")
const imgContainer = document.querySelector(".img_container")
const imgSlider = document.querySelector(".slider_container")
const current = document.getElementById("current")

const slides = document.querySelectorAll(".slide")
const prev = document.querySelector(".prev-btn")
const next = document.querySelector(".next-btn")


const formBox = document.querySelector(".form-box")
const buttonBox = document.querySelector(".button-box")
const login = document.getElementById("login")
const register = document.getElementById("register")

window.addEventListener("load", () => {
    document.querySelector(".preloader").style.display = 'none'
    AOS.init();

})

window.addEventListener("scroll", () => {
    const scrollHeight = window.pageYOffset
    const navHeight = navbar.getBoundingClientRect().height
    if (scrollHeight > navHeight) {
        navbar.classList.add("fixed_nav")
    } else {
        navbar.classList.remove("fixed_nav")
    }
})


icon.addEventListener("click", () => {
    icon.classList.toggle("toggle")
    navList.classList.toggle("showList")
    links.forEach(item => item.classList.toggle("fade"))
})

if (imgContainer !== null) {
    imgContainer.addEventListener("click", e => {
        const target = e.target
        imgSlider.style.display = 'flex'
        current.src = target.src
    })
    imgSlider.addEventListener("click", e => {
        if (e.target !== current) {
            imgSlider.style.display = 'none'
        }
    })
}



let nextSlide = () => {
    let current = document.querySelector(".current")
    current.classList.remove("current")
    if (current.nextElementSibling) {
        current.nextElementSibling.classList.add("current")
    } else {
        slides[0].classList.add("current")
    }

}
if (next !== null) {
    next.addEventListener("click", () => {
        nextSlide()
    })
}
if (buttonBox !== null) {
    buttonBox.addEventListener("click", e => {
        let target = e.target

        if (target === register) {
            formBox.classList.add("toggleLogin")
        }
        if (target === login) {
            formBox.classList.remove("toggleLogin")
        }
    })
}


// shop



function alert(header, letter) {
    let alertBox = document.querySelector(".alert-box");
    let alertheader = document.querySelector(".alert-header");
    let alertLetter = document.querySelector(".alert-letter");
    alertheader.innerHTML = header;
    alertLetter.innerHTML = letter;
    alertBox.style.display = "flex";
    let closeBtn = document.querySelector(".close");
    closeBtn.addEventListener("click", () => {
        alertBox.style.display = "none";
    });
}

let removeCartButton = document.querySelectorAll(".btn-danger");

Array.from(removeCartButton).forEach((button) => {
    button.addEventListener("click", removeItems);
});

function removeItems(e) {
    let removeParent = e.target;
    removeParent.parentElement.parentElement.remove();
    updateCartTotal();
}


const addToCart = document.querySelectorAll(".addToBtn")
addToCart.forEach(item =>
    item.addEventListener("click", addToCartClicked))


function updateCartTotal() {
    let cartRows = document.querySelectorAll(".cart-row");
    let total = 0;

    Array.from(cartRows).forEach(cartRow => {
        let priceElement = cartRow.querySelector(".cart-price");
        let quantityElement = cartRow.querySelector(".cart-quantity-input");
        let price = parseFloat(priceElement.innerHTML.replace("$", ""));
        let quantity = quantityElement.value;
        total += price * quantity;
    })
    total = Math.round(total * 100) / 100;
    document.querySelector(".cart-total-price").innerHTML = "$ " + total;
}

function qualityChange(e) {
    let input = e.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}




function addToCartClicked(e) {
    let button = e.target
    let shopItem = button.parentElement
    let title = shopItem.querySelector(".title").innerHTML
    let price = shopItem.querySelector(".price span").innerHTML
    let image = shopItem.querySelector("img").src
    addToCartItem(title, price, image)
}

function addToCartItem(title, price, image) {
    let cartRow = document.createElement("div")
    cartRow.classList.add("cart-row")
    let cartItems = document.querySelector(".cart-items")
    let cartItemNames = cartItems.querySelectorAll(".cart-item-title");
    for (let i in cartItemNames) {
        if (cartItemNames[i].innerHTML === title) {
            alert("Please Checked up!", "This is already added to the text");
            return;
        }
    }
    let cartRowContents = `<div class="cart-item cart-column">
        <img class="cart-item-image" src="${image}" width="100"
            height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <div class="cart-price cart-column"> ${price}</div>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.appendChild(cartRow);

    cartRow.querySelector(".btn-danger").addEventListener("click", removeItems);
    cartRow
        .querySelector(".cart-quantity-input")
        .addEventListener("change", qualityChange);
    updateCartTotal()
}

let purchaseClicked = document.querySelector(".btn-purchase");
if (purchaseClicked !== null) {
    purchaseClicked.addEventListener("click", purchase);
}


function purchase() {
    alert("Success!", "Thanks you for your services");
    let cartTimes = document.querySelector(".cart-items");
    while (cartTimes.hasChildNodes()) {
        cartTimes.removeChild(cartTimes.firstChild);
    }
}