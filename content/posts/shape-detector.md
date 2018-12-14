---
title: "Shape Detector"
date: 2018-12-14T19:12:49+05:30
draft: true
author: "Rohit, RC"
cover_image: "/images/shape-detector/cover.png"
---

This is a simple tool that predicts the drawing drawn on the canvas. It uses CNN to recognize drawings. The CNN in trained on [Quick, Draw! dataset](https://github.com/googlecreativelab/quickdraw-dataset). Trained model's weights are used to make inference on browser using `Tensorflow.js`. 
<!--more-->

<div class="row">
    <img class="responsive-img col" src="/images/shape-detector/example.jpeg">
</div>

You can find the demo [here](https://shape-detector.netlify.com/
) and source code [here](https://github.com/rishabhc32/shape-detector).

## Frontend
The frontend is written in `Vue.js` using single-file components. The weights obtained from training part are used for inference via `Tensorflow.js`. The boilerplate for vue is generated via `vue-cli` using only the `babel` plugin.

We have five components:

1. hello