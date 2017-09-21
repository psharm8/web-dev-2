let products=[
    {
        productId:1,
        name: "Invisible Phone",
        summary: "This a revolutionary phone that is visible only to the owner.",
        details:"This phone is not visible to anyone other than the owner of the phone. This phone comes with special contact lenses that the owner should wear to see the phone.",
        img:"public/images/invisible-phone.jpg"
    },{
        productId:4,
        name: "Wi-Fi Snoop",
        summary: "Router to steal nearby connections.",
        details:"Install this at you place and let it do its magic. It will scan for nearby wireless netwroks and break into them. Once done, yoou will never be offline again.",
        img:"public/images/wifi.jpg"
    },
    {
        productId:5,
        name: "Carry on heat",
        summary: "Small heater for winters.",
        details:"Small portable heater for those extreme winter. Just keep it in your pocket or anywhere near you body and you will be comfortable in wimters.",
        img:"public/images/heater.jpg"
    },  {
        productId:9,
        name: "Defogging glasses",
        summary: "De-fog your glasses when you get out of your car (AC).",
        details:"These frames have inbuilt defogger which can be used to quickly defog the glasses you wear. When you step out of AC just push a button and your vision will be clear in seconds.",
        img:"public/images/defog.jpg"
    },
    {
        productId:2,
        name: "Chopping Blinds",
        summary: "These window blinds can be used to chop.",
        details:"Blades of this window blinds are razor sharp. They come in handy when you are ready to prepare dinner and find out that your knife is missing. Simply push your veggies throught he blinds to have them chopped cleanly. WARNING: Keep away from children.",
        img:"public/images/blinds.jpg"
    },
    {
        productId:3,
        name: "Cheating glasses",
        summary: "Pair of glasses with digital display.",
        details:"These glasses have a display on the inner surface. They can be programmed to display image when you wear them. They look like ordinary glasses from the other side. Very useful during exams ;).",
        img:"public/images/glasses.jpg"
    },
    
    {
        productId:6,
        name: "Magic Wand",
        summary: "Do some cool stuff.",
        details:"Use this magic wand to get work done. Use it to impress people. Have it float heavy objects so that you can just push them where you want.",
        img:"public/images/wand.jpg"
    },
    {
        productId:7,
        name: "Unbeatable cards",
        summary: "Progam them to your favour.",
        details:"These are digital playing cards that can be programmed. You can change the card using you cell phone. Use them at games where you need some luck.",
        img:"public/images/digital-cards.jpg"
    },
  
    {
        productId:10,
        name: "Card copy",
        summary: "No need to carry multiple credit cards.",
        details:"Clone all your credit cards into a single card and use it the same way you would use any other credit card. Swtich between the cards cloned using your cell phone.",
        img:"public/images/credit-card.jpg"
    },
    {
        productId:8,
        name: "Foot Massage",
        summary: "Best shoes ever.",
        details:"These shoes have inbuilt foot massager. The massager kicks in at fixed intervals (programmable). You may also trigger a massage manually.",
        img:"public/images/shoes.jpg"
    }
];
let exportedMethods = {

    getProducts(){
        return new Promise((resolve)=>{
            resolve(products);
        });
    }
};
module.exports = exportedMethods;