---
title: "OSD: Configure Scrubbing Schedule"
---

!!! hint
    The paid Koor Storage Distribution has a [feature](../../koor/osd-scrubbing-schedule.md) to allow this configuration on the go via the `CephCluster` CRD.

Currently you need to add your Ceph OSD scrubbing schedule config options to the [`rook-config-override` ConfigMap of your Rook Ceph cluster](https://rook.io/docs/rook/v1.11/Storage-Configuration/Advanced/ceph-configuration/#custom-cephconf-settings).

For more information on OSD Scrubbing and scheduling, see [Ceph OSD Scrubbing](../../ceph/osds/scrubbing.md).

## Examples

### Whole week, during late/night Hours

Starts at 21:00/ 9:00pm and goes till 06:00/ 6:00am on all days of the week.
In comparison to Ceph's default config, the min/ max scrubbing intervals to give slightly "more time" in typical production clusters.

```ini
[osd]
; Allow cluster to start scrubbing at 8pm
osd_scrub_begin_hour = 20
; Restrict scrubbing to the hour earlier than this
osd_scrub_end_hour = 7
; Sunday
osd_scrub_begin_week_day = 0
; Sunday
osd_scrub_end_week_day = 0
; Decrease to faster stop when more load is applied to the systems
osd_scrub_load_threshold = 0.4
; 3 days
osd_scrub_min_interval = 259200
; 10 days
osd_scrub_max_interval = 864000
; Add slight sleep to reduce load on OSDs
osd_scrub_sleep = 0.1
; 10 days
osd_deep_scrub_interval = 864000
```
