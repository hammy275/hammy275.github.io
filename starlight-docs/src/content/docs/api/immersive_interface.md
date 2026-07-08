---
title: Fully Controlled Immersives (The Immersive Interface)
---

If you've followed the block-based Immersive tutorial above, it mainly focuses on utilizing the `BlockBasedImmersiveBuilder`, which makes building block-based Immersives much easier, at the cost of less flexibility and functionality. If you want full control, or if you simply want to implement another type of Immersive, such as a player-attachment Immersive, then you'll want to learn about the full `Immersive` interface.

In short, a subinterface of `Immersive` (such as `BlockBasedImmersive` or `PlayerAttachmentImmersive`) is the client-side portion of an Immersive, with the server and common parts handled by an [`ImmersiveHandler`](/api/block_based/handler). Notably, you cannot implement `Immersive` directly, as it is only the marker that something is an `Immersive`, not what type of Immersive it corresponds to!

Let's break down what each method in an `Immersive` should be implemented as. From there, you can simply register an instance of it [like you would any other Immersive](/api/block_based/builder/#registration-time), and you'll be set!

## First: `ImmersiveInfo`s

Before we jump into that, though, it's important to understand the `ImmersiveInfo` interface. If you haven't already, read [its short description](/api/concepts/handler/#the-immersiveinfo-interface) first!

Note that like `Immersive`s, `ImmersiveInfo`s have seperate sub-interfaces for each type of Immersive, such as `BlockBasedImmersiveInfo` and `PlayerAttachmentImmersiveInfo`. Only understandin the base `ImmersiveInfo` should be enough to get you on your way, its subinterfaces can be learned about from the Javadocs:

- `getAllHitboxes()`: Returns all hitboxes for this instance of the Immersive. Notably, the index into the list returned here should correlate with the slot number of that hitbox in terms of hitbox interaction (more on that later). The list itself cannot be null, but may contain null elements. Notably, the hitboxes returned here are themselves `HitboxInfo`s, which contain the following methods:
    - `getHitbox()`: Returns the actual hitbox for hit detection. The special `BoundingBox` interface here means you can either return a Minecraft `AABB` or ImmersiveMC's [`OBB`](/javadoc/com/hammy275/immersivemc/api/common/hitbox/OBB.html).
    - `isTriggerHitbox()`: Whether the hitbox should require the trigger button to be pressed to be interacted with for VR-users. This has no effect for non-VR users.
    - `getRenderHitbox()`: If your hitbox is stationary, this can return the same hitbox as `getHitbox()`. Otherwise, this should return your hitbox interpolated for rendering.
- `hasHitboxes()`: Whether your Immersive has hitboxes or not. In general, you can simply return here whether at least one element of `getAllHitboxes()` is non-null.
- `setSlotHovered()`: This method is called by ImmersiveMC to inform the info that the slot at the index `hitboxIndex` into `getAllHitboxes()` is being hovered by the hand corresponding to `InteractionHand.values()[handIndex]` (`0` for the main hand and `1` for the off-hand).
- `getSlotHovered()`: This method should return the slot being hovered by the provided `handIndex` (`0` for the main hand and `1` for the off-hand), or -1 if no slot is being hovered by that hand.
- `getTicksExisted()`: This method should return the number of times `Immersive#tick()` has been called with this `ImmersiveInfo`. More on this method below.

## The `Immersive` Interface

This is the base interface that client-side Immersive functionality extends off of. Whether you build a block-based Immersive or player-attachment Immersive, you'll need to understand this interface deeply. Some parts of this interface map neatly to the block-based Immersive builder, while others were abstracted away for you by that very system, though now you must learn to gain full control of your `Immersive`. Everything mentioned here, like the rest of ImmersiveMC, has its own Javadoc that you may find helpful to read, though it will be explained in more plain-English here.

- `getTrackedObjects()`: This method should return a list that holds your `ImmersiveInfo` instances. If your Immersive's `ImmersiveHandler` denotes this Immersive as client-authoritative, you can add and remove to this list as you desire. Either way though, this list will be added to and removed from by ImmersiveMC, so be sure it's mutable! An easy way to implement this is to simply keep a list of your infos in your `Immersive` implementation, then return that list here:

    ```java
    private final List<MyImmersiveInfoImplementation> infos = new ArrayList<>();

    @Override
    public Collection<LecternInfo> getTrackedObjects() {
        return this.infos;
    }
    ```

- `handleHitboxInteract()`: This method is called whenever one or more hitboxes are interacted with. The list of hitboxes are indices into the hitboxes from the provided info's `getAllHitboxes()`. A user can interact with more than one hitbox if you return a non-null hitbox in `getDragHitbox()` (see below), thus causing the list to be larger than one element in length. Otherwise, the list will always be one element long. Generally, a call to `ImmersiveClientLogicHelpers#sendSwapPacket()` is used here, as this instructs the client to ask the server to perform the swap. Lastly, this method should return the number of ticks of cooldown until the user can interact with something again. You can retrieve the default cooldown using `ImmersiveClientConstants#defaultCooldown()`, though you can return a longer or shorter cooldown if you feel it's best.
- `tick()`: When called, one should tick the logic of the provided info. This is called at the game tick rate, by default 20 times per second. This is a good spot to calculate the hitboxes for interacting with the Immersive.
- `getDragHitbox()`: This is a hitbox used for dragging functionality. While a non-VR player is looking at this hitbox or a VR player's hand is in this hitbox, they are able to drag across multiple slots. This should generally cover all slots in your Immersive that can have items placed into them, your input hitboxes.
- `isInputHitbox()`: Whether the provided `hitboxIndex` is an input hitbox, allowing for items to be placed in. Only input hitboxes can be dragged between.
- `shouldRender()`: Whether your Immersive should attempt to render anything (call `Immersive#render()`). It's generally safe to return `true` here.
- `render()`: When called, this method should render your Immersive. The provided `ImmersiveRenderHelpers` here you may find convenient to perform some common actions, most notably `ImmersiveRenderHelpers#renderItemWithRenderState()`, which allows you to render an item guide + hitbox + item in one function call. Note that this method uses a render state rather than your info, more on this later.
- `getHandler()`: This should return the `ImmersiveHandler` implementation for your Immersive.
- `configScreenInfo()`: If you'd like your Immersive to be customizable on ImmersiveMC's config screen, you can return an `ImmersiveConfigScreenInfo` here, which you can create using `ImmersiveMCClientRegistration#createConfigScreenInfoOneItem()` and `ImmersiveMCClientRegistration#createConfigScreenInfoMultipleItems()`. Despite where these methods are located, you don't need to worry about registering these.
- `processStorageFromNetwork()`: If your `ImmersiveHandler` denotes your Immersive as client-authoritative, this method is not called. Otherwise, this is the method called whenever the server sends new data for your Immersive. Notably, if the client receives data from the server for an info that doesn't already exist, a new info will be created and called with this method.
- `createRenderState()`: ImmersiveMC separates the logic-based infos from the state used to render said infos. In this method, one should simply create a blank instance of a class to hold the state needed for rendering. Notably, this object is what will be passed to `Immersive#shouldRender()` and `Immersive#render()`.
- `extractRenderState()`: This method should extract state from the info provided and place it into the render state provided. Note that state placed into the render state should not be mutated if those same things are mutated in the info. For example, if your info holds an `ArrayList` that you need to have in your render state, you should use a copy of that list, in case the original list is changed later.
- `globalTick()`: One can optionally implement this method to perform some logic once per tick before infos are individually ticked.

## The Immersive-Specific Interfaces

Each type of Immersive has its own interface that you'll actually be implementing. These extend `Immersive`, but also carry some methods of their own that will need implementing.

### `BlockBasedImmersive`

- `buildInfo()`: Given the provided block position and level, construct a new info for the Immersive. This should not be added to `getTrackedObjects()`, ImmersiveMC will do this for you.
- `shouldDisableRightClicksWhenVanillaInteractionsDisabled()`: This should return whether a right-click/use interaction should be blocked on the provided info if the user has the option enabled in ImmersiveMC to disable right-clicks/the use interaction for Immersive blocks. You should generally return true here if all functionality of the block can be accessed via the Immersive and false otherwise.
- `isVROnly()`: Whether this Immersive should only be accessible to VR-users.

### `PlayerAttachmentImmersive`

- `buildInfo()`: Given the provided player who owns this instance of the Immersive, construct a new info for the Immersive. This should not be added to `getTrackedObjects()`, ImmersiveMC will do this for you. Note that this method will only be called for Immersives that are not client-authoritative, though if this is the case, it may be called for players other than the local player!
- `getLocalPlayerInfo()`: This is a helper method you do not need to override. This returns the info for this Immersive for the local player, or null if no such info exists.

## Concluding

The above methods are a lot, but if you implement them all, you'll have your own `Immersive` that does exactly what you want! Be sure to register it with `ImmersiveMCClientRegistration#addImmersiveRegistrationHandler()`!