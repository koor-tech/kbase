---
title: "Rook Ceph Toolbox Pod not Creating / Stuck"
---

* Make sure that you are not using an old version of the Rook Ceph Toolbox, grab the latest manifest here (make sure to switch to the `release-` branch of your Rook release): `https://github.com/rook/rook/blob/master/cluster/examples/kubernetes/ceph/toolbox.yaml`
* The Rook Ceph Toolbox can only fully startup after a Ceph Cluster has at least passed the initial setup by the Rook Ceph operator.
    * Monitor the Rook Ceph Operator logs for errors.
* Check the events of the Toolbox Pod using `kubectl describe pod POD_NAME`.
