export function getDeliveryOption(deliveryOptionId){
    let selectedOption = deliveryOptions[0]; // Default to the first option
    deliveryOptions.forEach((option) => {
        if (option.id == deliveryOptionId) {
            selectedOption = option; // Assign to selectedOption instead of deliveryOptions
        }
    });
    return selectedOption;
}

export const deliveryOptions=[
    {
        id:'1',
        deliveryDays:7,
        priceCents:0
    },
    {
        id:'2',
        deliveryDays:3,
        priceCents:499
    },
    {
        id:'3',
        deliveryDays:1,
        priceCents:999
    }
]


