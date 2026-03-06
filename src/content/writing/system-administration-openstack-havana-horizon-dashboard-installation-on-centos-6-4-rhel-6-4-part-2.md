---
title: "OpenStack Havana Horizon Dashboard Installation on CentOS 6.4/RHEL 6.4 – Part 2"
date: "2020-02-06T21:17:00+00:00"
excerpt: "Installing OpenStack Dashboard (Horizon)"
---



                
                                    
<p>Installing OpenStack Dashboard (Horizon)</p>



<p>Though it is not an ideal situation but we are going to install our dashboard service on service-stack.linxsol.com. We can also install it on a seprate server without any problems. You just need to assure that your Dashboard can access the Identity Service. To install OpenStack Dashboard:</p>



<hr class="wp-block-separator">



<figure class="wp-block-image size-large"><img fetchpriority="high" decoding="async" width="1024" height="447" src="https://zee.carcheckconnect.com/wp-content/uploads/openstack-dashboard-overview-1024x447.png" alt="Openstack Dashboard" class="wp-image-169" srcset="https://zee.linxsol.com/wp-content/uploads/openstack-dashboard-overview-1024x447.png 1024w, https://zee.linxsol.com/wp-content/uploads/openstack-dashboard-overview-300x131.png 300w, https://zee.linxsol.com/wp-content/uploads/openstack-dashboard-overview-768x335.png 768w, https://zee.linxsol.com/wp-content/uploads/openstack-dashboard-overview-1536x670.png 1536w, https://zee.linxsol.com/wp-content/uploads/openstack-dashboard-overview.png 1900w" sizes="(max-width: 1024px) 100vw, 1024px"><figcaption>OpenStack Dashboard</figcaption></figure>



<p>yum install memecached python-memcached mod_wsgi openstack-dashboard</p>



<p>For memecached, we need to change the settings in /etc/openstack-dashboard/local_settings according to the settings defined in /etc/sysconfig/memcached.conf:</p>



<p>Seach for CACHES in /etc/openstack-dashboard/local_settings and make sure in the ‘LOCATION’ matches to address and port number defined in memcached.conf file.</p>



<p>Update Allowed hosts to the hosts you want to access dashboard from:</p>



<p>ALLOWED_HOSTS = [‘localhost’, ‘<a href="http://cloud-stack.linxsol.com/">cloud-stack.linxsol.com</a>‘]</p>



<p>Also change:</p>



<p>OPENSTACK_HOST = “127.0.0.1” to OPENSTACK_HOST = “<a href="http://service-stack.linxsol.com/">http://service-stack.linxsol.com</a>“</p>



<p>Start the webserver and memecached:</p>



<p>service httpd start</p>



<p>service memcached start</p>



<p>chkconfig httpd on</p>



<p>chkconfig memcached on</p>



<p>Note: We need to speicify a host in the ALLOWED_HOST file from where we are going to access OpenStack Dashboard, it will not work otherwise.</p>



<figure class="wp-block-image size-large"><img decoding="async" width="1024" height="445" src="https://zee.carcheckconnect.com/wp-content/uploads/openstack-dashboard-hypervisors-1024x445.png" alt="Openstack Dashboard" class="wp-image-168" srcset="https://zee.linxsol.com/wp-content/uploads/openstack-dashboard-hypervisors-1024x445.png 1024w, https://zee.linxsol.com/wp-content/uploads/openstack-dashboard-hypervisors-300x130.png 300w, https://zee.linxsol.com/wp-content/uploads/openstack-dashboard-hypervisors-768x334.png 768w, https://zee.linxsol.com/wp-content/uploads/openstack-dashboard-hypervisors-1536x668.png 1536w, https://zee.linxsol.com/wp-content/uploads/openstack-dashboard-hypervisors.png 1892w" sizes="(max-width: 1024px) 100vw, 1024px"><figcaption>Openstack Dashboard Hypervisors</figcaption></figure>



<p>Access&nbsp;<a href="http://service-stack.linxsol.com/dashboard">http://service-stack.linxsol.com/dashboard</a>&nbsp;in your browser.</p>



<p>Note: In case you see the OpenStack Dashboard login page but you are not able to login try disabling your SeLinux settings though it is not recommended.</p>



<p>##############################################################################</p>
                
                
            