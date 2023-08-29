---
title: "Koor Operator"
---

An easy way to install the Koor Storage Distro is by using the [Koor Operator](https://github.com/koor-tech/koor-operator). 
Using the Koor Operator makes installing, maintaining and upgrading your KSD installation easier. 
This helps you install a full-fledged Koor Storage Distro (with all Rook-Ceph artifacts) in just 2 lines of helm install.

## Features
These are the features currently available in the Koor Operator:
* Install KSD with sane defaults
* Get notifications when newer versions of KSD, Ceph or the Koor Operator are available
* More features are planned soon!

## Installing using Helm
To get started, you can install the Koor Operator using [helm](helm.sh), using the following command:

```bash
helm repo add koor-operator https://koor-tech.github.io/koor-operator
helm install --create-namespace --namespace koor-operator my-release koor-operator/koor-operator -f values.yaml
```

The cluster should be ready in a few minutes. You can check the status using this `kubectl` command:

```console
$ kubectl get --namespace koor-operator pods
NAME                                                     READY   STATUS      RESTARTS   AGE
csi-cephfsplugin-86b5g                                   2/2     Running     0          16m
csi-cephfsplugin-927rd                                   2/2     Running     0          16m
csi-cephfsplugin-provisioner-df5577568-7xng6             5/5     Running     0          16m
csi-cephfsplugin-provisioner-df5577568-gzmjv             5/5     Running     0          16m
csi-cephfsplugin-st679                                   2/2     Running     0          16m
csi-rbdplugin-5g529                                      2/2     Running     0          16m
csi-rbdplugin-gwqwg                                      2/2     Running     0          16m
csi-rbdplugin-ljskq                                      2/2     Running     0          16m
csi-rbdplugin-provisioner-65cfc5bdf9-dcg4w               5/5     Running     0          16m
csi-rbdplugin-provisioner-65cfc5bdf9-wt8fq               5/5     Running     0          16m
koor-operator-cert-manager-755849665f-dvncg              1/1     Running     0          24m
koor-operator-cert-manager-cainjector-576f685f87-9qv87   1/1     Running     0          24m
koor-operator-cert-manager-webhook-86cbd54d59-72hnm      1/1     Running     0          24m
koor-operator-controller-manager-7d68cb8b6c-qxs4h        2/2     Running     0          24m
koor-operator-koorcluster-job-bmvzp                      0/1     Completed   5          24m
rook-ceph-mon-a-canary-6b784678f7-fbr4h                  2/2     Running     0          45s
rook-ceph-mon-b-canary-6fb58fc9dd-4wvqq                  2/2     Running     0          45s
rook-ceph-mon-c-canary-5cc8b55d55-z7tdv                  2/2     Running     0          45s
rook-ceph-operator-8f76cf848-2j2nv                       1/1     Running     0          21m
rook-ceph-tools-7585487b84-6br42                         1/1     Running     0          21m
```

The Koor Operator uses sane defaults that help you bootstrap your KSD cluster quickly. It is also configurable via `values.yaml`:

| Parameter | Description | Default |
|-----------|-------------|---------|
| `certmanager.enabled` | Install cert-manger. Set to false to use an existing cert-manager | `true` |
| `certmanager.installCRDs` | If cert-manager's CRDs should be installed through Helm | `true` |
| `koorCluster.spec.dashboardEnabled` | Enable the Ceph MGR dashboard. | `true` |
| `koorCluster.spec.ksdClusterReleaseName` | The name to use for KSD cluster helm release. | `"ksd-cluster"` |
| `koorCluster.spec.ksdReleaseName` | The name to use for KSD helm release. | `"ksd"` |
| `koorCluster.spec.monitoringEnabled` | If monitoring should be enabled, requires the prometheus-operator to be pre-installed. | `true` |
| `koorCluster.spec.toolboxEnabled` | If the Ceph toolbox, should be deployed as well. | `true` |
| `koorCluster.spec.upgradeOptions.endpoint` | The api endpoint used to find the ceph latest version | `"versions.koor.tech"` |
| `koorCluster.spec.upgradeOptions.mode` | Upgrade mode. Options: disabled, notify, upgrade. | `"notify"` |
| `koorCluster.spec.upgradeOptions.schedule` | The schedule to check for new versions. Uses CRON format as specified by https://github.com/robfig/cron/tree/v3. Defaults to everyday at midnight in the local timezone. To change the timezone, prefix the schedule with CRON_TZ=<Timezone>. For example: "CRON_TZ=UTC 0 0 * * *" is midnight UTC. | `"0 0 * * *"` |
| `koorCluster.spec.useAllDevices` | If all empty + unused devices of the cluster should be used. | `true` |

## What if I have an existing KSD cluster?
If you installed KSD using helm and would like to reap the benefits of the Koor Operator, you can add it to your existing cluster by adjusting the `values.yaml` with the helm release names. 
Note that you need to install the Koor Operator in the same namespace as the other KSD components. For example:

```yaml
koorCluster:
  spec:
    ksdReleaseName: my-ksd-helm-release-name
    ksdClusterReleaseName: my-ksd-cluster-release-name
```

