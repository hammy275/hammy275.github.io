---
title: What is an Immersive?
---

Before writing any code, it's important to understand some concepts. Firstly: what *is* an Immersive?

From a user's perspective, this is pretty well-defined as any individual ImmersiveMC feature that can be enabled or disabled in ImmersiveMC's configuration. However, once you start working with ImmersiveMC's API in any way, you'll come to realize there are a couple definitions for the word "Immersive" that are used interchangeably:

1. The aforementioned user-definition of an Immersive.
2. A literal implementation of the `Immersive` interface. Notably, this interface is not used for all Immersives that ImmersiveMC provides to users!

As you can see, the term "Immersive" isn't quite so clear-cut! You may have to infer which definition is being used from context, but to keep things clear, the ImmersiveMC API specifically allows for the implementation of several types of Immersives (1) using implementations of the subinterfaces of the `Immersive` interface (2).
