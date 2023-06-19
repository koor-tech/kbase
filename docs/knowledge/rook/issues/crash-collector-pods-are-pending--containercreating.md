---
title: "Crash Collector Pods are `Pending` / `ContainerCreating`"
---

* Check the events of the Crash Collector Pod(s) using `kubectl describe pod POD_NAME`.
* If the Pod(s) is waiting for a Secret from the Ceph MONs (keyring for each crash collector), you need to wait a bit longer as the Ceph Cluster is probably still being bootsraped / started up.
* If they are stuck for more than 15-30 minutes, check the Rook Ceph Operator logs if it is stuck in the Ceph Cluster bootstrap / start up procedure.
