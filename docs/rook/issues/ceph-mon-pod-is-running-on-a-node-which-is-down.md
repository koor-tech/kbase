---
title: "Ceph MON Pod is running on a Node which is down"
---

* **DO NOT EDIT THE MON DEPLOYMENT!** A MON Deployment can't just be moved to another node without being failovered by the operator and / or if the MON is running using a PVC for its data.
* As long as the operator is running the operator should see the mon being down and fail it over after a configurable timeout.
    * Env var `ROOK_MON_OUT_TIMEOUT`, by default `600s` (10 minutes)
