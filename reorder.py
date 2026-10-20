import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the gallery grid
grid_match = re.search(r'(<div class="row gallery-grid">\s*)(.*?)(\s*<!-- Mobile Project 1 -->)', content, re.DOTALL)
if not grid_match:
    print("Could not find gallery grid!")
    exit(1)

prefix = content[:grid_match.start(2)]
grid_content = grid_match.group(2)
suffix = content[grid_match.end(2):]

# Extract all 14 web project blocks
block_pattern = re.compile(r'<!-- Web Project \d+ -->\s*<div class="gallery_product.*?</div>\s*</div>\s*</div>\s*</div>', re.DOTALL)
blocks = block_pattern.findall(grid_content)

print(f"Found {len(blocks)} blocks")

# Map of images -> desired project info
desired_order = [
    ("gym", "DAP Gym Website", "Web Application"),
    ("qtechx", "Q Techx Company Management System", "Web Application"),
    ("s1", "Learning Management Website", "Web Application"),
    ("saree", "Saree World Website", "Web Application"),
    ("sravana", "Sri Saravana Shopping Website", "Web Application"),
    ("d1", "DMart Supermarket Website", "Web Application"),
    ("veeturusi", "Veetu Rusi Food Website", "Web Application"),
    ("babes", "Babe’s World – E-Commerce Website", "Web Application"),
    ("car1", "Car Service – Booking & Management System", "Web Application"),
    ("super1", "Dental Hospital – Management System", "Web Application"),
    ("farmly", "Formerly – Business Website", "Web Application"),
    ("kavis", "Kavi’s Dry Fruits Website", "Web Application"),
    ("maulprint", "MauvalPrint Website", "Web Application"),
    ("ozn", "Ozone Industries Website", "Web Application")
]

# Identify blocks by their images
block_map = {}
for b in blocks:
    if 'gymw1.png' in b: block_map['gym'] = b
    elif 'qtechx1.png' in b: block_map['qtechx'] = b
    elif 's1.png' in b: block_map['s1'] = b
    elif 'saree1.png' in b: block_map['saree'] = b
    elif 'sravana1.png' in b: block_map['sravana'] = b
    elif 'd1.png' in b: block_map['d1'] = b
    elif 'veeturusi1.png' in b: block_map['veeturusi'] = b
    elif 'babes1.png' in b: block_map['babes'] = b
    elif 'car1.png' in b: block_map['car1'] = b
    elif 'super1.png' in b: block_map['super1'] = b
    elif 'farmly.png' in b: block_map['farmly'] = b
    elif 'kavis1.png' in b: block_map['kavis'] = b
    elif 'maulprint1.png' in b: block_map['maulprint'] = b
    elif 'ozn.png' in b: block_map['ozn'] = b

if len(block_map) != 14:
    print("Failed to map all blocks. Found:", list(block_map.keys()))
    exit(1)

new_blocks = []
for i, (key, title, sub) in enumerate(desired_order, 1):
    b = block_map[key]
    
    # Update title in data-project-title
    b = re.sub(r'data-project-title="[^"]+"', f'data-project-title="{title}"', b)
    
    # Update h4
    b = re.sub(r'<h4>.*?</h4>', f'<h4>{title}</h4>', b)
    
    # Update alt text
    b = re.sub(r'alt="[^"]+"', f'alt="{title}"', b)
    
    # Update Web Project comment
    b = re.sub(r'<!-- Web Project \d+ -->', f'<!-- Web Project {i} -->', b)
    
    new_blocks.append(b)

new_grid_content = '\n                '.join(new_blocks)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(prefix + new_grid_content + suffix)

print("Updated index.html successfully!")
