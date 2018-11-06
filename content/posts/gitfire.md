---
title: "The weekend project -- gitfire"
date: 2018-11-06T11:47:02+05:30
draft: true
author: "RC"
cover_image: "/images/gitfire/cover1.jpeg"
---

I found this meme on [r/ProgrammerHumor](https://www.reddit.com/r/ProgrammerHumor/comments/8d0t9w/git_fire/) about __git fire__. So I and my friend Rohit thought that we could make a cool DIY project, hooking up a DIY smoke detector with `gitfire`.

<!--more-->

<div class="row">
    <img class="responsive-img col s6 push-s3" src="/images/gitfire/gitfire_meme.jpeg">
</div>

### The Idea
We wanted to hook a smoke detector to our machine. It would push all unstaged work to the remote GitHub repo, on detecting smoke, automating the following workflow.

I case of fire

1. `git commit`   
2. `git push`   
3. Leave building

For the smoke detector instead of buying one, we decided to make our own using Arduino. We settled on making an optical(IR) smoke detector.

On Arduino, whenever the smoke detector detects smoke it writes _'1'_ on Serial port.

On the software side, there is a python script running as a daemon every minute. It does the following.

* Check if Arduino is connected to a USB port.
* If connected, read from the USB serial port.
* If we read _'1'_, it means the smoke detector is set, do the following.
    * Create a new branch with today's date and time in its name
    * Stage all the changes to that branch
    * Commit and push it to the remote repo
    * Exit
* Do this every 60 seconds.

### Smoke detector
Instead of buying a Gas smoke detector like the __MQ2 Gas Sensor__, we decided to make one ourselves just because of sheer laziness. Going to the shop and just buying a smoke sensor is a time consuming and tedious process.

<div>
    <img class="responsive-img  center" src="/images/gitfire/mq_gas_sensor.jpeg">
    <figcaption>MQ2 Gas Sensor</figcaption>
</div>

We made an optical smoke detector using an Arduino, IR emitter and photo-diode. The optical smoke detector utilizes the light scatter sensing principle. It has an infrared light source, which emits IR and a photo-diode. When infrared light scatters from smoke entering the chamber, it is sensed by the photo-diode.

<div class="row">
    <img class="responsive-img" src="/images/gitfire/smoke_detector_diagram.jpeg">
</div>

We cut off the IR emitter and detector from its circuit board and extended them using wires. Then we mounted the IR emitter and photo-diode on a rubber tire which acted as smoke detector's chamber.

<div class="row">
    <img class="responsive-img col s6" src="/images/gitfire/initial_smoke_detector.png">
    <img class="responsive-img col s6" src="/images/gitfire/final_smoke_detector.jpeg">
</div>

On the software side of Arduino, we check the state of IR sensor every 10 seconds. If in this interval of 10 seconds IR's state changes for more than five times we write _'1'_ on the serial port, indicating potential fire outbreak.

You can find sketch's source code for the same [here](https://github.com/rohit3463/gitfire/blob/master/arduino/arduino.ino).

### Software
There is a python script running as a daemon every minute. The daemon is named `gitfired` adhering to the Unix convention of naming daemons by appending the letter _d_. It is essentially a `systemd service` which is run every 60 seconds by `gitfired.timer`, a `systemd timer`.

You can find the source code here: [gitfired.service](https://github.com/rohit3463/gitfire/blob/master/gitfired.service), [gitfired.timer](https://github.com/rohit3463/gitfire/blob/master/gitfired.timer).

> __Note:__ This daemon only works on Linux machines using `systemd` as service manager.

The config file is defined in `~/.config/gitfire.conf` in `INI` file format.
``` ini
[DEFAULT]
GIT_FIRE_REPO = /home/spooderman/Documents/trialrepo
```
Rules for defining `gitfire.conf`   

* The location must be `~/.config/gitfire.conf`.
* There should be a `DEFAULT` section and a key named `GIT_FIRE_REPO`.
* Value for the key `GIT_FIRE_REPO` should be a path to a fully qualified git repo.

> __Note:__ The default git username should have ssh access to GitHub on that machine so that the daemon is not stuck, asking for username and password while pushing changes to the remote branch. Remote repo for the local git repo should also be set.

Then there is a python script `gfcheckconfig.py`. It checks whether the config file is defined properly. It also checks whether your global git username has ssh access to GitHub on that machine. To run the checks, fire up the terminal and run
`python gfcheckconfig.py`.

Source code can be found [here](https://github.com/rohit3463/gitfire/blob/master/gfcheckconfig.py).

The main file is `gitfire.py` which reads the Serial port for any change and pushes local changes to a separate remote branch in case of fire. Working of `gitfire.py` is explained at the end of '[The Idea](#the-idea)' section.

Source code: [gitfire.py](https://github.com/rohit3463/gitfire/blob/master/gitfire.py)

### Working
* Connect Arduino to your machine and upload the sketch to Arduino.
* Place `gitfired.service` and `gitfired.timer` in `/etc/systemd/system/`.
* Start `gitfired.timer` using `sudo systemctl start gitfired.timer`
* Monitor daemon's logs via `journalctl -fu gitfired.service`
* Light up a matchstick or a lighter so that smoke can enter smoke detector's chamber.
* You can see a log entry when the fire is detected. Verify the same by going to GitHub.

> Note: To run the `gitfire` daemon on every boot enable `gitfired.timer` by running `sudo systemctl enable gitfired.timer`

<div class="row">
    <img class="responsive-img" src="/images/gitfire/cover.jpeg">
    <figcaption>Smoke detector</figcaption>
    <br>

    <img class="responsive-img" src="/images/gitfire/1_ss.jpeg">
    <figcaption>Before fire</figcaption>
    <br>

    <img class="responsive-img" src="/images/gitfire/2_ss.jpeg">
    <figcaption>After fire</figcaption>
    <br>

    <img class="responsive-img" src="/images/gitfire/3_ss.jpeg">
    <figcaption>Daemon and timer logs</figcaption>
    <br>

    <img class="responsive-img" src="/images/gitfire/4_ss.jpeg">
    <figcaption>Changes pushed to the remote branch</figcaption>
</div>

### Source Code
The whole source can be found on [GitHub](https://github.com/rohit3463/gitfire).

* `arduino/arduino.ino` - Arduino sketch    
* `gfcheckconfig.py`
* `gitfire.py`   
* `gitfired.service`   
* `gitfired.timer`

<br>
It was a fun weekend project, we enjoyed making it.