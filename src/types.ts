
export enum ProjectTags {
  OpenSource = "Open Source",
  GameEngine = "Game Engine Development",
  GameDevelopment = "Game Development",
  Desktop = "Desktop",
  BackendDevelopment = "Backend Development",
  FrontendDevelopment = "Frontend Development"
}


export enum Technologies {
  CPP = "C++",
  DotnetCore = ".NET Core",
  Vulkan = "Vulkan",
  Raylib = "Raylib",
  Godot = "Godot",
  Proton = "Proton",
  Unity = "Unity3D",
  CSharp = "C#"
}

export interface Project {
  slug: string;
  thumbnail: string;
  title: string;
  description: string;
  tags: ProjectTags[];
  technologies: Technologies[];
}

