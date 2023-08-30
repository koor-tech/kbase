---
title: "Koor Operator"
---

An easy way to install the Koor Storage Distro is by using the [Koor Operator](https://github.com/koor-tech/koor-operator). 
Using the Koor Operator makes installing, maintaining and upgrading your KSD installation easier. 
This helps you install a full-fledged Koor Storage Distro (with all Rook-Ceph artifacts) in just 2 lines of helm install.

## Features
These are the features currently available in the Koor Operator:

* Install KSD with sane defaults
* Checks if the cluster meets the minimum recommended resources
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

### Helm Chart Parameters

The Koor Operator uses sane defaults that help you bootstrap your KSD cluster quickly, but you can configure it via the `values.yaml` file:

```yaml
certmanager:
  enabled: true
  installCRDs: true
koorCluster:
  spec:
    useAllDevices: true
    monitoringEnabled: true
    dashboardEnabled: true
    toolboxEnabled: true
    upgradeOptions:
      mode: notify
      endpoint: https://versions.koor.tech
      schedule: 0 0 * * *
    ksdReleaseName: ksd
    ksdClusterReleaseName: ksd-cluster
```

A detailed documentatrion of the parameters in `values.yaml` can be found [in the git repository](https://github.com/koor-tech/koor-operator/blob/main/charts/koor-operator/README.md). Here are some notable parameters:

| Parameter | Description | Default |
|-----------|-------------|---------|
| `certmanager.enabled` | Install cert-manger. Set to false to use an existing cert-manager | `true` |
| `certmanager.installCRDs` | If cert-manager's CRDs should be installed through Helm | `true` |
| `koorCluster.spec.dashboardEnabled` | Enable the Ceph MGR dashboard. | `true` |
| `koorCluster.spec.ksdClusterReleaseName` | The name to use for KSD cluster helm release. | `"ksd-cluster"` |
| `koorCluster.spec.ksdReleaseName` | The name to use for KSD helm release. | `"ksd"` |
| `koorCluster.spec.monitoringEnabled` | If monitoring should be enabled, requires the prometheus-operator to be pre-installed. | `true` |
| `koorCluster.spec.toolboxEnabled` | If the Ceph toolbox, should be deployed as well. | `true` |
| `koorCluster.spec.upgradeOptions.endpoint` | The api endpoint used to find the ceph latest version | `"https://"versions.koor.tech"` |
| `koorCluster.spec.upgradeOptions.mode` | Upgrade mode. Options: disabled, notify, upgrade. | `"notify"` |
| `koorCluster.spec.upgradeOptions.schedule` | The schedule to check for new versions. Uses CRON format as specified by https://github.com/robfig/cron/tree/v3. Defaults to everyday at midnight in the local timezone. To change the timezone, prefix the schedule with CRON_TZ=<Timezone>. For example: "CRON_TZ=UTC 0 0 * * *" is midnight UTC. | `"0 0 * * *"` |
| `koorCluster.spec.useAllDevices` | If all empty + unused devices of the cluster should be used. | `true` |

## What if I have an existing KSD cluster?
If you installed KSD using helm and would like to reap the benefits of the Koor Operator, you can add it to your existing cluster by adjusting the `values.yaml` with the helm release names. 
Note that the Koor Operator needs to be installed in the same namespace as the other KSD components. For example:

```yaml
koorCluster:
  spec:
    ksdReleaseName: my-ksd-helm-release-name
    ksdClusterReleaseName: my-ksd-cluster-release-name
```

## Minimum Recommended Resources
After the Koor Operator is installed, it calculates the total resources available in the cluster and checks if they meet the [minimum recommended resources](https://github.com/koor-tech/koor-operator/blob/842be01935b984cba0227ad630b7c2ccf2558c2f/api/v1alpha1/koorcluster_types.go#L133-L138) to run KSD. The resources are:

* Nodes: the cluster should contain at least **4** nodes.
* Storage: the total storage available in the cluster should at least than **500GB**
* CPU: across all nodes, the number of CPU cores should be at least **19 cores**
* Memory: across all nodes, the available memory should be more than **44GB**

To check if your cluster meets the minimum resources, you can check the status of the `KoorCluster` resource:

```console
$ kubectl describe -n koor-operator koorclusters
...
Status:
  Meets Minimum Resources:  false
  Total Resources:
    Cpu:          6
    Memory:       6052260Ki
    Nodes Count:  3
    Storage:      109293708Ki
```

## Version Notifications
The Koor Operator allows you to be notified whenever a new version of KSD, Ceph or the Koor Operator are available. This is controlled in `values.yaml` using the following options:

```yaml
koorCluster:
  spec:
    upgradeOptions:
      mode: notify # Change to diabled to turn off new version notifications
      endpoint: https://versions.koor.tech # The endpoint for the version service
      schedule: 0 0 * * * # The schedule to check for new versions, defaults to everyday at midnight
```

!!! tip
    You can force an immediate version check by changing the `schedule` to `* * * * *` (check every minute) 
    and changing it back to another more practical schedule when the check is complete.

The current and latest versions will appear in the status of the `KoorCluster` resource:

```console
$ kubectl describe -n koor-operator koorclusters
...
Status:
  Current Versions:
    Ceph:           v17.2.6
    Koor Operator:  0.3.5
    Ksd:            v1.12.0
    Kube:           v1.25.3
  Latest Versions:
    Ceph:
      Image Hash:  9c067c50038de818e10ab7887929b6bd496d5dcfe55fa1343854a54e61a82fab
      Image Uri:   quay.io/ceph/ceph:v17.2.6
      Version:     17.2.6
    Koor Operator:
      Helm Chart:       koor-operator
      Helm Repository:  https://koor-tech.github.io/koor-operator
      Image Hash:       95b71899fcc90f8a34161d3f47a3ee3bde4fd11b6a4947c4482e3812ea89a019
      Image Uri:        koorinc/koor-operator:v0.3.5
      Version:          0.3.5
    Ksd:
      Helm Chart:           rook-ceph
      Helm Repository:      https://charts.koor.tech/release
      Image Hash:           d3d38ae93d268290bbf99545b90addaa6f51c3d1f383ef5f2ab6cb65f2cf243e
      Image Uri:            koorinc/ceph:v1.12.0
      Version:              1.12.0
...
```

## Version Service
The information about the newest available versions is tracked in the [version service](https://github.com/koor-tech/version-service). Clusters using the Koor Operator default to using the official Koor version service which is available on https://versions.koor.tech . 

Alternatively, you can deploy the version service on your own cluster:

```bash
kubectl run version-service --image=koorinc/version-service:v0.1.4 --env="NO_TLS=true" --port 80 --expose
```

!!! note
    The Version Service is never checked if notifications are disabled in the `upgradeOptions.mode` option. 
    If notifications are enabled, but the Version Service URL can not be reached, nothing will happen
