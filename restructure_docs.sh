#!/bin/bash
# restructure_docs.sh — KubeEdge Issue #1498
# Run from root of kubeedge/website repo.
set -e

echo "🚀 Starting KubeEdge docs restructure for Issue #1498..."

# ─── STEP 1: Create new directories ──────────────────────────────────────────
echo ""
echo "📁 [1/6] Creating new directory structure..."
mkdir -p docs/user-guide/getting-started/prerequisites
mkdir -p docs/user-guide/configuration
mkdir -p docs/user-guide/features
mkdir -p docs/user-guide/troubleshooting
mkdir -p docs/developer-guide/mappers
mkdir -p docs/developer-guide/test
mkdir -p docs/reference/faq
mkdir -p docs/community/adopters
echo "    ✅ Directories created."

# ─── STEP 2: Migrate setup/ → user-guide/getting-started & configuration ─────
echo ""
echo "📦 [2/6] Migrating docs/setup/ ..."
git mv docs/setup/install-with-keadm.md       docs/user-guide/getting-started/
git mv docs/setup/install-with-binary.md      docs/user-guide/getting-started/
git mv docs/setup/install-with-keink.md       docs/user-guide/getting-started/
git mv docs/setup/prerequisites/kubernetes.md docs/user-guide/getting-started/prerequisites/
git mv docs/setup/prerequisites/runtime.md    docs/user-guide/getting-started/prerequisites/
git mv docs/setup/config.md                   docs/user-guide/configuration/
git mv docs/setup/upgrade.md                  docs/user-guide/configuration/
git mv docs/setup/deploy-ha.md                docs/user-guide/configuration/
echo "    ✅ setup/ migrated."

# ─── STEP 3: Migrate advanced/ → user-guide/features & troubleshooting ───────
echo ""
echo "📦 [3/6] Migrating docs/advanced/ ..."
git mv docs/advanced/admission.md        docs/user-guide/features/
git mv docs/advanced/cilium.md           docs/user-guide/features/
git mv docs/advanced/edgemesh.md         docs/user-guide/features/
git mv docs/advanced/edgesite.md         docs/user-guide/features/
git mv docs/advanced/storage.md          docs/user-guide/features/
git mv docs/advanced/inclusterconfig.md  docs/user-guide/features/
git mv docs/advanced/support_ipv6.md     docs/user-guide/features/
git mv docs/advanced/hold_and_release.md docs/user-guide/features/
git mv docs/advanced/metrics.md          docs/user-guide/features/
git mv docs/advanced/servicebus.md       docs/user-guide/features/
git mv docs/advanced/debug.md            docs/user-guide/troubleshooting/
echo "    ✅ advanced/ migrated."

# ─── STEP 4: Migrate developer/ → developer-guide/ ───────────────────────────
echo ""
echo "📦 [4/6] Migrating docs/developer/ ..."
git mv docs/developer/build.md                       docs/developer-guide/
git mv docs/developer/local_up_kubeedge.md           docs/developer-guide/
git mv docs/developer/make_verify.md                 docs/developer-guide/
git mv docs/developer/cherry_pick.md                 docs/developer-guide/
git mv docs/developer/Supplemental_developer_guide.md docs/developer-guide/
git mv docs/developer/dmi.md                         docs/developer-guide/
git mv docs/developer/mapper-framework.md            docs/developer-guide/
git mv docs/developer/message_topics.md              docs/developer-guide/
git mv docs/developer/custom_message_deliver.md      docs/developer-guide/
git mv docs/developer/troubleshooting.md             docs/user-guide/troubleshooting/
git mv docs/developer/mappers/index.md               docs/developer-guide/mappers/
git mv docs/developer/test/bluetooth_mapper_e2e.md   docs/developer-guide/test/
git mv docs/developer/test/memfootprint.md           docs/developer-guide/test/
git mv docs/developer/test/unit_test.md              docs/developer-guide/test/
echo "    ✅ developer/ migrated."

# ─── STEP 5: Migrate faq/ → reference/faq/ ───────────────────────────────────
echo ""
echo "📦 [5/6] Migrating docs/faq/ ..."
git mv docs/faq/setup.md docs/reference/faq/
echo "    ✅ faq/ migrated."

# ─── STEP 6: Remove empty old _category_.json stubs and directories ───────────
echo ""
echo "🧹 [6/6] Cleaning up empty old directories..."
# Remove stale _category_.json files from directories we vacated
rm -f docs/setup/_category_.json
rm -f docs/advanced/_category_.json
rm -f docs/developer/_category_.json
rm -f docs/faq/_category_.json
git add -A   # stage the removals
# Remove now-empty directories (git rm handles this automatically via git mv,
# but in case _category_.json was the last file remaining)
rmdir docs/setup/prerequisites 2>/dev/null || true
rmdir docs/setup               2>/dev/null || true
rmdir docs/advanced            2>/dev/null || true
rmdir docs/developer/test      2>/dev/null || true
rmdir docs/developer/mappers   2>/dev/null || true
rmdir docs/developer           2>/dev/null || true
rmdir docs/faq                 2>/dev/null || true
echo "    ✅ Cleanup done."

echo ""
echo "══════════════════════════════════════════════════"
echo "✅  File migration complete!"
echo "══════════════════════════════════════════════════"
echo ""
echo "⚠️  MANUAL NEXT STEPS:"
echo "  1. sidebars.js has been replaced automatically."
echo "  2. Review any remaining internal link references:"
echo "     grep -rn 'docs/setup'     docs/ --include='*.md'"
echo "     grep -rn 'docs/advanced'  docs/ --include='*.md'"
echo "     grep -rn 'docs/developer' docs/ --include='*.md'"
echo "     grep -rn 'docs/faq'       docs/ --include='*.md'"
echo "  3. Run: npm install && npm start"
echo "  4. Visit http://localhost:3000 and verify the sidebar."
