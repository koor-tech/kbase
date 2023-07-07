---
title: "Logging"
---

## Ceph MON

### Audit Log

By default, not changeable when using Rook Ceph, the MONs are printing out (quite a lot) logs due to audit logging.

These lines look like this (prefixed with `audit`):

```console
audit 2023-07-06T12:11:37.524550+0000 mon.e (mon.2) 310555 : audit [DBG] from='admin socket' entity='admin socket' cmd='mon_status' args=[]: dispatch
```
!!! hint
    The example line is coming from the Rook Ceph pod probes to ensure that the mon daemon is healthy.

### Cluster Debug

!!! note
    Due to a [regression in Ceph Quincy](https://tracker.ceph.com/issues/57727) the option `mon_cluster_log_to_file_level` that can control the log level is not checked, causing the logs to always appear.
    [The ticket/ PR](https://tracker.ceph.com/issues/37886) that changed the default value of these logs for improving "visibility" when a cluster is in trouble.

    These lines can be important when troubleshooting Ceph issues though.

These lines look like this (prefixed with `cluster`):

```console
cluster 2023-07-06T11:14:01.294211+0000 mgr.b (mgr.17383118) 66268 : cluster [DBG] pgmap v66351: 497 pgs: 497 active+clean; 761 GiB data, 1.5 TiB used, 2.2 TiB / 3.7 TiB avail; 114 KiB/s rd, 1.9 MiB/s wr, 211 op/s
```

These lines can help when debugging issues with a cluster during normal and recovery operations, though they might can be a lot depending on the cluster size.
