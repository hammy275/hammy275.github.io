---
title: Everything Else
---

There's a lot more to ImmersiveMC's API; the details above are only a taste! ImmersiveMC has [full Javadocs](/javadoc/), though be warned, **anything not in the `com.hammy275.immersivemc.api` package are internals, and can change at any time for any reason without any warning!**

Some good parts of the documentation to read once you've made your first Immersive are:

- All the [`HitboxPositioningMode`s](/javadoc/com/hammy275/immersivemc/api/client/immersive/HitboxPositioningMode.html) you can use with your `ImmersiveBuilder`.
- The [`Immersive`](/javadoc/com/hammy275/immersivemc/api/client/immersive/Immersive.html) interface and the [`ImmersiveInfo`](/javadoc/com/hammy275/immersivemc/api/client/immersive/ImmersiveInfo.html) to go with. You can implement subinterfaces of these interfaces yourself to create an `Immersive` exactly as you want with zero limitations. ImmersiveMC's beacon, for example, uses this system to offer the relatively extreme amount of flexibility and logic the beacon's Immersive uses.
- The [`ImmersiveLogicHelpers`](/javadoc/com/hammy275/immersivemc/api/common/ImmersiveLogicHelpers.html), [`ImmersiveRenderHelpers`](/javadoc/com/hammy275/immersivemc/api/client/ImmersiveRenderHelpers.html), and [`ImmersiveClientLogicHelpers`](/javadoc/com/hammy275/immersivemc/api/client/ImmersiveClientLogicHelpers.html) to make development that much easier.
- [`OBBFactory`](/javadoc/com/hammy275/immersivemc/api/common/hitbox/OBBFactory.html) and the [`OBB`s it outputs](/javadoc/com/hammy275/immersivemc/api/common/hitbox/OBB.html) if you want rotatable hitboxes for your Immersives. These are especially useful for `PlayerAttachmentImersive`s, which tend to be attached to VR body parts, which themselves can rotate arbitrarily.
