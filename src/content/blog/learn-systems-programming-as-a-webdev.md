---
title: 'Learn systems programming as a web dev - Part #1: The humble integer'
date: 2026-09-12
draft: true
tags: ['opinion', 'c']
thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/3/35/The_C_Programming_Language_logo.svg'
slug: 'learn-sys-programming-as-a-webdev'
author: 'Leónidas Neftalí González Campos'
---

# Learn systems programming as a web dev  
Talking to students and friends I think one of the most common things I see is people wanting to break free from the very narrow conception that they have of programming, but them not even knowing where to start. This is my intention with this series of articles, to not only provide a concrete path for those looking to expand to new fields, but also change people’s perspective on programming, once you think like a systems engineer, you can’t go back, these learnings will carry on to your next projects no matter the tech stack.  
  
## Choosing a language  
There are many roads we can take from here, but it’s really important to emphasize something here, a language is nothing more than a tool, this is the same reason why the concepts you’ll see throughout this series is widely applicable to other languages.  
Having said that, I’ll choose C for the concrete examples on this series, you can follow along in any of the other languages I’ll list below and I will do my best to provide equivalent function names and conventions as we go forward.  
* Odin  
* Zig  
* C++  
(Rust is purposefully excluded from this list since you should already have some knowledge about memory ownership models before you learn it)  
  
## Setting up  
(If you just want to get to the code you can download this installation script and it’ll walk you through an easy setup designed by me!)  
  
This will look different depending on the operating system you are running.  
  
All operating systems support the clang compiler, so that’s what we’ll be using. The second most supported compiler is GCC, so all examples will be geared towards them.  
  
Here’s a more concrete table of tools that you might find useful throughout this journey.  
  

| OS            | Compilers                           | Debugger    |
| ------------- | ----------------------------------- | ----------- |
| Windows       | MSVC (Installed with Visual Studio) | RADDebugger |
| Windows (WSL) | GCC                                 | GDB         |
| Linux         | GCC                                 | GDB         |
| MacOS         | AppleClang                          | LLDB        |
  
  
## Your first program (more than a "Hello World!")  
With a compiler and debugger now installed on your system, we can start writing our first program.  
```c
#define RC_OK 0

int main() {
	printf("Hello There!");
	return RC_OK;
}

```
I know, I know, you've probably already written this code a million times before, but please allow me to try and convince you this time it'll be different, you see, I sneaked a tiny detail in that program, did you catch it?

...

That's right, the `#define RC_OK 0`, this is simply a constant definition for the program's return code, and here's where we can already start thinking differently about the code you write...
  
## Part 1. The Humble Integer  

If you're not familiar with them, return / exit codes are simply integer values EVERY single program needs to return when completing their execution, it's a way to tell the OS "Hey, I'm done with my work, and everything went well" (if the code is 0), or "I stopped running and things were not ideal" (any other number), one might want to return any other number as a way to identify not only that there was an error during execution, but specifically which error that was:

Imagine we're building an app that only users with valid credentials can use, we can do the following

```c
#define RC_OK 0
#define RC_USER_NOT_FOUND 1
#define RC_BAD_PASS 2

int main() {

	User u = GetUserFromInput();
	if (!IsValidUser(u.name)) {
		return RC_USER_NOT_FOUND;
	}
	if (!MatchesPass(u.name, u.password)) {
		return RC_BAD_PASS;
	}
	return RC_OK;
}
```

This approach to programming is called "errors as values", and I have a whole [article](https://computergoblin.com/blog/everyone-should-learn-c-pt-1/) going in-depth into how to integrate it into common programming paradigms.
I won't go into too mich detail about this particular techniquentoday because of the afore mentioned article, but I personally think exit codes are a great example of the power behind limitations, it forces you to get creative and find ways to make the most put of the least, and that right there, that's what systems programming is all about.

### Integer types
If you come from a language like JS or Python you may only be familiar with the default `number` or `int`types to represent integers, but in other languages and tech stacks we have different types for integers which change in bit size and their binary interpretation (signed/unsigned).

C provides fixed-width integer types through `<stdint.h>`. Here's a reference of all of them alongside their equivalents in the other languages of this series (C++ uses the same names via `<cstdint>`):

| C (`stdint.h`) | Min | Max | C++ (`cstdint`) | Odin | Zig |
| -------------- | --- | --- | --------------- | ---- | --- |
| `int8_t`   | -128 | 127 | `int8_t`   | `i8`  | `i8`  |
| `int16_t`  | -32,768 | 32,767 | `int16_t`  | `i16` | `i16` |
| `int32_t`  | -2,147,483,648 | 2,147,483,647 | `int32_t`  | `i32` | `i32` |
| `int64_t`  | -9,223,372,036,854,775,808 | 9,223,372,036,854,775,807 | `int64_t`  | `i64` | `i64` |
| `uint8_t`  | 0 | 255 | `uint8_t`  | `u8`  | `u8`  |
| `uint16_t` | 0 | 65,535 | `uint16_t` | `u16` | `u16` |
| `uint32_t` | 0 | 4,294,967,295 | `uint32_t` | `u32` | `u32` |
| `uint64_t` | 0 | 18,446,744,073,709,551,615 | `uint64_t` | `u64` | `u64` |

These numbers are not arbitrary, they cover the range of possible decimal integers you can represent using their specified amount of bytes, let's do the math ourselves so we fully understand it.

#### Take the `uint8_t`.
As it name states, we have 8 bits to work with, let's bring up our trusty binary table:

| 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|-|-|-|-|-|-|-|
| 0 | 0 | 0 | 0 | 0 | 0 | 0 |

If we decide to turn on any one of those bytes, we add the value above the slot.

| 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|-|-|-|-|-|-|-|
| 0 | 0 | 0 | 0 | 0 | 0 | 1 |

Becomes => 1

| 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|-|-|-|-|-|-|-|
| 0 | 0 | 0 | 0 | 1 | 0 | 1 |

Becomes => 5
