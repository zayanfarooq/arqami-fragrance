// =========================
// NAVBAR & MOBILE MENU
// =========================
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        navLinks.classList.toggle("show");
        const icon = menuBtn.querySelector("i");
        if (icon) {
            if (navLinks.classList.contains("show")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        }
    });

    document.addEventListener("click", function (event) {
        if (!navLinks.contains(event.target) && !menuBtn.contains(event.target)) {
            navLinks.classList.remove("show");
            const icon = menuBtn.querySelector("i");
            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        }
    });

    const navItems = document.querySelectorAll(".nav-links a");
    navItems.forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("show");
            const icon = menuBtn.querySelector("i");
            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });
    });
}

// =========================
// PRODUCT SIZES & PRICING
// =========================
const productCards = document.querySelectorAll(".product-card");

if (productCards.length > 0) {
    productCards.forEach(function (card) {
        const buttons = card.querySelectorAll(".size-btn");
        const price = card.querySelector(".price-value");

        buttons.forEach(function (button) {
            button.addEventListener("click", function () {
                buttons.forEach(function (btn) {
                    btn.classList.remove("active");
                });

                button.classList.add("active");
                if (price) {
                    price.classList.add("fade");
                    setTimeout(function () {
                        price.textContent = button.dataset.price;
                        price.classList.remove("fade");
                    }, 200);

                    price.classList.add("flash");
                    setTimeout(function () {
                        price.classList.remove("flash");
                    }, 300);
                }
            });
        });
    });
}

// =========================
// SEARCH FILTER
// =========================
const searchInput = document.querySelector("#searchInput");
const products = document.querySelectorAll(".product-card");

if (searchInput && products.length > 0) {
    searchInput.addEventListener("input", function () {
        const searchValue = searchInput.value.toLowerCase().trim();

        products.forEach(function (product) {
            const heading = product.querySelector("h3");
            if (heading) {
                const productName = heading.textContent.toLowerCase();
                if (productName.includes(searchValue)) {
                    product.style.display = "block";
                } else {
                    product.style.display = "none";
                }
            }
        });
    });
}

// =========================
// CATEGORY FILTERS
// =========================
const filterButtons = document.querySelectorAll(".filter-btn");

if (filterButtons.length > 0 && products.length > 0) {
    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const filter = button.dataset.filter;

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            products.forEach(function (product) {
                if (filter === "all") {
                    product.style.display = "block";
                } else {
                    const badge = product.querySelector(".badge");
                    if (badge && badge.classList.contains(filter)) {
                        product.style.display = "block";
                    } else {
                        product.style.display = "none";
                    }
                }
            });
        });
    });
}

// =========================
// ORDER OVERLAY & SUBMISSION
// =========================
const orderOverlay = document.querySelector("#orderOverlay");
const closeOrder = document.querySelector("#closeOrder");
const selectedProduct = document.querySelector("#selectedProduct");
const selectedSize = document.querySelector("#selectedSize");
const selectedPrice = document.querySelector("#selectedPrice");
const buyButtons = document.querySelectorAll(".product-btn");
const quantityInput = document.querySelector("#quantity");
const orderTotal = document.querySelector("#orderTotal");
const orderForm = document.querySelector("#orderForm");

if (orderOverlay) {
    buyButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            const card = button.closest(".product-card");
            if (!card) return;

            const nameElement = card.querySelector("h3");
            const activeSize = card.querySelector(".size-btn.active");

            if (!nameElement || !activeSize) return;

            const productName = nameElement.textContent.trim();
            const size = activeSize.textContent.trim();
            const price = activeSize.dataset.price;

            if (selectedProduct) selectedProduct.textContent = productName;
            if (selectedSize) selectedSize.textContent = size;
            if (selectedPrice) selectedPrice.textContent = price;

            if (quantityInput) quantityInput.value = 1;
            if (orderTotal) orderTotal.textContent = price;

            orderOverlay.classList.add("show");
            document.body.style.overflow = "hidden";
        });
    });

    if (closeOrder) {
        closeOrder.addEventListener("click", function () {
            orderOverlay.classList.remove("show");
            document.body.style.overflow = "auto";
        });
    }

    orderOverlay.addEventListener("click", function (event) {
        if (event.target === orderOverlay) {
            orderOverlay.classList.remove("show");
            document.body.style.overflow = "auto";
        }
    });
}

if (quantityInput && orderTotal && selectedPrice) {
    quantityInput.addEventListener("input", function () {
        const price = Number(selectedPrice.textContent) || 0;
        const quantity = Number(quantityInput.value) || 1;
        orderTotal.textContent = price * quantity;
    });
}

if (orderForm) {
    orderForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nameInput = document.querySelector("#customerName");
        const phoneInput = document.querySelector("#customerPhone");
        const addressInput = document.querySelector("#customerAddress");

        const name = nameInput ? nameInput.value.trim() : "";
        const phone = phoneInput ? phoneInput.value.trim() : "";
        const address = addressInput ? addressInput.value.trim() : "";
        const quantity = quantityInput ? Number(quantityInput.value) : 1;

        if (name.length < 3) {
            alert("Please enter your full name.");
            return;
        }

        const phonePattern = /^03[0-9]{9}$/;
        if (!phonePattern.test(phone)) {
            alert("Please enter a valid Pakistani phone number (e.g. 03123456789).");
            return;
        }

        if (address.length < 10) {
            alert("Please enter your complete delivery address.");
            return;
        }

        if (quantity < 1) {
            alert("Quantity must be at least 1.");
            return;
        }

        const product = selectedProduct ? selectedProduct.textContent : "";
        const size = selectedSize ? selectedSize.textContent : "";
        const price = selectedPrice ? Number(selectedPrice.textContent) : 0;
        const total = price * quantity;

        const message =
`*New Order - Arqami Perfume*

*Customer Details*
Name: ${name}
Phone: ${phone}
Address: ${address}

*Order Details*
Product: ${product}
Size: ${size}
Quantity: ${quantity}
Price per bottle: Rs.${price}
Total: Rs.${total}

Thank you!`;

        const whatsappNumber = "923132285083";
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, "_blank");

        orderForm.reset();
        if (orderOverlay) orderOverlay.classList.remove("show");
        document.body.style.overflow = "auto";
        if (orderTotal) orderTotal.textContent = "0";
    });
}

// =========================
// CONTACT FORM WHATSAPP
// =========================
const contactForm = document.querySelector("#contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nameInput = document.querySelector("#contactName");
        const emailInput = document.querySelector("#contactEmail");
        const subjectInput = document.querySelector("#contactSubject");
        const messageInput = document.querySelector("#contactMessage");

        if (!nameInput || !emailInput || !subjectInput || !messageInput) {
            alert("Form elements not found. Please refresh.");
            return;
        }

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();

        if (name.length < 3) {
            alert("Please enter your name.");
            return;
        }

        if (subject.length < 3) {
            alert("Please enter a subject.");
            return;
        }

        if (message.length < 5) {
            alert("Please enter your message.");
            return;
        }

        const whatsappMessage =
`*Arqami Perfume - Contact Message*

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}`;

        const whatsappNumber = "923132285083";
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(whatsappURL, "_blank");
        contactForm.reset();
    });
}