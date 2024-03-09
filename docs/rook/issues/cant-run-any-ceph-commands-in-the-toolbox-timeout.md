---
title: "Can't run any Ceph Commands in the Toolbox / Ceph Commands timeout"
---

* Are your `rook-ceph-mon-*` Pods all in `Running` state?
* Does a basic `ceph -s` work?
* Is your `rook-ceph-mgr-*` Pod(s) running as well?
* Check the `rook-ceph-mon-*` and `rook-ceph-mgr-*` logs for errors
* Try deleteing the toolbox Pod, "maybe it is just a fluke in your Kubernetes cluster network / CNI.
    * Also make sure you are using the latest Rook Ceph Toolbox YAML for the Rook Ceph version you are running on, see [Rook Ceph Toolbox Pod not Creating / Stuck page](rook-ceph-toolbox-pod-not-creating-stuck.md).
* In case all these seem to indicate a loss of quorum, e.g., the `rook-ceph-mon-*` talk about `probing` for other mons only, you might need to follow the disaster recovery guide for your Rook Ceph version here: [Rook Docs - Ceph Disaster Recovery - Restoring Mon Quorum](https://rook.io/docs/rook/v1.11/Troubleshooting/disaster-recovery/#restoring-mon-quorum).
