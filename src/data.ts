import { ProjectTags, Technologies, type Project } from "./types";

export const PROJECTS_DATA: Project[] = [
  {
    slug: "https://github.com/Battle-Road-Labs/3D-Tiles-For-Godot",
    thumbnail: "https://raw.githubusercontent.com/Battle-Road-Labs/3D-Tiles-For-Godot/refs/heads/master/readme_resources/NYC_Screenshot.png",
    title: "3D Tiles For Godot",
    description: "A Godot 4 extension that integrates Cesium 3D Tiles capabilities into the Godot Engine through GDExtension.",
    tags: [ProjectTags.GameEngine, ProjectTags.OpenSource],
    technologies: [Technologies.CPP, Technologies.Godot]
  },
  {
    slug: "https://hushengine.com/",
    thumbnail: "https://i.postimg.cc/fydsZ5LN/Hush03-large.png",
    title: "Hush Engine",
    description: "Hush is a 3D game engine currently in development that aims to provide a more streamlined, simple and performat way to make high quality games",
    tags: [ProjectTags.GameEngine, ProjectTags.OpenSource],
    technologies: [Technologies.CPP, Technologies.Vulkan]
  },
  {
    slug: "https://store.steampowered.com/app/3200380/Gripshot/",
    thumbnail: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3200380/header.jpg?t=1730135096",
    title: "Gripshot",
    description: "Fast-Paced, multiplayer action shooter game with physics based movement, where you test your aerial precision and tactical thinking, as you grapple between structures, dodge incoming fire, and seize high ground for the ultimate advantage.",
    tags: [ProjectTags.GameDevelopment],
    technologies: [Technologies.CSharp, Technologies.Unity, Technologies.Proton]
  },
  {
    slug: "https://github.com/Kyn21kx/Aspis.NET",
    thumbnail: "https://i.postimg.cc/HnPn23Ck/Aspis.png",
    title: "Aspis.NET",
    description: "Aspis is a .NET framework for C# web API applications that aims to provide a simple yet powerful errors as values system to avoid having unexpected responses from your backend.",
    tags: [ProjectTags.BackendDevelopment,ProjectTags.OpenSource],
    technologies: [Technologies.DotnetCore, Technologies.CSharp]
  },
  {
    slug: "https://github.com/Kyn21kx/FuzzKill",
    thumbnail: "https://private-user-images.githubusercontent.com/25380184/500636994-fc0baad5-2e22-4b7c-aac4-d3ea89f60a67.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjAzODI3NDYsIm5iZiI6MTc2MDM4MjQ0NiwicGF0aCI6Ii8yNTM4MDE4NC81MDA2MzY5OTQtZmMwYmFhZDUtMmUyMi00YjdjLWFhYzQtZDNlYTg5ZjYwYTY3LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTEwMTMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUxMDEzVDE5MDcyNlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWE1YzhlYmI3MThmNGMyZTZkNmNmNWI4Y2UxNDM2Yzc3MjcxMDJkYmYzODliOTE5MGY0MWVjOTg5NjUxOGUxNmYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.O368nfvRBcFcC6H9dbZt1ShO_TTuiFEs5NUHxBPw9xg",
    title: "FuzzKill",
    description: "Fuzz Kill is an ALT+TAB replacement utility that lets you navigate through your computer's windows by searching them in plain text, thanks to a lightning fast fuzzy matching algorithm you can find any app at any time without having to search with your eyes like when manually tabbing",
    tags: [ProjectTags.OpenSource, ProjectTags.Desktop],
    technologies: [Technologies.CPP, Technologies.Raylib]
  },
];
