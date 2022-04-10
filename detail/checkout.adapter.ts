import { Checkout, CheckoutRepository } from "../policy/checkout.service";

export class CheckoutRepositoryInArrayAdapter implements CheckoutRepository {
  checkouts: Checkout[] = [];
  pushCheckout(checkout: Checkout) {
    this.checkouts.push(checkout);
  }
  getCheckoutByEmail(email: string) {
    return this.checkouts.filter((checkout) => checkout.email === email)[0];
  }
}

export class CheckoutRepositoryTypeORMAdapter implements CheckoutRepository {
  typeorm: Checkout[] = [];
  pushCheckout(checkout: Checkout) {
    this.typeorm.push(checkout);
  }
  getCheckoutByEmail(email: string) {
    return this.typeorm.filter((checkout) => checkout.email === email)[0];
  }
}

export class CheckoutRepositoryMongoDBAdapter implements CheckoutRepository {
  mongoConnection: Checkout[] = [];
  pushCheckout(checkout: Checkout) {
    this.mongoConnection.push(checkout);
  }
  getCheckoutByEmail(email: string) {
    return this.mongoConnection.filter(
      (checkout) => checkout.email === email
    )[0];
  }
}
