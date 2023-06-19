---
title: "Accessing Toolbox"
---

!!! hint
    This requires you to have the Rook Ceph Toolbox deployed, see [Rook Docs - Ceph Toolbox](https://rook.io/docs/rook/v1.11/Troubleshooting/ceph-toolbox/) for more information.

```console
kubectl -n rook-ceph exec -it $(kubectl -n rook-ceph get pod -l "app=rook-ceph-tools" -o jsonpath='{.items[0].metadata.name}') -- bash
```
