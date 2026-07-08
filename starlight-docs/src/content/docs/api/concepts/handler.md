---
title: Immersives and Their Handlers
---

From a code perspective, an Immersive consists of two parts:

1. An implementation of a subinterface of the `Immersive` interface, such as an implementation of `BlockBasedImmersive`.
2. An implementation of a subinterface of the `ImmersiveHandler` interface, such as an implementation of `BlockBasedImmersiveHandler`.

Let's talk about each of these separately:

## The `Immersive` Interface

The `Immersive` interface (and its subinterfaces) holds code and info related to the client-side only aspect of Immersives. This includes things such as determining the position of hitboxes, the code to run when a hitbox is interacted with, and code to render the Immersive in the game world.

### The `ImmersiveInfo` Interface

The `ImmersiveInfo` interface (and its subinterfaces) holds information related to one instance of an active Immersive. Using the furnace as an example, there is only one `Immersive` for the furnace, however there can be several `ImmersiveInfo`s, one for each placed furnace block. `ImmersiveInfo`s hold information about the state of the Immersive.

### The `ImmersiveRenderState` Interface

The `ImmersiveRenderState` interface holds information related to rendering `Immersive`s. These can be thought of as the rendering version of an `ImmersiveInfo`.

## The `ImmersiveHandler` Interface

On the other hand, the `ImmersiveHandler` interface (and its subinterfaces) holds code and info for the server-side aspect and the shared common aspect of Immersives. This includes things such as the behavior to run server-side to swap items between a slot and the player (server-side only), what blocks match the Immersive for block-based Immersives (common), and whether the Immersive is currently enabled by the player (common).
