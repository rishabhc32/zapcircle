---
title: "Learning Docker - Part 1"
date: 2018-06-25T10:55:36+05:30
draft: true
author: "RC"
cover_image: /images/docker1/docker-banner.png
---
Docker is a platform for developers to develop, deploy, and run applications with containers. Deployment of applications using linux containers is called _containerization_. Containers allow developers to pack up an application with all its libraries and dependencies, allowing them to be portable among any system running Linux.
<!--more-->

Containers are not new, but momentum and ease around Docker's approach have pushed them to forefront.

### Containers vs VMs
A container runs natively on Linux and shares the kernel of the host machine with other containers. It runs a discrete process, taking no more memory than any other executable, making it lightweight.

By contrast, a virtual machine (VM) runs a full-blown “guest” operating system with virtual access to host resources through a hypervisor like virtualbox. In general, VMs provide an environment with more resources than most applications need.

<div class="row">
    <img class="responsive-img col s6" src="/images/docker1/container.png">
    <img class="responsive-img col s6" src="/images/docker1/vm.png">
</div>

### Installation
##### Windows
* __Windows 10 Pro/Enterprise Users__

    Install Docker for Windows, follow instructions at the [Link](https://docs.docker.com/docker-for-windows/install/#install-docker-for-windows-desktop-app)

* __Windows 10 Home, Windows 8/7/Vista Users__

    Install Docker Toolbox, follow instrunctions at the [Link](https://docs.docker.com/toolbox/toolbox_install_windows/)

##### Linux
Head over to Docker installation page for distro specific instruction, [Link](https://docs.docker.com/install/#server).
  
* [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
* [Debain](https://docs.docker.com/install/linux/docker-ce/debian/)
* [Fedora](https://docs.docker.com/install/linux/docker-ce/fedora/)
* [Arch Wiki](https://wiki.archlinux.org/index.php/Docker)

After installation follow [these steps](https://docs.docker.com/install/linux/linux-postinstall/).

##### Testing Installation
1. ###### Windows Users Only
    `i.` Open __Kitematic(Docker Toolbox)__ or __Docker for Windows__ app, depending on your installation type.
    <div class="row">
        <img class="responsive-img col s6" src="/images/docker1/kitematic.png">
        <img class="responsive-img col s6" src="/images/docker1/docker-windows.png">
    </div>

    `ii.` In `PowerShell` command line, Run
    ``` powershell
    docker-machine env | Invoke-Expression
    ```

2. __All Users__, Run `docker --version` to ensure that you have a supported version of Docker.
    ``` bash
    $ docker --version 

    Docker version 18.03.0-ce, build 0520e24302
    ```

3. Run `docker info` to view more details about your installation.
    ``` docker
    $ docker info

    Containers: 58
    Running: 0
    Paused: 0
    Stopped: 58
    Images: 7
    Server Version: 18.05.0-ce
    Storage Driver: aufs
    Root Dir: /mnt/sda1/var/lib/docker/aufs
    Backing Filesystem: extfs         
    ...                                            
    ```
> Linux Users, to avoid permission errors (and the use of `sudo`), add your user to the docker group. [Read more](https://docs.docker.com/install/linux/linux-postinstall/)

### Docker hello-world
1. Run the [hello-world](https://hub.docker.com/_/hello-world/) image.
    ``` docker
    $ docker run hello-world

    Unable to find image 'hello-world:latest' locally                                       
    latest: Pulling from library/hello-world                                                
    9bb5a5d4561a: Already exists                                                            
    Digest: sha256:f5233545e43561214ca4891fd1157e1c3c563316ed8e237750d59bde73361e77         
    Status: Downloaded newer image for hello-world:latest                                   
                                                                                      
    Hello from Docker!                                                                      
    This message shows that your installation appears to be working correctly.              
    ...                                            
    ```
    <!---
    <div class="row">
        <img class="responsive-img col s10 offset-s1" src="/images/docker1/docker-hello-world.png">
    </div>
    --->

2. List the hello-world image that was downloaded.
    ``` docker
    $ docker image ls

    REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
    hello-world         latest              e38bc07ac18e        2 months ago        1.85kB
    ```

3. List the hello-world container (spawned by the image).
    ``` docker
    $ docker container ls -all

    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                      PORTS                NAMES
    a8a7ea59bcc3        hello-world         "/hello"                 3 seconds ago       Exited (0) 2 seconds ago                         zealous_montalcini
    ```

### Images and Containers
In Docker, an __image__ is an executable package that includes everything needed to run an application--the code, a runtime, libraries, and config files.<br/>
A docker image is built from series of layers, each layer representing instruction in _images's_ __Dockerfile__. Each layer except the last one is read-only.

A __container__ is a runtime instance of image--what image becomes in memory when executed(that is, an image with a state).<br/>
We have an image, which is a set of layers as we describe. If we start this image, we have a running container of this image.

>  _Dockerfile is the recipe, image is the mould and container being the yummy cake._

<div class="row">
    <div class="col s12 m10 offset-m1">
      <div class="card">
         <div class="card-image">
            <img src="/images/docker1/container-layers.jpg">
         </div>
         <div class="card-content">
           <p style="text-align:justify;">Each layer is only a set of differences from the layer before it. Creating a new container adds a new writable layer on top of the underlying layers. This layer is often called the “container layer”. All changes made to the running container, such as writing new files are written to this thin writable container layer.</p>
         </div>
      </div>
    </div>
</div>

### Docker development environment
If we were to write a NodeJS app, our first priority isto to install Node runtime environment and additional packages as per our requirement. 

With Docker, we can just grab a portable Node runtime as an base image, no installation necessary. Then our build can include the base image alongside the app code. Ensuring that our app, its dependencies and runtime, all travel together.

These portable images are defined by a `Dockerfile`.