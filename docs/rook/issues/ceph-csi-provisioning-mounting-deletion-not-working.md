---
title: "Ceph CSI: Provisioning, Mounting, Deletion or something doesn't work"
---

Make sure you have checked out the [CSI Common Issues - Rook Docs](https://rook.io/docs/rook/v1.11/Troubleshooting/ceph-csi-common-issues/).

If you have some weird kernel and / or kubelet configuration, make sure Ceph CSI's config options in the Rook Ceph Operator config is correctly setup (e.g., `LIB_MODULES_DIR_PATH`, `ROOK_CSI_KUBELET_DIR_PATH`, `AGENT_MOUNTS`).
