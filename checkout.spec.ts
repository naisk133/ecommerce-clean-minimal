import { CheckoutRepositoryInArrayAdapter } from "./detail/checkout.adapter";
import { CheckoutService, ProductService } from "./policy/checkout.service";

test("create product", () => {
  const productService = new ProductService();

  productService.createProduct({
    name: "Iphone",
    price: 20000,
  });

  const products = productService.listProducts();
  expect(products.length).toEqual(1);
});

test("create checkout", () => {
  const productService = new ProductService();
  const checkoutRepository = new CheckoutRepositoryInArrayAdapter();
  const checkoutService = new CheckoutService(
    checkoutRepository,
    productService
  );

  checkoutService.createCheckout({ email: "wattanai.tha@gmail.com" });

  const checkout = checkoutService.getCheckoutByEmail("wattanai.tha@gmail.com");
  expect(checkout.email).toEqual("wattanai.tha@gmail.com");
});

test("add product to checkout", () => {
  const productService = new ProductService();
  const checkoutRepository = new CheckoutRepositoryInArrayAdapter();
  const checkoutService = new CheckoutService(
    checkoutRepository,
    productService
  );

  checkoutService.createCheckout({ email: "wattanai.tha@gmail.com" });

  productService.createProduct({ name: "Iphone", price: 20000 });

  checkoutService.addProductToCheckout("wattanai.tha@gmail.com", "Iphone");
  checkoutService.addProductToCheckout("wattanai.tha@gmail.com", "Iphone");

  const checkout = checkoutService.getCheckoutByEmail("wattanai.tha@gmail.com");
  expect(checkout.total).toEqual(40000);
});
