export class ProductService {
  products: any[] = [];

  createProduct(productDto: { name: string; price: number }) {
    this.products.push(productDto);
  }
  listProducts() {
    return this.products;
  }
  getProductByName(productName: string) {
    return this.products.filter((product) => product.name === productName)[0];
  }
}

export class Checkout {
  email: string;
  productsInCart: any[];

  constructor(email: string) {
    this.email = email;
    this.productsInCart = [];
  }

  addProduct(product: any) {
    this.productsInCart.push(product);
  }

  get total() {
    return this.productsInCart.reduce((acc, product) => acc + product.price, 0);
  }
}

export interface CheckoutRepository {
  pushCheckout(checkout: Checkout): void;
  getCheckoutByEmail(email: string): Checkout;
}

export class CheckoutService {
  checkoutRepository: CheckoutRepository; // Dependency - Concrete / Abstract
  productService: ProductService;

  constructor(
    checkoutRepository: CheckoutRepository,
    productService: ProductService
  ) {
    this.checkoutRepository = checkoutRepository;
    this.productService = productService;
  }

  createCheckout(checkoutDto: { email: string }) {
    const checkout = new Checkout(checkoutDto.email);
    this.checkoutRepository.pushCheckout(checkout);
  }

  getCheckoutByEmail(email: string) {
    return this.checkoutRepository.getCheckoutByEmail(email);
  }

  addProductToCheckout(email: string, productName: string) {
    const checkout = this.getCheckoutByEmail(email);
    const product = this.productService.getProductByName(productName);

    checkout.addProduct(product);
  }
}
