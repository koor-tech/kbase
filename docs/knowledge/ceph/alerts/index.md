---
title: "Alerts"
---

## CephOSDSlowOps Alerts

### Issue

* `CephOSDSlowOps` alert being triggered.
* Ceph cluster status is reporting slow ops for OSDs.

### Things to Try

* Ensure the disks you are using are healthy
    * Check the SMART values. A bad disks can lock up an application (such as a Ceph OSD) or worse the whole server.
