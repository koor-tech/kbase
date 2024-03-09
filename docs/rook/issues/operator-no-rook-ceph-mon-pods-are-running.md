---
title: "No `rook-ceph-mon-*` Pods are running"
---

1. First of all make sure your Kubernetes CNI is working fine! In what feels like 90% of the cases it is network related, e.g., some weird thing with the Kubernetes cluster CNI or other network environment issue.
    * Can you talk to Cluster Service IPs from every node?
    * Can you talk to Pod IPs from every node? Even to Pods not on the same node you are testing from?
    * Check the docs of your CNI, most have a troubleshooting section, e.g., Cilium had some issues from systemd version 245 onwards with `rp_filter`, see here: [rp_filter (default) strict mode breaks certain load balancing cases in kube-proxy-free mode · Issue #13130 · cilium/cilium](https://github.com/cilium/cilium/issues/13130)
2. Does your environment fit all the prerequisites? Check top of page for the links to some of the prerequisites and / or consult the [Rook.io docs](https://rook.io/).
3. Check the `rook-ceph-operator` Logs for any warnings, errors, etc.
