---
title: "failed to create servicemonitor. the server could not find the requested resource (post servicemonitors.monitoring.coreos.com)"
---

Log message in operator: `[...] failed to reconcile cluster "rook-ceph": [...] failed to create servicemonitor. the server could not find the requested resource (post servicemonitors.monitoring.coreos.com)`

This normally means that you don't have the [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator) installed in your Kubernetes cluster. It is required for `.spec.monitoring.enabled: true` in the CephCluster object to work (the operator to be able to create the `ServiceMonitor` object to enable monitoring).

For the [Rook Ceph - Prometheus Monitoring Setup Steps](https://rook.io/docs/rook/v1.11/Storage-Configuration/Monitoring/ceph-monitoring/) check the link.

## Solutions

### Solution A: Disable Monitoring in CephCluster

Set `.spec.monitoring.enabled` to `false` in your CephCluster object / yaml (and apply it).

### Solution B: Install Prometheus Operator

If you want to use Prometheus for monitoring your applications and in this case also Rook Ceph Cluster easily in Kubernetes, make sure to install the [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator).

Checkout the [Prometheus Operator - Getting Started Guide](https://github.com/prometheus-operator/prometheus-operator/blob/main/Documentation/user-guides/getting-started.md).

***

## `[...] failed to retrieve servicemonitor. servicemonitors.monitoring.coreos.com "rook-ceph-mgr" is forbidden: [...]`

You have the Prometheus Operator installed in your Kubernetes cluster, but have not applied the RBAC necessary for the Rook Ceph Operator to be able to create the monitoring objects.

To rectify this, you can run the following command and / or add the file to your deployment system:

```console
kubectl apply -f https://raw.githubusercontent.com/rook/rook/master/cluster/examples/kubernetes/ceph/monitoring/rbac.yaml
```

(Original file located at: [https://github.com/rook/rook/blob/master/cluster/examples/kubernetes/ceph/monitoring/rbac.yaml](https://github.com/rook/rook/blob/master/cluster/examples/kubernetes/ceph/monitoring/rbac.yaml))
