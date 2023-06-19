---
title: "OSD: Change Device Class"
---

1. Check device class, second column in `ceph osd tree` output.
2. If you need to change the device class, you first must remove the current one (if it has one set): `ceph osd crush rm-device-class osd.ID`.
3. Now you can set the device class for the OSD: `ceph osd crush set-device-class CLASS osd.ID`
   * Default device classes (at the time of writing): `hdd`, `ssd`, `nvme`
   * Source: [Ceph Docs Latest - CRUSH Maps - Device Classes](https://docs.ceph.com/en/latest/rados/operations/crush-map/#device-classes)
