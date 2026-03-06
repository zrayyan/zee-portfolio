---
title: "OpenStack Havana Installation on CentOS 6.4/RHEL 6.4 – 2 Nodes"
date: "2020-02-06T21:01:33+00:00"
excerpt: "In this guide, we are going to create OpenStack cloud based on two nodes. One node will host most of OpenStack services and the ‘nova’ node will be used for computing and running our test virtual machines."
---



                
                                    
<p>In this guide, we are going to create OpenStack cloud based on two nodes. One node will host most of OpenStack services and the ‘nova’ node will be used for computing and running our test virtual machines.</p>



<p>Node names:</p>



<p>cloud-stack.linxsol.com&nbsp; eth0 192.168.170.60/24 eth1 dhcp</p>



<p>service-stack.linxsol.com eth0 192.168.170.61/24 eth1 172.16.0.21/24</p>



<hr class="wp-block-separator">



<p>Use of NetworkManager is not encourged as per official documentation of OpenStack.</p>



<p>service NetworkManager stop</p>



<p>service network start</p>



<p>chkconfig NetworkManager off</p>



<p>chkconfig network on</p>



<p>Lets configure /etc/hosts for name resulation (on both hosts). Your final /etc/hosts should look like the one below:</p>



<p>vi /etc/hosts</p>



<p>127.0.0.1 &nbsp; localhost localhost.localdomain localhost4 localhost4.localdomain4</p>



<p>::1 &nbsp; &nbsp; &nbsp; &nbsp; localhost localhost.localdomain localhost6 localhost6.localdomain6</p>



<p>192.168.170.60 cloud-stack cloud-stack.linxsol.com</p>



<p>192.168.170.61 service-stack&nbsp; service-stack.linxsol.com</p>



<p>###########################################################</p>



<p>Configuring MySQL Database</p>



<p>OpenStack requires a database to store all information, metadata and authentication details. Various database servers are supported but we will be using MySQL. We will install it on service-stack.linxsol.com :</p>



<p>yum install mysql mysql-server MySQL-python</p>



<p>Configure mysql to bind on internal IP address of service-stack 192.168.170.61:</p>



<p>vi /etc/my.cnf</p>



<p>bind-address = 192.168.170.61</p>



<p>service mysqld start</p>



<p>chkconfig mysqld on</p>



<p>Now run the following command on service-stack to setup the root password and answer ‘yes’ to all of the questions when prompted:</p>



<p>mysql_secure_installation</p>



<p>On Other Nodes:</p>



<p>We will install MySQL client on all the additional nodes with MySQL Python library. On cloud-stack.linxsol.com run the following command:</p>



<p>yum install mysql MySQL-python</p>



<p>###########################################</p>



<p>Configuring Network Time Protocol (NTP)</p>



<p>Install ntp on service-stack linxsol.com:</p>



<p>yum install ntp</p>



<p>service ntpd start</p>



<p>chkconfig ntpd on</p>



<p>Ideally all the additonal nodes should be syncorized with ntp server on service-stack. You can configure a cron job by creating an executeable file as fellows and add the following lines:</p>



<p>vi /etc/cron.daily/ntpdate</p>



<p>ntpdate service-stack.linxsol.com</p>



<p>hwclock -w</p>



<p>chmod a+x /etc/cron.daily/ntpdate</p>



<p>###################################################</p>



<p>Installing Additional Repositories for OpenStack</p>



<p>This setup should be configured on both nodes. We will install RDO repostiry and EPEL in order to obtain OpenStack packages.</p>



<p>yum install http://repos.fedorapeople.org/repos/openstack/openstack-havana/rdo-release-havana-6.noarch.rpm</p>



<p>yum install http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm</p>



<p>Now we will install OpenStack utility package which provides different utility program to make installation and configuration much easier:</p>



<p>yum install openstack-utils</p>



<p>######################################################</p>



<p>Now install Qpid on serveice-stack, Qpid is just another messaging queue server:</p>



<p>yum install qpid-cpp-server memcached</p>



<p>Edit /etc/qpidd.conf to dis able Qpid authentication:</p>



<p>vi /etc/qpidd.conf</p>



<p>auth = no</p>



<p>service qpidd start</p>



<p>chkconfig qpidd on</p>



<p>Install the identity service with its dependency on service-stack:</p>



<p>yum install openstack-keystone python-keystoneclient</p>



<p>Configure identity service to use MySQL database to store its relevant information:</p>



<p>openstack-config –set /etc/keystone/keystone.con sql connection mysql://keystone:<a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="afe4cad6fcdbc0c1caf0ffcedcdcd8c0ddcbefdccaddd9c6ccca82dcdbceccc481c3c6c1d7dcc0c381ccc0c2">[email&nbsp;protected]</a>/keystone</p>



<p>You can replace KeyStone_Password with password of your choice. Now we will create a user, the database and tables.</p>



<p>openstack-db –init –service keystone –password KeyStone_Password</p>



<p>After this, we will used openssl to generate an authorization toeken and we will save it in a configuration file. We need to define this (a shared secret or an authorization token) for Identity Service and other OpenStack services. Run the following commands in termianl:</p>



<p>ADMIN_TOKEN=$(openssl rand -hex 10) #openssl will generate a random token and store it in a variable ADMIN_TOKEN</p>



<p>openstack-config –set /etc/keystone/keystone.conf DEFAULT admin_token $ADMIN_TOKEN</p>



<p>echo $ADMIN_TOKEN</p>



<p>76d80c8cea1a4c20955f #We need this later</p>



<p>We will generate PKI signing keys and certificates for Keystone:</p>



<p>keystone-manage pki_setup –keystone-user keystone –keystone-group keystone</p>



<p>chown -R keystone:keystone /etc/keystone/* /var/log/keystone/keystone.log</p>



<p>Lets start the Identity Service:</p>



<p>service openstack-keystone start</p>



<p>chkconfig openstack-keystone on</p>



<p>We will specify two environment variables as follows:</p>



<p>export OS_SERVICE_TOKEN=76d80c8cea1a4c20955f</p>



<p>export OS_SERVICE_ENDPOINT=http://service-stack.linxsol.com:35357/v2.0</p>



<p>Now create two tenants one to use for OpenStack services and one for administrative purposes:</p>



<p>keystone tenant-create –name=admin –description=”Admin Tenant”</p>



<p>+————-+———————————-+</p>



<p>| &nbsp; Property &nbsp;| &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Value &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |</p>



<p>+————-+———————————-+</p>



<p>| description | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Admin Tenant &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |</p>



<p>| &nbsp; enabled &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; True &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |</p>



<p>| &nbsp; &nbsp; &nbsp;id &nbsp; &nbsp; | 63b01741bf5f475a89ba60be4daaeb5b |</p>



<p>| &nbsp; &nbsp; name &nbsp; &nbsp;| &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;admin &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |</p>



<p>+————-+———————————-+</p>



<p>keystone tenant-create –name=service –description=”Service Tenant”</p>



<p>+————-+———————————-+</p>



<p>| &nbsp; Property &nbsp;| &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Value &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |</p>



<p>+————-+———————————-+</p>



<p>| description | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Service Tenant &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|</p>



<p>| &nbsp; enabled &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; True &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |</p>



<p>| &nbsp; &nbsp; &nbsp;id &nbsp; &nbsp; | c3ba7c7f8d3643bc9d390d0654c15af3 |</p>



<p>| &nbsp; &nbsp; name &nbsp; &nbsp;| &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; service &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|</p>



<p>+————-+———————————-+</p>



<p>Create an admin user, an administrative role of the user and a user role:</p>



<p>keystone user-create –name=admin –pass=MY_PASSWORD –<a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="d3b6beb2babfeea9b6b6a0bbb2bd93bfbabdaba0bcbffdbfbcb0b2bf">[email&nbsp;protected]</a></p>



<p>+———-+———————————-+</p>



<p>| Property | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Value &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |</p>



<p>+———-+———————————-+</p>



<p>| &nbsp;email &nbsp; | &nbsp; &nbsp; &nbsp;<a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="4f352a2a3c272e210f232621373c20236123202c2e23">[email&nbsp;protected]</a> &nbsp; &nbsp; &nbsp; |</p>



<p>| enabled &nbsp;| &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; True &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |</p>



<p>| &nbsp; &nbsp;id &nbsp; &nbsp;| b221431dde3049ea82eafbb63cf0a027 |</p>



<p>| &nbsp; name &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;admin &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |</p>



<p>+———-+———————————-+</p>



<p>keystone role-create –name=admin</p>



<p>keystone user-role-add –user=admin –tenant=admin –role=admin</p>



<p>All roles we have created above should be mapped according to policy.json file. The /etc/[SERVICE_CODENAME]/policy.json file controls what users are allowed to do for a given service. For example, /etc/nova/policy.json specifies the access policy for the Compute service, /etc/glance/policy.json specifies the access policy for the Image service, and /etc/keystone/policy.json specifies the access policy for the Identity service.</p>



<p>Now we will install Identity Service using keystone service-create command. Whenver we need to create a service in OpenStack we use service-create command.</p>



<p>keystone service-create –name=keystone –type=identity –description=”Keystone Identity Service”</p>



<p>We will use keystone endpoint-create to specify an API endpoint for the service we have just created using its id.</p>



<p>keystone endpoint-create –service-id=35b87d89cf4b48dcbb81b4c4ff72302f –publicurl=http://service-stack.linxsol.com:5000/v2.0 –internalurl=http://service-stack.linxsol.com:5000/v2.0 –adminurl=http://service-stack.linxsol.com:35357/v2.0</p>



<p>Here we have defined three urls for public API, internal API and admin API respectively. At this stage we can verify if the Identity Service is working. Before we proceed we should un register OS_SERVICE_TOKEN and OS_SERVICE_ENDPOINT.</p>



<p>unset OS_SERVICE_TOKEN OS_SERVICE_ENDPOINT</p>



<p>Now we can check if we can successfully auhtenticate and get a token from our service-stack based on user name and password and we will also verify it on a tenant (second command) as follows:</p>



<p>keystone –os-username=admin –os-password=MY_PASSWORD –os-auth-url=http://service-stack.linxsol.com:35357/v2.0 token-get</p>



<p>keystone –os-username=admin –os-password=MY_PASSWORD –os-tenant-name=admin –os-auth-url=http://service-stack.linxsol.com:35357/v2.0 token-get</p>



<p>To avoid typing it again and again lets create a small configuration file and source it to shell:</p>



<p>vi keystonerc</p>



<p>export OS_USERNAME=admin</p>



<p>export OS_PASSWORD=MY_PASSWORD</p>



<p>export OS_TENANT_NAME=admin</p>



<p>export OS_AUTH_URL=http://service-stack.linxsol.com:35357/v2.0</p>



<p>Save the above file and source it to shell:</p>



<p>source keystonerc</p>



<p>keystone token-get</p>



<p>If the above last command runs successfully you will get a token and an ID of the specified tenant. Lets verify if our admin account has authorization to perform all the tasks:</p>



<p>keystone user-list</p>



<p>+———————————-+——-+———+———————–+</p>



<p>| &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;id &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| &nbsp;name | enabled | &nbsp; &nbsp; &nbsp; &nbsp; email &nbsp; &nbsp; &nbsp; &nbsp; |</p>



<p>+———————————-+——-+———+———————–+</p>



<p>| b221431dde3049ea82eafbb63cf0a027 | admin | &nbsp; True &nbsp;| <a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="fa809f9f89929b94ba96939482899596d49695999b96">[email&nbsp;protected]</a> |</p>



<p>+———————————-+——-+———+———————–+</p>



<p>######################################################################</p>



<p>Installing and Configuring the Image Service (GLANCE)</p>



<p>The Imanage service is responsible for storing and registering all the virtual disk images in a database. It is used for adding or manuplating images including taking snapshots of running virtual machines. Type following on service-stack.linxsol.com :</p>



<p>yum install openstack-glance</p>



<p>After installing we need to edit two configuration files of Glance to specify location of database. Replace MY_PASSWORD with a password of your choice for Glance.</p>



<p>openstack-config –set /etc/glance/glance-api.conf DEFAULT sql_connection mysql://glance:<a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="1e5347414e5f4d4d49514c5a5e6d7b6c68777d7b336d6a7f7d7530727770666d7172307d7173">[email&nbsp;protected]</a>/glance</p>



<p>openstack-config –set /etc/glance/glance-registery.conf DEFAULT sql_connection mysql://glance:<a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="a8e5f1f7f8e9fbfbffe7faece8dbcddadec1cbcd85dbdcc9cbc386c4c1c6d0dbc7c486cbc7c5">[email&nbsp;protected]</a>/glance</p>



<p>To create database and all the required tables for Glance Image Service run following:</p>



<p>openstack-db –init –service glance –password MY_PASSWORD</p>



<p>To create a user called glance that the Image Service can use for authenticating against the Identity Service and also assign admin role to the glance user against tenant service :</p>



<p>keystone user-create –name=glance –pass=MY_PASSWORD –<a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="f99c94989095c49e9598979a9cb9959097818a9695d795969a9895">[email&nbsp;protected]</a></p>



<p>keystone user-role-add –user=glance –tenant=service –role=admin</p>



<p>To add credentials to the Image Service’s configuration files:</p>



<p>openstack-config –set /etc/glance/glance-api.conf keystone_authtoken auth_host service-stack.linxsol.com</p>



<p>openstack-config –set /etc/glance/glance-api.conf keystone_authtoken admin_user glance</p>



<p>openstack-config –set /etc/glance/glance-api.conf keystone_authtoken</p>



<p>admin_tenant_name service</p>



<p>openstack-config –set /etc/glance/glance-api.conf keystone_authtoken</p>



<p>admin_password MY_PASSWORD</p>



<p>openstack-config –set /etc/glance/glance-registry.conf</p>



<p>keystone_authtoken auth_host service-stack.linxsol.com</p>



<p>openstack-config –set /etc/glance/glance-registry.conf</p>



<p>keystone_authtoken admin_user glance</p>



<p>openstack-config –set /etc/glance/glance-registry.conf</p>



<p>keystone_authtoken admin_tenant_name service</p>



<p>openstack-config –set /etc/glance/glance-registry.conf</p>



<p>keystone_authtoken admin_password MY_PASSWORD</p>



<p>Copy the glance-api-paste.ini and glance-registry-paste.ini into /etc/glance:</p>



<p>cp /usr/share/glance/glance-api-dist-paste.ini /etc/glance/glance-api-paste.ini</p>



<p>cp /usr/share/glance/glance-registry-dist-paste.ini /etc/glance/glance-registry-paste.ini</p>



<p>vi /etc/glance/glance-api-paste.ini</p>



<p>auth_host=service-stack.linxsol.com</p>



<p>admin_user=glance</p>



<p>admin_tenant_name=service</p>



<p>admin_password=MY_PASSWORD</p>



<p>vi /etc/glance/glance-registry-paste.ini</p>



<p>auth_host=service-stack.linxsol.com</p>



<p>admin_user=glance</p>



<p>admin_tenant_name=service</p>



<p>admin_password=MY_PASSWORD</p>



<p>Use keystone to register the Imanage Service with Identity Service for location search:</p>



<p>keystone service-create –name=glance –type=image –description=”Glance Image Service”</p>



<p>Copy the service id returned by the above command to use it in endpont:</p>



<p>keystone endpoint-create –service-id=the_serivce_id_copied –publicurl=http://service-stack.linxsol.com:9292 –internalurl=http://service-stack.linxsol.com:9292 –adminurl=http://service-stack.linxsol.com:9292</p>



<p>service openstack-glance-api start</p>



<p>service openstack-glance-registry start</p>



<p>chkconfig openstack-glance-api on</p>



<p>chkconfig openstack-glance-registry on</p>



<p>Verify the Image Service</p>



<p>First we download a virtual machine image from CirOS and then we will upload it to Image Service:</p>



<p>wget http://cdn.download.cirros-cloud.net/0.3.1/cirros-0.3.1-x86_64-disk.img</p>



<p>glance image-create –name=CirrOS –disk-format=qcow2 –container-format=bare –is-public=true &lt; cirros-0.3.1-x86_64-disk.img</p>



<p>glance image-list</p>



<p>The last command will show us any registerd images with Image Service.</p>



<p>####################################################################</p>



<p>Configuring and Installing Nove Controller Services</p>



<p>On service-stack.linxsol.com install the openstack-nove meta-package. This package installs different OpenStack Compute packages:</p>



<p>yum install openstack-nova python-novaclient</p>



<p>We will prepare MySQL for Compute Service to store information in the database:</p>



<p>openstack-config –set /etc/nova/nova.conf database connection mysql://nova:MY_PASSWORD@<a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="7a091f080c13191f57090e1b19113a1613140209151654191517">[email&nbsp;protected]</a>/nova</p>



<p>Create db user, database and tables for Compute Service:</p>



<p>openstack-db –init –service nova –password MY_PASSWORD</p>



<p>We also need to setup vncserver_listen, vncserver_proxyclient_address and my_ip to the internal IP address of service-stack node:</p>



<p>openstack-config –set /etc/nova/nova.conf DEFAULT my_ip 192.168.170.61</p>



<p>openstack-config –set /etc/nova/nova.conf DEFAULT vncserver_listen 192.168.170.61</p>



<p>openstack-config –set /etc/nova/nova.conf DEFAULT vncserver_proxyclient_address 192.168.170.61</p>



<p>Note:</p>



<p>In case vnc doesn’t work for your add the following lines in your /etc/nova/nova.conf:</p>



<p>novncproxy_base_url=http://192.168.170.61:6080/vnc_auto.html</p>



<p>novncproxy_host=0.0.0.0</p>



<p>Also add the novncproxy_base_url line into /etc/nova/nova.conf on cloud-stack.linxsol.com.</p>



<p>keystone user-create –name=nova –pass=MY_PASSWORD –<a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="0e6b636f6762336061786f4e626760767d61622062616d6f62">[email&nbsp;protected]</a></p>



<p>keystone user-role-add –user=nova –tenant=service –role=admin</p>



<p>The above two command create a user nova for Compute Service to authenticate against the Identity Service and assigns admin role for the service tenant. We will modify /etc/nova/nova.conf &nbsp;and /etc/nova/api-paste.ini files so Compute Service can use the updated credentials. You should also make sure that api_paste_config=/etc/nova/api-paste.ini exists in /etc/nova/nova.conf:</p>



<p>openstack-config –set /etc/nova/nova.conf DEFAULT auth_strategy keystone</p>



<p>openstack-config –set /etc/nova/nova.conf DEFAULT auth_host service-stack.linxsol.com</p>



<p>openstack-config –set /etc/nova/nova.conf DEFAULT admin_user nova</p>



<p>openstack-config –set /etc/nova/nova.conf DEFAULT admin_tenant_name service</p>



<p>openstack-config –set /etc/nova/nova.conf DEFAULT admin_password MY_PASSWORD</p>



<p>Make sure the following options are set in /etc/nova/api-paste.ini :</p>



<p>[filter:authtoken]</p>



<p>paste.filter_factory=keystoneclient.middleware.auth_token:filter_factory</p>



<p>auth_host=service-stack.linxsol.com</p>



<p>auth_uri=http://service-stack.linxsol.com:5000</p>



<p>admin_tenant_name=service</p>



<p>admin_user=nova</p>



<p>admin_password=MY_PASSWORD</p>



<p>We will register and specify endpoint for our Compute Service now with the Identity Service for location search and also configure it to use Qpid message broker:</p>



<p>keystone service-create &nbsp;–name=nova –type=compute –description=”Nova Compute Service”</p>



<p>keystone endpoint-create –service-id=the_service_id_returned_by_above_command –publicurl=http://service-stack.linxsol.com:8774/v2/%\(tenant_id\)s –internalurl=http://service-stack.linxsol.com:8774/v2/%\(tenant_id\)s –adminurl=http://service-stack.linxsol.com:8774/v2/%\(tenant_id\)s</p>



<p>openstack-config –set /etc/nova/nova.conf DEFAULT rpc_backend nova.openstack.common.rpc.impl_qpid</p>



<p>openstack-config –set /etc/nova/nova.conf DEFAULT qpid_hostname service-stack.linxsol.com</p>



<p>Start all the services:</p>



<p>service openstack-nova-api start</p>



<p>service openstack-nova-cert start</p>



<p>service openstack-nova-consoleauth start</p>



<p>service openstack-nova-scheduler start</p>



<p>service openstack-nova-conductor start</p>



<p>service openstack-nova-novncproxy start</p>



<p>chkconfig openstack-nova-api on</p>



<p>chkconfig openstack-nova-cert on</p>



<p>chkconfig openstack-nova-consoleauth on</p>



<p>chkconfig openstack-nova-scheduler on</p>



<p>chkconfig openstack-nova-conductor on</p>



<p>chkconfig openstack-nova-novncproxy on</p>



<p>To verify that everything is configured correctly, use the nova image-list to get a list o available images. The output is similar to the output of glance image-list.</p>



<p>nova image-list</p>



<p>######################################################</p>



<p>Compute Node Configuration</p>



<p>For Compute Node (cloud-stack.linxsol.com) we are going to use KVM in this article. We have already configured networking and host files for this machine in start. The eth1 will be assigned by networking component of OpenStack. Make sure the following file exists:</p>



<p>vi /etc/cron.daily/ntpdate</p>



<p>ntpdate service-stack.linxsol.com</p>



<p>hwclock -w</p>



<p>chmod a+x /etc/cron.daily/ntpdate</p>



<p>Install MySQL client libraries required by OpenStack:</p>



<p>yum install mysql MySQL-python</p>



<p>we will now install the packages required by OpenStack compute installation:</p>



<p>yum install openstack-nova-compute</p>



<p>Copy /etc/nova/nova.conf from service-stack.linxsol.com to cloud-stack.linxsol.com:</p>



<p>scp <a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="7a0815150e3a091f080c13191f57090e1b1911541613140209151654191517">[email&nbsp;protected]</a>:/etc/nova/nova.conf /etc/nova/</p>



<p>Set the configuration keys my_ip, vncserver_listen, and vncserver_proxyclient_address to the IP address of the compute node on internal network:</p>



<p>openstack-config –set /etc/nova/nova.conf DEFAULT my_ip 192.168.170.60</p>



<p>openstack-config –set /etc/nova/nova.conf DEFAULT vncserver_listen 192.168.170.60</p>



<p>openstack-config –set /etc/nova/nova.conf DEFAULT vncserver_proxyclient_address 192.168.170.60</p>



<p>Specify the host running the Image Service:</p>



<p>openstack-config –set /etc/nova/nova.conf DEFAULT glance_host service-stack.linxsol.com</p>



<p>Copy /etc/nova/api-paste.ini from service-stack.linxsol.com to cloud-stack.linxsol.com:</p>



<p>scp <a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="96e4f9f9e2d6e5f3e4e0fff5f3bbe5e2f7f5fdb8fafff8eee5f9fab8f5f9fb">[email&nbsp;protected]</a>:/etc/nova/api-paste.ini /etc/nova/</p>



<p>service libvirtd start</p>



<p>service messagebus start</p>



<p>chkconfig libvirtd on</p>



<p>chkconfig messagebus on</p>



<p>service openstack-nova-compute start</p>



<p>chkconfig opensfatack-nova-compute on</p>



<p>service libvirtd start</p>



<p>chkconfig libvirtd on</p>



<p>Installing network stack on cloud-stack.linxsol.com :</p>



<p>yum install openstack-nova-network</p>



<p>Set the options:</p>



<p>openstack-config –set /etc/nova/nova.conf DEFAULT network_manager nova.network.manager.FlatDHCPManager</p>



<p>openstack-config –set /etc/nova/nova.conf DEFAULT &nbsp;firewall_driver nova.virt.libvirt.firewall.IptablesFirewallDriver</p>



<p>openstack-config –set /etc/nova/nova.conf DEFAULT network_size 254</p>



<p>openstack-config –set /etc/nova/nova.conf DEFAULT allow_same_net_traffic False</p>



<p>openstack-config –set /etc/nova/nova.conf DEFAULT multi_host True</p>



<p>openstack-config –set /etc/nova/nova.conf DEFAULT send_arp_for_ha True</p>



<p>openstack-config –set /etc/nova/nova.conf DEFAULT share_dhcp_address True</p>



<p>openstack-config –set /etc/nova/nova.conf DEFAULT force_dhcp_release True</p>



<p>openstack-config –set /etc/nova/nova.conf DEFAULT flat_interface eth1</p>



<p>openstack-config –set /etc/nova/nova.conf DEFAULT flat_network_bridge br100</p>



<p>openstack-config –set /etc/nova/nova.conf DEFAULT public_interface eth1</p>



<p>Open nova.conf and search for [database] and make sure the two uncomment lines are set to service-stack.linxsol.com:</p>



<p>vi /etc/nova/nova.conf</p>



<p>[database]</p>



<p>connection = mysql://nova:<a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="55062134363e7b64676615263027233c363078262134363e7b393c3b2d263a397b363a38">[email&nbsp;protected]</a>/nova</p>



<p>#</p>



<p># Options defined in nova.openstack.common.db.api</p>



<p>#</p>



<p># The backend to use for db (string value)</p>



<p>#backend=sqlalchemy</p>



<p># Enable the experimental use of thread pooling for all DB API</p>



<p># calls (boolean value)</p>



<p>#use_tpool=false</p>



<p>#</p>



<p># Options defined in nova.openstack.common.db.sqlalchemy.session</p>



<p>#</p>



<p># The SQLAlchemy connection string used to connect to the</p>



<p># database (string value)</p>



<p>connection=mysql://nova:<a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="f2a186939199dcc3c0c1b2819780849b9197df8186939199dc9e9b9c8a819d9edc919d9f">[email&nbsp;protected]</a>/nova</p>



<p>Provide a local metadata service that will be reachable from instances on this compute node. This step is only necessary on compute nodes that do not run the nova-api service.</p>



<p>yum install openstack-nova-api</p>



<p>service openstack-nova-metadata-api start</p>



<p>chkconfig openstack-nova-metadata-api on</p>



<p>service openstack-nova-network restart</p>



<p>chkconfig openstack-nova-network on</p>



<p>Finally, you have to create a network that virtual machines can use. You only need to do this once for the entire installation, not for each compute node. Run the nova networkcreate command anywhere your admin user credentials are loaded.</p>



<p>scp <a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="562439392216253324203f35337b252237353d783a3f382e25393a7835393b">[email&nbsp;protected]</a>:/root/keystonerc /root</p>



<p>source keystonerc</p>



<p>nova network-create vmnet –fixed-range-v4=172.16.0.0/24 –bridge-interface=br100 –multi-host=T</p>



<p>Launching an Image</p>



<p>Generate a keypair consisting of a private key and a public key to be able to</p>



<p>launch instances on OpenStack.</p>



<p>ssh-keygen</p>



<p>cd .ssh</p>



<p>nova keypair-add –pub_key id_rsa.pub novakey</p>



<p>Check if the added key pair is saved:</p>



<p>nova keypair-list</p>



<p>+———+————————————————-+</p>



<p>| Name &nbsp; &nbsp;| Fingerprint &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |</p>



<p>+———+————————————————-+</p>



<p>| novakey | 7e:ee:27:7a:1e:ec:8e:b3:fb:20:11:80:ef:27:21:71 |</p>



<p>+———+————————————————-+</p>



<p>To launch an instance using OpenStack, you must specify the ID for the flavor you want to use for the instance. A flavor is a resource allocation profile. For example, it specifies how many virtual CPUs and how much RAM your instance will get. To see a list of the available profiles, run the nova flavor-list command.</p>



<p>nova flavor-list</p>



<p>Now we will use CirrOS we have already added to our Image Service, and to get the ID of CirrOS:</p>



<p>nova image-list</p>



<p>Setup the security group rules for Ping and SSH:</p>



<p>nova secgroup-add-rule default tcp 22 22 0.0.0.0/0</p>



<p>nova secgroup-add-rule default icmp -1 -1 0.0.0.0/0</p>



<p>Now create a vitural machine using nova boot:</p>



<p>nova boot –flavor 1 –key_name novakey –image 667fdbe1-f2a4-4fcc-b563-d89606847d07 –security_group default cirrOS</p>



<p>+————————————–+————————————–+</p>



<p>| Property &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | Value &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|</p>



<p>+————————————–+————————————–+</p>



<p>| OS-EXT-STS:task_state &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| scheduling &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |</p>



<p>| image &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| CirrOS &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |</p>



<p>| OS-EXT-STS:vm_state &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| building &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |</p>



<p>| OS-EXT-SRV-ATTR:instance_name &nbsp; &nbsp; &nbsp; &nbsp;| instance-00000001 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|</p>



<p>| OS-SRV-USG:launched_at &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | None &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |</p>



<p>| flavor &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | m1.tiny &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|</p>



<p>| id &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | fa05000a-82d1-4685-8e70-71ff45017eb8 |</p>



<p>| security_groups &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| [{u’name’: u’default’}] &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|</p>



<p>| user_id &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| b221431dde3049ea82eafbb63cf0a027 &nbsp; &nbsp; |</p>



<p>| OS-DCF:diskConfig &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| MANUAL &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |</p>



<p>| accessIPv4 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|</p>



<p>| accessIPv6 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|</p>



<p>| progress &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | 0 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|</p>



<p>| OS-EXT-STS:power_state &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | 0 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|</p>



<p>| OS-EXT-AZ:availability_zone &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| nova &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |</p>



<p>| config_drive &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|</p>



<p>| status &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | BUILD &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|</p>



<p>| updated &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| 2013-11-05T16:38:13Z &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |</p>



<p>| hostId &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|</p>



<p>| OS-EXT-SRV-ATTR:host &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | None &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |</p>



<p>| OS-SRV-USG:terminated_at &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | None &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |</p>



<p>| key_name &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | novakey &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|</p>



<p>| OS-EXT-SRV-ATTR:hypervisor_hostname &nbsp;| None &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |</p>



<p>| name &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | cirrOS &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |</p>



<p>| adminPass &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| FgqMoS3A5hrA &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |</p>



<p>| tenant_id &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| 63b01741bf5f475a89ba60be4daaeb5b &nbsp; &nbsp; |</p>



<p>| created &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| 2013-11-05T16:38:12Z &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |</p>



<p>| os-extended-volumes:volumes_attached | [] &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |</p>



<p>| metadata &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | {} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |</p>



<p>+————————————–+————————————–+</p>



<p>You can see the status of your Virtual Machine using nova list:</p>



<p>+————————————–+——–+——–+————+————-+——————+</p>



<p>| ID &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | Name &nbsp; | Status | Task State | Power State | Networks &nbsp; &nbsp; &nbsp; &nbsp; |</p>



<p>+————————————–+——–+——–+————+————-+——————+</p>



<p>| fa05000a-82d1-4685-8e70-71ff45017eb8 | cirrOS | ACTIVE | None &nbsp; &nbsp; &nbsp; | Running &nbsp; &nbsp; | vmnet=172.16.0.2 |</p>



<p>+————————————–+——–+——–+————+————-+——————+</p>



<p>To see details:</p>



<p>nova show fa05000a-82d1-4685-8e70-71ff45017eb8</p>



<p>Try to ssh into new machine:</p>



<p>ssh <a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="d9bab0ababb6aa99e8eeebf7e8eff7e9f7eb">[email&nbsp;protected]</a></p>



<p>##################################################################################################################</p>
                
                
            