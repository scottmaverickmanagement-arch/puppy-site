import fs from 'fs';
import path from 'path';

const assetsDir = './public/assets';
const publicDir = './public/available_puppies';
const dataFile = './src/data/puppies.js';

if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}
if (!fs.existsSync(path.dirname(dataFile))) {
    fs.mkdirSync(path.dirname(dataFile), { recursive: true });
}

const names = ['Bella', 'Max', 'Luna', 'Charlie', 'Lucy', 'Cooper', 'Daisy', 'Milo', 'Zoe', 'Rocky', 'Lola', 'Buddy', 'Sadie', 'Tucker', 'Bailey', 'Oliver', 'Stella', 'Bear', 'Molly', 'Duke', 'Chloe', 'Leo', 'Zeus', 'Penny', 'Ruby', 'Oscar', 'Rosie', 'Jax', 'Lily', 'Winston', 'Riley', 'Buster', 'Mia', 'Murphy', 'Gatsby', 'Fido', 'Roxy', 'Finn', 'Scout', 'Abby', 'Simba', 'Penny', 'Gus', 'Sam', 'Hazel'];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const directories = [
    'available beagles', 'available boxer', 'available cavalier',
    'available dachshund', 'available french bulldogs', 'available german shepherd',
    'available golden retrievers', 'available labrador retrievers', 'available pomeranians',
    'available poodles', 'available rott', 'available siberian husky', 'available yorkie'
];

const breedMap = {
    'available beagles': { name: 'Beagle', size: 'Small' },
    'available boxer': { name: 'Boxer', size: 'Large' },
    'available cavalier': { name: 'Cavalier King Charles Spaniel', size: 'Small' },
    'available dachshund': { name: 'Dachshund', size: 'Small' },
    'available french bulldogs': { name: 'French Bulldog', size: 'Small' },
    'available german shepherd': { name: 'German Shepherd', size: 'Large' },
    'available golden retrievers': { name: 'Golden Retriever', size: 'Large' },
    'available labrador retrievers': { name: 'Labrador Retriever', size: 'Large' },
    'available pomeranians': { name: 'Pomeranian', size: 'Small' },
    'available poodles': { name: 'Poodle', size: 'Medium' },
    'available rott': { name: 'Rottweiler', size: 'Large' },
    'available siberian husky': { name: 'Siberian Husky', size: 'Large' },
    'available yorkie': { name: 'Yorkshire Terrier', size: 'Small' }
};

const puppies = [];
let idCounter = 1;

for (const dir of directories) {
    const dirPath = path.join(assetsDir, dir);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath).filter(f => f.match(/\.(jpg|jpeg|png|webp|avif)$/i));
    const breedInfo = breedMap[dir];

    for (const file of files) {
        const ext = path.extname(file);
        const newFileName = `${breedInfo.name.replace(/\s+/g, '_').toLowerCase()}_${idCounter}${ext}`;
        const destPath = path.join(publicDir, newFileName);

        fs.copyFileSync(path.join(dirPath, file), destPath);

        const ageInWeeks = getRandomInt(4, 18);
        const gender = getRandomItem(['Male', 'Female']);
        const isPurebred = Math.random() > 0.2; // 80% chance of being purebred
        const typeStr = isPurebred ? 'Purebred' : 'Mix';
        const price = '$' + getRandomInt(12, 45) + '00';
        const readyToTravel = Math.random() > 0.4 ? 'Yes' : 'No';

        puppies.push({
            id: idCounter,
            name: getRandomItem(names),
            breed: breedInfo.name,
            size: breedInfo.size,
            type: typeStr,
            gender: gender,
            age: `${ageInWeeks} weeks`,
            price: price,
            readyToTravel: readyToTravel,
            image: `/available_puppies/${newFileName}`,
            photos: getRandomInt(1, 6),
            videos: getRandomInt(0, 2),
            exclusive: Math.random() > 0.7
        });

        idCounter++;
    }
}

const fileContent = `// Automatically generated from local assets
export const puppies = ${JSON.stringify(puppies, null, 4)};\n`;

fs.writeFileSync(dataFile, fileContent);
console.log(`Generated ${puppies.length} puppies successfully.`);
