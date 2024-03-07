---
title: "Base Cluster Definition"
---

# Motivation

When you build your first Ceph cluster, the one that is meant to support production data, how do you know where to start? Perhaps that depends on your reasons for using Ceph.

Presumably, you are using Ceph because you want to be sure that the data you store will be readable whenever you need it. This is what we mean by resiliency. Ceph uses replication and erasure coding as strategies for detecting problems. Then it does that diligent work of scrubbing, checking and rechecking the bytes, and repairing small damage as it occurs.

We also need to consider availability for the applications that rely on the data being stored. Ceph runs across multiple nodes. Three nodes is considered the minimum, although for reliability, running four nodes is better. Should one node become unavailable, everything will still function as long as there is enough available disc space to replace the missing replicas.

Then there is the dimension of cost. Relatively speaking, Ceph is a low-cost solution because licensing is free and you can run on commodity hardware. Ideally we would start with a system that is sized for the expected amount of data, plus room for the overhead that Ceph needs to function. While it may be tempting to squeeze even more cost out of Ceph, starving Ceph for resources is counterproductive.

At the lowest end of scale, what is the right balance of resources and configuration to produce a production-ready system. That is the goal of what we are defining as a "Base Cluster."

# Base Cluster Specs

Ceph storage cluster

1. 4 nodes
2. 250 GB drive attached to each storage node ==> 750 GB storage
3. let's list an answer for every decision, even if it's "obvious"
4. object or block storage? pools? replication factor or erasure coding?

K8s cluster

1. Use Rook operator, Helm chart, etc.
