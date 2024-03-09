---
title: "Where did the rook-discover-* Pods go after a recent Rook Ceph update?"
---

A recent change in Rook Ceph has disabled the `rook-discover` DaemonSet by default.
This behavior is controlled by the `ROOK_ENABLE_DISCOVERY_DAEMON` located in the `operator.yaml` or for Helm users `enableDiscoveryDaemon: (false|true` in your values file. It is a boolean, so `false` or `true`.

## When do you want to have `rook-discover-*` Pods / `ROOK_ENABLE_DISCOVERY_DAEMON: true`?

* You are on **(plain) bare metal** and / or simply have "some disks" installed /attached to your server(s), that you want to use for the Rook Ceph cluster.
* If your cloud environment / provider does not provide PVCs with `volumeMode: Block`. Ceph requires block devices (Ceph's `filestore` is not available, through Rook, since a bunch of versions as `bluestore` is superior in certain ways).
