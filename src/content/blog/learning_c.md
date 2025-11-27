---
title: 'Everyone should learn C, yes, even YOU'
date: 2025-11-8
draft: true
tags: ['opinion', 'c']
# thumbnail: 'https://venturebeat.com/wp-content/uploads/2024/12/Vulkan-1.4-16by9.jpg?w=1024?w=1200&strip=all'
slug: 'everyone-should-learn-c'
author: 'Leónidas Neftalí González Campos'
---
# Everyone should learn C

## A deep dive into what became the most impactful move in my carreer

### Introduction
If you're reading this, you're either interested in learning C, or you're somewhat skeptical on why **YOU** specifically should learn it, even if you're on a field that rarely ever dips that low into the abstraction layers.

### Why?
You're probably thinking *"Why should I bother learning a language I won't ever use, I use Python/Java/C#/JS"* or any other higher level language. My thesis here is that no matter what language you actually code in every day, learning C will fundamentally change how you think about computers and problem-solving, I'm confident on that because I myself have gone through this process where I thought I knew how to program, until I got thrown into a C project, and got tasked to add a value to a list... Oh, boy!

## Demistifying C

### It's not C++
I think there's this really weird sentiment towards C, people think it's this incredibly hard language with indecipherable syntax, and scary pointers; to them I say, you're thinking of C++, NOT C, at its core, the C language is probably the simplest lower level language out there, and that's where its beauty and power lie. I won't try to trick you either, this language has got issues, you gotta be aware of quite a lot of things when you program in it, and to be honest the type system leaves a lot to be desired, this is why most of my personal projects are coded in C++, but I try to minimize the features I use from that specific language, I generally keep it at `constexpr` (compile-time expressions) and `template` (generics) for a more robust type system.

### C vs Python examples
To prove that C is indeed very simple and make encourage you to get your feet wet a little bit, here is a simple program in C and Python that I bet you will find very easy to read, I will obviate the includes and those kinds of things because I really want to focus on the actual line by line instructions that we write, because I believe that will show that C truly is a lot more approachable than people think.

#### Read some names from a file and print them to stdout
```c
#define MAX_LINE_LENGTH 256

FILE *file = fopen("names.txt", "r");

if (file == NULL) {
    perror("Error opening file");
    return;
}

char line[MAX_LINE_LENGTH];
while (fgets(line, MAX_LINE_LENGTH, file) != NULL) {
    printf("%s", line);
}

fclose(file);
```

And in Python (not using `with` here for ilustrative purposes)
```python
file = open("names.txt", "r")
for line in file:
    print(line, end="")
close(file)
```

Yes, there are more lines in the C version, that much is obvious, but I think the flow of information (**WHICH IS WHAT WE PROGRAMMERS SHOULD CARE ABOUT**) is essentially the same, one might argue, better in the C version, since error handling is not automatic, and we actually have a better grasp on our code structure there, not to mention, the C program performs only one memory allocation (the `fopen` call), it knows almost all the memory we will use every time at compile-time (before the program runs).

Now, there's obviously a lot you can say here to argue for the python version, like, that same automatic error part, python handles that elegantly and right out of the box, that level of abstraction is really nice to have when you're trying to put together a quick system to get the job done, but here's the thing, I wholeheartedly believe that NOT having those abstractions makes you a better programmer, because of the hardships that those imply.

## A muscle gets bigger by damaging it

Have you ever gone to the gym? Have you ever felt that *burn* on your biceps when doing curls and thought to yourself "Oh, yeah, I'll be sore tomorrow, that means it's working", that feeling is your body telling you to stop what you're doing, it's uncomfortable and some might even say painful... but you push through the pain, why? Well, you know why, that muscle might hurt now, but that's a sign that you're reaching its strength limit, and in response, your body will adapt and rebuild your muscle to expand this limit, so the next time you do a curl you can actually lift that weight with less effort. It was awful at the time, you stressed a muscle and it got bigger, stronger, THAT is what learning C does to you.
