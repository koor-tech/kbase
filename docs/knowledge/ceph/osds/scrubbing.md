---
title: OSD Scrubbing
---

## What is Scrubbing?

> Ceph scrubbing is analogous to `fsck` on the object storage layer.
>
> -- Taken from Ceph OSD Scrubbing config reference documentation.

There's two scrubbing "modes":

- ("Light") Scrubbing - Verify basic object attributes and size.
- "Deep" Scrubbing - Read object data and verify checksums.

Especially deep scrubbing can cause performance degredation when it is active at the "wrong time" (e.g., your applications peak hours).

### Should I disable Scrubbing?

No, don't ever disable scrubbing (forever) in a Ceph cluster!
It is vital to have Ceph verify data integrity automatically and regurarly so it can detect and repair any errors found as early as possible.

### My cluster is reporting `inconsistent` PGs. What should I do?

Before attempting any manual intervention, please read up on the `ceph pg repair` command here: [More Information on PG Repair - Ceph Documentation](https://docs.ceph.com/en/latest/rados/operations/pg-repair/#more-information-on-pg-repair).

After you have made sure you understand what has probably happen to (data) objects in your PG(s), you can attempt to repair them by following the steps here:

[Repairing PG inconsistencies - Ceph Documentation](https://docs.ceph.com/en/latest/rados/operations/pg-repair/#repairing-pg-inconsistencies)

## Config Options

[OSD Config Reference - Scrubbing - Ceph Documentation](https://docs.ceph.com/en/latest/rados/configuration/osd-config-ref/#scrubbing)

### osd_max_scrubs

The default value is `3`, you can try reducing it to `2` or even to `1`, in case where you want scrubbing to cause lower impact when scrubbing happens.

### osd_scrub_max_interval

> The maximum interval in seconds for scrubbing the Ceph OSD Daemon irrespective of cluster load.

If this threshold is crossed, scrubbing can and will happen no matter the current cluster load, unless disabled using

## Examples

### Weekend Scrubbing

To have the scrubbing happen mainly during 18:00 to 05:00 on the weekend this config can help you:

```ini
osd_scrub_begin_hour = 18
osd_scrub_end_hour = 5
osd_scrub_begin_week_day = 6
osd_scrub_end_week_day = 0
osd_scrub_max_interval = 1209600
osd_scrub_min_interval = 259200
osd_deep_scrub_interval = 1209600
```

!!! note
Please keep in mind that scrubbing might continue after the schedule when [the `osd_scrub_max_interval` is reached](#osd_scrub_max_interval).

### Weekday evening/night scrubbing

```ini
osd_scrub_begin_hour = 18
osd_scrub_end_hour = 5
osd_scrub_begin_week_day = 1
osd_scrub_end_week_day = 5
osd_scrub_max_interval = 1209600
osd_scrub_min_interval = 259200
osd_deep_scrub_interval = 1209600
```

## Deactivate Scrubbing

!!! warning
Only ever deactivate scrubbing if really necessary or for short periods of time.

!!! hint
[Man page of `ceph` command](https://docs.ceph.com/en/quincy/man/8/ceph/), check out the `ceph set` subcommand section.

```bash
ceph osd set noscrub
ceph osd set nodeep-scrub
```

### Re-Enable Scrubbing

```bash
ceph osd unset noscrub
ceph osd unset nodeep-scrub
```

---

Be sure to check out Ceph's documentation on [OSD scrubbing](https://docs.ceph.com/en/latest/rados/configuration/osd-config-ref/#scrubbing) as it contains all config options and their values.
