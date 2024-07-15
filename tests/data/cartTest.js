import { addToCart, loadFromStorage, cart } from "../../data/cart.js";

describe("test suite: addToCart", () => {
  it("adds an existing product to the cart array", () => {
    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 5,
          deliveryOptionId: "1",
        },
        {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2'
        }
      ]);
    });
    loadFromStorage();
    addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart.length).toEqual(2);
    expect(cart[1].quantity).toEqual(2);

  });

  it("adds a new product to the cart array", () => {
    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();

    addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d");
    expect(cart[0].quantity).toEqual(1);
  });
});
