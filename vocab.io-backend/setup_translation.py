# Run it only once for downloading models

import argostranslate.package  # Browsing and downloading packages
import argostranslate.translate

# Find the latest catalogue of packages
argostranslate.package.update_package_index()

# Package(from_code="it", to_code="en")
available_packages = argostranslate.package.get_available_packages()

# Supported Languages into English
pairs_needed = [("it", "en"), ("es", "en"), ("fi", "en")]

# for italian to english, and so on...
for from_code, to_code in pairs_needed:
    # Generator or Lazy Researcher in next functin that returns the first found
    # package and assign it to p bcz of p for p.
    # When next match, it don't do next iterations. It breaks
    package = next(
        (p for p in available_packages
        if p.from_code == from_code and p.to_code == to_code),
        None
    )

    if package:
        print(f"Downloading {from_code} --> {to_code}...")
        # Download argosmodel file and save it temporarily in your
        # computer and give the path, install_from_path then
        # download from that path into your computer permanently.
        # Analogy: unzip(download(url))
        argostranslate.package.install_from_path(package.download())
    else:
        print(f"WARNING: no package found for {from_code} -> {to_code}")

    print("\nDone. Installed Languages:")
    print(argostranslate.translate.get_installed_languages())

