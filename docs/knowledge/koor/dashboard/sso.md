---
title: "Single Sign On (SSO)"
---

## Guide

!!! hint
    This is a paid Koor Storage Distribution feature.

This example assumes that your Ceph dashboard is currently exposed via a Kubernetes Ingress/ OpenShift Route on `https://ceph-dash.example.com` and that you are using Keycloak that is running at `https://keycloak.example.com/auth` (with a realm called `myrealm`).

This is an example of the SSO config for the Ceph dashboard:

```yaml
spec:
  dashboard:
    enabled: true
    # The new SSO section
    sso:
      enabled: true
      baseUrl: "https://ceph-dash.example.com"
      #entityID: "<idp_entity_id>" # optional
      idpMetadataUrl: "https://keycloak.example.com/auth/realms/myrealm/protocol/saml/descriptor"
      idpAttributes:
        username: "username"
      users:
        - username: your_username
          roles:
           - administrator
        # You can have more than one user entry
        #- username: second_username
        #  roles:
        #  - rgw-manager
```

!!! note
    You must list every user in the `users:` list before they can login to the Ceph dashboard due to how SSO is currently handled in the Ceph dashboard.

Each of the fields needs to be set as follows:

* `enabled` - Set to `true` to enable the dashboard SSO configuration.
* `baseURL` - The external address your dashboard is exposed on, e.g., if you have an Ingress exposing the dashboard on `https://ceph-dash.example.com` this would be the whole URL (without a last slash added).
* `entityID` - Optional. Use this when you have more than one entity ID in your IdP metadata.
* `idpMetadataUrl` - Your IdP's metadata file, e.g., on Keycloak this is located here: `https://keycloak.example.com/auth/realms/myrealm/protocol/saml/descriptor` (in Keycloak you can find it under the `Realm Settings` -> `General` tab -> `SAML 2.0 Identity Provider Metadata` link).
* `idpAttributes.username` - The SAML2 attribute name containing the user's username (optional, defaults to `uid`).
* `users` - List of users to create and which system roles to give them. You can also specify your custom roles, but you need to have made them already.
    * You can find a list of dashboard system roles [here](https://docs.ceph.com/en/quincy/mgr/dashboard/#user-roles-and-permissions).
    * `username` - Name of the user to be created.
    * `roles` - A list of roles to assign to that user.

After adding this to your `CephCluster` object, wait a minute or two for the operator to complete a reconciliation loop.
Now you should be auto-redirected to your IdP when accessing the Ceph dashboard.

## SSO Provider Details

The SSO feature has currently only been tested with Keycloak, but others should work as well.

### Keycloak

!!! info
    Tested with Keycloak version `19.0.2` and higher.

The Keycloak SAML2 client details are as follows:

* Protocol: `SAML2`
* Client ID: `https://ceph-dash.example.com/auth/saml2/metadata`
* Name: E.g., `Ceph Dashboard`
* `Settings` tab
    * Root URL: `https://ceph-dash.example.com` (without a slash at the end)
    * Valid redirect URIs: `/*`
    * Force POST binding: On.
    * Sign documents: On.
    * Front channel logout: On.
* `Keys` tab
    * `Signing keys config` -> `Client signature required`: Off.
* `Client Scopes` tab
    * Remove the default `role_list` scope.
    * Click on the `Dedicated scope and mappers for this client` and add a new `AttributeStatement Mapper` called, e.g., `username`.
        * Property: `username`
        * Friendly name: E.g., `Username`.
        * SAML Attribute name: `username`
            * This needs to be set for the `idpAttributes.username` field in SSO spec of the CephCluster object.
* `Advanced` tab
    * Assertion Consumer Service POST Binding URL: `https://ceph-dash.example.com/#dashboard`
    * Assertion Consumer Service Redirect Binding URL: `https://ceph-dash.example.com/#dashboard`
    * Logout Service POST Binding URL: `https://ceph-dash.example.com/`

!!! hint
If you are new to Keycloak, [here's a "How to create a SAML client in Keycloak" guide](https://www.keycloak.org/docs/latest/server_admin/#_client-saml-configuration).