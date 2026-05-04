#!/bin/bash
cd i18n/zh/docusaurus-plugin-content-docs/current

mkdir -p user-guide/getting-started/prerequisites
mkdir -p user-guide/configuration
mkdir -p user-guide/features
mkdir -p user-guide/troubleshooting
mkdir -p developer-guide
mkdir -p reference/faq

# setup -> user-guide/getting-started and configuration
mv setup/install-with-binary.md user-guide/getting-started/ 2>/dev/null
mv setup/install-with-keadm.md user-guide/getting-started/ 2>/dev/null
mv setup/install-with-keink.md user-guide/getting-started/ 2>/dev/null
mv setup/prerequisites/* user-guide/getting-started/prerequisites/ 2>/dev/null
mv setup/config.md user-guide/configuration/ 2>/dev/null
mv setup/deploy-ha.md user-guide/configuration/ 2>/dev/null
mv setup/upgrade.md user-guide/configuration/ 2>/dev/null

# advanced -> user-guide/features and troubleshooting
mv advanced/debug.md user-guide/troubleshooting/ 2>/dev/null
for f in advanced/*.md; do
  if [ -f "$f" ]; then
    mv "$f" user-guide/features/
  fi
done

# developer -> developer-guide and troubleshooting
mv developer/troubleshooting.md user-guide/troubleshooting/ 2>/dev/null
cp -r developer/* developer-guide/ 2>/dev/null
rm -rf developer/* 2>/dev/null
rm -rf developer/.DS_Store 2>/dev/null

# faq -> reference/faq
mv faq/* reference/faq/ 2>/dev/null

rm -rf setup advanced developer faq adopters 2>/dev/null
