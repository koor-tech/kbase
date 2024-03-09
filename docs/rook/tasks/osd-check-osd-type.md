---
title: "OSD: Check which \"Object Store\" is used"
---

```console
$ ceph osd metadata 0 | grep osd_objectstore
"osd_objectstore": "bluestore",
```

To get a quick overview of the "object stores" (`bluestore`, (don't use it) `filestore`):
```console
$ ceph osd count-metadata osd_objectstore
{
    "bluestore": 6
}
```
