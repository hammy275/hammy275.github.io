---
parent: The ImmersiveMC API
nav_order: 4
---

# Everything Else

There's a lot more to ImmersiveMC's API; this is only a taste! ImmersiveMC has [full Javadocs](/javadoc/), though be warned, **anything not in the `com.hammy275.immersivemc.api` package are internals, and can change at any time!**

Some good parts of the documentation to read once you've made your first Immersive are:

-  All the [`HitboxPositioningMode`s](/javadoc/com/hammy275/immersivemc/api/client/immersive/HitboxPositioningMode.html) you can use.
- [`Immersive`](/javadoc/com/hammy275/immersivemc/api/client/immersive/Immersive.html) and the [`ImmersiveInfo`](/javadoc/com/hammy275/immersivemc/api/client/immersive/ImmersiveInfo.html) to go with. You can implement these interfaces yourself to create an `Immersive` exactly as you want. ImmersiveMC's beacon, for example, uses this system.
- The [`ImmersiveLogicHelpers`](/javadoc/com/hammy275/immersivemc/api/common/ImmersiveLogicHelpers.html) and [`ImmersiveRenderHelpers`](/javadoc/com/hammy275/immersivemc/api/client/ImmersiveRenderHelpers.html) to make development that much easier.
- [`OBBFactory`](/javadoc/com/hammy275/immersivemc/api/common/hitbox/OBBFactory.html) and the [`OBB`s it outputs](/javadoc/com/hammy275/immersivemc/api/common/hitbox/OBB.html) if you want rotatable hitboxes for your Immersives.