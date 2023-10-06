const fs = require('fs');
const path = require('path');
const axios = require('axios');




function readJsonFile(filePath) {
    try {
        const absolutePath = path.resolve(filePath);
        console.log(`Trying to read file: ${absolutePath}`);
        
        const data = fs.readFileSync(absolutePath, 'utf-8');
        const object = JSON.parse(data);
        return object;
    } catch (error) {
        console.error('Erreur lors de la lecture ou de la conversion du fichier JSON:', error);
        return null;
    }
}

const filePath = './adresse_paris.json';
const jsonData = readJsonFile(filePath);

// jsonData.forEach((bread) => {
//     setTimeout(() => {
//     axios({
//         method: 'post',
//         url: 'http://localhost:3000/add-bread',
//         data: bread
//     }).then((response) => {
//         console.log(response.data);
//     }
//     ).catch((error) => {
//         console.error(error);
//     });
// },500);
// }
// );



for (const adress of jsonData) {
    console.log(adress)
         axios({
            method: 'post',
            url: 'http://localhost:3000/add-adress',
            data: {
                Street : adress.l_adr,
                District : adress.n_sq_ar
            }
        }).then((response) => {
            console.log(response.data);

        }
        ).catch((error) => {
            console.error(error);
        });

}

