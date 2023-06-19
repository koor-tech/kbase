---
title: "MDS report oversized cache"
---

## Issue

Ceph health status reports, e.g., `1 MDSs report oversized cache`.

```
[root@rook-ceph-tools-86d54cbd8d-6ktjh /]# ceph -s
  cluster:
    id:     67e1ce27-0405-441e-ad73-724c93b7aac4
    health: HEALTH_WARN
            1 MDSs report oversized cache
[...]
```

## Solution

You can try to increase the `mds cache memory limit` setting[^1].

!!! tip
    For Rook Ceph users, you set/increase the memory requests on the CephFilesystem object for the MDS daemons[^2].

[^1]: Report / Source for information regarding this issue has been taken from http://lists.ceph.com/pipermail/ceph-users-ceph.com/2019-December/037633.html
[^2]: [Rook Docs - Ceph Filesystem CRD - MDS Resources Configuration Settings](https://rook.io/docs/rook/v1.11/CRDs/Shared-Filesystem/ceph-filesystem-crd/#metadata-server-settings)
