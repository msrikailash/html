import os
import sys

try:
    from bs4 import BeautifulSoup
except ImportError:
    print("BeautifulSoup is not installed. Please install it using 'pip install beautifulsoup4' or let me know if you want a regex-based solution (not recommended).")
    sys.exit(1)

def extract_styles(html_file, css_file, output_html_file):
    if not os.path.exists(html_file):
        print(f"File not found: {html_file}")
        return

    print(f"Reading {html_file}...")
    with open(html_file, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')

    styles = {}
    style_counter = 1
    
    # Find all tags with style attribute
    tags_with_style = soup.find_all(True, attrs={"style": True})
    print(f"Found {len(tags_with_style)} tags with inline styles.")

    for tag in tags_with_style:
        style_content = tag['style'].strip()
        if not style_content:
            continue
        
        # Normalize style string (simple normalization: remove extra spaces, trailing semicolons)
        # This helps deduping "color: red;" and "color: red"
        style_content_norm = style_content.strip().rstrip(';')
        
        if style_content_norm in styles:
            class_name = styles[style_content_norm]
        else:
            class_name = f"extracted-style-{style_counter}"
            styles[style_content_norm] = class_name
            style_counter += 1
        
        # Add class to tag
        existing_classes = tag.get('class', [])
        if isinstance(existing_classes, str):
            existing_classes = existing_classes.split()
        
        if class_name not in existing_classes:
            existing_classes.append(class_name)
            tag['class'] = existing_classes
        
        # Remove style attribute
        del tag['style']

    # Write CSS file
    print(f"Writing CSS to {css_file}...")
    with open(css_file, 'w', encoding='utf-8') as f:
        f.write("/* Extracted Styles */\n")
        for content, name in styles.items():
            f.write(f".{name} {{ {content} }}\n")

    # Add link to new CSS file in HTML head
    # Check if link already exists
    css_basename = os.path.basename(css_file)
    link_exists = False
    if soup.head:
        for link in soup.head.find_all('link'):
            if link.get('href') == css_basename:
                link_exists = True
                break
        
        if not link_exists:
            new_link = soup.new_tag("link", rel="stylesheet", href=css_basename)
            soup.head.append(new_link)
            print(f"Added link to {css_basename} in <head>.")

    # Write modified HTML
    print(f"Writing HTML to {output_html_file}...")
    with open(output_html_file, 'w', encoding='utf-8') as f:
        f.write(str(soup))

    print("Done.")

if __name__ == "__main__":
    extract_styles('temp_source.html', 'extracted_styles.css', 'temp_source_clean.html')
