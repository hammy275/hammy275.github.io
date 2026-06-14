// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: "ImmersiveMC Docs",
			social: [{ icon: "github", label: "GitHub", href: "https://github.com/hammy275/immersive-mc" }],
			favicon: "/images/favicon.png",
			sidebar: [
				{label: "Home", link: "/"},
				{
					label: "Immersives",
					items: [
						"both/anvil",
						"both/barrel",
						"both/beacon",
						"both/brewing_stand",
						"both/chest",
						"both/crafting_table",
						"both/enchanting_table",
						"both/furnace",
						"both/grindstone",
						"both/hopper",
						"both/lectern_and_written_book",
						"both/shulker_box",
						"both/smithing_table",
					],
					collapsed: true
				},
				{
					label: "VR Only Immersives",
					items: [
						"vr/bag",
						"vr/bottles_buckets_and_liquids",
						"vr/buttons_and_levers",
						"vr/campfire",
						"vr/chiseled_bookshelf",
						"vr/doors_and_gates",
						"vr/equipping_armor",
						"vr/fishing",
						"vr/jukebox",
						"vr/petting_pets",
						"vr/ranged_grab",
						"vr/repeater",
						"vr/throwing",
					],
					collapsed: true
				},
				{label: "FAQ", slug: "root/faq"},
				{label: "Inter-Mod Compatibility", slug: "root/mod_compat"},
				{label: "Contributing", slug: "root/contributing"},
				{
					label: "The ImmersiveMC API",
					items: [
						"api/api_intro",
						{
							"label": "Concepts",
							"items": [
								"api/concepts/immersive",
								"api/concepts/handler",
							],
							collapsed: true
						},
						{
							"label": "Your First Immersive: A Block-Based Immersive",
							"items": [
								"api/block_based/handler",
								"api/block_based/builder"
							],
							collapsed: true
						},
						"api/everything_else",
						{"label": "Javadocs", "link": "/javadoc"},
						"api/migration_guide"
					],
					collapsed: true
				}
			],
		}),
	],
});
