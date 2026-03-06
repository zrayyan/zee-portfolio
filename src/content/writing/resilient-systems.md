---
title: "OpenStack Havana Installation on CentOS/RHEL"
date: "2024-02-15"
excerpt: "Complete guide for installing and configuring OpenStack Havana cloud platform on CentOS/RHEL systems with multi-node architecture."
---

# OpenStack Havana Installation on CentOS/RHEL

OpenStack Havana represents a significant milestone in open-source cloud computing. This comprehensive guide covers the installation and configuration of OpenStack Havana on CentOS/RHEL systems.

## System Requirements

### Hardware Requirements
- **Controller Node**: 2 CPU cores, 4GB RAM, 20GB storage
- **Compute Nodes**: 2 CPU cores, 4GB RAM, 20GB storage (per node)
- **Network Node**: 1 CPU core, 2GB RAM, 20GB storage

### Software Prerequisites
- CentOS 6.4 or RHEL 6.4
- Network connectivity between all nodes
- NTP synchronization
- SELinux disabled or properly configured

## Architecture Overview

### Multi-Node Setup
```
Controller Node: nova-api, nova-scheduler, nova-conductor, glance, keystone, horizon
Network Node: neutron-server, neutron-dhcp-agent, neutron-l3-agent, neutron-metadata-agent
Compute Nodes: nova-compute, neutron-openvswitch-agent
```

## Installation Steps

### 1. Environment Preparation

```bash
# Disable SELinux
setenforce 0
sed -i 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config

# Configure NTP
yum install -y ntp
service ntpd start
chkconfig ntpd on
```

### 2. MySQL Database Setup

```bash
yum install -y mysql mysql-server
service mysqld start
chkconfig mysqld on

# Secure MySQL installation
mysql_secure_installation
```

### 3. Keystone Identity Service

```bash
# Install Keystone
yum install -y openstack-keystone python-keystoneclient

# Configure Keystone
openstack-config --set /etc/keystone/keystone.conf DEFAULT admin_token ADMIN_TOKEN
openstack-config --set /etc/keystone/keystone.conf database connection mysql://keystone:KEYSTONE_DBPASS@controller/keystone
```

### 4. Glance Image Service

```bash
# Install Glance
yum install -y openstack-glance python-glanceclient

# Configure Glance API
openstack-config --set /etc/glance/glance-api.conf database connection mysql://glance:GLANCE_DBPASS@controller/glance
openstack-config --set /etc/glance/glance-api.conf keystone_authtoken auth_uri http://controller:5000/v2.0
```

### 5. Nova Compute Service

```bash
# Install Nova components
yum install -y openstack-nova-api openstack-nova-cert openstack-nova-conductor openstack-nova-consoleauth openstack-nova-novncproxy openstack-nova-scheduler python-novaclient

# Configure Nova
openstack-config --set /etc/nova/nova.conf database connection mysql://nova:NOVA_DBPASS@controller/nova
openstack-config --set /etc/nova/nova.conf keystone_authtoken auth_uri http://controller:5000/v2.0
```

### 6. Neutron Networking

```bash
# Install Neutron server
yum install -y openstack-neutron openstack-neutron-ml2 python-neutronclient

# Configure Neutron
openstack-config --set /etc/neutron/neutron.conf database connection mysql://neutron:NEUTRON_DBPASS@controller/neutron
openstack-config --set /etc/neutron/neutron.conf keystone_authtoken auth_uri http://controller:5000/v2.0
```

## Network Configuration

### Provider Network Setup

```bash
# Create external network
neutron net-create ext-net --router:external True --provider:physical_network external --provider:network_type flat

# Create subnet
neutron subnet-create ext-net --name ext-subnet --allocation-pool start=START_IP,end=END_IP --disable-dhcp --gateway EXTERNAL_GATEWAY EXTERNAL_CIDR
```

## Horizon Dashboard

```bash
# Install Horizon
yum install -y openstack-dashboard httpd mod_wsgi memcached python-memcached

# Configure Apache
sed -i "s/ALLOWED_HOSTS = \['horizon.example.com'\]/ALLOWED_HOSTS = ['*']/g" /etc/openstack-dashboard/local_settings
```

## Verification

### Launch an Instance

```bash
# Create tenant network
neutron net-create demo-net
neutron subnet-create demo-net --name demo-subnet --gateway 10.0.0.1 10.0.0.0/24

# Launch instance
nova boot --flavor m1.tiny --image cirros-0.3.4-x86_64 --nic net-id=$(neutron net-list | awk '/ demo-net / {print $2}') --security-group default --key-name mykey demo-instance
```

## Troubleshooting

### Common Issues

1. **Service Startup Failures**: Check log files in `/var/log/`
2. **Database Connection Issues**: Verify MySQL credentials
3. **Network Connectivity**: Ensure proper firewall rules
4. **NTP Synchronization**: Check time synchronization between nodes

### Log Analysis

```bash
# Check service status
service openstack-keystone status
service openstack-glance-api status
service openstack-nova-api status

# View logs
tail -f /var/log/keystone/keystone.log
tail -f /var/log/nova/nova-api.log
```

## Security Considerations

- Configure proper firewall rules
- Use secure passwords for service accounts
- Implement proper access controls
- Regular security updates
- Monitor system logs

## Conclusion

OpenStack Havana provides a robust foundation for cloud infrastructure. Following this installation guide ensures a stable and functional OpenStack environment suitable for development and production workloads.

The multi-node architecture provides high availability and scalability, making it suitable for enterprise deployments.