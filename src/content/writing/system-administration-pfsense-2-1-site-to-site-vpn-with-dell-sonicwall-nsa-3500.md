---
title: "pfSense 2.1 Site to Site VPN with Dell Sonicwall NSA 3500"
date: "2020-02-06T21:41:24+00:00"
excerpt: "Today I will configure Site to site VPN using open source FreeBSD based pfSense 2.1 and Dell Sonicwall NSA 3500 for a branch office network. I recently needed to configure it for one of my client and just to make it easy for others I have made this video."
---



                
                                    
<figure class="wp-block-embed-youtube aligncenter wp-block-embed is-type-video is-provider-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper">
<iframe title="pfSense 2.1 Site to Site VPN with Dell Sonicwall NSA 3500" width="500" height="281" src="https://www.youtube.com/embed/eE3M8fXIgFE?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen=""></iframe>
</div><figcaption>Step-by-step Configuration Video Tutorial</figcaption></figure>



<p>Today I will configure Site to site VPN using open source FreeBSD based pfSense 2.1 and Dell Sonicwall NSA 3500 for a branch office network. I recently needed to configure it for one of my client and just to make it easy for others I have made this video.</p>



<p>Let’s login to our pfSense firewall.</p>



<p>Enter your user name.</p>



<p>Enter your password</p>



<p>Now click on VPN menu and choose IPsec from it.</p>



<p>Click on Enable IPsec and save it.</p>



<p>IPsec Site to site VPN tunnel communicates in two different phase during IKE (Internet Key Exchange – RFC 2409). First we will configure authentication of Phase 1 Proposal.</p>



<p>Now click on the plus icon down here. In the interface field you need to choose WAN. In the ‘Remote Gateway’ field, we need to type Sonicwall WAN IP address. In description field we can add some meaningful description.</p>



<p>‘Authentication method’ is fine with default setting of ‘Mutual PSK’. In case you are using certificates you can choose here ‘Mutual RSK’ instead. From ‘Negotiation mode’ you can choose either ‘Main’ or ‘Aggressive’. Aggressive is less secured and it is fine for demonstration purposes of this lab. Now choose IP address for both ‘My identifier’ and ‘Peer Identifier’. In ‘My identifier’ we need to add WAN ip of pfSense and in ‘Peer Identifier’ we will add WAN IP of Sonicwall. Pre-shared secret could be of your choice and I recommend it to be a complex long string. The longer is better. In Policy Generation field we will choose ‘Default’ and in ‘Proposal checking’ We will select ‘obey’. Any other value could cause VPN connection unresponsive. This way it accepts and obeys the policy it receives from Sonicwall.</p>



<p>Encryption method 3DES is fine and quite secure. Hash algorithm is SHA1 and DH key group is 2 which is DH group in Sonicwall proposal tab.</p>



<p>Leave the default time 28800 seconds which is 8 hours. You should enable NAT Traversal though it works without enabling it but it depends on the scenario you are using it. Default ‘Dead Peer Detection’ options are fine click save and apply.</p>



<p>Okay here we are done with our first phase of IPsec configuration. Now we shall configure second IP Sec negotiation phase. Click the plus icon down the first phase. Mode should be ‘Tunnel’ in the local network you can choose IP Address, a whole local network range, WAN or WAN range.</p>



<p>I would choose network as per my configuration and type in 192.168.65.0/24 in the address field.</p>



<p>You have the same options for Remote Network depending on the scenario you are using your VPN. I will type 192.168.21.0/24. Add some meaningful description, as it is always useful to make address objects organized and also when we need to troubleshoot or debug problems. I would stress again that your settings should match here with the settings in Sonicwall otherwise your VPN tunnel will not work.</p>



<p>From ‘Protocol’ field choose ESP which is quite secure. Uncheck everything from ‘Encryption algorithms’ except 3DES. Check SHA1 from Hash Algorithms and choose 2 from PFS key group. I would recommend Life time 86400 seconds which is one day. The more life time you increase the more possible hackers get time to crack the key.</p>



<p>In ‘Advanced Options’ we will use Automatically Ping host option. This option periodically checks for other host to be available and keeps it alive. I will type the IP address of our Sonicwall Gateway here. Click Save and apply settings.</p>



<p>Now let’s configure firewall rules. Though your VPN tunnel should be working without these rules but in case you configure ‘Mobile client access’ you would require to open these ports. Click on ‘Firewall’ menu and choose ‘Rules’. We need to open two UDP ports used by IPsec. ISAKAMP (The Internet Security Association and Key Management Protocol is a security protocol as defined by Internet Engineering Task Force in RFC 2408) uses UDP port 500 and IPsec Nat-T for NAT traversal during IKE (Internet Key Exchange) requires UDP port 4500 to be opened (RFC 3947).</p>



<p>We will choose on WAN tab and click on plus icon to add the rule. All defaults are fine we just need to modify two fields here. Select ‘UDP’ from Protocol field. We will select ‘ISAKMP’ from ‘Destination port range’ and we will add some meaningful description and ‘Save’. All settings are same for IPsec NAT-T except we need to change ‘Destination port range’ and choose ‘IPsec NAT-T’ in that field and save. Now we will select IPsec tab and click on plus icon to add a default rule. Protocol will be TCP and ‘Destination port range’ will be ‘any’ ‘any’. Some meaningful ‘Description’ again, ‘Save’ and ‘Apply’. pfSense is ready to connect with Sonicwall.</p>



<p>Now it is time to configure Dell Sonicwall NSA 3500. Click on VPN Settings and click on ‘Add’. In the ‘General’ tab enter a name in the ‘Name’ field. In ‘IPsec Primary Gateway Name or Address’ field, we need to type the gateway address of our pfSense firewall. In ‘Shared Secret’ type linxsol.2013 as previously we have set it up in pfSense VPN tunnel. ‘Local IKE ID’ we need to choose IP address and type our Sonicwall Gateway address here. In ‘Peer IKE ID’ type the gateway IP address of pfSense. In the ‘Network’ tab I will choose and address object of 192.168.21.0/24 for local network and in the destination address I will choose an address object of 192.168.65.0/24 network. Now let’s examine ‘Proposals’ tab. Mode should be aggressive here, In first phase DH Group should be ‘Group 2’, Encryption should be 3DES and Authentication should be SHA1. Default life time is fine for this phase.</p>



<p>In IPSec Phase 2 proposal ‘Protocol’ should be ESP, Encryption should 3DES and Authentication should be SHA1. Click on ‘Enable Perfect Forward Secrecy’ to enable it. Choose ‘Group 2’ from DH Group drop down menu. We will change ‘Life Time’ from default to 86400 to match pfSense settings. Click on ‘Advanced’ tab and check ‘Enable Keep Alive’ option, so Sonicwall can periodically check the tunnel. That’s all it takes to configure a Site-to-Site VPN between Sonicwall and pfSense.</p>



<p>Example Sonicwall IPSec Configuration</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p></p><p><strong>General tab on Sonicwall:</strong></p><p>Authentication Method: IKE using Pre shared Secret</p><p>Name: pfSense Site-to-Site PN</p><p>IPsec Primary Gateway Name or Address: 1.1.1.1 | IP for pfSense</p><p>IPsec Secondary Gateway Name or Address: 0.0.0.0</p><p>Shared Secret: Shared secret for this connection</p><p>Local IKE ID: 2.2.2.2 | Select ‘IP Address’ from the drop down menu and then type WANIP of Sonicwall</p><p><strong>Network tab on Sonicwall:</strong></p><p><strong>Local Networks</strong></p><p>Choose local network from list: 192.168.21.0 | Create an address object for the network or you can use the built in one ‘LAN Subnets’</p><p><strong>Destination Networks</strong></p><p>Choose destination network from list: 192.168.65.0 | Create an address object for the remote LAN network</p><p><strong>Proposals Tab:</strong></p><p><strong>IKE (Phase 1) Proposal</strong></p><p>By default pfSense supports ‘Main Mode’ and ‘Aggressive’.</p><p>Exchange: Aggressive</p><p>DH Group: Group 2</p><p>Encryption: 3DES</p><p>Authentication: SHA1</p><p>Life Time (seconds): 28800</p><p><strong>Ipsec (Phase 2) Proposal</strong></p><p>Protocol: ESP</p><p>Encryption: 3DES</p><p>Authentication: SHA1</p><p>Enable Perfect Forward Secrecy: Checked</p><p>Life Time: 86400</p><p><strong>Advanced Tab:</strong></p><p>Check ‘Enable Keep Alive’</p></blockquote>



<p><strong>Corresponding pfSense IPsec configuration</strong></p>



<p>Local Subnet: LAN subnet 192.168.65.0/24</p>



<p>Remote Subnet: Sonicwall LAN 192.168.21.0/24</p>



<p>Remote Gateway: WAN IP of Sonicwall 2.2.2.2</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p></p><p><strong>Phase 1:</strong></p><p>Authentication method: Mutual PSK</p><p>Negotiation Mode: Aggressive</p><p>My identifier: 1.1.1.1 (IP Address of pfSense WAN)</p><p>Peer identifier: 2.2.2.2 (IP Address of Sonicwall)</p><p>Pre Shared Key: Your pre share key</p><p>Policy Generation: Default</p><p>Proposal Checking: Obey</p><p>Encryption Algorithm: 3DES</p><p>Hash algorithm: SHA1</p><p>DH key group: 2</p><p>Lifetime: 28800</p><p><strong>Advanced options</strong></p><p>Nat Traversal: Enable</p><p>Dead Peer Detection: Check Enable DPD</p><p><strong>Phase 2:</strong></p><p>Mode: Tunnel</p><p>Local Network: 192.168.65.0/24</p><p>Remote Network: 192.168.21.0/24</p><p>Protocol: ESP</p><p>Encryption algorithms: 3DES</p><p>Hash algorithms: SHA1</p><p>PFS key group: 2</p><p>Lifetime: 84600</p></blockquote>



<p>You should add rules to pfSense by going to Firewall &gt; Rules, IPsec Tab and permit the traffic from remote subnet to your local subnet.</p>
                
                
            