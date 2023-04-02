setTimeout(() => {

    console.log(1);

}, 0);

async function main1() {

    new Promise((resolve, reject) => {

        console.log(2);

        resolve(resolve);

    }).then((resolve) => {

        console.log(3);
        resolve();
    }).then(() => {
        console.log(4)
    })

    await main2();

    console.log(7);

}

function main2() {

    console.log(8);

}

main1();

setTimeout(() => {

    console.log(10);

}, 0);