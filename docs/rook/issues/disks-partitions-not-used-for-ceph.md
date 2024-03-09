---
title: "Disk(s) / Partition(s) not used for Ceph"
---

* Does section [When do you want to have `rook-discover-*` Pods / `ROOK_ENABLE_DISCOVERY_DAEMON: true`?](#when-do-you-want-to-have-rook-discover--pods--rook_enable_discovery_daemon-true) apply to you? If so, make sure the operator has the discovery daemon enabled in its (Pod) config!
* Is the disk empty? No leftover partitions on it? Make sure it is either "empty", e.g., nulled by `shred`, `dd` or similar,
    * To make sure the disk is blank as the Rook docs and I recommend the following commands followed by a reboot of the server:
        ```
        DISK="/dev/sdXYZ"
        sgdisk --zap-all "$DISK"
        dd if=/dev/zero of="$DISK" bs=1M count=100 oflag=direct,dsync
        blkdiscard "$DISK"
        ```
        Source: [Rook Docs - Cleanup Guide](https://rook.io/docs/rook/v1.11/Storage-Configuration/ceph-teardown/)
* Was the disk previously used as a Ceph OSD?
    * Make sure to follow the teardown steps, but make sure to only remove the LVM stuff from that one disk and not from all, see [Rook Docs - Cleanup Guide](https://rook.io/docs/rook/v1.11/Storage-Configuration/ceph-teardown/).
