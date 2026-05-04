// @ts-check
// sidebars.js — Manually curated sidebar for kubeedge/website
// Replaces the auto-generated sidebar to fix Issue #1498:
// https://github.com/kubeedge/kubeedge/issues/1498
//
// New structure:
//   Welcome → User Guide → Developer Guide → Concepts → Reference → Community

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  documentationSideBar: [

    // ── WELCOME ────────────────────────────────────────────────────────────
    {
      type: 'category',
      label: 'Welcome',
      collapsed: false,
      items: [
        'welcome/why-kubeedge',
        'welcome/getting-started',
      ],
    },

    // ── USER GUIDE ─────────────────────────────────────────────────────────
    {
      type: 'category',
      label: 'User Guide',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Getting Started',
          collapsed: false,
          items: [
            {
              type: 'category',
              label: 'Prerequisites',
              items: [
                'user-guide/getting-started/prerequisites/kubernetes',
                'user-guide/getting-started/prerequisites/runtime',
              ],
            },
            'user-guide/getting-started/install-with-keadm',
            'user-guide/getting-started/install-with-binary',
            'user-guide/getting-started/install-with-keink',
          ],
        },
        {
          type: 'category',
          label: 'Configuration',
          items: [
            'user-guide/configuration/config',
            'user-guide/configuration/upgrade',
            'user-guide/configuration/deploy-ha',
          ],
        },
        {
          type: 'category',
          label: 'Features',
          items: [
            'user-guide/features/edgemesh',
            'user-guide/features/edgesite',
            'user-guide/features/admission',
            'user-guide/features/storage',
            'user-guide/features/inclusterconfig',
            'user-guide/features/metrics',
            'user-guide/features/servicebus',
            'user-guide/features/support_ipv6',
            'user-guide/features/hold_and_release',
            'user-guide/features/cilium',
          ],
        },
        {
          type: 'category',
          label: 'Troubleshooting',
          items: [
            'user-guide/troubleshooting/debug',
            'user-guide/troubleshooting/troubleshooting',
          ],
        },
      ],
    },

    // ── DEVELOPER GUIDE ────────────────────────────────────────────────────
    {
      type: 'category',
      label: 'Developer Guide',
      items: [
        'developer-guide/build',
        'developer-guide/local_up_kubeedge',
        'developer-guide/make_verify',
        'developer-guide/cherry_pick',
        'developer-guide/Supplemental_developer_guide',
        {
          type: 'category',
          label: 'Device & Mapper',
          items: [
            'developer-guide/dmi',
            'developer-guide/mapper-framework',
            'developer-guide/mappers/index',
          ],
        },
        {
          type: 'category',
          label: 'Messaging',
          items: [
            'developer-guide/message_topics',
            'developer-guide/custom_message_deliver',
          ],
        },
        {
          type: 'category',
          label: 'Testing',
          items: [
            'developer-guide/test/unit_test',
            'developer-guide/test/bluetooth_mapper_e2e',
            'developer-guide/test/memfootprint',
          ],
        },
      ],
    },

    // ── CONCEPTS ───────────────────────────────────────────────────────────
    {
      type: 'category',
      label: 'Concepts',
      items: [
        {
          type: 'category',
          label: 'Device Management',
          items: [
            'concept/device/device_crds',
            'concept/device/mapper',
          ],
        },
        {
          type: 'category',
          label: 'AI at the Edge',
          items: [
            'concept/ai/sedna',
            'concept/ai/ianvs',
          ],
        },
      ],
    },

    // ── REFERENCE (Architecture + FAQ) ────────────────────────────────────
    {
      type: 'category',
      label: 'Reference',
      items: [
        'architecture/beehive',
        {
          type: 'category',
          label: 'Cloud Components',
          items: [
            'architecture/cloud/cloudhub',
            'architecture/cloud/edge_controller',
            'architecture/cloud/device_controller',
          ],
        },
        {
          type: 'category',
          label: 'Edge Components',
          items: [
            'architecture/edge/edged',
            'architecture/edge/edgehub',
            'architecture/edge/eventbus',
            'architecture/edge/metamanager',
            'architecture/edge/devicetwin',
            'architecture/edge/servicebus',
          ],
        },
        {
          type: 'category',
          label: 'FAQ',
          items: [
            'reference/faq/setup',
          ],
        },
      ],
    },

    // ── COMMUNITY ──────────────────────────────────────────────────────────
    {
      type: 'category',
      label: 'Community',
      items: [
        'community/contribute',
        'community/governance',
        'community/membership',
        'community/feature-lifecycle',
        'community/release',
        'community/slack',
        'community/casestudies',
        'community/partners',
        'community/supporters',
      ],
    },
  ],
};

module.exports = sidebars;
