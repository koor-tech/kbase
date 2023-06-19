---
title: "OSD Crash - `OSD id X != my id Y`"
---

## Solution

1. Exec into a working Ceph OSD on that host `kubectl exec -n rook-ceph -it OSD_POD_NAME -- bash` (`ceph-bluestore-tool` command is needed), run the following commands:
    1. Run `lsblk` to see all disks of the host.
    2. For every disks, run:
        1. Run `ceph-bluestore-tool show-label --dev=/dev/sdX` (note down the OSD ID (`whoami` field in the JSON output) and which disk the OSD is on (example: `OSD 11 /dev/sda`)).
2. The `rook-ceph-osd-...` deployment needs to be updated with the new/ correct device path. The `ROOK_BLOCK_PATH` environment variable must have the correct device path (there are two occurrences, in the `containers:` and in `initContainers:` list).
3. After a few seconds / minutes the OSD should show up as `up` in the `ceph osd tree` output (the command can be run in the `rook-ceph-tools` Pod). If you have scaled down the OSD Deployment, make sure to scale it up to `1` again (`kubectl scale -n rook-ceph deployment --replicas=1 rook-ceph-osd...`)
