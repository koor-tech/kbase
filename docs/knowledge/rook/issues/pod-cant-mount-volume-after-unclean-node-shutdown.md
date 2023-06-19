---
title: "A Pod can't mount its PersistentVolume after an "unclean" / "undrained" Node shutdown"
---

1. Check the events of the Pod using `kubectl describe pod POD_NAME`.
2. Check the Node's `dmesg` logs.
3. Check the kubelet logs for errors related to CSI connectivity and / or make sure the node can reach every other Kubernetes cluster node (at least the Rook Ceph cluster nodes (Ceph Mons, OSDs, MGRs, etc.)).
4. Checkout the [CSI Common Issues - Rook Docs](https://rook.io/docs/rook/v1.11/Troubleshooting/ceph-csi-common-issues/).

!!! hint
    There's ongoing work to add node fencing to Ceph CSI to make this process faster, see [GitHub rook/rook - "On NodeLost, the new pod can't mount the same volume. #1507"](https://github.com/rook/rook/issues/1507).
