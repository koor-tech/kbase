# Solutions for storage

Kubernetes storage solutions enable stateful storage integration with the open source container orchestrator. Containers and pods in Kubernetes are highly dynamic, constantly created and deleted. However, stateful storage cannot be tied to these ephemeral resources.

To address this, Kubernetes storage architecture utilizes volumes as a central abstraction. It allows containers to dynamically request storage resources through volume claims, both persistent and non-persistent. However, managing storage with this basic mechanism can be challenging.

Open source Kubernetes storage solutions like OpenEBS, Rook, GlusterFS, and LongHorn provide the necessary capabilities to effectively manage persistent storage for Kubernetes applications.
### Current Solutions for storage

Let's talk about each one

- **[OpenEBS](https://openebs.io/)**:
  OpenEBS turns any storage available to Kubernetes worker nodes into Local or Distributed Kubernetes Persistent Volumes. 
    
    OpenEBS helps Application and Platform teams easily deploy Kubernetes Stateful Workloads that require fast and highly durable, reliable and scalable Container Attached Storage. This solution is available as part of [CNCF sandbox project](https://www.cncf.io/sandbox-projects/).

  - **[Longhorn](https://longhorn.io/)**:
    is a lightweight, reliable, and powerful distributed block storage system for Kubernetes.
    
    Longhorn implements distributed block storage using containers and microservices. Longhorn creates a dedicated storage controller for each block device volume and synchronously replicates the volume across multiple replicas stored on multiple nodes. The storage controller and replicas are themselves orchestrated using Kubernetes. Longhorn is available as part of [CNCF Incubating project](https://www.cncf.io/projects/longhorn/).

  - **[Rook](https://rook.io/)**:
    Rook is an open source cloud-native storage orchestrator, providing the platform, framework, and support for Ceph storage to natively integrate with cloud-native environments.

    Ceph is a distributed storage system that provides file, block and object storage and is deployed in large scale production clusters
    Rook is hosted by the [Cloud Native Computing Foundation](https://cncf.io/) (CNCF) as a [graduated](https://www.cncf.io/announcements/2020/10/07/cloud-native-computing-foundation-announces-rook-graduation/) level project.


  - **[Gluster](https://www.gluster.org/)**:
    GlusterFS is a scalable network filesystem suitable for data-intensive tasks such as cloud storage and media streaming. GlusterFS is free and open source software and can utilize common off-the-shelf hardware.
    
    GlusterFS can be used as a Persistent Volume Claim (PVC) in Kubernetes.

  - **[Koor](https://about.koor.tech/)**:
    [KSD Koor Storage Distribution](ksd-koor-storage-distribution.md),
    based on [Rook](https://rook.io/), our own distribution, contains our expert team’s knowledge and experience
    from having worked years on many different storage systems and clusters.
    We are rooted in the open source communities
    which power our product to create the best storage experience for your applications on top of Kubernetes.
    
    Our foundation is built on two main pillars:

      - KSD Toolkit - [KSD Koor Storage Distribution](ksd-koor-storage-distribution.md)
        - Koor Operator
        - Automated Rook & Ceph upgrades
        - SSO integration
        - Future enhancements
        - Monthly releases

      - [Rook Ceph Experts](https://about.koor.tech/product/) 
        - System check-up & assessment
        - Performance tuning
        - Troubleshooting issues
        - Design review & recommendations
        - Disaster recovery

Koor has tools that improve the Rook-Ceph experience.
We put our expertise into the tools so that it is available to you.
Plus, our experts are ready for consultation when you need the human touch.

Let's talk deeper about [Ceph](introduction-to-ceph.md) in the next chapter in order to know why you are using Ceph, of course you can skip it and go over [KSD Koor Storage Distribution](ksd-koor-storage-distribution.md)