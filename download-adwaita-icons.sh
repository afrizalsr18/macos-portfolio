#!/bin/bash

# Download Adwaita Icons for macOS Portfolio
# This script downloads GNOME Adwaita icons from the official repository

ICONS_DIR="public/icons"
BASE_URL="https://gitlab.gnome.org/GNOME/adwaita-icon-theme/-/raw/master/Adwaita"

echo "📦 Downloading GNOME Adwaita icons..."
echo ""

# Create icons directory if it doesn't exist
mkdir -p "$ICONS_DIR"

# Function to download icon
download_icon() {
    local path=$1
    local output=$2
    local url="$BASE_URL/$path"

    echo "⬇️  Downloading $output..."
    if curl -f -s -o "$ICONS_DIR/$output" "$url"; then
        echo "✅ $output downloaded successfully"
    else
        echo "❌ Failed to download $output from $path"
    fi
    echo ""
}

# Dock Application Icons (colored, scalable)
echo "=== Dock Icons ==="
download_icon "scalable/places/folder.svg" "folder.svg"
download_icon "scalable/apps/web-browser.svg" "web-browser.svg"
download_icon "scalable/apps/org.gnome.Photos.svg" "photos.svg"
download_icon "scalable/apps/org.gnome.Contacts.svg" "contacts.svg"
download_icon "scalable/apps/utilities-terminal.svg" "terminal.svg"
download_icon "scalable/places/user-trash.svg" "trash.svg"
download_icon "scalable/apps/view-grid-symbolic.svg" "view-grid.svg"

# File Type Icons
echo "=== File Type Icons ==="
download_icon "scalable/mimetypes/text-x-generic.svg" "text-x-generic.svg"
download_icon "scalable/mimetypes/image-x-generic.svg" "image-x-generic.svg"
download_icon "scalable/mimetypes/x-office-document.svg" "x-office-document.svg"
download_icon "scalable/mimetypes/application-pdf.svg" "application-pdf.svg"

# Navbar Icons (symbolic)
echo "=== Navbar Icons ==="
download_icon "symbolic/status/network-wireless-symbolic.svg" "network-wireless.svg"
download_icon "symbolic/actions/system-search-symbolic.svg" "system-search.svg"
download_icon "symbolic/status/avatar-default-symbolic.svg" "avatar.svg"
download_icon "symbolic/categories/preferences-system-symbolic.svg" "system-settings.svg"

# Photos Sidebar Icons
echo "=== Photos Sidebar Icons ==="
download_icon "scalable/places/folder-pictures.svg" "library-photos.svg"
download_icon "symbolic/emblems/emblem-photos-symbolic.svg" "emblem-photos.svg"
download_icon "symbolic/actions/mark-location-symbolic.svg" "mark-location.svg"
download_icon "symbolic/apps/system-users-symbolic.svg" "system-users.svg"
download_icon "symbolic/emblems/emblem-favorite-symbolic.svg" "emblem-favorite.svg"

# Additional Icons
echo "=== Additional Icons ==="
download_icon "scalable/places/folder-documents.svg" "folder-documents.svg"
download_icon "symbolic/status/dialog-information-symbolic.svg" "dialog-information.svg"

echo ""
echo "✨ Done! All icons downloaded to $ICONS_DIR"
echo ""
echo "Note: Some icons might not exist at the exact path."
echo "Check the Adwaita repository for alternative names:"
echo "https://gitlab.gnome.org/GNOME/adwaita-icon-theme/-/tree/master/Adwaita"
