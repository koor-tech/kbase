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

Let's go to install KSD through Helm Chart, you can check how to install Helm here [Installing Helm](https://helm.sh/docs/intro/install/)

  1. First, we need to add the rook repository to helm
  ```console
  $ helm repo add koor-release https://charts.koor.tech/release
  ```
  2. Install the charts
  ```console
  $ helm install --create-namespace --namespace koor-ceph koor-ceph koor-release/rook-ceph --set image.tag=master
  NAME: koor-ceph
  LAST DEPLOYED: Fri Jul 14 11:53:52 2023
  NAMESPACE: koor-ceph
  STATUS: deployed
  REVISION: 1
  TEST SUITE: None
  NOTES:
  The Rook Operator has been installed. Check its status by running:
    kubectl --namespace koor-ceph get pods -l "app=rook-ceph-operator"
  
  Visit https://rook.io/docs/rook/latest for instructions on how to create and configure Rook clusters
  
  Important Notes:
  - You must customize the 'CephCluster' resource in the sample manifests for your cluster.
  - Each CephCluster must be deployed to its own namespace, the samples use `rook-ceph` for the namespace.
  - The sample manifests assume you also installed the rook-ceph operator in the `rook-ceph` namespace.
  - The helm chart includes all the RBAC required to create a CephCluster CRD in the same namespace.
  - Any disk devices you add to the cluster in the 'CephCluster' must be empty (no filesystem and no partitions).
  ```
  3. It should show ContainerCreating status, but after some minutes you should be able to see the koor operator running
  ```console 
  $ kubectl --namespace default get pods -l "app=rook-ceph-operator"
  NAME                                  READY   STATUS    RESTARTS   AGE
  rook-ceph-operator-6769f86d66-dlnhz   1/1     Running   0          4m23s
  ```
  4. Now is the time to install the koor-ceph-cluster chart
  ```console 
  $ helm install --create-namespace --namespace koor-ceph koor-ceph-cluster --set operatorNamespace=koor-ceph,toolbox.enabled=true koor-release/rook-ceph-cluster
  NAME: koor-ceph-cluster
  LAST DEPLOYED: Fri Jul 14 11:55:43 2023
  NAMESPACE: koor-ceph
  STATUS: deployed
  REVISION: 1
  TEST SUITE: None
  NOTES:
  The Ceph Cluster has been installed. Check its status by running:
  kubectl --namespace koor-ceph get cephcluster
  
  Visit https://rook.io/docs/rook/latest/CRDs/ceph-cluster-crd/ for more information about the Ceph CRD.
  
  Important Notes:
  - You can only deploy a single cluster per namespace
  - If you wish to delete this cluster and start fresh, you will also have to wipe the OSD disks using `sfdisk`
  ```
  5. Once the charts are installed, and after several minutes (depending on your cluster) you should be able to examine your pods installed by rook helm chart by using `kubectl -n koor-ceph get pod`
  ```console
  $ kubectl get pods -n koor-ceph                               
  NAME                                                              READY   STATUS      RESTARTS       AGE
  csi-cephfsplugin-bwhk7                                            2/2     Running     0              7m
  csi-cephfsplugin-dvb2f                                            2/2     Running     0              7m
  csi-cephfsplugin-hhmjv                                            2/2     Running     0              7m
  csi-cephfsplugin-kh46d                                            2/2     Running     0              7m
  csi-cephfsplugin-l6tjt                                            2/2     Running     0              7m
  csi-cephfsplugin-mjm72                                            2/2     Running     0              7m
  csi-cephfsplugin-nhjtz                                            2/2     Running     0              7m
  csi-cephfsplugin-provisioner-f4c6d6787-nbrlt                      5/5     Running     0              7m
  csi-cephfsplugin-provisioner-f4c6d6787-tpr55                      5/5     Running     0              7m
  csi-cephfsplugin-vkxdp                                            2/2     Running     0              7m
  csi-cephfsplugin-xspzv                                            2/2     Running     0              7m
  csi-rbdplugin-2psvb                                               2/2     Running     0              7m
  csi-rbdplugin-2q4tk                                               2/2     Running     0              7m
  csi-rbdplugin-c7bsh                                               2/2     Running     0              7m
  csi-rbdplugin-h8vqn                                               2/2     Running     0              7m
  csi-rbdplugin-h95qf                                               2/2     Running     0              7m
  csi-rbdplugin-jdtzq                                               2/2     Running     0              7m
  csi-rbdplugin-mkhjm                                               2/2     Running     0              7m
  csi-rbdplugin-provisioner-74558f75d7-p5dwk                        5/5     Running     0              7m
  csi-rbdplugin-provisioner-74558f75d7-sd6sm                        5/5     Running     0              7m
  csi-rbdplugin-tnd2j                                               2/2     Running     0              7m
  csi-rbdplugin-zcjvb                                               2/2     Running     0              7m
  rook-ceph-crashcollector-1731cb9fa6df36c7dc5c45b3383a83dd-8vnnl   1/1     Running     0              5m
  rook-ceph-crashcollector-2c83ac8fa839ed79f93ca9df39220550-wcxj6   1/1     Running     0              5m
  rook-ceph-crashcollector-9626813dec75694a7b9d1ff9e3c5c5c6-p5bf6   1/1     Running     0              5m
  rook-ceph-crashcollector-b8cb4b61569b6866aabaca6540f2ec7a-cxhcf   1/1     Running     0              5m
  rook-ceph-crashcollector-d1ba19baca8b0b9e73a67ab2795db16a-5dcwk   1/1     Running     0              5m
  rook-ceph-crashcollector-f4f18bdf3b44a6c2c0c30ae09d957d88-h5bh2   1/1     Running     0              7m
  rook-ceph-mds-ceph-filesystem-a-7bd7cdc587-6fj6j                  2/2     Running     0              2m
  rook-ceph-mds-ceph-filesystem-b-85867466c6-fxwbk                  2/2     Running     0              2m
  rook-ceph-mgr-a-5c699c7cc7-lkqpd                                  3/3     Running     0              5m
  rook-ceph-mgr-b-669655d76b-lpwcx                                  3/3     Running     0              5m
  rook-ceph-mon-a-54d46788fd-bfm8k                                  2/2     Running     0              6m
  rook-ceph-mon-b-c8b65c96b-5jf7n                                   2/2     Running     0              6m
  rook-ceph-mon-c-69db578bdd-p9d7b                                  2/2     Running     0              6m
  rook-ceph-operator-6c9955886b-85f8m                               1/1     Running     0              20m
  rook-ceph-osd-0-6d5cf7578c-wvk7w                                  2/2     Running     0              16m
  rook-ceph-osd-1-58c7475d7b-7nmt9                                  2/2     Running     0              16m
  rook-ceph-osd-2-86f797c8c8-qkpfj                                  2/2     Running     0              16m
  rook-ceph-osd-prepare-1731cb9fa6df36c7dc5c45b3383a83dd-m6jhr      0/1     Completed   0              7m40s
  rook-ceph-osd-prepare-2c83ac8fa839ed79f93ca9df39220550-rl6tz      0/1     Completed   0              7m27s
  rook-ceph-osd-prepare-64fdbb8c526a8328b870ff83a1e9edc5-lsbpx      0/1     Completed   0              7m44s
  rook-ceph-osd-prepare-690d717bb75d5637699bd879500faf04-l2j4g      0/1     Completed   0              7m37s
  rook-ceph-osd-prepare-9626813dec75694a7b9d1ff9e3c5c5c6-qmk2z      0/1     Completed   0              7m30s
  rook-ceph-osd-prepare-b8cb4b61569b6866aabaca6540f2ec7a-vfxl4      0/1     Completed   0              7m33s
  rook-ceph-osd-prepare-d1ba19baca8b0b9e73a67ab2795db16a-vv9k8      0/1     Completed   0              7m21s
  rook-ceph-osd-prepare-ed3cf0d3fbd617da34aa8ef19ac58428-2gvbx      0/1     Completed   0              7m18s
  rook-ceph-osd-prepare-f4f18bdf3b44a6c2c0c30ae09d957d88-flh2v      0/1     Completed   0              7m24s
  rook-ceph-rgw-ceph-objectstore-a-59f77dfd6d-qhkk9                 2/2     Running     60             7m
  rook-ceph-tools-6c78448d68-52cgc                                  1/1     Running     0              7m
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
    $ kubectl get po -n rook-ceph   
    NAME                                                              READY   STATUS      RESTARTS   AGE
    csi-cephfsplugin-bwhk7                                            2/2     Running     0              7m
    csi-cephfsplugin-dvb2f                                            2/2     Running     0              7m
    csi-cephfsplugin-hhmjv                                            2/2     Running     0              7m
    csi-cephfsplugin-kh46d                                            2/2     Running     0              7m
    csi-cephfsplugin-l6tjt                                            2/2     Running     0              7m
    csi-cephfsplugin-mjm72                                            2/2     Running     0              7m
    csi-cephfsplugin-nhjtz                                            2/2     Running     0              7m
    csi-cephfsplugin-provisioner-f4c6d6787-nbrlt                      5/5     Running     0              7m
    csi-cephfsplugin-provisioner-f4c6d6787-tpr55                      5/5     Running     0              7m
    csi-cephfsplugin-vkxdp                                            2/2     Running     0              7m
    csi-cephfsplugin-xspzv                                            2/2     Running     0              7m
    csi-rbdplugin-2psvb                                               2/2     Running     0              7m
    csi-rbdplugin-2q4tk                                               2/2     Running     0              7m
    csi-rbdplugin-c7bsh                                               2/2     Running     0              7m
    csi-rbdplugin-h8vqn                                               2/2     Running     0              7m
    csi-rbdplugin-h95qf                                               2/2     Running     0              7m
    csi-rbdplugin-jdtzq                                               2/2     Running     0              7m
    csi-rbdplugin-mkhjm                                               2/2     Running     0              7m
    csi-rbdplugin-provisioner-74558f75d7-p5dwk                        5/5     Running     0              7m
    csi-rbdplugin-provisioner-74558f75d7-sd6sm                        5/5     Running     0              7m
    csi-rbdplugin-tnd2j                                               2/2     Running     0              7m
    csi-rbdplugin-zcjvb                                               2/2     Running     0              7m
    rook-ceph-crashcollector-1731cb9fa6df36c7dc5c45b3383a83dd-8vnnl   1/1     Running     0              5m
    rook-ceph-crashcollector-2c83ac8fa839ed79f93ca9df39220550-wcxj6   1/1     Running     0              5m
    rook-ceph-crashcollector-9626813dec75694a7b9d1ff9e3c5c5c6-p5bf6   1/1     Running     0              5m
    rook-ceph-crashcollector-b8cb4b61569b6866aabaca6540f2ec7a-cxhcf   1/1     Running     0              5m
    rook-ceph-crashcollector-d1ba19baca8b0b9e73a67ab2795db16a-5dcwk   1/1     Running     0              5m
    rook-ceph-crashcollector-f4f18bdf3b44a6c2c0c30ae09d957d88-h5bh2   1/1     Running     0              7m
    rook-ceph-mds-ceph-filesystem-a-7bd7cdc587-6fj6j                  2/2     Running     0              2m
    rook-ceph-mds-ceph-filesystem-b-85867466c6-fxwbk                  2/2     Running     0              2m
    rook-ceph-mgr-a-5c699c7cc7-lkqpd                                  3/3     Running     0              5m
    rook-ceph-mgr-b-669655d76b-lpwcx                                  3/3     Running     0              5m
    rook-ceph-mon-a-54d46788fd-bfm8k                                  2/2     Running     0              6m
    rook-ceph-mon-b-c8b65c96b-5jf7n                                   2/2     Running     0              6m
    rook-ceph-mon-c-69db578bdd-p9d7b                                  2/2     Running     0              6m
    rook-ceph-operator-6c9955886b-85f8m                               1/1     Running     0              20m
    rook-ceph-osd-0-6d5cf7578c-wvk7w                                  2/2     Running     0              16m
    rook-ceph-osd-1-58c7475d7b-7nmt9                                  2/2     Running     0              16m
    rook-ceph-osd-2-86f797c8c8-qkpfj                                  2/2     Running     0              16m
    rook-ceph-osd-prepare-1731cb9fa6df36c7dc5c45b3383a83dd-m6jhr      0/1     Completed   0              7m40s
    rook-ceph-osd-prepare-2c83ac8fa839ed79f93ca9df39220550-rl6tz      0/1     Completed   0              7m27s
    rook-ceph-osd-prepare-64fdbb8c526a8328b870ff83a1e9edc5-lsbpx      0/1     Completed   0              7m44s
    rook-ceph-osd-prepare-690d717bb75d5637699bd879500faf04-l2j4g      0/1     Completed   0              7m37s
    rook-ceph-osd-prepare-9626813dec75694a7b9d1ff9e3c5c5c6-qmk2z      0/1     Completed   0              7m30s
    rook-ceph-osd-prepare-b8cb4b61569b6866aabaca6540f2ec7a-vfxl4      0/1     Completed   0              7m33s
    rook-ceph-osd-prepare-d1ba19baca8b0b9e73a67ab2795db16a-vv9k8      0/1     Completed   0              7m21s
    rook-ceph-osd-prepare-ed3cf0d3fbd617da34aa8ef19ac58428-2gvbx      0/1     Completed   0              7m18s
    rook-ceph-osd-prepare-f4f18bdf3b44a6c2c0c30ae09d957d88-flh2v      0/1     Completed   0              7m24s
    rook-ceph-rgw-ceph-objectstore-a-59f77dfd6d-qhkk9                 2/2     Running     60             7m
    rook-ceph-tools-6c78448d68-52cgc                                  1/1     Running     0              7m
    ```

#### Using KSD Koor Storage Distribution

Once you have installed KSD you can use it

You can review the storageClass available in your cluster by running `kubectl get sc`

```console
kubectl get sc                    
NAME                   PROVISIONER                     RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION   AGE
ceph-block (default)   koor-ceph.rbd.csi.ceph.com      Delete          Immediate           true                   45m
ceph-bucket            koor-ceph.ceph.rook.io/bucket   Delete          Immediate           false                  45m
ceph-filesystem        koor-ceph.cephfs.csi.ceph.com   Delete          Immediate           true                   45m
```

Then you can create your PVC (PersistentVolumeClaim).Pods use PersistentVolumeClaims to request physical storage and use it
```console
$ kubectl create -f - << EOF
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: rbd-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
  storageClassName: ceph-block
EOF
```

Let's see and example using our PVC created before
```console
$ kubectl create -f - << EOF
apiVersion: v1
kind: Pod
metadata:
  name: server
spec:
  volumes:
    - name: pvc-storage
      persistentVolumeClaim:
        claimName: rbd-pvc
  containers:
    - name: nginx-container
      image: nginx
      ports:
        - containerPort: 80
          name: "http-server"
      volumeMounts:
        - mountPath: "/usr/share/nginx/html"
          name: pvc-storage
EOF
```

Then you should be able to see the PVC bounded and the pod running

```console
$ kubectl get pvc 
NAME      STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
rbd-pvc   Bound    pvc-fbf3d7b9-1dc2-4357-a16e-07eebb12fb7d   1Gi        RWO            ceph-block     36s
$ kubectl get po            
NAME     READY   STATUS    RESTARTS   AGE
server   1/1     Running   0          29s
```

Finally you can review what device are you using for nginx

```console
$ kubectl exec -it server -- df -h
Filesystem      Size  Used Avail Use% Mounted on
overlay         226G   13G  204G   6% /
tmpfs            64M     0   64M   0% /dev
/dev/sda1       226G   13G  204G   6% /etc/hosts
shm              64M     0   64M   0% /dev/shm
/dev/rbd0       974M   24K  958M   1% /usr/share/nginx/html
tmpfs            15G   12K   15G   1% /run/secrets/kubernetes.io/serviceaccount
tmpfs           7.7G     0  7.7G   0% /proc/acpi
tmpfs           7.7G     0  7.7G   0% /proc/scsi
tmpfs           7.7G     0  7.7G   0% /sys/firmware
```

As you can see nginx is using the storage provided and managed by Koor Storage Distribution

The sky is the limit! Happy Coding!