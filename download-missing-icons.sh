#!/bin/bash

# Download missing Adwaita Icons with alternative paths
ICONS_DIR="public/icons"
BASE_URL="https://gitlab.gnome.org/GNOME/adwaita-icon-theme/-/raw/master/Adwaita"

echo "📦 Downloading missing GNOME Adwaita icons with alternative paths..."
echo ""

download_icon() {
    local path=$1
    local output=$2
    local url="$BASE_URL/$path"

    echo "⬇️  Downloading $output..."
    if curl -f -s -o "$ICONS_DIR/$output" "$url"; then
        echo "✅ $output downloaded successfully"
        return 0
    else
        echo "❌ Failed from $path"
        return 1
    fi
}

# Try alternative paths for missing icons

echo "=== Web Browser ==="
download_icon "scalable/apps/org.gnome.Epiphany.svg" "web-browser.svg" || \
download_icon "scalable/categories/applications-internet.svg" "web-browser.svg"
echo ""

echo "=== Photos ==="
download_icon "scalable/apps/org.gnome.eog.svg" "photos.svg" || \
download_icon "scalable/categories/applications-graphics.svg" "photos.svg"
echo ""

echo "=== Contacts ==="
download_icon "scalable/apps/org.gnome.Evolution.svg" "contacts.svg" || \
download_icon "scalable/mimetypes/x-office-address-book.svg" "contacts.svg"
echo ""

echo "=== Terminal ==="
download_icon "scalable/apps/org.gnome.Terminal.svg" "terminal.svg" || \
download_icon "scalable/apps/utilities-terminal-symbolic.svg" "terminal.svg"
echo ""

echo "=== View Grid ==="
download_icon "scalable/actions/view-grid-symbolic.svg" "view-grid.svg" || \
download_icon "symbolic/actions/view-grid-symbolic.svg" "view-grid.svg"
echo ""

echo "=== PDF ==="
download_icon "scalable/mimetypes/x-office-document.svg" "application-pdf.svg" || \
download_icon "scalable/mimetypes/application-x-pdf.svg" "application-pdf.svg"
echo ""

echo "=== Network Wireless ==="
download_icon "scalable/status/network-wireless-symbolic.svg" "network-wireless.svg" || \
download_icon "symbolic/devices/network-wireless-symbolic.svg" "network-wireless.svg"
echo ""

echo "=== Emblem Photos ==="
download_icon "scalable/emblems/emblem-photos.svg" "emblem-photos.svg" || \
download_icon "scalable/places/folder-pictures.svg" "emblem-photos.svg"
echo ""

echo "=== System Users ==="
download_icon "scalable/apps/system-users.svg" "system-users.svg" || \
download_icon "symbolic/categories/system-users-symbolic.svg" "system-users.svg"
echo ""

echo "=== Emblem Favorite ==="
download_icon "scalable/emblems/emblem-favorite.svg" "emblem-favorite.svg" || \
download_icon "symbolic/status/starred-symbolic.svg" "emblem-favorite.svg"
echo ""

echo "✨ Done!"
