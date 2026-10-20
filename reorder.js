const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');

const match = content.match(/(<div class="row gallery-grid">\s*)([\s\S]*?)(\s*<!-- Mobile App 1: Budget \/ Finance Tracker -->)/);
if (!match) {
    console.error("Could not find gallery grid!");
    process.exit(1);
}

const prefix = content.slice(0, match.index) + match[1];
const gridContent = match[2];
const suffix = match[3] + content.slice(match.index + match[0].length);

const blockPattern = /<!-- Web Project \d+ -->\s*<div class="gallery_product[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/g;
const blocks = gridContent.match(blockPattern);

const desiredOrder = [
    ["gym", "DAP Gym Website"],
    ["qtechx", "Q Techx Company Management System"],
    ["s1", "Learning Management Website"],
    ["saree", "Saree World Website"],
    ["sravana", "Sri Saravana Shopping Website"],
    ["d1", "DMart Supermarket Website"],
    ["veeturusi", "Veetu Rusi Food Website"],
    ["babes", "Babe’s World – E-Commerce Website"],
    ["car1", "Car Service – Booking & Management System"],
    ["super1", "Dental Hospital – Management System"],
    ["farmly", "Formerly – Business Website"],
    ["kavis", "Kavi’s Dry Fruits Website"],
    ["maulprint", "MauvalPrint Website"],
    ["ozn", "Ozone Industries Website"]
];

const blockMap = {};
blocks.forEach(b => {
    if (b.includes('gallery/gymw1.png')) blockMap['gym'] = b;
    else if (b.includes('gallery/qtechx1.png')) blockMap['qtechx'] = b;
    else if (b.includes('gallery/saree1.png')) blockMap['saree'] = b;
    else if (b.includes('gallery/sravana1.png')) blockMap['sravana'] = b;
    else if (b.includes('gallery/d1.png')) blockMap['d1'] = b;
    else if (b.includes('gallery/veeturusi1.png')) blockMap['veeturusi'] = b;
    else if (b.includes('gallery/babes1.png')) blockMap['babes'] = b;
    else if (b.includes('gallery/car1.png')) blockMap['car1'] = b;
    else if (b.includes('gallery/super1.png')) blockMap['super1'] = b;
    else if (b.includes('gallery/farmly.png')) blockMap['farmly'] = b;
    else if (b.includes('gallery/kavis1.png')) blockMap['kavis'] = b;
    else if (b.includes('gallery/maulprint1.png')) blockMap['maulprint'] = b;
    else if (b.includes('gallery/ozn.png')) blockMap['ozn'] = b;
    else if (b.includes('gallery/s1.png')) blockMap['s1'] = b; // Put s1 last just in case
});

if (Object.keys(blockMap).length !== 14) {
    console.error("Failed to map all blocks. Found: " + Object.keys(blockMap).join(', '));
    process.exit(1);
}

const newBlocks = [];
desiredOrder.forEach(([key, title], i) => {
    let b = blockMap[key];
    
    b = b.replace(/data-project-title="[^"]+"/, `data-project-title="${title}"`);
    b = b.replace(/<h4>.*?<\/h4>/, `<h4>${title}</h4>`);
    b = b.replace(/alt="[^"]+"/, `alt="${title}"`);
    b = b.replace(/<!-- Web Project \d+ -->/, `<!-- Web Project ${i + 1} -->`);
    
    newBlocks.push(b);
});

let newGridContent = newBlocks.join('\n                ');
if (!newGridContent.startsWith('                ')) {
    newGridContent = '                ' + newGridContent.trimStart();
}

fs.writeFileSync('index.html', prefix + newGridContent + suffix, 'utf8');
console.log("Updated index.html successfully!");
