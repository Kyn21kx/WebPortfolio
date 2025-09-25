---
title: 'The web is bad but no one is willing to change it (yet)'
date: 2025-09-17
draft: true
tags: ['opinion', 'web', 'js']
# thumbnail: 'https://venturebeat.com/wp-content/uploads/2024/12/Vulkan-1.4-16by9.jpg?w=1024?w=1200&strip=all'
slug: 'the-web-is-bad'
author: 'Leónidas Neftalí González Campos'
---
# The Web is bad, but no one is willing to change it (yet)
## A reflection on the current state of web technologies

When I was a child, I was fascinated by the tech world because I did not know how anything worked, the internet seemed like a never ending fountain of knowledge that was carefully crafted by experts, now... well, I am still fascinated, but now it is at the fact that everything is still somehow standing with so many layers of poorly constructed software architecture and needless overcomplicated abstractions; so, how did we get here, is there **anything** we can possibly do to make the web better, and most importantly, what does *better* even mean?

## So, what exactly is **bad** about it?

Talking with friends involved in web development I often end up mentioning how I'm not particularly fond of the current state of their industry, and quite frequently I'm met with the same line of reasoning, "but why is this bad", "it works fine dude", "you're just too tryhard", this usually happens after bringing up emergent alternative technology stacks like WebAssembly and how it is so cool that I can now write straight C code that compiles to an actual executable the web browser will run, and I guess the assumption is that I want everyone to reimplement every single website in C and dump JS in the trash.

That is not (entirely) true, there is a limit to how many wheels I'm personally willing to reinvent just to show a simple website, however, I am still critical of the chokehold under which JS has the whole industry on, it is truly a monopoly out there when it comes to picking how you're going to build your apps, and it affects not only the developers (with an overflow of the job market and stale career growth), but the end user as well with every single site looking exactly like all the others, and not to mention the performance implications of both the language and poor engineering decisions... "Oops, sorry this took 10 seconds to load, we tested this on our intern's MacBook Pro M4 Ultra, you should really reconsider using our product if you don't have the minimum requirements".

<center>
  <img 
    src="https://i.postimg.cc/kXT7tpN3/Insane-RAM-usage.png" 
    alt="Actual RAM usage of several electron based desktop applications and the Arc web browser"
    style="max-width: 50vw; max-height: 50vh; aspect-ratio: 1 / 1; object-fit: contain;"
  />
</center>


 We have to remember that JS was not originally planned to be the absolute dephormed monster of a language that it is today, even getting to the point that we want to use it for everything


  - *You want a frontend? Javascript! How else are you gonna write React?*
  - *Need a backend? Javascript! Node will take care of the heavy lifting*
  - *Desktop apps? Javascript! Let's just package **a whole browser** with that bad boy and you'll be right at home with the same UI libraries*
  - *Embedded systems? BELIEVE IT OR NOT, ALSO JAVASCRIPT!!!*

it was fine as a scripting language, it could've stayed a language used to move / delete and create elements in the DOM, and every codebase could have their own little declarative UI library that is specific to their use case, "but duude, that would be soooo complicated, imagine writing every single UI component yourself"... It really isn't that hard, look, here's a button:

```ts

// Declarative style properties and composition-based functionality
// You can fit as many events and properties as you like here
// And even define a couple constant ones if you want to, we just solved CSS
type ButtonArgs = {
  backgroundColor: string;
  onHoverColor: string;
  textColor: string;
  borderRadiusPx: number
  onClickEvent: (args: any) => void;
};

function makeButton(text: string, buttonArgs: ButtonArgs) {
  const button = document.createElement("button");
  
  // CSS styles are already quite declarative, just use them!
  button.textContent = text;
  button.style.backgroundColor = buttonArgs.backgroundColor;
  button.style.borderRadius = `${buttonArgs.borderRadiusPx}px`;
  button.style.color = buttonArgs.textColor;

  // No crazy complicated hooks or whatever the kids do atm
  button.addEventListener("click", buttonArgs.onClickEvent);
  button.addEventListener("mouseover", () => {
    button.style.backgroundColor = buttonArgs.onHoverColor;
  });
  button.addEventListener("mouseleave", () => {
    button.style.backgroundColor = buttonArgs.backgroundColor;
  })

  return button;
}
```

There you go! It really wasn't that complicated, took me a total of 5 minutes of mostly looking up style properties and mapping them to the correct properties of our custom type, and here, you can even play around with it:
<center>
<div id="root">

  <div class="slidecontainer">
    <label for="radiusRange">
      Button radius
    </label>
    <input type="range" min="1" max="100" value="50" class="slider" id="radiusRange">
  </div>
  
  <label for="backColor">Button color:</label>
  <input type="color" id="backColor" value="#ffffff">
  
  <label for="hoverColor">Hover color:</label>
  <input type="color" id="hoverColor" value="#a0ffff">
  <p id="clickedLabel"> Clicked: 0 times </p>

</div>
</center>

<script>
function makeButton(text, buttonArgs) {
  const button = document.createElement("button");
  
  // CSS styles are already quite declarative, just use them!
  button.textContent = text;
  button.style.border = "1px";
  button.style.backgroundColor = buttonArgs.backgroundColor;
  button.style.borderRadius = `${buttonArgs.borderRadiusPx}px`;
  button.style.color = buttonArgs.textColor;

  // No crazy complicated hooks or whatever the kids do atm
  button.addEventListener("click", buttonArgs.onClickEvent);
  button.addEventListener("mouseover", () => {
    button.style.backgroundColor = buttonArgs.onHoverColor;
  });
  button.addEventListener("mouseleave", () => {
    button.style.backgroundColor = buttonArgs.backgroundColor;
  })

  return button;
}

function updateButton(button, buttonArgs) {
  button.style.backgroundColor = buttonArgs.backgroundColor;
  button.style.borderRadius = `${buttonArgs.borderRadiusPx}px`;
  button.style.color = buttonArgs.textColor;
}

let clicked = 0;
let buttonData = {
  backgroundColor: backColor.value,
  onHoverColor: hoverColor.value,
  textColor: "black",
  borderRadiusPx: radiusRange.value / 10,
  onClickEvent: (args) => {
   clicked++;
   clickedLabel.innerHTML = `Clicked ${clicked} times`
  }
};

let button = makeButton("Hi there", buttonData);
document.getElementById("radiusRange").oninput = function () {
  buttonData.borderRadiusPx = this.value / 10;
  updateButton(button, buttonData);
}

document.getElementById("backColor").oninput= function () {
  buttonData.backgroundColor = this.value;
  updateButton(button, buttonData);
}

document.getElementById("hoverColor").oninput= function () {
  buttonData.onHoverColor = this.value;
  updateButton(button, buttonData);
}


root.appendChild(button);
</script>
<br/>

This is a relatively easy and straightforward way of avoiding all the usual bloat that comes from developing user interfaces in the web platforms, I would never advocate for any modern UI web framework, and I think the code presented here is a better solution for many reasons, not the least of which is the elimination of dependencies, I find the fact that we need someone else's code to do the same thing we can do without it just with a completely new and overcomplicated syntax and set of rules appalling, even more considering the serious security concerns that these packages imply (at the time of writing this, there have been 3 separate consecutive supply chain attacks to npm packages within THE SAME WEEK).
That being said, this is only a baind-aid solution, and we need a completely different one... Let's first analyze the problems with the current approach:

There is more boilerplate involved, we need to keep a reference to the created button and create a function:

```ts
function updateButton(button: HTMLElement, buttonArgs: ButtonArgs) {
  button.style.backgroundColor = buttonArgs.backgroundColor;
  button.style.borderRadius = `${buttonArgs.borderRadiusPx}px`;
  button.style.color = buttonArgs.textColor;
}
```
This is because the HTML -> JS UI interaction pipeline is a [**retained mode** UI](https://learn.microsoft.com/en-us/windows/win32/learnwin32/retained-mode-versus-immediate-mode), and I think that **THAT** is the reason so many frontend frameworks seem so appealing to JS developers, as Reactive frameworks will try to *emulate* the feeling of [**immediate mode** UI](https://learn.microsoft.com/en-us/windows/win32/learnwin32/retained-mode-versus-immediate-mode), but they need to jump through the hoops and limitations of the stablished HTML and JS interfaces to make it usable; This is exactly how you get things like `useState`, `useEffect` and the infamous re-renders, which are known to be slow, but here's the thing... they're only slow in this particular context, re-rendering everything is usually how graphical software is written, this is obvious for anyone who has ever done game development at some point in their lives, your engine/framework gives you a function that runs every single frame, and you recalculate your game's state that frame, then the engine renders the result, in immediate mode, your UI is redrawn every frame, and every single variable is a state variable, it might sound counter intuitive, but this is actually a much more efficient approach to UIs than what HTML does on the background, because the rendering layer is no longer responsible of holding the state of your scene in memory, that becomes the responsibility of the application layer, and it's also much easier for the programmer in my humble opinion, would you rather write this?

### Simulated immediate mode counter component in React
```ts
export const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Click me!</button>
      <p>Clicked {count} times</p>
    </div>
  )
}
```

Or this?

### True immediate mode counter in C++ (DearImGui)
```cpp
int count = 0;

void RenderButton() {
  if (ImGui::Button("Click me!")) {
    count++;
  }
  ImGui::Text("Clicked %d times", count);
}
```

For the first approach you have to:
- Be familiar with the concept of hooks
- Know what a stateful variable is
- Know how stateful variables impact the performance of your app
- Handle events
- Understand the JSX syntax

For the latter, you have to:
- Know what a variable is
- Understand if statements
- Optionally understand string formatting

I don't know about you, but for all the talk JS gets about being a beginner-friendly programming language, React is doing it a disservice, and all for the sake of trying to use JS to do something it was not designed for... THAT is my thesis for this article, the fact that we introduce a shit ton of totally new fabricated issues and we're willing to endure them before we even take a look at the alternatives we could be using instead.

<center>
  <h3>The industry's attitude towards Javascript</h3>
  <img 
    src="https://media.istockphoto.com/id/177274989/photo/brute-force.jpg?s=612x612&w=0&k=20&c=l2FuhygvCLFy9s_0NJU-UaHHTent0Wn90CryUEVaXsc=" 
    style="max-width: 50vw; max-height: 50vh; aspect-ratio: 1 / 1; object-fit: contain;"
  />
</center>

## What are the alternatives?
That sure was a lot of talk, but what about action, what can I use if not the "battle-tested" frameworks of the modern age?
Well, there ARE options, but I'll be the first to admit that they're a bit *rough* around the edges (more on this later), WASM or WebAssembly is the core technology that will allow for essentially any application made in a language that can be compiled with an LLVM backend to run on the browser, as if it was a native app, this means, Zig, C, Rust, C#, and even Odin can produce fully featured web applications with as native a rendering as you can get, that is genuinely exciting, because, let's face it, **THE WEB IS THE UNIVERSAL VIRTUAL MACHINE** we need to come to terms with this, no one is wasting precious hard drive space on whatever apps they might want to get, so your only way, as a business or product to get people to try your app is to have as frictionless a process for users to get their hands on it, and the web ended up being the dominant platform for this.

## How to build the BETTER web

This far into the article you're probably thinking:
*"Hey, isn't this very site written in traditional JavaScript with React? It very much looks like it"*
And let me tell you... you're **absolutely right**, don't get me wrong, I truly believe every word I've written in this post, that includes the title *"no one is willing to change it (yet)"*, I gotta be honest, **I tried** to build this site using the technologies I just mentioned, C and WebAssembly, and honestly, I got pretty far, I was able to build headers, animations and containers, all things that I could personally never do in CSS and HTML, that is largely thanks to Nic Barker's awesome Immediate UI layout library, [Clay](https://www.nicbarker.com/clay), I started to feel the real issues of using alternative technology stacks when certain small things did not quite work as you'd expect in the traditional frameworks, things like mouse scrolling, I am 100% sure it's just a skill issue on my end, but I couldn't get it to work as smoothly as I wanted it to, and the lack of documentation and certainly a lack of patience on my side lead to my decision of abandoning that idea perhaps a bit prematurely, I plan on trying that again, don't get me wrong, but, I JUST wanted to put my blog out there as quickly as possible, and this is a perfect reflection of the core issue at hand, companies don't want a new experimental and bold tech stack, they don't care about which language their landing page is written in, they care about shipping fast, and if sloppy carelessly crafted, dependency ridden and performance killing code will get them there faster, because of the larger work force pool they will absolutely choose that.
