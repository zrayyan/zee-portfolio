---
title: "Installing vCloud Network and Security – vShield Manager 5.1, vSheild App, vShield Endpoint and VMWare Edge with VXLAN"
date: "2020-02-13T04:26:45+00:00"
---



                
                                    
<figure class="wp-block-embed-youtube wp-block-embed is-type-video is-provider-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper">
<iframe title="Installing vShield Manager 5.1, vSheild App, vShield Endpoint and VMWare Edge with VXLAN" width="500" height="281" src="https://www.youtube.com/embed/bIsqsaEV354?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen=""></iframe>
</div></figure>



<p></p>



<h3 class="wp-block-heading">Installing vShield Manager</h3>



<p>vCloud Networking and Security provides firewall protection, traffic analysis, and network perimeter services to protect your vCenter Server virtual infrastructure. vCloud Networking and Security virtual appliance installation has been automated for most virtual datacenters.</p>



<p>The vShield Manager is the centralized management component of vShield. You use the vShield Manager to monitor and push configurations to vShield App, vShield Endpoint, and vShield Edge instances. vShield Manager runs as a virtual appliance on an ESXi host. &nbsp;Installing the vShield Manager is a multistep process. You must perform all of the tasks that follow in sequence to complete vShield Manager installation successfully.</p>



<p>Note: To enhance your network security posture, you can obtain licenses for vShield App, vShield Endpoint, and vShield Edge.</p>



<p>Obtain the vShield Manager OVA File – The vShield Manager virtual machine is packaged as an Open Virtualization Appliance (OVA) file, which allows you to use the vSphere Client to import the vShield Manager into the datastore and virtual machine inventory. Install the vShield Manager Virtual Appliance.</p>



<p>Configure the Network Settings of the vShield Manager – You must use the command line interface (CLI) of the vShield Manager to configure an IP address, identify the default gateway, and set DNS settings. You can specify up to two DNS servers that the vShield Manager can use for IP address and host name resolution. DNS is required if any ESX host in your vCenter Server environment was added by using the hostname (instead of IP address).</p>



<p>Log In to the vShield Manager User Interface – After you have installed and configured the vShield Manager virtual machine, log in to the vShield Manager user interface and accept the SSL certificate.</p>



<p>Set up vShield Manager – Specify the vCenter Server, DNS and NTP server, and Lookup server details.</p>



<p>Note: The vShield Manager virtual machine does not appear as a resource in the inventory panel of the vShield Manager user interface. The Settings &amp; Reports object represents the vShield Manager virtual machine in the inventory panel.</p>



<p><strong>Prerequisites:</strong></p>



<p>You must have a vCenter Server user account with administrative access to synchronize vShield Manager with the vCenter Server . If your vCenter password has non-Ascii characters, you must change it before synchronizing the vShield Manager with the vCenter Server.</p>



<p>To use SSO on vShield Manager, you must have vCenter Server 5.1 or above and single sign on service must be installed on the vCenter Server.</p>



<p>Change the Password of the vShield Manager User Interface Default Account – You can change the password of the admin account to harden access to your vShield Manager by logging to the vShield Manager user interface and clicking Change Password on the top right corner of the window.</p>



<p>Schedule a Backup of vShield Manager Data – You can only schedule the parameters for one type of backup at any given time. You cannot schedule a configuration-only backup and a complete data backup to run simultaneously. You can configure the backup schedule from the Configuration tab.</p>



<p><strong>Installing vShield Components</strong></p>



<p>There are several components that make up vCloud Networking and Security. Each product contains it’s own set of functions and are an essential makeup to vCloud Networking and Security. They are described below:</p>



<p>vShield App is a hypervisor-based firewall that protects applications in the virtual datacenter from network based attacks. Organizations gain visibility and control over network communications between virtual machines. You can create access control policies based on logical constructs such as vCenter Server containers and vShield security groups, not just physical constructs such as IP addresses. In addition, flexible IP addressing offers the ability to use the same IP address in multiple tenant zones to simplify provisioning.</p>



<p>vShield Edge provides network edge security and gateway services to isolate a virtualized network, or virtual machines in a port group, vDS port group, or Cisco Nexus 1000V port group. You install a vShield Edge at a datacenter level and can add up to ten internal or uplink interfaces. The vShield Edge connects isolated, stub networks to shared (uplink) networks by providing common gateway services such as DHCP, VPN, NAT, and Load Balancing. Common deployments of vShield Edge include in the DMZ, VPN Extranets, and multi-tenant Cloud environments where the vShield Edge provides perimeter security for Virtual Datacenters (VDCs).</p>



<p>vShield Endpoint offloads antivirus and anti-malware agent processing to a dedicated secure virtual appliance delivered by VMware partners. Since the secure virtual appliance (unlike a guest virtual machine) doesn’t go offline, it can continuously update antivirus signatures thereby giving uninterrupted protection to the virtual machines on the host. Also, new virtual machines (or existing virtual machines that went offline) are immediately protected with the most current antivirus signatures when they come online.</p>



<p>vShield Data Security provides visibility into sensitive data stored within your organization’s virtualized and cloud environments. Based on the violations reported by vShield Data Security, you can ensure that sensitive data is adequately protected and assess compliance with regulations around the world.</p>



<p>Link to VMWare Website for this&nbsp;<a rel="noreferrer noopener" href="http://kb.vmware.com/kb/2034173" target="_blank">article</a>.</p>
                
                
            