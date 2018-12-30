---
title: "Day6"
date: 2018-12-30T14:44:58+05:30
draft: false
author: "Rohit"
cover_image: "/images/100dof/rohit/rohit-day6.jpg"
---
Stick to the work it will yield results. Yesterday i trained a model that was not satisfying as it was overfitting but after investigating i found that the fault is in the data. Most of the faces are in the same allignment so model was predicting the same position everytime still i managed to improve the validation accuracy from 43.23% to 70% and added the work with some sunglasses filters using openCV. 
<!--more-->
#### Pledge
I, Rohit Sethi swear to complete `#100DaysOfCode` to the best of my ability and with true spirit.

<br>

#### Task Completed
On Day 6, I did the following :-

```
Trained a CNN to predict 15 facial KeyPoints and putting filters over faces by detecting faces by haar cascade.
```
<br>

#### Learnings
On Day 6, I learnt the following :-

1. I studied `1-D convoltions` working.

2. Difference between `same` and `valid` padding.

3. Using `Haar Cascade` to identify bounding box over the face in an image.

4. Revised - Why `BatchNormalization` works ?

<br>

link to the work on Day 6 [here](https://github.com/rohit3463/-100DaysOfCode/blob/master/Day6/facial_keypoint_detection.py) 