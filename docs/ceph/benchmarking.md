---
title: "Benchmarking"
---

The first point is to evaluate the hardware of interest, we evaluate the following three parameters:

* raw disk performance
* network performance
* CPU and memory utilization

**RAW DISK PERFORMANCE**

fio (Flexible I/O Tester) is a versatile I/O benchmark tool that can be used to
simulate various I/O workloads on storage systems. When testing raw disks with
fio, you typically bypass the filesystem and directly access the block device.
Here's a basic example of using fio to test a raw disk:

```
fio --name=mytest --ioengine=sync --rw=randwrite --bs=4k --size=1G --numjobs=16 --time_based --runtime=30s
```

Let's break down the options used in this example:
<dl>
  <dt>--name=mytest</dt>
  <dd>A user-defined name for the job.</dd>
  <dt>--ioengine=sync</dt>
  <dd>Specifies the I/O engine...</dd>
  <dt>--rw=randwrite</dt>
  <dd>Specifies random write access pattern.</dd>
  <dt>--bs=4k</dt>
  <dd>Block size for I/O operations. In this case, it's set to 4KB.</dd>
  <dt>--size=1G</dt>
  <dd>Total size of the test file.</dd>
  <dt>--numjobs=16</dt>
  <dd>Number of threads or jobs performing I/O operations simultaneously. </dd>
  <dt>--time_based</dt>
  <dd>Use time-based instead of size-based test termination. </dd>
  <dt>--runtime=30s</dt>
  <dd>Specifies the duration of the test in seconds.</dd>
</dl>

Remember that the actual parameters you use will depend on your specific
testing goals and the characteristics of the storage system you're evaluating.
You may want to adjust parameters like block size, read/write ratios, and
access patterns based on your use case.

**NETWORK PERFORMANCE**

It is recommended to have atleast 10GBits/sec network for Ceph to be performant
in enterprise setup. We can use simple ping to verify connection between nodes.
Besides this,  iperf3 can be used to check connectivity as well as network
bandwidth between the nodes.

In kubernetes environment, we make use of ancient tool which uses iperf in
background to estimate network bandwidth between kubernetes nodes.
 
https://github.com/galexrt/ancientt 

**MINIMUM CPU AND MEMORY REQUIREMENTS FOR ROOK CEPH CLUSTER**

Checkout minimum hardware requirement for Ceph here 
https://docs.ceph.com/en/quincy/start/hardware-recommendations/#minimum-hardware-recommendations

**CEPH CLUSTER PERFORMANCE**

**Rook Ceph Cluster Performance**

Checkout the prerequisites for deploying a Rook Ceph cluster: https://rook.io/docs/rook/v1.12/Getting-Started/Prerequisites/prerequisites/ 
 
suggestion to use CBT tool by Mark Nelson : https://github.com/ceph/cbt 

**FIO for ceph rbd**

if you are using rook-ceph-block, first create a rook-ceph-block claim:

```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: rbd-pvc
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 4Gi
  storageClassName: ceph-block
```

consume the pvc to create a new rbd volume, for eg:

```
apiVersion: v1
kind: Pod
metadata:
  name: csirbd-demo-pod
spec:
  containers:
  - name: csirbd-demo-pod
    image: testsuite/fio:latest
    name: fio
    # Just spin & wait forever
    args:
      - sleep
      - "1000000"
  volumes:
    - name: mypvc
      persistentVolumeClaim:
        claimName: rbd-pvc
        readOnly: false
```

then deploy direct mount pod, from which we will mount our rbd volume:

```
kubectl create -f deploy/examples/direct-mount.yaml

#exec into direct mount pod
kubectl exec -it -n koor-ceph deployment.apps/rook-direct-mount -- bash

# install fio
dnf install fio

 get the name of rbd pool and image name using describe command on pv

➜  examples git:(release-1.12) ✗ kubectl get pv
NAME                                       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM             STORAGECLASS   REASON   AGE
pvc-0124edc2-6c4b-4b12-b90d-00b1e4f9d96c   1Gi        RWO            Delete           Bound    default/rbd-pvc   ceph-block              3h11m
➜  examples git:(release-1.12) ✗ kubectl describe pv pvc-0124edc2-6c4b-4b12-b90d-00b1e4f9d96c
Name:            pvc-0124edc2-6c4b-4b12-b90d-00b1e4f9d96c
Labels:          <none>
Annotations:     pv.kubernetes.io/provisioned-by: koor-ceph.rbd.csi.ceph.com
                 volume.kubernetes.io/provisioner-deletion-secret-name: rook-csi-rbd-provisioner
                 volume.kubernetes.io/provisioner-deletion-secret-namespace: koor-ceph
Finalizers:      [kubernetes.io/pv-protection]
StorageClass:    ceph-block
Status:          Bound
Claim:           default/rbd-pvc
Reclaim Policy:  Delete
Access Modes:    RWO
VolumeMode:      Filesystem
Capacity:        1Gi
Node Affinity:   <none>
Message:
Source:
    Type:              CSI (a Container Storage Interface (CSI) volume source)
    Driver:            koor-ceph.rbd.csi.ceph.com
    FSType:            ext4
    VolumeHandle:      0001-0009-koor-ceph-0000000000000002-95c5c941-f1c2-4f46-824e-c78df2d0b5a9
    ReadOnly:          false
    VolumeAttributes:      clusterID=koor-ceph
                           imageFeatures=layering
                           imageFormat=2
                           imageName=csi-vol-95c5c941-f1c2-4f46-824e-c78df2d0b5a9
                           journalPool=ceph-blockpool
                           pool=ceph-blockpool
                           storage.kubernetes.io/csiProvisionerIdentity=1695737390857-5583-koor-ceph.rbd.csi.ceph.com
```


run common fio tests some of them are mentioned below using the pool and image name from above:

```
fio --name=test-1 --ioengine=rbd --pool=rbd --rbdname=test-image --numjobs=4 --rw=read --bs=4k --iodepth=32 --fsync=32 --runtime=300 --time_based --group_reporting
fio --name=test-1 --ioengine=rbd --pool=rbd --rbdname=test-image --numjobs=16 --rw=read --bs=4k --iodepth=32 --fsync=32 --runtime=300 --time_based --group_reporting
fio --name=test-1 --ioengine=rbd --pool=rbd --rbdname=test-image --numjobs=4 --rw=read --bs=4k --iodepth=16 --fsync=16 --runtime=300 --time_based --group_reporting
fio --name=test-1 --ioengine=rbd --pool=rbd --rbdname=test-image --numjobs=16 --rw=read --bs=4k --iodepth=16 --fsync=16 --runtime=300 --time_based --group_reporting
fio --name=test-1 --ioengine=rbd --pool=rbd --rbdname=test-image --numjobs=4 --rw=write --bs=4k --iodepth=32 --fsync=32 --runtime=300 --time_based --group_reporting
fio --name=test-1 --ioengine=rbd --pool=rbd --rbdname=test-image --numjobs=16 --rw=write --bs=4k --iodepth=32 --fsync=32 --runtime=300 --time_based --group_reporting
fio --name=test-1 --ioengine=rbd --pool=rbd --rbdname=test-image --numjobs=4 --rw=write --bs=4k --iodepth=16 --fsync=16 --runtime=300 --time_based --group_reporting
fio --name=test-1 --ioengine=rbd --pool=rbd --rbdname=test-image --numjobs=16 --rw=write --bs=4k --iodepth=16 --fsync=16 --runtime=300 --time_based --group_reporting
```

unmount the rbd volume when done

```
umount /tmp/rook-volume
rbd unmap /dev/rbd0
```

**rados and rbd bench**

you can use rbdbencher.sh script to do rados and rbd bench tests checkout the tool here: https://github.com/koor-tech/rbdbencher 

**cosbench for object store performance**

For rgw performance testing one can make use of cosbench:
https://github.com/ceph/cbt/blob/master/docs/cosbench.README 

**Recommended tools**:

* General Benchmarking Testing of Storage (e.g., plain disks, and other storage software)
    * [`fio`](https://fio.readthedocs.io/en/latest/fio_doc.html)
        * References
            * https://github.com/axboe/fio/tree/master/examples
            * https://docs.oracle.com/en-us/iaas/Content/Block/References/samplefiocommandslinux.htm
* Ceph specific Benchmarking:
    * [`rbd bench` command](https://docs.ceph.com/en/latest/man/8/rbd/)
        * References:
            * https://tracker.ceph.com/projects/ceph/wiki/Benchmark_Ceph_Cluster_Performance
            * https://edenmal.moe/post/2017/Ceph-rbd-bench-Commands/


