---
parent: The ImmersiveMC API
nav_order: 2
---

# The `ImmersiveHandler`

Any good block-based Immersive is divided into two portions: its `ImmersiveHandler` and its `Immersive`. The `Immersive` portion covers anything only performed by the client, while the `ImmersiveHandler` covers everything else. Since an `Immersive` requires an `ImmersiveHandler` to even be fully-built, we'll start by making one first.

## Making Your `ImmersiveHandler`

Go ahead and make a new class, and have it implement the `ImmersiveHandler` interface. For now, make the type parameter ImmersiveMC's `NetworkStorage` interface, we'll get back to this later.

At this point, your IDE should generate a lot of methods for you to complete. Let's go over them one-by-one, then get into the finer details on some of the interfaces being used here.

- `makeInventoryContents()`: Although the server knows of the contents of a block, such as the items in a chest, the client doesn't know about them until they open that block's GUI! ImmersiveMC doesn't use GUIs however, so it needs to send the contents separately. This function is used to retrieve an object that can be encoded into a buffer to send the contents of the block to the client.
- `getEmptyNetworkStorage()`: When the client receives the buffer, it calls this function to get a `NetworkStorage` instance before calling its `decode()` function.
- `swap()`: All Immersive interactions happen initially on the client. When such an interaction happens, the client tells the server which slot it interacted with and at what position. This is where the server should perform the action that should take place! For example, if the user interacted with slot 0 of an empty furnace with a raw porkchop in their hand, your `swap()` implementation would want to move the raw porkchop into the empty furnace slot.
- `isDirtyForClientSync()`: To prevent sending the contents of every block all the time, ImmersiveMC only sends block contents to the client on a given tick where this function returns `true`.
- `isValidBlock()`: This function should simply return whether the provided block position in the given level matches this Immersive.
- `enabledInConfig()`: This function should declare whether this Immersive is enabled in the provided player's configuration. If you don't have or want to provide configuration for this Immersive, simply return `true` here.
- `clientAuthoritative()`: Normally, Immersives exist on the client the first time they receive inventory contents from the server. If this is `true`, they will instead activate the moment they can. Immersives which return `true` for this should *always* return `false` for `isDirtyForClientSync()`. If this is your first Immersive, simply return `false` from here, you're still learning!
- `getID()`: An ID that uniquely identifies your Immersive. Make sure to keep it in your mod's namespace!
- `onStopTracking()` (optional): This function gets called on the server-side when an Immersive stops being tracked. You don't need to implement this, but you may find it useful for your Immersive!

That was a lot! Even worse, looking in your IDE, you'll notice that some of these methods use even more interfaces from ImmersiveMC! Let's break those down real quick:


| **Interface Name** | **Methods That Use It**                                  | **What It Is**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
|--------------------|----------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `NetworkStorage`   | `makeInventoryContents()` and `getEmptyNetworkStorage()` | This object should hold all the data that needs to sync from the server to the client. `encode()` should place the data into a byte buffer, while `decode()` should turn an instance of this object created from `getEmptyNetworkStorage()` into the same data that you had on the server, but now on the client!<br/>You should make an implementation of this function, update the type parameter for your `ImmersiveHandler` to that type, then update the method accordingly.<br/>Need an example? Take a look at ImmersiveMC's internal `ListOfItemsStorage`. |
| `ItemSwapAmount`   | `swap()`                                                 | Users can configure the amount of items to swap and can hold their "break block" button to swap an entire stack of items. This object encapsulates that information; simply call `ItemSwapAmount#getNumItemsToSwap()` with the stack size of the item in the player's hand, or pass it to `ImmersiveLogicHelpers#swapItems()` and let it do the work!                                                                                                                                                                                                              |

Want an example? Take a look at ImmersiveMC's `BrewingStandHandler` in your IDE!

## Registering Your `ImmersiveHandler`

This one's easy! First, make an instance of your `ImmersiveHandler` somewhere, you'll need it!

```java
public static final ImmersiveHandler<NetworkStorage> myHandler = new MyHandler();
```

Then, in your mod's constructor, let ImmersiveMC know that when it comes time to register, register it!

```java
ImmersiveMCRegistration.instance().addImmersiveHandlerRegistrationHandler(event -> {
    event.register(myHandler);
});
```

Congratulations! You're `ImmersiveHandler` is done!

