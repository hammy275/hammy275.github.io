---
parent: The ImmersiveMC API
nav_order: 1
---

# What is an Immersive?

Before we jump into writing some code, it's important to cover a seemingly obvious question. What *is* an Immersive?

From a user's perspective, this can be pretty well-defined as any individual ImmersiveMC feature that can be enabled or disabled. However, once you start working with ImmersiveMC's codebase in any way, you'll come to realize there are a few definitions for the word "Immersive" that are used interchangeably:

1. The aforementioned user-definition of an Immersive.
2. The aforementioned user-definition of an Immersive, but only for ones that are tied to blocks. This is also called a "block-based Immersive". Something like the furnace's Immersive falls under this definition, while the ranged grab Immersive does not.
3. A literal implementation of the `Immersive` interface. You'll learn more about this as you go along.

As you can see, the term "Immersive" isn't quite so clear-cut! You may have to infer which definition is being used from context, but to keep things clear, the ImmersiveMC API specifically allows for the implementation of block-based Immersives (2) using at least one implementation of the `Immersive` interface (3).
