# KSD Koor Storage Distribution

#### What is KSD Koor Storage Distribution
Koor Storage Distribution contains our expert team’s knowledge and experience
from having worked years on many different storage systems and clusters.
We are rooted in the open source communities
which power our product to create the best storage experience for your applications on top of Kubernetes.

#### Features of KSD Koor Storage Distribution

Congratulations have chosen the storage distribution KSD Koor on other options to treat its storage,
let's see what benefits you will have after choosing KSD

By using KSD Koor Storage Distribution,
You will have access to many important features that can be grouped in the next main areas

- **[Koor Operator](#koor-operator)**
- **[Security](#security)**
- **[Troubleshooting tools](#troubleshooting-tools)**
- **[Rook Ceph Experts assitance](#rook-ceph-experts-assitance)**


##### Koor Operator
| Feature                      |                                             State                                             | Description                                                                               |
|------------------------------|:---------------------------------------------------------------------------------------------:|-------------------------------------------------------------------------------------------|
| Installing rook              | [0.2.0 released](https://github.com/koor-tech/koor-operator/releases/tag/koor-operator-0.2.0) | Installs rook and checks if the cluster resources match recommendations                   |
| Version update notifications |                                        in development                                         | sends a notification whenever a new version of rook or ceph is released and ready for use |
| Automated Ceph upgrades      |                                            future                                             | Automatically upgrades the cluster to the latest available version of rook or ceph        |


### Security

| Feature         |   State   | Description                               |
|-----------------|   :---:   |-------------------------------------------|
| SSO Integration | released | You can use SSO for authenticate in your Ceph dashboard |


### Troubleshooting tools

| Feature   |   State   | Description                     |
| --------- |   :---:   | ------------------------------- |
| Extended Ceph Exporter | [1.2.8 released](https://github.com/koor-tech/extended-ceph-exporter/releases/tag/extended-ceph-exporter-1.2.8) | Prometheus exporter to provide "extended" metrics about a Ceph cluster's running components |
| Gather Info | public | [unreleased] Scripts to collect Ceph operational data to understand performance characteristics of the system |


### Rook Ceph Experts

| Feature                         | Description                                                                    |
|---------------------------------|--------------------------------------------------------------------------------|
| System check-up & assessment    | We are experts in Rook/Ceph/Koor that can review the status of you integration |
| Performance tuning              |                                                                                |
| Troubleshooting issues          |                                                                                |
| Design review & recommendations |                                                                                |
| Disaster recovery               |                                                                                |

### Installing KSD Koor Storage Distribution

Similarly, as Rook, the minimum requirements to use Koor in your cluster are:

* Kubernetes Cluster: we know you probably already have a Kubernetes Cluster,  but if you just want to try Rook before jump on, you can use Minikube and that is fine, of course we encourage recommended to use a real Kubernetes Cluster otherwise probably you will not be able to explore the whole capacity of the Rook
    * Kubernetes version v1.22 at least is required
* CPU Architecture:
    * `amd64 / x86_64`
    * `arm64`
* To configure the Ceph storage cluster, at least one of these local storage options are required (not required by Minikube):
    * Raw devices (no partitions or formatted filesystems)
    * Raw partitions (no formatted filesystem)
    * LVM Logical Volumes (no formatted filesystem)
    * Persistent Volumes available from a storage class in block mode
* You can use minikube to try it, of course not all the features are available, but maybe that should be enough to start to play with KSO

You can use Helm Charts or CRDs to install Koor:

- Helm Chart: [Rook Helm charts](https://github.com/koor-tech/koor-operator/tree/main/charts/koor-operator/) are preconfigured templates that simplify the deployment and management of Rook within a Kubernetes cluster. Helm is a package manager for Kubernetes that allows users to define, install, and manage applications and services.
- CRDS: [Koor  CRDs(Custom Resource Definition)](http://localhost:8000/trial/getting-started/#install-koor-storage-distribution-operator-and-resources/) to define and manage storage resources such as pools, object stores, and file systems. The CRDs provide a way to define these storage-related entities and their associated properties, allowing Koor to interact with and manage them in a Kubernetes-native manner.

#### Installing KSD Koor Storage Distribution using Helm Chart

Let's go to install KSD through Helm Chart

1. First, we need to add the rook repository to helm
  ```console
  $ helm repo add koor-release https://charts.koor.tech/release
  ```
2. Install the chart
  ```console
  $ helm install --create-namespace koor-ceph koor-release/rook-ceph  # (optional) -f utils/operatorValues.yaml
  NAME: koor-ceph
  LAST DEPLOYED: Tue Jul  4 17:21:00 2023
  NAMESPACE: default
  STATUS: deployed
  REVISION: 1
  TEST SUITE: None
  NOTES:
  The Rook Operator has been installed. Check its status by running:
    kubectl --namespace default get pods -l "app=rook-ceph-operator"
  
  Visit https://rook.io/docs/rook/latest for instructions on how to create and configure Rook clusters
  
  Important Notes:
  - You must customize the 'CephCluster' resource in the sample manifests for your cluster.
  - Each CephCluster must be deployed to its own namespace, the samples use `rook-ceph` for the namespace.
  - The sample manifests assume you also installed the rook-ceph operator in the `rook-ceph` namespace.
  - The helm chart includes all the RBAC required to create a CephCluster CRD in the same namespace.
  - Any disk devices you add to the cluster in the 'CephCluster' must be empty (no filesystem and no partitions).
  
  $  helm install --create-namespace --namespace default default-rook-ceph-cluster --set operatorNamespace=default koor-release/rook-ceph-cluster -f clusterValues.yaml
  W0704 17:36:32.176476   18517 warnings.go:70] unknown field "spec.healthCheck.bucket"
  NAME: default-rook-ceph-cluster
  LAST DEPLOYED: Tue Jul  4 17:36:32 2023
  NAMESPACE: default
  STATUS: deployed
  REVISION: 1
  TEST SUITE: None
  NOTES:
  The Ceph Cluster has been installed. Check its status by running:
    kubectl --namespace default get cephcluster
  
  Visit https://rook.io/docs/rook/latest/CRDs/ceph-cluster-crd/ for more information about the Ceph CRD.
  
  Important Notes:
  - You can only deploy a single cluster per namespace
  - If you wish to delete this cluster and start fresh, you will also have to wipe the OSD disks using `sfdisk`
       
  ```



3.-Finally, after some minutes you can examine your pods installed by rook helm chart by using `kubectl -n rook-ceph get pod`
  ```console
  $ kubectl -n rook-ceph get pod
  NAME                                                 READY   STATUS      RESTARTS   AGE
  csi-cephfsplugin-provisioner-d77bb49c6-n5tgs         5/5     Running     0          140s
  csi-cephfsplugin-provisioner-d77bb49c6-v9rvn         5/5     Running     0          140s
  csi-cephfsplugin-rthrp                               3/3     Running     0          140s
  csi-rbdplugin-hbsm7                                  3/3     Running     0          140s
  csi-rbdplugin-provisioner-5b5cd64fd-nvk6c            6/6     Running     0          140s
  csi-rbdplugin-provisioner-5b5cd64fd-q7bxl            6/6     Running     0          140s
  rook-ceph-crashcollector-minikube-5b57b7c5d4-hfldl   1/1     Running     0          105s
  rook-ceph-mgr-a-64cd7cdf54-j8b5p                     2/2     Running     0          77s
  rook-ceph-mgr-b-657d54fc89-2xxw7                     2/2     Running     0          56s
  rook-ceph-mon-a-694bb7987d-fp9w7                     1/1     Running     0          105s
  rook-ceph-mon-b-856fdd5cb9-5h2qk                     1/1     Running     0          94s
  rook-ceph-mon-c-57545897fc-j576h                     1/1     Running     0          85s
  rook-ceph-operator-85f5b946bd-s8grz                  1/1     Running     0          92m
  rook-ceph-osd-0-6bb747b6c5-lnvb6                     1/1     Running     0          23s
  rook-ceph-osd-1-7f67f9646d-44p7v                     1/1     Running     0          24s
  rook-ceph-osd-2-6cd4b776ff-v4d68                     1/1     Running     0          25s
  rook-ceph-osd-prepare-node1-vx2rz                    0/2     Completed   0          60s
  rook-ceph-osd-prepare-node2-ab3fd                    0/2     Completed   0          60s
  rook-ceph-osd-prepare-node3-w4xyz                    0/2     Completed   0          60s
  ```

##### Installing KSD using CRDS

Of course can install KSD by using  [CRDs (Custom Resource Definition)](https://rook.io/docs/rook/latest/CRDs/Cluster/ceph-cluster-crd/)

1. Clone the Rook repository
  ```console
  $ git clone --single-branch --branch v1.11.0 https://github.com/koor-tech/koor.git
  ```
2. Go the  Rook examples
  ```console
  $ cd rook/deploy/examples
  ```
3. Create the CRD's
  ```console
  $ kubectl create -f crds.yaml -f common.yaml -f operator.yaml
  ```
4. Create the cluster resource depending on the type of the cluster that you have
  * [cluster.yaml](https://github.com/rook/rook/blob/master/deploy/examples/cluster.yaml): Cluster settings for a production cluster running on bare metal. Requires at least three worker nodes.
  * [cluster-on-pvc.yaml](https://github.com/rook/rook/blob/master/deploy/examples/cluster-on-pvc.yaml): Cluster settings for a production cluster running in a dynamic cloud environment.
  * [cluster-test.yaml](https://github.com/rook/rook/blob/master/deploy/examples/cluster-test.yaml): Cluster settings for a test environment such as minikube.
  ```console
  $ kubectl create -f cluster.yaml
  ```
4. Finally, after some minutes you can examine your pods created by the rook CRDs by using `kubectl -n rook-ceph get pod`
  ```console
  $ kubectl -n rook-ceph get pod
  NAME                                                 READY   STATUS      RESTARTS   AGE
  csi-cephfsplugin-provisioner-d77bb49c6-n5tgs         5/5     Running     0          140s
  csi-cephfsplugin-provisioner-d77bb49c6-v9rvn         5/5     Running     0          140s
  csi-cephfsplugin-rthrp                               3/3     Running     0          140s
  csi-rbdplugin-hbsm7                                  3/3     Running     0          140s
  csi-rbdplugin-provisioner-5b5cd64fd-nvk6c            6/6     Running     0          140s
  csi-rbdplugin-provisioner-5b5cd64fd-q7bxl            6/6     Running     0          140s
  rook-ceph-crashcollector-minikube-5b57b7c5d4-hfldl   1/1     Running     0          105s
  rook-ceph-mgr-a-64cd7cdf54-j8b5p                     2/2     Running     0          77s
  rook-ceph-mgr-b-657d54fc89-2xxw7                     2/2     Running     0          56s
  rook-ceph-mon-a-694bb7987d-fp9w7                     1/1     Running     0          105s
  rook-ceph-mon-b-856fdd5cb9-5h2qk                     1/1     Running     0          94s
  rook-ceph-mon-c-57545897fc-j576h                     1/1     Running     0          85s
  rook-ceph-operator-85f5b946bd-s8grz                  1/1     Running     0          92m
  rook-ceph-osd-0-6bb747b6c5-lnvb6                     1/1     Running     0          23s
  rook-ceph-osd-1-7f67f9646d-44p7v                     1/1     Running     0          24s
  rook-ceph-osd-2-6cd4b776ff-v4d68                     1/1     Running     0          25s
  rook-ceph-osd-prepare-node1-vx2rz                    0/2     Completed   0          60s
  rook-ceph-osd-prepare-node2-ab3fd                    0/2     Completed   0          60s
  rook-ceph-osd-prepare-node3-w4xyz                    0/2     Completed   0          60s
  ```

#### Using KSD Koor Storage Distribution

Once you have installed KSD you can use it

```console
$ kubectl create -f csi/rbd/storageclass.yaml
$ kubectl create -f - << EOF
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: rbd-pvc
spec:
  accessMode:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
  storageClassName: rook-ceph-block  
EOF
```