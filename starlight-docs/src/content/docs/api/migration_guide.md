---
title: Migration Guide
---

This page details the vast majority of changes you'll need to make to migrate between different versions of ImmersiveMC's API, alongside new additions to the API that you may find useful. Note that the ImmersiveMC version mentioned in parentheses next to an API version is the first ImmersiveMC version to provide that API. That same API version is provided until the next ImmersiveMC that provides a different API. For example, API version 2.0 is provided for ImmersiveMC v1.5.0 until ImmersiveMC v1.5.8, as the ImmersiveMC version following that (ImmersiveMC v1.6.0-alpha1) provides API version 3.0.

The main thing not covered are changes in package location (your IDEs auto-import can help with that), though renames will still be mentioned.

### Side Note: ImmersiveMC's API Versioning

ImmersiveMC's API versions follow [semantic versioning](https://semver.org/), though with no patch version number. This means that increments to the first number (such as 1.x -> 2.0) denote backwards-incompatible changes, while increments to the second number (such as x.1 -> x.2) denote backwards-compatible changes that add new API functionality. Note that the following are the only changes that would result in a major version bump, noting that this only applies to classes, functions, etc. in the API:

- A class has its name changed, its package changed, or its type parameters changed.
- A class' Javadoc is updated for a reason other than correcting spelling mistakes or grammatical errors. In other words, if the class is documented to behave differently than before.
- A function has its named changed, changes which class it is contained in, or its type parameters changed.
- A function has its return type or parameters changed.
- A function has its Javadoc updated for a reason other than correcting spelling mistakes or grammatical errors. In other words, if the function is documented to behave differently than before.

Notably, the API may change runtime behavior so long as the Javadoc would not need to be updated to maintain accuracy. Examples of changes that would NOT necessitate a major API version bump include:

- A method that is not documented to throw a `NullPointerException` but does can silently change to no longer to.
- A method that does not throw a `NullPointerException` can begin to throw a `NullPointerException` when provided with invalid arguments.
    - Note that if valid arguments would cause a `NullPointerException` to be thrown, this would require an update to the Javadoc and thus would cause a major API version bump.

In summary a major version bump occurs if some class or function has different *compile-time* behavior than before or has different *documented* behavior than before. Non-documented runtime behavior may change without notice.

## 1.0 (ImmersiveMC v1.5.0-beta2) to 2.0 (ImmersiveMC v1.5.0)

### Additions

- `ImmersiveClientConstants`, containing several constants to help make your Immersive match Immersives provided by ImmersiveMC.
- `ImmersiveRenderHelpers#renderImage()` to render loaded images in the world.
- `ImmersiveBuilder#extraRenderer()` and `ExtraRenderer` to allow you to perform additional rendering alongside rendering already done in a `BuiltImmersive`.
- `HitboxPositioningMode#HORIZONTAL_BLOCK_FACING_ATTACHED_FLOOR_CEILING_REVERSED` for positioning based on a block's attachment point. Used by ImmersiveMC for the grindstone.
- `Immersive#isInputHitbox()`, which should return whether the provided hitbox index is an input hitbox. Only hitboxes for which this returns true can be dragged between.
- `Immersive#getDragHitbox()`, which should return a `BoundingBox`, which, while the hand is inside of, should not stop dragging if dragging began. This should ideally encompass all of your input hitboxes. You can also return null here to simply not have any dragging support. For Immersives built using the `ImmersiveBuilder`, use `ImmersiveBuilder#setDragHitboxCreator()` to set a function that takes the info and returns a drag hitbox, or use `ImmersiveBuilder#setNoDragHitbox()` to disable the drag hitbox entirely. If neither of these are called, ImmersiveMC will create a drag hitbox for you.
- A new `RelativeHitboxInfoBuilder#forceUpDownRenderDir()` function that allows setting the forced up/down render direction based on the result of a function that takes the `BuiltImmersiveInfo`, rather than a constant value.
- A new `ImmersiveLogicHelpers#swapItems()` function that allows the developer to force ImmersiveMC to not transfer any more items than the provided quantity.
- `ImmersiveMCMeta`, providing information about the API itself, mainly around API versioning.
- `BoundingBox#move()`, which offsets the provided `BoundingBox`'s center by the provided `movement`. `OBB#move()` was added accordingly.
- `SwapMode` which holds the type of swap that should be performed. This can be obtained from `ItemSwapAmount#getSwapMode()`, and may be useful for performing custom swapping behavior.

### Migrations

- `Immersive#handleHitboxInteract()`, `ImmersiveClientLogicHelpers#sendSwapPacket()`, and `HitboxInteractHandler#apply()` now accept a list of slots indices rather than a single slot index. For methods you call, the list is treated as a single drag across all slots. For methods ImmersiveMC calls for you, the list contains the indices of all hitboxes dragged across.
- `HitboxVRMovementInfo` is now an interface, rather than a record. You can create instances of it now using the new `HitboxVRMovementInfoBuilder`.
- `HitboxInfo#getRenderHitbox()` was added, which, for moving hitboxes, should return the interpolated position for the hitbox based on the provided `partialTick`. One can simply return the hitbox as-is if the hitbox doesn't move.
- Moved `ItemSwapAmount` out of the API.
- Moved `SwapResult` out of the API.

## 2.0 (ImmersiveMC v1.5.0) to 3.0 (ImmersiveMC v1.6.0-alpha1)

### Additions

- Added `RelativeHitboxInfoBuilder#lerps()`, which determines whether the hitbox should lerp (perform linear interpolation) to smoothly animate.
- Added `PettingHandler`, which allows one to add support for petting entities and what they should do when pet. These can be registered with the new `ImmersiveMCRegistration#addPettingHandlerRegistrationHandler()`.

### Migrations

- Moved `ItemSwapAmount` back into the API.
- Moved `SwapResult` back into the API.

## 3.0 (ImmersiveMC v1.6.0-alpha1) to 4.0 (ImmersiveMC v1.6.0-alpha3)

### Additions

- Additions related to extracting render state. See the migrations below for details.
- `BoundingBox#vertices()`, which gives the vertices of a `BoundingBox`. This can be used with `AABB`s directly using `ImmersiveLogicHelpers#getVerticesOfAABB()` and with `OBB`s directly using `OBB#getVertices()`.

### Migrations

- One is now required to handle the state used for rendering separately from the info it came from. This results in the following changes:
    - `ImmersiveRenderState`, a new interface that holds information similarly to `ImmersiveInfo`, but is exclusively used for rendering, and only needs to hold rendering-related information.
    - `ImmersiveRenderHelpers#renderItemWithInfo()` is renamed to `ImmersiveRenderHelpers#renderItemWithRenderState()` and takes an `ImmersiveRenderState` instead of an `ImmersiveInfo`.
    - `Immersive`s have a new type parameter, `R`, which holds the class of `ImmersiveRenderState` the `Immersive` extracts to.
    - `Immersive` has the new methods `createRenderState()` and `extractRenderState()`, which create a new instance of the render state and populate an instance of the render state with information from the provided info respectively.
    - `Immersive#shouldRender()` and `Immersive#render()` now both take the render state, rather than the info.
    - `BuiltImmersiveRenderState` represents the render state for a `BuiltImmersive`. `ExtraRenderer` now uses this in place of `BuiltImmersiveInfo`.
    - `ImmersiveBuilder` and `BuiltImmersive` have a new type parameter, `ER`, which is also used by the new `BuiltImmersiveRenderState` and replaces the old type parameter for `ExtraRenderer`. This holds any extra data wanted during rendering.
    - The `ImmersiveBuilder#create()` method that takes an `extraInfoDataClass` now also takes optional parameters for a class to hold extra render data and a method to extract from a `BuiltImmersiveInfo` into this extra render data. Both parameters must be provided, or both must be null.

## 4.0 (ImmersiveMC v1.6.0-alpha3) to 5.0 (ImmersiveMC v1.6.0-alpha4)
    
### Additions

- Added support for player-attachment Immersives. These are similar to block-based Immersives, but revolve around being attached to a player, rather than to a block.
    - `PlayerAttachmentImmersive` interface, holding the client-side code for player-attachment Immersives. Shared code between this and the newly renamed `BlockBasedImmersive` are found in the new version of the `Immersive` interface.
    - `PlayerAttachmentImmersiveInfo` interface, holding the per-instanceo information for player-attachment Immersives. Shared code between this and the newly renamed `BlockBasedImmersiveInfo` are found in the new version of the `ImmersiveInfo` interface.
    - `PlayerAttachmentImmersiveHandler` interface, holding the server-side and common code for player-attachment Imemrsives. Shared code between this and the newly renamed `BlockBasedImmersiveHandler` are found in the new version of the `ImmersiveHandler` interface.
    - `ImmersiveLogicHelpers#startTrackingOnServer()` and `ImmersiveLogicHelpers#stopTrackingOnServer()` to start and stop tracking a player-attachment Immersive for non client-authoritative player attachment Immersives. There is no equivalent to this for block-based Immersives, as that starts and ends tracking automatically.

### Migrations

- Many renames:
    - `Immersive` to `BlockBasedImmersive`. `Immersive` still exists, but is a superinterface of `BlockBasedImmersive`.
    - `ImmersiveInfo` to `BlockBasedImmersiveInfo`. `ImmersiveInfo` still exists, but is a superinterface of `BlockBasedImmersiveInfo`.
    - `ImmersiveHandler` to `BlockBasedImmersiveHandler`. `ImmersiveHandler` still exists, but is a superinterface of `BlockBasedImmersiveHandler`.
    - `BuiltImmersive` to `BuiltBlockBasedImmersive`.
    - `BuiltImmersiveRenderState` to `BuiltBlockBasedImmersiveRenderState`.
- `Immersive`, `ImmersiveInfo`, and `ImmersiveHandler` are now sealed interfaces containing some methods from their pre-5.0 counterparts. The rest of the old methods can be found in `BlockBasedImmersive`, `BlockBasedImmersiveInfo`, and `BlockBasedImmersiveHandler` respectively.
- `handleHitboxInteract()` now no longer adjusts the cooldown depending on whether the player was in VR or not. There is no need to adjust it yourself either, as cooldown times should stay consistent between VR and non-VR play.
