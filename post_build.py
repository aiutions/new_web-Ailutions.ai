
import json
import os

build_dir = os.path.join(os.path.dirname(__file__), 'frontend/build')
manifest_path = os.path.join(build_dir, 'asset-manifest.json')

with open(manifest_path, 'r') as f:
    manifest = json.load(f)

css_files = [f for f in manifest['files'] if f.endswith('.css')]

if not css_files:
    print("No CSS file found in manifest.")
    exit()

# Assuming the main css file is the one we want to defer
main_css = manifest['files']['main.css']
index_path = os.path.join(build_dir, 'index.html')

with open(index_path, 'r') as f:
    index_html = f.read()

css_link_pattern = f'<link href="{main_css}" rel="stylesheet">'
# More robust pattern to find the CSS link
import re
css_link_pattern_re = re.compile(r'<link href="(.*?main.*?\.css)" rel="stylesheet">')
match = css_link_pattern_re.search(index_html)

if not match:
    print("CSS link tag not found in index.html. It might already be modified.")
    exit()

css_file_path = match.group(1)
original_css_link = match.group(0)

new_css_link = f'<link href="{css_file_path}" rel="stylesheet" media="print" onload="this.media=\'all\'"><noscript><link href="{css_file_path}" rel="stylesheet"></noscript>'

index_html_modified = index_html.replace(original_css_link, new_css_link)

with open(index_path, 'w') as f:
    f.write(index_html_modified)

print(f'Successfully deferred CSS loading for {css_file_path}.')

