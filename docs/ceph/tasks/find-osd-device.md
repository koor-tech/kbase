---
title: "Find Device used by OSD(s)"
---

## Issue

You need to find out which disk/device is used by an OSD daemon.

**Scenarios**: `smartctl` is showing that the disk should be replaced, disk has already failed, etc.

## Solution

Use the various `ls*` subcommands of `ceph device`.

```console
$ ceph device --help
device check-health                                                         Check life expectancy of devices
device get-health-metrics <devid> [<sample>]                                Show stored device metrics for the device
device info <devid>                                                         Show information about a device
device light on|off <devid> [ident|fault] [--force]                         Enable or disable the device light. Default type is `ident`
'Usage: device
                                                                             light (on|off) <devid> [ident|fault] [--force]'
device ls                                                                   Show devices
device ls-by-daemon <who>                                                   Show devices associated with a daemon
device ls-by-host <host>                                                    Show devices on a host
device ls-lights                                                            List currently active device indicator lights
device monitoring off                                                       Disable device health monitoring
device monitoring on                                                        Enable device health monitoring
device predict-life-expectancy <devid>                                      Predict life expectancy with local predictor
device query-daemon-health-metrics <who>                                    Get device health metrics for a given daemon
device rm-life-expectancy <devid>                                           Clear predicted device life expectancy
device scrape-daemon-health-metrics <who>                                   Scrape and store device health metrics for a given daemon
device scrape-health-metrics [<devid>]                                      Scrape and store device health metrics
device set-life-expectancy <devid> <from> [<to>]                            Set predicted device life expectancy
```

The `ceph device` subcommands allow you to do even more things, e.g., turn on the disk light in server chassis.
Enabling the light for the disk can help the datacenter workers to easily locate the disk and not replacing the wrong disk.

### Locate Disk of OSD by OSD daemon ID (e.g., OSD 13):

```console
$ ceph device ls-by-daemon osd.13
DEVICE                                     HOST:DEV                                           EXPECTED FAILURE
SAMSUNG_MZVL2512HCJQ-00B00_S1234567890123  HOSTNAME:nvme1n1
```

### Show all disks by host (hostname):

```console
$ ceph device ls-by-host HOSTNAME
DEVICE                                     HOST:DEV                                           EXPECTED FAILURE
DEVICE                                     DEV      DAEMONS  EXPECTED FAILURE
SAMSUNG_MZVL2512HCJQ-00B00_S1234567890123  nvme1n1  osd.5
SAMSUNG_MZVL2512HCJQ-00B00_S1234567890123  nvme0n1  osd.2
SAMSUNG_MZVL2512HCJQ-00B00_S1234567890123  nvme2n1  osd.8
SAMSUNG_MZVL2512HCJQ-00B00_S1234567890123  nvme3n1  osd.13
```
