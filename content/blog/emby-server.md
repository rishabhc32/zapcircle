---
title: "Setting up Emby server on Linux"
date: 2018-11-09T08:46:09+05:30
draft: false
author: "RC"
cover_image: "/images/emby-server/cover.png"
image: "/images/emby-server/cover.png"
---

If you have an old laptop lying around, just like mine and want to repurpose it as a media server for streaming movies, songs, etc. then read up.

<!--more-->

<div class="row">
    <img class="responsive-img col s6" src="/images/emby-server/laptop.jpeg">
    <img class="responsive-img col s6" src="/images/emby-server/emby.png">
</div>

### Emby
[Emby](https://emby.media/) is a media server designed to organize, play and stream media content like audio, movies, etc. It has a web-based client interface for streaming content and managing server. Emby clients exist for many platforms, including, but not limited to, Android, IOS, Android TV and Chromecast. Emby's source code is mostly open with some closed-source components. Emby server can be installed on all major platforms like Linux, Windows, Mac, NAS devices, Docker.

### Installation
Installing Emby server

* On __Arch__ install the [emby-server](https://www.archlinux.org/packages/community/any/emby-server/) package.
* Installation instruction for other distros can be found on [Emby's website](https://emby.media/linux-server.html).

### Setup
* If using __Arch__ start and enable _emby-server.service_ on your machine.
    * `sudo systemctl start emby-server.service` 
    * `sudo systemctl enable emby-server.service`

* Assign static local IP to the machine where you will installed emby server. This process is different for different routers. You can search it on Google or find it in your router's manual or fiddle around in settings like I did.   
It was under _Setup > Local Network > DHCP Server_ on my router D-Link DSL-224.
<div class="row">
    <img class="responsive-img col" src="/images/emby-server/static_ip_router.png">
</div>

* Create a folder to store your media files, like
    * `mkdir /home/emby`

* Emby runs under the _user_ and _user group_ __emby__(_emby:emby_). To provide Emby access to your media library, change owner to user _emby_ and group to group _emby_.
    * `sudo chown -R emby /home/emby`
    * `sudo chgrp -R emby /home/emby`

* Change permissions so that anyone in group _emby_ can read and write files into your media library.
    * `sudo chmod g+rwx /home/emby`

* Verify the above, using `ls -la /home`   
Refer [this](https://unix.stackexchange.com/questions/103114/what-do-the-fields-in-ls-al-output-mean) for understanding `ls` output.
<div class="row">
    <img class="responsive-img col" src="/images/emby-server/ls.png">
</div>

* Add your current user to the _emby_ group so that you can write files into your media library.
    * `sudo usermod -a -G emby $(whoami)`
    * Verify using `getent group emby`   
    You should see user emby and your current user as a part of the emby group.
    <br>
    <div class="row">
        <img class="responsive-img col" src="/images/emby-server/getent.png">
    </div>

* Copy some movies to your media library.
<div class="row">
    <img class="responsive-img col" src="/images/emby-server/media_library.png">
</div>

* Emby server listens on port 8096 by default. 
    * If you have GUI go to [http://localhost:8096](http://localhost:8096/)
    * If you have a command line interface, find your server's local IP address and create an ssh tunnel to your server.
        * `ssh -L 8096:localhost:8096 asus@192.168.1.21`, where `asus` is server's username and `192.168.1.21` is my server's local IP.
        * Now go to [http://localhost:8096](http://localhost:8096/)

* Follow the onscreen instructions to setup emby.

* When the setup wizard asks you to add media library, select the content type and display name.
<div class="row">
    <img class="responsive-img col" src="/images/emby-server/add_media_library.png">
</div>

* Click on the __+__ icon next to __Folders__ option. Then specify your media library path in _folder_ option, which is `/home/emby` in our case and click __OK__.
<div class="row">
    <img class="responsive-img col" src="/images/emby-server/add_folder.png">
</div>

* Complete the setup wizard.

* Now go *SERVER_LOCAL_IP:8096*, `192.168.1.21:8096` in my case, from your web browser to stream your movies/media. You can also download Android or iOS client for emby to stream your media content.

* Peace ✌️

