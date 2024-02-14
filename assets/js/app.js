class Product {
  // title = "DEFAULT";
  // ImageUrl;
  // description;
  // price;

  constructor(title, imgae, desc, price) {
    this.title = title;
    this.ImageUrl = imgae;
    this.description = desc;
    this.price = price;
  }
}

class ProductItem {
  constructor(Product) {
    this.Product = Product;
  }
  addToCart() {
    console.log("adding product to cart...");
    console.log(this.Product);
  }
  render() {
    const prodEl = document.createElement("li");
    prodEl.className = "product-item";
    prodEl.innerHTML = `
      <div>
        <img src="${this.Product.ImageUrl}" alt ="${this.Product.title}>
        <div class="product-item__content">
          <h2>${this.Product.title}</h2>
          <h3>\$${this.Product.price}</h3>
          <p>${this.Product.description}</p>
          <button >Add to card</button>
        </div>
      </div>
      `;
    const addCartBtn = prodEl.querySelector("button");
    addCartBtn.addEventListener("click", this.addToCart.bind(this));
    return prodEl;
  }
}

class ShopingCart {
  item = [];

  render() {
    const cartEl = document.createElement("section");
    cartEl.innerHTML = `
      <h2>total \$ ${0}</h2>
      <button>Order Now!</button>

    
    `;
    cartEl.classList.add("cart");
    return cartEl;
  }
}

class ProductList {
  products = [
    new Product(
      "apple Visenpro",
      "https://www.technolife.ir/image/small_product-TLP-33907_cc6726dd-282d-457e-96b9-bd078e9ab74c.png",
      "future of technology",
      19.99
    ),
    new Product(
      "gaming laptop",
      "https://www.technolife.ir/image/small_product-TLP-18647_e7f27822-965e-4a10-a1ab-71cff92f430c.png",
      "future of gameing",
      19.99
    ),
  ];
  constructor() {}
  render() {
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    return prodList;
  }
}

class Shop {
  render() {
    const root = document.getElementById("app");
    const cart = new ShopingCart();
    const cartEl = cart.render();
    const productList = new ProductList();
    const prodListEl = productList.render();

    root.append(cartEl);
    root.append(prodListEl);
  }
}

const shop = new Shop();

shop.render();
