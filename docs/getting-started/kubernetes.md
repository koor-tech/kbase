# Introduction to Kubernetes

Kubernetes, often referred to as K8s (since there are eight letters between "K" and "s" in "Kubernetes"), is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. It provides a robust framework for running distributed systems and microservices across clusters of machines.

#### Kubernetes concepts

Kubernetes operates based on a set of fundamental concepts:

- Pods
    - The basic building blocks of Kubernetes, pods are the smallest deployable units that encapsulate one or more containers. Containers within a pod share the same network namespace and can communicate with each other via localhost.
- Services
    - Services enable network connectivity to a set of pods. They provide a stable IP address and DNS name to abstract away the dynamic nature of pods. Services allow other pods or external users to access the application running within a set of pods.
- ReplicaSets
    - ReplicaSets ensure that a specified number of pod replicas are running at all times. They define the desired state of pods and automatically manage the creation, scaling, and deletion of replicas to maintain that desired state.
- Deployments
    - Deployments provide a declarative way to manage the lifecycle of pods and ReplicaSets. They allow you to define the desired state of your application and handle updates and rollbacks seamlessly.

<figure markdown>
  ![Kubernetes](images/components-of-kubernetes.svg){ width="700" }
  <figcaption>Kubernetes</figcaption>
</figure>


#### Persistent storage in Kubernetes

Containers are inherently transient and stateless, meaning that any data stored within a container will be lost once the container is terminated. However, many applications require persistent storage to store and retrieve data across container restarts, scaling events, or failures. This is especially crucial for databases, file systems, and other stateful applications.

Persistent storage in Kubernetes enables data to persist beyond the lifecycle of individual containers or pods. It allows applications to store and retrieve data even when containers are restarted, rescheduled, or migrated to different nodes within the cluster.

Managing persistent storage in Kubernetes involves integrating external storage systems that provide durability, scalability, and other advanced features required by modern applications. One such powerful storage system is Ceph.

In the next section, we will delve into [Containers and Persistent Storage](containers-and-persistent-storage.md) and what are the problems with storage and the solutions provided by Kubernetes by itself. 