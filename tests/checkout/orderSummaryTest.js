import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage } from "../../data/cart.js";

describe("test suite: renderordersummary", () => {

   const  product1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
   const product2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    const product3 = '54e0eccd-8f36-462b-b68a-8182611d9add';

  //how the page is looks
  it("display the cart", () => {
    document.querySelector(
      ".js-test-container"
    ).innerHTML = 
    `
    <div class="js-order-summary"></div>
    <div class="js-payment-summary"></div>
    
    `;

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: product1,
          quantity: 5,
          deliveryOptionId: "1",
        },
        {
          productId: product2,
          quantity: 1,
          deliveryOptionId: "2",
        },
        {
            productId: product3,
            quantity: 1,
            deliveryOptionId: "2",
          }
      ]);
    });
    loadFromStorage();

    renderOrderSummary();

    expect(
        document.querySelectorAll('.js-cart-item-container').length
      ).toEqual(3);

      expect(
        document.querySelector(`.js-product-quantity-${product2}`).innerText
      ).toContain('Quantity: 1');

      expect(
        document.querySelector(`.js-product-quantity-${product3}`).innerText
      ).toContain('Quantity: 1');

      expect(
        document.querySelector(`.js-product-quantity-${product1}`).innerText
      ).toContain('Quantity: 5');
  });

  it('removes a product',()=>{
    document.querySelector(
        ".js-test-container"
      ).innerHTML = `<div class="js-order-summary"></div>`;
  
      spyOn(localStorage, "getItem").and.callFake(() => {
        return JSON.stringify([
          {
            productId: product1,
            quantity: 5,
            deliveryOptionId: "1",
          },
          {
            productId: product2,
            quantity: 1,
            deliveryOptionId: "2",
          }
          
        ]);
      });
      loadFromStorage();
  
      renderOrderSummary();

      document.querySelector(`.js-delete-link-${product1}`).click();

      expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);

      expect(
        document.querySelector(`.js-cart-item-container-${product1}`)
      ).toEqual(null);
      expect(
        document.querySelector(`.js-cart-item-container-${product2}`)
      ).not.toEqual(null);
  })
});
