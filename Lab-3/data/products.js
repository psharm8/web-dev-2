let products=[
    {
        productId:1,
        name: "Invisible Phone",
        summary: "This a revolutionary phone that is visible only to the owner.",
        details:"This phone is not visible to anyone other than the owner of the phone. This phone comes with special contact lenses that the owner should wear to see the phone.",
        img:"public/images/invisible-phone.jpg"
    },
    {
        productId:2,
        name: "Chopping Window Blinds",
        summary: "These window blinds can be used to chop.",
        details:"Blades of this window blinds are razor sharp. They come in handy when you are ready to prepare dinner and find out that your knife is missing. Simply push your veggies throught he blinds to have them chopped cleanly. WARNING: Keep away from children.",
        img:"public/images/blinds.jpg"
    },
    {
        productId:3,
        name: "Cheating glasses",
        summary: "Pair of glasses with display.",
        details:"These glasses have a display on the inner surface. They can be programmed to display image when you wear them. They look like ordinary glasses from the other side. Very useful during exams ;).",
        img:"public/images/glasses.jpg"
    },
    {
        productId:4,
        name: "Wi-Fi Snoop",
        summary: "Router to steal nearby connections.",
        details:"Install this at you place and let it do its magic. It will scan for nearby wireless netwroks and break into them. Once done, yoou will never be offline again.",
        img:"public/images/wifi.jpg"
    }
];
let exportedMethods = {

    getProducts(){
        return new Promise((resolve, reject)=>{
            resolve(products);
        });
    }
};
module.exports = exportedMethods;