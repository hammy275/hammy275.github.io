---
has_children: true
nav_order: 6
---

# The ImmersiveMC API

Starting with ImmersiveMC 1.5.0 Beta 2, ImmersiveMC comes with a fully-featured API to make programming your own block-based Immersives as easy as possible!

## Warning

Until ImmersiveMC 1.5.0's full release, the API is in beta, and may have breaking changes at any time! The tutorials here should mostly remain unchanged, but that is not guaranteed, and it *is* guaranteed that other things will be changed before ImmersiveMC 1.5.0's release!

## Getting Started

The pages on the left-hand side are ordered in such a way for you to learn how to make block-based Immersives using ImmersiveMC's API. Before then, though, you'll need to add ImmersiveMC to your project!

### Setup

#### Loom (Fabric and Architectury)

1. Add the following to your `build.gradle` file. For Architectury, this should be done for all of your subprojects:
    ```
    repositories {
        maven {
            url = "https://cursemaven.com"
        }
    }
    ```
2. Add the following to the `dependencies` section of your `build.gradle`. `FILE_ID` should be replaced with the file ID of the ImmersiveMC version you depend on. The `FILE_ID` can be found by visiting [the "Files" tab of ImmersiveMC's CurseForge page](https://www.curseforge.com/minecraft/mc-mods/immersivemc/files/all), clicking the file you want, then copying the numbers at the end of the URL. As with step 1, if you're using an Architectury project, this should be done for all of your subprojects, using the Fabric version of ImmersiveMC for your `common` subproject:
    ```
    modApi "curse.maven:immersivemc-607017:FILE_ID"
    ```
3. Refresh gradle, then you'll be good to go!


#### NeoForge and Forge

1. Add the following to your `build.gradle` file.
   ```
   repositories {
       maven {
           url = "https://cursemaven.com"
       }
   }
   ```
2. Add the following to the `dependencies` section of your `build.gradle`. `FILE_ID` should be replaced with the file ID of the ImmersiveMC version you depend on. The `FILE_ID` can be found by visiting [the "Files" tab of ImmersiveMC's CurseForge page](https://www.curseforge.com/minecraft/mc-mods/immersivemc/files/all), clicking the file you want, then copying the numbers at the end of the URL.
   ```
   compileOnly fg.deobf("curse.maven:mcvrapi-591092:FILE_ID")
   runtimeOnly fg.deobf("curse.maven:mcvrapi-591092:FILE_ID")
   ```
3. Refresh gradle, then you'll be good to go!