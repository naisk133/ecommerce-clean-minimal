import express, { Application, Request, Response } from "express";
import { CheckoutService, ProductService } from "../policy/checkout.service";
import { CheckoutRepositoryTypeORMAdapter } from "./checkout.adapter";

const app: Application = express();

const productService = new ProductService();
const checkoutRepo = new CheckoutRepositoryTypeORMAdapter();
const checkoutService = new CheckoutService(checkoutRepo, productService);

app.get("/", (req: Request, res: Response) => {
  checkoutService.createCheckout({ email: "wattanai.tha@gmail.com" });

  productService.createProduct({ name: "Iphone", price: 20000 });

  checkoutService.addProductToCheckout("wattanai.tha@gmail.com", "Iphone");

  const checkout = checkoutService.getCheckoutByEmail("wattanai.tha@gmail.com");

  res.json(checkout);
});


app.listen(3000);
