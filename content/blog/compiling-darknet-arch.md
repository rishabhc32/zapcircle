---
title: "Compiling Darknet on Arch"
date: 2019-01-10T21:09:54+05:30
draft: false
author: "RC"
cover_image: "/images/100dof/rc/day11.png"
image: "/images/100dof/rc/day11.png"
---

I and my friend Rohit were working on object detection for a project. So naturally, the first choice was to try [`YOLO`](https://pjreddie.com/darknet/yolo/) object detection. YOLO is implemented using [Darknet](https://github.com/pjreddie/darknet).

> Darknet is an open source neural network framework written in C and CUDA. It is fast, easy to install, and supports CPU and GPU computation.

You have to compile Darknet to run YOLO. There were few hiccups that I faced while compiling Darknet on Arch with Nvidia GPU. I will detail out the procedure for the same.

### For CPU
The procedure of running compiling Darknet and running YOLO on CPU is easy and is listed on its [website](https://pjreddie.com/darknet/yolo/).

### For Nvidia GPU
---
**NOTE**

Assuming all the packages are installed in their default location.

---

1. Clone the Darknet [repo](https://github.com/pjreddie/darknet).

    ``` bash
    git clone https://github.com/pjreddie/darknet.git
    cd darknet
    mkdir -o obj
    ```

2. Install OpenCV legacy version(`opt` directory version) from [here](https://aur.archlinux.org/packages/opencv2-opt).

3. Install CUDA from [here](https://www.archlinux.org/packages/community/x86_64/cuda/). And add installed CUDA binaries to `$PATH`.
    ``` bash
    # add this in ~/.bashrc
    export PATH="$PATH:/opt/cuda/bin"
    ```

4. Open `Makefile` in `darknet directory` and set __GPU__ and __OPENCV__ to 1.
    ``` ini
    #Makefile

    GPU=1
    OPENCV=1
    ```

5. Change first occurance of `LDFLAGS` and `COMMON` to the following:
    ``` ini
    LDFLAGS= -L/opt/cuda/lib64 -L/opt/opencv2/lib -lm -pthread -lstdc++ 
    COMMON= -Iinclude/ -Isrc/ -I/opt/cuda/include 
    ```
6. In `'ifeq ($(OPENCV), 1)'` section change `LDFLAGS` and `COMMON` to following and save it.
    ``` ini
    LDFLAGS+= -lopencv_calib3d -lopencv_imgproc -lopencv_contrib -lopencv_legacy -lopencv_core -lopencv_ml -lopencv_features2d -lopencv_objdetect -lopencv_flann -lopencv_video -lopencv_highgui
    COMMON+= -I/opt/opencv2/include
    ```
7. Now run `make`
    ``` bash
    make -j 8
    ```
8. If you have any errors, try to fix them or ask in comment box. If everything seems to have compiled correctly, try running it!
    ``` bash
    LD_LIBRARY_PATH=/opt/opencv2/lib ./darknet
    ```

    Download YOLOv3 pre-trained weights.
    ``` bash
    wget https://pjreddie.com/media/files/yolov3.weights
    ```

    Try running it on input from a webcam.
    ``` bash
    LD_LIBRARY_PATH=/opt/opencv2/lib ./darknet detector demo cfg/coco.data cfg/yolov3.cfg yolov3.weights
    ```
    > We are setting `LD_LIBRARY_PATH` so that the linker can find OpenCV's dynamic libraries. Else it will show errors.

9. If you have less powerful GPU, like mine(I have MX 150), try running __Tiny YOLOv3__.
    ``` bash
    # download weights
    wget https://pjreddie.com/media/files/yolov3-tiny.weights

    # run the detector
    LD_LIBRARY_PATH=/opt/opencv2/lib \
    ./darknet detect cfg/yolov3-tiny.cfg yolov3-tiny.weights data/dog.jpg
    ```

<div class="row">
    <img class="responsive-img" src="/images/100dof/rc/day11.jpeg">
    <figcaption>Running Tiny YOLOv3, at 5 fps on MX 150</figcaption>
</div>
   
