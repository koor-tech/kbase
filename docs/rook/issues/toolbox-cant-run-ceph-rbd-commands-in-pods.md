---
title: "unable to get monitor info from DNS SRV with service name: ceph-mon"
---

## Issue

Can't run `ceph` and `rbd` commands in the Rook Ceph XYZ Pod.

Error message when running `ceph`, `rbd`, other commands in a Rook/ Ceph Pods: `unable to get monitor info from DNS SRV with service name: ceph-mon`

## Solutions

You are only supposed to run `ceph`, `rbd`, `radosgw-admin`, etc., commands in the **Rook Ceph Toolbox / Tools Pod**.

Regarding the Rook Ceph Toolbox Pod checkout the Rook documentation here: [Rook Docs - Ceph Toolbox](https://rook.io/docs/rook/v1.11/Troubleshooting/ceph-toolbox/).
