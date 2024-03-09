---
title: "PersistentVolumeClaims / PersistentVolumes are not Resized"
---

* Make sure the Ceph CSI driver for the storage (block or filesystem) is running (check the logs if you are unsure as well).
* Check if you use a StorageClass that has `allowVolumeExpansion: false`:

    ```console
    $ kubectl get storageclasses.storage.k8s.io
    NAME              PROVISIONER                     RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION   AGE
    rook-ceph-block   rook-ceph.rbd.csi.ceph.com      Retain          Immediate           false                  3d21h
    rook-ceph-fs      rook-ceph.cephfs.csi.ceph.com   Retain          Immediate           true                   3d21h
    ```

## Solution

To fix this simply set `allowVolumeExpansion: true` in the `StorageClass`. Below is a `StorageClass` with this option set, it is at the top level of the object (not in `.spec` or similar):

    ```yaml hl_lines="1"
    allowVolumeExpansion: true
    apiVersion: storage.k8s.io/v1
    kind: StorageClass
    metadata:
      name: rook-ceph-block
    parameters:
      clusterID: rook-ceph
      csi.storage.k8s.io/controller-expand-secret-name: rook-csi-rbd-provisioner
      [...]
      imageFeatures: layering
      imageFormat: "2"
      pool: replicapool
    provisioner: rook-ceph.rbd.csi.ceph.com
    reclaimPolicy: Retain
    volumeBindingMode: Immediate
    ```
