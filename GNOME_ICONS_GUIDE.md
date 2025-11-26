# GNOME Adwaita Icons Guide

This guide helps you replace all macOS icons with GNOME Adwaita icons for an authentic Linux desktop experience.

## Where to Get Adwaita Icons

### Option 1: Download from GNOME GitLab (Recommended)
```bash
# Clone the icon theme
git clone https://gitlab.gnome.org/GNOME/adwaita-icon-theme.git

# Icons are in: adwaita-icon-theme/Adwaita/
```

### Option 2: Use a Pre-packaged Icon Set
Download from: https://github.com/GNOME/adwaita-icon-theme/releases

### Option 3: Extract from Your System (if you have Linux/GNOME)
```bash
# Icons are usually located at:
/usr/share/icons/Adwaita/
```

## Icon Mapping Reference

### Dock Applications (`/public/images/`)

| App | Old Icon | New Icon Filename | Adwaita Icon Name |
|-----|----------|-------------------|-------------------|
| Portfolio/Finder | `finder.png` | `folder.svg` | `system-file-manager` or `org.gnome.Nautilus` |
| Articles/Browser | `safari.png` | `web-browser.svg` | `web-browser` or `org.gnome.Epiphany` |
| Gallery/Photos | `photos.png` | `photos.svg` | `org.gnome.Photos` or `image-x-generic` |
| Contact | `contact.png` | `contacts.svg` | `x-office-address-book` or `org.gnome.Contacts` |
| Skills/Terminal | `terminal.png` | `terminal.svg` | `utilities-terminal` or `org.gnome.Terminal` |
| Archive/Trash | `trash.png` | `trash.svg` | `user-trash` |
| Space | (terminal) | `view-grid.svg` | `view-grid-symbolic` or `preferences-system` |

### Navbar Icons (`/public/icons/`)

| Purpose | Old Icon | New Icon Filename | Adwaita Icon Name |
|---------|----------|-------------------|-------------------|
| WiFi | `wifi.svg` | `network-wireless.svg` | `network-wireless-signal-good` |
| Search | `search.svg` | `system-search.svg` | `system-search` or `edit-find` |
| User | `user.svg` | `avatar.svg` | `avatar-default` or `system-users` |
| Settings | `mode.svg` | `system-settings.svg` | `preferences-system` or `emblem-system` |

### File Type Icons (`/public/icons/`)

| File Type | New Icon Filename | Adwaita Icon Name |
|-----------|-------------------|-------------------|
| Folder | `folder.svg` | `folder` or `inode-directory` |
| Text File (.txt) | `text-x-generic.svg` | `text-x-generic` |
| HTML/URL | `text-html.svg` | `text-html` |
| Image | `image-x-generic.svg` | `image-x-generic` |
| PDF | `application-pdf.svg` | `application-pdf` |
| Generic Document | `x-office-document.svg` | `x-office-document` |

### Photos App Sidebar Icons (`/public/icons/`)

| Purpose | Old Icon | New Icon Filename | Adwaita Icon Name |
|---------|----------|-------------------|-------------------|
| Library | `gicon1.svg` | `library-photos.svg` | `folder-pictures` or `media-optical` |
| Memories | `gicon2.svg` | `emblem-photos.svg` | `emblem-photos` or `folder-visiting` |
| Places | `file.svg` | `mark-location.svg` | `mark-location` or `find-location` |
| People | `gicon4.svg` | `system-users.svg` | `system-users` or `avatar-default` |
| Favorites | `gicon5.svg` | `emblem-favorite.svg` | `emblem-favorite` or `starred` |

### Finder Sidebar Icons (`/public/icons/`)

| Purpose | Old Icon | New Icon Filename | Adwaita Icon Name |
|---------|----------|-------------------|-------------------|
| Work | `work.svg` | `folder-documents.svg` | `folder-documents` or `briefcase` |
| About | `info.svg` | `dialog-information.svg` | `dialog-information` or `help-about` |
| Resume | `file.svg` | `x-office-document.svg` | `x-office-document` |
| Trash | `trash.svg` | `user-trash.svg` | `user-trash` or `user-trash-full` |

## Installation Steps

1. **Download Adwaita Icons** (choose one method above)

2. **Extract the icons you need**
   - Look for icons in: `scalable/` or `symbolic/` directories
   - Prefer `scalable/` for dock icons (colored, larger)
   - Use `symbolic/` for small UI icons (monochrome, cleaner)

3. **Convert to SVG** (if needed)
   ```bash
   # Most Adwaita icons are already SVG
   # If you find PNG files, you can use them directly or convert:
   for file in *.png; do
     convert "$file" "${file%.png}.svg"
   done
   ```

4. **Organize in your project**
   ```
   /public
   ├── /icons
   │   ├── folder.svg
   │   ├── web-browser.svg
   │   ├── terminal.svg
   │   ├── text-x-generic.svg
   │   └── ... (all other icons)
   └── /images
       └── ... (your images, not icons)
   ```

5. **Verify all icons are in place**
   - Check `/public/icons/` has all the new SVG files
   - Check `/public/images/` for any remaining app icons

## Icon Sizes and Optimization

### Recommended Sizes
- **Dock icons**: 64x64 to 128x128 (scalable SVG works best)
- **Navbar icons**: 16x16 to 24x24 (use symbolic variants)
- **File type icons**: 48x48 to 64x64

### SVG Optimization
```bash
# Install svgo
npm install -g svgo

# Optimize all SVGs
svgo -f /public/icons/
```

## Color Customization

GNOME symbolic icons use `currentColor`, which means they'll inherit text color from CSS:

```css
/* In your CSS */
.icon {
  color: var(--text-primary); /* Icons will use this color */
}
```

For colored icons (scalable variants), you can use CSS filters:

```css
/* Make icons darker in light mode */
[data-theme="light"] .dock-icon img {
  filter: brightness(0.9);
}

/* Make icons lighter in dark mode */
[data-theme="dark"] .dock-icon img {
  filter: brightness(1.2);
}
```

## Quick Download Script

Create this script to download commonly used icons:

```bash
#!/bin/bash
# download-adwaita-icons.sh

ICONS_DIR="public/icons"
mkdir -p "$ICONS_DIR"

# Base URL for Adwaita icons
BASE_URL="https://gitlab.gnome.org/GNOME/adwaita-icon-theme/-/raw/master/Adwaita"

# Array of icons to download (format: "path:output_name")
declare -a icons=(
  "scalable/places/folder.svg:folder.svg"
  "scalable/apps/web-browser.svg:web-browser.svg"
  "scalable/apps/utilities-terminal.svg:terminal.svg"
  "scalable/mimetypes/text-x-generic.svg:text-x-generic.svg"
  "scalable/mimetypes/image-x-generic.svg:image-x-generic.svg"
  "scalable/places/user-trash.svg:trash.svg"
  # Add more as needed
)

# Download each icon
for icon in "${icons[@]}"; do
  IFS=':' read -r path output <<< "$icon"
  echo "Downloading $output..."
  curl -o "$ICONS_DIR/$output" "$BASE_URL/$path"
done

echo "✓ Done! Icons downloaded to $ICONS_DIR"
```

## Alternative: Use Icon Fonts

If SVG management is challenging, consider using an icon font:

1. **Lucide Icons** (clean, modern): https://lucide.dev/
2. **Phosphor Icons** (similar to Adwaita): https://phosphoricons.com/
3. **Tabler Icons** (GNOME-style): https://tabler.io/icons

## Testing

After replacing icons:

1. Clear browser cache
2. Restart dev server: `npm run dev`
3. Check dark/light mode compatibility
4. Verify all icons load correctly
5. Check responsive sizes on mobile

## Resources

- Adwaita Icon Theme: https://gitlab.gnome.org/GNOME/adwaita-icon-theme
- GNOME HIG (Design Guidelines): https://developer.gnome.org/hig/
- Icon Naming Specification: https://specifications.freedesktop.org/icon-naming-spec/latest/
- Adwaita Demo: https://gnome.pages.gitlab.gnome.org/libadwaita/doc/main/
