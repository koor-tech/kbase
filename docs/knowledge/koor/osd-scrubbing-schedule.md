---
title: "OSD Scrubbing Schedule"
---

!!! hint
    This is a paid Koor Storage Distribution feature.

The Koor Storage Distribution has added a feature to it's customized Rook version that allows for simple configuration of the Ceph OSD Scrubbing schedule.

This is an example of the OSD scrubbing config in your CephCluster object:

```yaml
spec:
  # [...]
  storage:
    # [...]
    scrubbing:
      # Whether the scrubbing schedule specified should be applied to the cluster.
      applySchedule: true
      # Max scrubbing operations happening at the same time. Default: `3`.
      maxScrubOps: 3
      # Begin hour of scrubbing schedule. Default `0`. Setting both `BeginHour` and `EndHour` to `0`, will allow scrubbing the entire day.
      beginHour: 8
      # End hour of scrubbing schedule. Default `0`.
      endHour: 17
      # Begin week day of scrubbing schedule. `0` = Sunday, `1` = Monday, etc. Default: `0`.
      beginWeekDay: 1
      # End week day of scrubbing schedule. `0` = Sunday, `1` = Monday, etc. Default: `0`.
      endWeekDay: 5
      # Minimum interval to wait before scrubbing again. Default: `24h` (1 day).
      minScrubInterval: 24h
      # Maximum interval to wait before scrubbing is forced. Default: `168h` (7 days).
      maxScrubInterval: 168h
      # Interval at which to do deeb scrubbing instead of a "light" scrubbing. Default: `168h` (7 days).
      deepScrubInterval: 168h
      # Set the scrub sleep as a duration. Default: `0ms`, if you are impacted by scrubbing causing performance issues, it is recommended to set it to at least `100ms`.
      scrubSleepSeconds: 100ms
```

## Specifications

These options can be used to set a custom OSD scrubbing schedule easily instead of having to use the Ceph config override:

* `applySchedule`: Whether the scrubbing schedule specified should be applied to the cluster.
* `maxScrubOps`: Max scrubbing operations happening at the same time. Default: `3`.
* `beginHour`: Begin hour of scrubbing schedule. Default `0`. Setting both `BeginHour` and `EndHour` to `0`, will allow scrubbing the entire day.
* `endHour`: End hour of scrubbing schedule. Default `0`.
* `beginWeekDay`: Begin week day of scrubbing schedule. `0` = Sunday, `1` = Monday, etc. Default: `0`.
* `endWeekDay`: End week day of scrubbing schedule. `0` = Sunday, `1` = Monday, etc. Default: `0`.
* `minScrubInterval`: Minimum interval to wait before scrubbing again. Default: `24h` (1 day).
* `maxScrubInterval`: Maximum interval to wait before scrubbing is forced. Default: `168h` (7 days).
* `deepScrubInterval`: Interval at which to do deeb scrubbing instead of a "light" scrubbing. Default: `168h` (7 days).
* `scrubSleepSeconds`: Set the scrub sleep as a duration. Default: `0ms`, if you are impacted by scrubbing causing performance issues, it is recommended to set it to at least `100ms`.

For more information about Ceph OSD scrubbing checkout [OSD Config Reference - Scrubbing - Ceph Documentation](https://docs.ceph.com/en/latest/rados/configuration/osd-config-ref/#scrubbing).

## Examples

### Whole week, during late/night Hours

Starts at 21:00/ 9:00pm and goes till 06:00/ 6:00am on all days of the week.
In comparison to Ceph's default config, the min/ max scrubbing intervals to give slightly "more time" in typical production clusters.

```yaml
spec:
  # [...]
  storage:
    # [...]
    scrubbing:
      applySchedule: true
      maxScrubOps: 3
      beginHour: 7
      endHour: 20
      beginWeekDay: 0
      endWeekDay: 0
      # 3 days
      minScrubInterval: 72h
      # 10 days
      maxScrubInterval: 240h
      # 10 days
      deepScrubInterval: 240h
      # Set the scrub sleep as a duration. Default: `0ms`, if you are impacted by scrubbing causing performance issues, it is recommended to set it to at least `100ms`.
      scrubSleepSeconds: 100ms
```
