---
title: "_read_bdev_label failed to open /var/lib/ceph/osd/ceph-1/block: (13) Permission denied"
---

## Issue

* OSD Pod is not starting with logs about the "ceph osd block device" and "permission denied"

## Solution: Do you have the `ceph` package(s) installed on the host and / or a user/group named `ceph`?

This can potentially mess with the owner/group of the ceph osd block device, as described in [GitHub rook/rook Issue 7519 "OSD pod permissions broken, unable to open OSD superblock after node restart"](https://github.com/rook/rook/issues/7519#issuecomment-922263364).

You can either change the user and group ID of the `ceph` user on the host to the one inside the `ceph/ceph` image that your Rook Ceph cluster is running right now (CephCluster object `.spec.cephVersion.image`).

```console
$ kubectl get -n rook-ceph cephclusters.ceph.rook.io rook-ceph -o yaml
apiVersion: ceph.rook.io/v1
kind: CephCluster
metadata:
[...]
  name: rook-ceph
  namespace: rook-ceph
[...]
spec:
  cephVersion:
    image: quay.io/ceph/ceph:v16.2.6-20210927
[...]
```

Depending your hosts, you might not need to even have the `ceph` packages installed. If you are using Rook Ceph, you normally don't need any ceph related packages on the hosts.

Should this have not fixed your issue, you might be running into some other permission issue. If your hosts are using a Linux distribution that uses SELinux, you might need to follow these steps to re-configure the Rook Ceph operator: [Rook Docs - OpenShift Configuration Guide](https://rook.io/docs/rook/v1.11/Getting-Started/ceph-openshift/).
