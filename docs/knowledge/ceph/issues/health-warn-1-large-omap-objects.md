---
title: "HEALTH_WARN 1 large omap objects"
---

## Issue

Your Ceph cluster is reporting `HEALTH_WARN` status with this `ceph health detail` message:

```shell
HEALTH_WARN 1 large omap objects
# depending on the Ceph version might be called:
LARGE_OMAP_OBJECTS 1 large omap objects
```

## Solution

The following command can be used to attemp to remedy the issue:

```console
radosgw-admin reshard stale-instances rm
```
