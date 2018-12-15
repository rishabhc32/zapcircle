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
The frontend is written in `Vue.js` using single-file components. The weights obtained from training part are used for inference via `Tensorflow.js`. The boilerplate for vue is generated via `vue-cli` using only the `babel` plugin. `Fabric.js` is used for canvas. It is a simple and powerful HTML `canvas` library. I am assuming that you have working knowledge of Vue.js.

```
Root
└───App
    │   Title
    │   Description   
    └───Canvas
            RangeSlider 
            CustomButton
            CustomButton
```
We have the above components with hierarchy.

<br>

<img class="responsive-img" src="/images/shape-detector/component.jpeg">

> 'ClearButton' in image should have been 'CustomButton'.

*  _'Title'_ and _'Desciption'_ are simple components and do not need explanation.  
* The __CustomButton__ component emits an `ButtonClick` event when clicked. Text in the button can be set in the parent component using _buttonText_ prop.
* The __RangeSlider__ component emits an event `sliderInput` with slider's current value as the event's argument.

<br>

``` js
import * as tf from '@tensorflow/tfjs'

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    mounted: async function() {
        let model = await tf.loadModel('model/model.json') // load model weights
        Vue.prototype.$model = model
        
        let res = await fetch('model/class_names.txt') // load class_name file
        let text = await res.text()
        Vue.prototype.$classArray = text.split('\n')

```
Model weights and class_name file(file which tells class name corresponding to index) are loaded when the _Root_ vue component is mounted. `Vue.prototype.$model` and `Vue.prototype.$classArray` are set so that they can be directly use in other components with `this.$model` and `this.$classArray`.

#### The Canvas component
This is the component where most of the frontend logic lies. The canvas size is set to `300x300` pixels.  

<img class="responsive-img" src="/images/shape-detector/canvas_component.png">

``` js
data: function() {
    return {
        fabricCanvas: null,
        canvasContext: null,
        sliderStyle: {
            width: '300px',
            margin: 'auto',
        }
    }
}
```
The `data` object in _Canvas_ component has following properties:

* __fabricCanvas__ -- Current fabric canvas object  
* __canvasContext__ -- The `canvas` element's 2D rendering context
* __sliderStyle__ -- It is `RangeSlider` prop object bound to its `style` attribite

Then we have `setSliderValue`, `clearCanvas` and `maxIndex` methods to set canvas' brush size, to clear the canvas and return index with maximum probability in an array respectively.

> -- Set background of canvas as white(`#ffffff`) after every clear operation else it will give wrong prediction everytime, as canvas' default background is transparent.   
> -- `fabricCanvas.backgroundColor = '#ffffff' `

<br>

``` js
preprocessImage: function(imgData) {
    return tf.tidy(()=>{
        let tensor = tf.fromPixels(imgData, 1) // convert the image data to a tensor

        // resize to 28 x 28  
        const resized = tf.image.resizeBilinear(tensor, [28, 28]).toFloat() 

        // Normalize the image 
        const offset = tf.scalar(255.0)
        const normalized = tf.scalar(1.0).sub(resized.div(offset))

        // insert a dimension of 1 into a tensor's shape
        const batched = normalized.expandDims(0)
        return batched
    })
}
```
In `preprocessImage` function we take the current image from the canvas, convert it to a tensor, resize and normalize it then finally add an dimension of 1 to get _batch shape_.

<br>

``` js
predictImage: function() {
    // get the image from canvas
    let image = this.canvasContext.getImageData(0, 0, this.fabricCanvas.getWidth(), this.fabricCanvas.getHeight())

    // preprocess the image and prediction
    let pred = this.$model.predict(this.preprocessImage(image)).dataSync()

    // get array index with max probability
    let maxIndex = this.maxIndex(pred)
    alert("Prediction: " + this.$classArray[maxIndex])
}
```
`model.predict` returns the probabilities of each class. The prediction array(`pred`) has 100 elements. We show `classArray[maxIndex]` as the prediction to shape drawn in the canvas.

## Testing
<img class="responsive-img" src="/images/shape-detector/example_pants.jpeg">
Prediction: shorts

<img class="responsive-img" src="/images/shape-detector/example_smiley.jpeg ">
Prediction: smiley_face

<img class="responsive-img" src="/images/shape-detector/example_inaccurate_smiley.jpeg ">
Prediction: moon

__It is not always accurate.__
