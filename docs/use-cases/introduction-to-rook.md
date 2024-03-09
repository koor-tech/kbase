# Introduction to Rook

#### Overview of Rook and its purpose

Rook is an open source cloud-native storage orchestrator, providing the platform, framework, and support for Ceph storage to natively integrate with cloud-native environments.

[Ceph](https://ceph.com/) is a distributed storage system that provides file, block and object storage and is deployed in large scale production clusters.

#### Rook and Ceph

Rook simplifies the deployment of Ceph storage on Kubernetes by leveraging Kubernetes primitives. By running Ceph within the Kubernetes cluster, applications can easily access block devices and file systems managed by Rook. Additionally, Rook enables the use of the S3/Swift API for object storage.

The core component of Rook is the Rook operator, which automates the configuration and monitoring of the storage cluster. The operator, contained within a simple container, handles the initialization and monitoring of Ceph monitor pods, Ceph OSD daemons for RADOS storage, and other necessary Ceph daemons. It also manages custom resource definitions (CRDs) for pools, object stores, and file systems, ensuring the required pods and resources are provisioned.

The Rook operator continuously monitors the health of the storage daemons and takes appropriate actions to maintain cluster stability. It starts or fails over Ceph monitors as needed and makes adjustments based on the cluster's scaling. The operator also keeps an eye on desired state changes specified in the Ceph custom resources (CRs) and applies those changes accordingly.

Overall, Rook's operator streamlines the deployment and management of Ceph storage on Kubernetes, providing automated configuration, monitoring, and adjustment of the storage cluster.

##### Architecture¶

![Image title](images/Rook High-Level Architecture.png)
[source code](images/Rook%20High-Level%20Architecture.drawio)

#### How to use it

Rook helps you use [Ceph storage](https://ceph.com/) with Kubernetes by taking care of all the setup and monitoring tasks. It makes sure everything is running smoothly and adapts to changes in the storage cluster

Is time to hands dirty, Rook is available in two options:

- Helm Chart: [Rook Helm charts](https://rook.io/docs/rook/latest/Helm-Charts/helm-charts/) are preconfigured templates that simplify the deployment and management of Rook within a Kubernetes cluster. Helm is a package manager for Kubernetes that allows users to define, install, and manage applications and services.
- CRDS: Rook uses [CRDs (Custom Resource Definition)](https://rook.io/docs/rook/latest/CRDs/Cluster/ceph-cluster-crd/) to define and manage storage resources such as pools, object stores, and file systems. The CRDs provide a way to define these storage-related entities and their associated properties, allowing Rook to interact with and manage them in a Kubernetes-native manner.

##### Requisites

Based on the Rook documents, if you want to start using rook, you need to have at least the following requirements

- Kubernetes Cluster: we know you probably already have a Kubernetes Cluster, but if you just want to try Rook before jump on, you can use Minikube and that is fine, of course we encourage recommended to use a real Kubernetes Cluster otherwise probably you will not be able to explore the whole capacity of the Rook
  - Kubernetes version v1.22 at least is required
- CPU Architecture:
  - `amd64 / x86_64`
  - `arm64`
- To configure the Ceph storage cluster, at least one of these local storage options are required(not required by Minikube):
  - Raw devices (no partitions or formatted filesystems)
  - Raw partitions (no formatted filesystem)
  - LVM Logical Volumes (no formatted filesystem)
  - Persistent Volumes available from a storage class in block mode

##### Installing Rook using Helm Chart

The most easy way to install Rook is by using Helm chart, [Helm](https://helm.sh/) is the package manager for Kubernetes
it allows to automate the creation, packaging, configuration, and deployment of Kubernetes applications
by combining your configuration files into a single reusable package, you can find more details of helm here [Quickstart Guide](https://helm.sh/docs/intro/quickstart/)

1. First we need to add the rook repository to helm

```console
$ helm repo add rook-release https://charts.rook.io/release
```

2. Clone the `values.yaml` file and replace them with the right values

```console
$ curl -s https://raw.githubusercontent.com/rook/rook/master/deploy/charts/rook-ceph/values.yaml -o values.yaml
```

3. Install the chart

```console
$ helm install --create-namespace --namespace rook-ceph rook-ceph rook-release/rook-ceph -f values.yaml
```

4. Finally, after some minutes you can examine your pods installed by rook helm chart by using `kubectl -n rook-ceph get pod`

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

##### Installing Rook using CRDS

Similarly, you can install Rook by using [CRDs (Custom Resource Definition)](https://rook.io/docs/rook/latest/CRDs/Cluster/ceph-cluster-crd/)

1. Clone the Rook repository

```console
$ git clone --single-branch --branch master https://github.com/rook/rook.git
```

2. Go the Rook examples

```console
$ cd rook/deploy/examples
```

3. Create the CRD's

```console
$ kubectl create -f crds.yaml -f common.yaml -f operator.yaml
```

4. Create the cluster resource depending on the type of the cluster that you have
   - [cluster.yaml](https://github.com/rook/rook/blob/master/deploy/examples/cluster.yaml): Cluster settings for a production cluster running on bare metal. Requires at least three worker nodes.
   - [cluster-on-pvc.yaml](https://github.com/rook/rook/blob/master/deploy/examples/cluster-on-pvc.yaml): Cluster settings for a production cluster running in a dynamic cloud environment.
   - [cluster-test.yaml](https://github.com/rook/rook/blob/master/deploy/examples/cluster-test.yaml): Cluster settings for a test environment such as minikube.

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

Now you can use Rook along with your Kubernetes Cluster.

In the next chapter we are going to see the benefits of using [Koor Data Control Center](data-control-center-intro.md).
