const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const match = content.match(/(<div class="row gallery-grid">\s*)([\s\S]*?)(\s*<!-- Mobile App 1: Budget \/ Finance Tracker -->)/);
const gridContent = match[2];
const blockPattern = /<!-- Web Project \d+ -->\s*<div class="gallery_product[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/g;
const blocks = gridContent.match(blockPattern);
blocks.forEach((b, i) => {
    let found = false;
    ['gymw1.png', 'qtechx1.png', 's1.png', 'saree1.png', 'sravana1.png', 'd1.png', 'veeturusi1.png', 'babes1.png', 'car1.png', 'super1.png', 'farmly.png', 'kavis1.png', 'maulprint1.png', 'ozn.png'].forEach(img => {
        if (b.includes(img)) found = true;
    });
    if (!found) console.log('Block ' + i + ' missing image match. Starts with: ' + b.substring(0, 200));
});
