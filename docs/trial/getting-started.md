---
title: "KSD Trial - Getting Started"
---

Thank you for trying Koor Storage Distribution.

Koor allows you to attach Ceph storage to Kubenetes clusters. 
Koor makes it easier to deploy and manage storage for use in Kubernetes. 
On bare metal or virtual machines, in your own data center or one of the many cloud providers, 
the Koor Storage Distribution (KSD) has all that tools you need.
Configure any type of storage solution. Koor supports Block, Filesystem and S3-compatible Object Storage at one place.

## Requirements

## Kubernetes Prerequisites
Though KSD can be installed on any existing Kubernetes cluster. We support
Koor can be installed on any existing Kubernetes cluster

- Kubernetes v1.21 or higher is supported
- Architectures supported are `amd64` / `x86_64` and `arm64`.

## Ceph Prerequisites
To configure the Ceph storage cluster, at least one of these local storage types is required
- Raw devices (no partitions or formatted filesystems)
- Raw partitions (no formatted filesystem)
- LVM Logical Volumes (no formatted filesystem)
- Persistent Volumes available from a storage class in block mode

Confirm whether the partitions or devices are formatted with filesystems with the following command:

```bash
$ lsblk -f
NAME                  FSTYPE      LABEL UUID                                   MOUNTPOINT
vda
└─vda1                LVM2_member       >eSO50t-GkUV-YKTH-WsGq-hNJY-eKNf-3i07IB
├─ubuntu--vg-root   ext4              c2366f76-6e21-4f10-a8f3-6776212e2fe4   /
└─ubuntu--vg-swap_1 swap              9492a3dc-ad75-47cd-9596-678e8cf17ff9   [SWAP]
vdb
```

## Install Koor Storage Distribution Operator and Resources

=== "Installing using Helm Chart"

    #### 1. After deploying your Kubernetes cluster, install Koor Storage Distribution using [Koor Operator Helm chart](https://github.com/koor-tech/koor-operator/tree/feature/ksd-202#install-using-helm)
    ```bash
    $ helm repo add koor-release https://charts.koor.tech/release
    $ helm install --create-namespace koor-ceph koor-release/rook-ceph  # (optional) -f utils/operatorValues.yaml
    ```
    #### 2. You should be able to see a ready-to-use Koor Storage Cluster
    ```bash
    $ kubectl get -n koor-ceph pod
    NAME                                   READY   STATUS    RESTARTS   AGE
    rook-ceph-mgr-a-c5gff977d-656mt         1/1     Running   0          1m
    rook-ceph-mgr-a-7f6bf57db6-nlprb        1/1     Running   0          1m
    rook-ceph-mgr-b-85b77d9f8f-nd724        1/1     Running   0          1m
    rook-ceph-mgr-c-fc6888db9-mswkq         1/1     Running   0          1m
    rook-ceph-operator-6f4fdc4448           1/1     Running   0          2m
    rook-ceph-osd-0-6d8db96856-qw6ld        1/1     Running   0          1m
    rook-ceph-osd-1-5c76b5466-bncdt         1/1     Running   0          1m
    rook-ceph-osd-2-7fcf9745c5-t7vwf        1/1     Running   0          1m
    rook-ceph-tools-566fbd58cc-lfxqn        1/1     Running   0          1m
    ```
    #### 3. You can then test basic Ceph Block storage
    ```bash
    $ kubectl apply -f https://github.com/rook/rook/blob/master/deploy/examples/csi/rbd/storageclass.yaml
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

=== "Installing using CRDS"

    #### 1.- Install Koor Storage Distribution Operator and Resources
    
    ```bash
    $ git clone --single-branch --branch v1.11.0 https://github.com/koor-tech/koor.git
    $ cd koor/deploy/examples
    $ kubectl create -f crds.yaml -f common.yaml -f operator.yaml
    $ kubectl create -f cluster.yaml
    ```
    
    #### 2. Koor Operator takes care of configuring and deploying all cluster components
    
    ```bash
    $ kubectl get -n koor-ceph pod
    NAME                                   READY   STATUS    RESTARTS   AGE
    rook-ceph-mgr-a-c5gff977d-656mt         1/1     Running   0          1m
    rook-ceph-mgr-a-7f6bf57db6-nlprb        1/1     Running   0          1m
    rook-ceph-mgr-b-85b77d9f8f-nd724        1/1     Running   0          1m
    rook-ceph-mgr-c-fc6888db9-mswkq         1/1     Running   0          1m
    rook-ceph-operator-6f4fdc4448           1/1     Running   0          2m
    rook-ceph-osd-0-6d8db96856-qw6ld        1/1     Running   0          1m
    rook-ceph-osd-1-5c76b5466-bncdt         1/1     Running   0          1m
    rook-ceph-osd-2-7fcf9745c5-t7vwf        1/1     Running   0          1m
    rook-ceph-tools-566fbd58cc-lfxqn        1/1     Running   0          1m
    ```
    
    #### 3. Consume storage using Kubernetes Native APIs
    
    ```bash
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

That's it! :party_popper:, now you are using Koor Storage Distribution Operator.

Do you have issues running Koor Operator?, take a look [Koor Operator Troubleshooting](https://kb.koor.tech/knowledge/rook/issues/) 
or [Contact us](https://kb.koor.tech/support/help-desk/).