---
parent: The ImmersiveMC API
nav_order: 3
---

# The `ImmersiveBuilder`

Now that you've made an `ImmersiveHandler`, you're ready to make the "client-side" part of your Immersive! Let's learn the easy way, the `ImmersiveBuilder`.  The `ImmersiveBuilder` is a quite powerful tool that handles several difficult aspects of making an Immersive and boils it down to a simple builder pattern. It may not give you the unlimited control a full `Immersive` implementation would, but it's powerful enough to create nearly any item-swapping Immersive you can think of with ease! ImmersiveMC uses it for things as simple as the furnace to things as complex as the enchanting table to give you an idea of what things are possible.

## Relative Hitboxes

The `ImmersiveBuilder` works off of what are called "relative hitboxes". Relative hitboxes, unlike normal hitboxes, are defined by an offset from some position, with the offset being determined by the [`HitboxPositioningMode`](/javadoc/com/hammy275/immersivemc/api/client/immersive/HitboxPositioningMode.html) you choose for your Immersive. For example, the crafting table uses `HitboxPositioningMode.TOP_PLAYER_FACING`. This means:
- All offsets originate from the top-center of the crafting table, the exact center of the middle slot on the texture.
- Items will default to rendering facing the sky.
- Offsets in the x direction always move right relative to the player when positive, and left when negative. For the crafting table, an offset of (0.125, 0, 0) is what ImmersiveMC uses to land exactly on the right-center square.
- Offsets in the y direction always move forward when positive and backward when negative. For the crafting table, an offset of (0, -0.125, 0) is what ImmersiveMC uses to land exactly on the bottom-center square.
- Offsets in the z direction always move up when positive and down when negative. ImmersiveMC uses a positive z-value to place the output of the crafting table far above the table itself.

This is why the `ImmersiveBuilder` is so powerful! Leveraging relative hitboxes, you don't need to think about actual Minecraft coordinates in the world. Simply think in terms of offsets, and ImmersiveMC will do all the hard work!

## Let's Get Building

You're going to want to store your Immersive in a variable somewhere, so let's declare that and start building it. You'll need to pass in the `ImmersiveHandler` you made before to get building; all `Immersive`s need an `ImmersiveHandler` to function, and this is no exception!

```java
public static final BuiltImmersive<?,?> myImmersive = ImmersiveBuilder.create(myHandler)
```
Great! Now let's start building out our Immersive, modeled after the Immersive for the smithing table. You don't technically need to include anything here to have a valid Immersive, but you'll want at least some of it to have something useful:

- `.setPositioningMode(HitboxPositioningMode.TOP_PLAYER_FACING)`: This sets our positioning mode so we place hitboxes in the same way as described for the crafting table.
- `.addHitbox(RelativeHitboxInfoBuilder.createItemInput(new Vec3(-0.3333, 0, 0), 0.325).build())`: This makes a hitbox with size 0.325 and places it 0.3333 blocks to the left. Notice how we use `createItemInput()` here, as this hitbox should accept items.
- `.addHitbox(RelativeHitboxInfoBuilder.createItemInput(Vec3.ZERO, 0.325).build())`: This makes a second input hitbox in the exact center.
- `.addHitbox(RelativeHitboxInfoBuilder.createItemInput(new Vec3(-0.3333, 0, 0), 0.325).build())`: Lastly, a third item input hitbox.
- `.addHitbox(RelativeHitboxInfoBuilder.create(info -> info.getItem(3).isEmpty() ? null : new Vec3(0, 0, 0.5), 0.325).holdsItems(true).triggerHitbox(true).itemSpins(true).itemRenderSizeMultiplier(1.5f).forceUpDownRenderDir(ForcedUpDownRenderDir.NULL).build())`: Whew! This one is for the output of our smithing table, but there's a lot that goes into this hitbox. Let's break it down.
    - `info -> info.getItem(3).isEmpty() ? null : new Vec3(0, 0, 0.5)`: Instead of using a constant offset, we can actually use an offset calculated by code! The function accepts a `BuiltImmersiveInfo` instance, which, among other things, contains the items currently stored in our Immersive right now. Counting from 0, this hitbox is index 3, so we look at the item at index 3. If it's empty, we return null, denoting that this hitbox should not exist. If there is such an item, there must be a valid output, and we declare our offset to be 0.5 blocks above the smithing table.
    - `.holdsItems(true)`: Declares that this hitbox holds items. `createItemInput()` beforehand did this for us, but now we need to do it manually.
    - `.triggerHitbox(true)`: Declares that this hitbox should require a "break block" press to be interacted with by VR users.
    - `.itemSpins(true)`: Unless disabled in the player's config, this tells ImmersiveMC to spin the item in this hitbox.
    - `.itemRenderSizeMultiplier(1.5f)`: This tells ImmersiveMC to render the item at 1.5x its normal size without increasing the size of the hitbox itself.
    - `.forceUpDownRenderDir(ForcedUpDownRenderDir.NULL)`: This tells ImmersiveMC to render the item without forcing it to face the sky. Our chosen `HitboxPositioningMode` causes items to render facing towards the sky, so this prevents it for the output.
    - `.build()`: Build our hitbox
- `.setRenderSize(0.3333f)`: Sets the default rendering size for all items.
- `.setHitboxInteractHandler((info, player, slot, hand) -> {
        ImmersiveClientLogicHelpers.instance().sendSwapPacket(info.getBlockPosition(), slot, hand);
        return ClientConstants.defaultCooldownTicks;
    })`: This tells the Immersive what to do when a player interacts with a hitbox. The body of the method simply sends a packet to the server telling it to call your `ImmersiveHandler`'s `swap()` method with the slot of the hitbox that was interacted with.
- `.build()`: Builds our Immersive!

And that's it! Declare the variable, place these all in, and you have a fully-build Immersive! If you look in `ImmersiveBuilder`, you'll see there's a lot more you can add. Anything from text to config screen information can all be added here.

## Registration Time

Like with `ImmersiveHandler`s, you'll need to register your newly `BuiltImmersive`. This should only be done on the client, and can be done by placing the following code in code that runs from your mod constructor only on your client:

```java
ImmersiveMCClientRegistration.instance().addImmersiveRegistrationHandler(event -> {
    if (ImmersiveMCMeta.instance().compatibleWithAPIVersion("2.0")) {
        event.register(myImmersive);
    }
});
```

Notice that we have the same version check as mentioned when we were registering our handler.

And you're done! At this point, if you launch the game, you should have your Immersive fully working!
