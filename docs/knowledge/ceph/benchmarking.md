---
title: "Benchmarking"
---

You want to benchmark the storage of your Ceph cluster(s)? This is a short list of tools to benchmark storage.

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
