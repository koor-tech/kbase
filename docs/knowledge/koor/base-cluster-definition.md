---
title: "Base Cluster Definition"
---

# Motivation

When you build your first Ceph cluster, the one that is meant to support production data, how do you know where to start? Perhaps that depends on your reasons for using Ceph.

Presumably, you are using Ceph because you want to be sure that the data you store will be readable whenever you need it. This is what we mean by resiliency. Ceph uses replication and erasure coding as strategies for detecting problems. Then it does that diligent work of scrubbing, checking and rechecking the bytes, and repairing small damage as it occurs.

We also need to consider availability for the applications that rely on the data being stored. Ceph runs across multiple nodes. Three nodes is considered the minimum, although for reliability, running four nodes is better. Should one node become unavailable, everything will still function as long as there is enough available disc space to replace the missing replicas.

Then there is the dimension of cost. Relatively speaking, Ceph is a low-cost solution because licensing is free and you can run on commodity hardware. Ideally we would start with a system that is sized for the expected amount of data, plus room for the overhead that Ceph needs to function. While it may be tempting to squeeze even more cost out of Ceph, starving Ceph for resources is counterproductive.

At the lowest end of scale, what is the right balance of resources and configuration to produce a production-ready system? Having an opinion about that line is the point defining a "Base" cluster.

# Base Cluster Specs

The following is a breakdown of dimensions with an explanation of the basis for our opinion. Additional considerations are listed as well.

## Ceph storage

**4 nodes**

Every production cluster needs at least four nodes to ensure proper operation in the event that something happens to one of the nodes. If one node goes out, Ceph will go about rebuilding the lost copies of data and placing them on the remaining three nodes.

-   Problems are bound to happen. A server could fail. The disc drive could fail. A rack might go out. It might reboot or lose network access.
-   While Ceph _can_ operate on 3 nodes, you are more likely to experience down time when a problem occurs.

The type and placement of hardware matters. For the purposes of our Starter Clusters, we provision low-cost VMs in the cloud. A Starter Cluster is designed to be light-weight and transient. They are quick to spin up and easy to remove when no longer needed.

-   For real production use, switching to dedicated hardware makes more sense.
-   Ideally, servers would be spread out physically, across different rack, in different data centers, across geograhies. While those measures are great for resiliency and availability, they go well beyond a base minimum.

**1TB raw disc space**

We provision 4 servers, each with a 250GB drive, for a total of 1TB of raw storage. That's enough to get started with any kind of use case.

-   A four-node cluster can support 60TB of usable storage, which implies 180TB of raw storage when using 3x replication.

**Pools for each type of storage**

Our base cluster is configured with three pools, one for each type of data storage: object, block, and file. That makes it easy to try them all.

-   This is easy to change if only one or two types is needed.

**Replication**

Our base cluster is configured to use 3x replication. That means three copies of the data gets storage in the cluster, for an overhead cost of 200%.

-   Another way to do this is with erasure coding. Although you can save on disc space, it's a little more complicated and places a heavier burden on the CPUs. Totally feasible, just not the base.

## Kubernetes environment

We are still fine-tuning our recommendations for a base Kubernetes (K8s) environment. This adds non-storage nodes that support the activity of K8s processes and for applications. Plus, we will want to use Rook to provide access to the Ceph cluster.

Stay tuned...

# Considerations for Growth

The base cluster is a starting point. Once you have a clear idea of what you need to do with your storage, you will need to make adjustments to one or more dimensions of the storage cluster. Koor can craft an expansion plan to match your needs.

-   Scale capacity
    -   More disc space
-   Scale processing power
    -   More servers, more RAM, faster processors
-   Multi-region
    -   Replication across geographies
-   User segmentation
    -   Implementing access controls for groups of users, quotas
