---
title: "Getting Started with Koor Data Control Center"
---

Thank you for trying the Koor Data Control Center.

This documentation is under construction. Previously, Koor software was based on a fork of the Rook project. Over the summer of 2023, we decided to build the Koor Data Control Center to work directly with Rook and Ceph. That way, we can layer on helpful goodness without risk of getting in the way of Rook and Ceph, which are already outstanding at what they do.

These instructions need an update...coming soon.

## Requirements

## Kubernetes Prerequisites

Something recent and still supported would be best.

## Ceph Prerequisites

To configure the Ceph storage cluster, at least one of these local storage types is required

-   Raw devices (no partitions or formatted filesystems)
-   Raw partitions (no formatted filesystem)
-   LVM Logical Volumes (no formatted filesystem)
-   Persistent Volumes available from a storage class in block mode

Confirm whether the partitions or devices are formatted with filesystems with the following command:

```bash
$ lsblk -f
NAME                  FSTYPE      LABEL UUID                                   MOUNTPOINT
vda
└─vda1                LVM2_member       >eSO50t-GkUV-YKTH-WsGq-hNJY-eKNf-3i07IB
├─ubuntu--vg-root   ext4              c2366f76-6e21-4f10-a8f3-6776212e2fe4   /
└─ubuntu--vg-swap_1 swap              9492a3dc-ad75-47cd-9596-678e8cf17ff9   [SWAP]
vdb
```

## Running Rook

## Install Koor Data Control Center

That's it! :party_popper:
