---
title: "Day 7"
date: 2018-12-31T13:14:12+05:30
draft: false
author: "RC"
cover_image: "/images/100dof/rc/day7.png"
---

Initially, I made a `Node.js` __C++ addon__ without ABI stability. Then I learned about Node.js `N-API`, which is a `C` API that ensures ABI stability across Node.js versions. I used `node-addon-api` which is a C++ wrapper to N-API, to make a native addon. 