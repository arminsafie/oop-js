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

class ElementAtt {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHook, shouldRender = true) {
    this.hookId = renderHook;
    if (shouldRender) {
      this.render();
    }
  }
  render() {}
  createRootEl(tag, cssClasses, attributes) {
    const rootEl = document.createElement(tag);
    if (cssClasses) {
      rootEl.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootEl.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootEl);
    return rootEl;
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId, false);
    this.product = product;
    this.render();
  }
  addToCart() {
    App.addProductToCart(this.product);
  }
  render() {
    const prodEl = this.createRootEl("li", "product-item");
    prodEl.innerHTML = `
      <div>
        <img src="${this.product.ImageUrl}" alt ="${this.product.title}>
        <div class="product-item__content">
          <h2>${this.product.title}</h2>
          <h3>\$${this.product.price}</h3>
          <p>${this.product.description}</p>
          <button >Add to card</button>
        </div>
      </div>
      `;
    const addCartBtn = prodEl.querySelector("button");
    addCartBtn.addEventListener("click", this.addToCart.bind(this));
  }
}

class ShopingCart extends Component {
  item = [];
  set cartItem(value) {
    this.item = value;
    this.totalOutput.innerHTML = `<h2>total \$ ${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }
  get totalAmount() {
    const sum = this.item.reduce(
      (prevVal, curItem) => prevVal + curItem.price,
      0
    );
    return sum;
  }
  constructor(renderHookId) {
    super(renderHookId);
  }
  addProduct(product) {
    const updatedItme = [...this.item];
    updatedItme.push(product);
    this.cartItem = updatedItme;
  }
  render() {
    const cartEl = this.createRootEl("section", "cart");
    cartEl.innerHTML = `
      <h2>total \$ ${0}</h2>
      <button>Order Now!</button>
    `;
    this.totalOutput = cartEl.querySelector("h2");
  }
}

class ProductList extends Component {
  products = [];
  constructor(renderHookId) {
    super(renderHookId);
    this.fetchProducts();
  }
  fetchProducts() {
    this.products = [
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
    this.renderProduct();
  }
  renderProduct() {
    for (const prod of this.products) {
      new ProductItem(prod, "prod-list");
    }
  }
  render() {
    const prodList = this.createRootEl("ul", "product-list", [
      new ElementAtt("id", "prod-list"),
    ]);
    if (this.products && this.products.length > 0) {
      this.renderProduct();
    }
  }
}

class Shop extends Component {
  constructor() {
    // this.render();
    super();
  }
  render() {
    this.cart = new ShopingCart("app");
    new ProductList("app");
  }
}

class App {
  static cart;
  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }
  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
