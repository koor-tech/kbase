---
title: "Benefits"
---

## Storage wherever Kubernetes can run

Wheter you are on bare metal, using Rancher, OpenShift or other Kubernetes-based platformns, you can run Koor Storage Distribution on it. For do-it-yourself enthusiasts, if you have Rook already running, you are ready for Koor Storage Distribution.

Being able to run it "anywhere" enables you to easily test your whole environment easily.

## One API for your Storage across Platforms

You just use the Kubernetes API to create, edit and manage your storage cluster as needed.

Monitoring metrics are exposed via standard Prometheus endpoints to integrate into your existing Prometheus stack.
Additionally Koor Storage Distribution can deploy alerting rules of Ceph automatically for your cluster.

## Stable Storage for Containers and Virtual Machines

Built upon the rock solid [Ceph storage project](https://ceph.io/) which has been around since 2012.
Used by many OpenStack installations to power many on-premise clouds to run virtual machines and many other workloads.

Ceph is ready for Kubernetes thanks to the Rook, the base to the Koor Storage Distribution, and Ceph CSI projects.

## On-Premise Block, Filesystem or Object Storage for your Kubernetes Platform

With Koor Storage Distribution, we make it painless to run it. Just put Kubernetes on your servers and install Koor Storage Distribution.

Easily enable the storage types that you need. Need just one, two or all three? No problem!

* Block storage - Rados Block Devices (RBD), optiomal performance for applications that should be run on a typical filesystem (ext4, XFS).
* Filesystem storage - CephFS, faster than NFS in most scenarios with file locking and more built-in.
* Object storage - Rados Gateway (RGW), exposes an S3-compatible API for simple plugability to replace other S3-based storage.
