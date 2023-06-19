---
title: "HEALTH_WARN: clients are using insecure global_id reclaim"
---

Cluster health status:

* `HEALTH_WARN: clients are using insecure global_id reclaim`
* `HEALTH_WARN: mons are allowing insecure global_id reclaim` 

## Solutions

**Source**: https://github.com/rook/rook/issues/7746

> I can confirm this is happening in all clusters, whether a clean install or upgraded cluster, running at least versions: `v14.2.20`, `v15.2.11` or `v16.2.1`.
> 
> According to the [CVE also previously mentioned](https://docs.ceph.com/en/latest/security/CVE-2021-20288/), there is a security issue where clients need to be upgraded to the releases mentioned. Once all the clients are updated (e.g. the rook daemons and csi driver), a new setting needs to be applied to the cluster that will disable allowing the insecure mode.
> 
> If you see both these health warnings, then either one of the rook or csi daemons has not been upgraded yet, or some other client is detected on the older version:
> 
>     health: HEALTH_WARN
>             client is using insecure global_id reclaim
>             mon is allowing insecure global_id reclaim
>
>
> If you only see this one warning, then the insecure mode should be disabled:
> 
>     health: HEALTH_WARN
>             mon is allowing insecure global_id reclaim
> To disable the insecure mode from the toolbox after all the clients are upgraded:
> **Make sure all clients have been upgraded, or else those clients will be blocked after this is set**:
> 
>     ceph config set mon auth_allow_insecure_global_id_reclaim false
>
> Rook could set this flag automatically after the clients have all been updated.
