import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

updates = {
    'Billing Web': 'http://billing.qtechx.com/',
    'Car Service Book': 'https://cars.qtechx.com/',
    'SuperMarket Web': 'https://dmart.qtechx.com/',
    'Dry Website': 'https://farmely.qtechx.com/',
    'Gym Website': 'https://dapfitt.com/',
    'Maulprint Website': 'https://mauvalprint.in/',
    'Ozone Industrys': 'https://ozoneindustrys.com/',
    'Q Techx Web Site': 'https://qtechx.com/',
    'Saree Web Site': 'https://saree.qtechx.com/',
    'Sri Saravana Shoppings': 'https://saravanashoppings.com/',
    'Veetu Rusi Website': 'https://veeturusi.qtechx.com/'
}

pattern = re.compile(r'(<div class=\"gallery_product[^>]*data-project-title=\"(.*?)\"[^>]*>.*?)(<a href=\"#\" title=\"Live Link\">)(.*?</div>\s*</div>\s*</div>)', re.DOTALL)

def replace_link(match):
    prefix = match.group(1)
    title = match.group(2)
    link_tag = match.group(3)
    suffix = match.group(4)
    
    if title in updates:
        link_tag = '<a href=\"' + updates[title] + '\" target=\"_blank\" title=\"Live Link\">'
        
    return prefix + link_tag + suffix

new_html = pattern.sub(replace_link, html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print('Updated links successfully.')
