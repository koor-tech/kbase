# Containers and Persistent Storage

## Nature of Containers:

Containers are lightweight, isolated environments that package applications and their dependencies, allowing them to run consistently across different computing environments. They provide portability, scalability, and efficient resource utilization. However, containers are inherently transient, which means that any data stored within a container is lost when the container terminates.

Each time a container is stopped or restarted, it starts with a clean state, eliminating any changes or data that were present in the previous instance. While this ephemeral nature is beneficial for stateless applications, it poses challenges for applications that require persistent storage.

## Persistent Storage for Data:

Many applications, such as databases, content management systems, and file servers, rely on persistent storage to maintain important data.
Persistent storage ensures that data remains intact and accessible even when containers are restarted, rescheduled, or scaled.

Persistent storage allows applications to:

- Store critical data that should persist beyond the lifecycle of individual containers.
- Share data between multiple containers or pods running within the same or different nodes.
- Facilitate data replication and synchronization for high availability and fault tolerance.
- Perform backups, data migration, and disaster recovery operations.

Without persistent storage, applications would lose important data and face challenges in maintaining consistency and reliability.

Kubernetes offers the concepts of PersistentVolumeClaim (PVC) and PersistentVolume (PV) to fulfill this requirement.
Whether you're running Kubernetes on bare metal or in the cloud, you can leverage various storage options for PVs.
For example, on bare metal, you can utilize local storage devices such as hard drives or solid-state drives (SSDs) directly as PVs.
This enables your Kubernetes applications to have access to durable and scalable storage directly on the underlying hardware without relying on a cloud-specific storage service like AWS Elastic Block Store (EBS).

### Using PVC and PV on Kubernetes

- Create a PersistentVolume: Define a PersistentVolume (PV) manifest `pv.yaml` that describes the storage volume you want to make available to your applications. Here's an example PV manifest using a local storage volume:

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: my-pv
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /path/to/storage
```

- Create PV resource

```console
$ kubectl apply -f pv.yaml
```

- Create a PersistentVolumeClaim: Define a PersistentVolumeClaim (PVC) manifest `pvc.yaml` that requests storage resources from the available PVs. Here's an example PVC manifest:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
```

- Create PVC resource

```console
$ kubectl apply -f pvc.yaml
```

- And finally use this on your pods

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
    - name: my-container
      image: nginx
      volumeMounts:
        - name: my-volume
          mountPath: /data
  volumes:
    - name: my-volume
      persistentVolumeClaim:
        claimName: my-pvc
```

## Challenges of Managing Storage in Containerized Environments:

Managing storage in containerized environments introduces complexities due to the dynamic and distributed nature of container orchestration
platforms like Kubernetes.

- Data Persistence: Ensuring that data remains persistent and accessible across container restarts, scaling events, and node failures.
- Storage Provisioning: Provisioning of storage resources to containers and pods, considering capacity, performance, and availability.
- Data Replication and Synchronization: Implementing mechanisms to replicate and synchronize data across multiple instances or nodes for high availability and fault tolerance.
- Dynamic Volume Provisioning: Dynamically provisioning and attaching storage volumes to containers as per demand, without manual intervention.
- Data Backup and Recovery: Implementing backup and recovery strategies to protect critical data and enable disaster recovery when needed.

Those solutions could be a bit hard to implement or manage overall when you are dealing with a lot of data I mean Terabytes of data, fortunately we have a lots of options to deal with it. Let's see them on detail in the next section [Storage Solutions](solutions-for-storage.md).
