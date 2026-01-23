---
title: 'The story of a 5 minute-long endpoint'
date: 2026-1-20
draft: true
tags: ['story', 'c-sharp']
thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrQayScH80cR7e5Nm3krDSgrdB9dvdPkyIJQ&s'
slug: 'the-story-of-a-5-minute-endpoint'
author: 'Leónidas Neftalí González Campos'
---
# The story of the 5-minute-long endpoint

## How to look smart by simply not doing extremely stupid things

<center>
  <img 
    src="https://vintageits.com/wp-content/uploads/2019/06/slow-running-computer.jpg" 
    style="max-width: 50vw; max-height: 50vh; aspect-ratio: 1 / 1; object-fit: contain;"
  />
</center>

## Introduction
I'm feeling a little down today, so, to cheer myself up, I'll tell you guys the story of what is possibly the most ridiculous optimization task I ever had to do, I don't know if someone will learn something from this, but at least maybe someone will get a kick out of it...

## A crash on the Users list endpoint
That was the task that appeared one day on my Jira board at my job for an appointment management company, I thought nothing of it, we've had crashes before on that codebase, which, BY THE WAY, let me tell you about the codebase, it was a genuine **dread** to work on, a backend REST API in C#, nothing wrong with that, I actually love C#, until it's a several-thousand file monolith for like 5 database entities built by two separate outsourcing companies that can only communicate in broken english with each other and no one can agree on what the standard way of creating an appointment is.

The main company (which shall remain nameless for obvious reasons) clearly saw technology as a means to an end, they didn't need to "disrupt" the industry. They just needed a platform that worked, and have as many features as the CEO came up with that day; this resulted in the whole software development department being treated as a factory, a factory that can keep on producing more and more, if there was a bottleneck it was not "tech-debt", to them, it was the engineer not working as fast as they could, any raised concerns about the increasingly fragile jenga tower we were calling our product would be promptly dismissed.

## Investigating the crash
So... it was not a crash, it didn't take long to figure out either, the product and QA departments thought it was a crash because when they clicked on the button to update the user list the front-end would wait for the back-end to respond with the confirmation that the entities were created/updated succesfully, and the response never came. So they assumed the server had crashed; in reality it was simply still going... That's right, the back-end was taking a concerning amount of time to upload that data to the databse, but why?

## The repository pattern
For anyone that isn't that familiar with how C# codebases usually handle sending queries to an SQL databse, it is common to implement something called a `Repository` which contains a functional way to describe query operations, for example, the most commonly used functions you'll find are:
```csharp
// CREATE
await this.m_userRepository.InsertAsync(userToInsert);

// READ
User user = await this.m_userRepository.FirstOrDefaultAsync();

user.name = "New name";

// UPDATE
await this.m_userRepository.UpdateAsync(user);

// DELETE
await this.m_userRepository.DeleteAsync(userToDelete);
```
These are single entity operations, which means only one user (in this case) will get affected by this operation, there are of course ways to affect multiple entities all at once so that the query backend the EF core framework uses generates a somewhat "optimized" query that targets all entities within the specified table/range. That is not hard to implement either (spoiler alert, it's literally 2 to 3 lines of code), but for **SOME REASON** that truly escapes me, this particular company opted to use a meta-framework called ABP.

## The ABP meta-framework

<center>
  <img 
    src="https://i.ytimg.com/vi/HKUMpT1yigM/maxresdefault.jpg" 
    style="max-width: 50vw; max-height: 50vh; aspect-ratio: 1 / 1; object-fit: contain;"
  />
</center>

This is not by any means a jab against ABP as a business or technology, I am sure they fit someone's needs exceptionally well... This was not the case here though, ABP was holding this entire application together and it was used for exactly 2 things:

- Singleton instantiation (Dependency Injection)
- Repository pattern implementations

To this day I am not even sure those things are even the strongsuit for ABP, it seems overkill to design your entire stack around this one technology that is seemingly not used to its full potential, because this company **STUCK TO A SHOCKINGLY OLD VERSION OF ABP** and as such, one of the consequences of this is the fact that multiple entity operations did not exist on this version, specifically the `InsertMany` and `UpdateMany` methods, and the code was way too fragile to update to newer versions that did introduce these functions.

## The 2 year hotfix
Now, you might be wondering: "If they didn't have an `InsertMany` function, how in the hell were they making bulk operations?"
Excellent question, here's the workaround LINE BY LINE how I recall it was written in the actual production codebase:

```csharp
List<User> usersToInsert = CreateUsersFromSomewhere();
foreach(var user in usersToInsert)
{
  await this.m_userRepository.InsertAsync(user);
}
```
**PRODUCTION QUALITY CODE EVERYONE!!!**

Now, if you don't see the issue with this code right away, you might want to brush up on your async/await lessons, but don't worry, let me explain.

In C# the `await` keyword tells your code to wait for an asynchronous function to signal it is marked as complete, this is useful because it ensures things are in the correct state when dealing with operations that might take an external system some unkwown amount of time to complete (i.e, network and database operations that leave the control structure of the C# runtime). In the case of a database insert this implies the roundtrip between the application and the DB and the DB's processing time to actually insert the user into the table.

And we have to pay that cost for EACH ONE OF THE USERS IN THE LIST, web people might not notice any significant slowdowns at first when the collection size is under the 100s and the request takes maybe 1 to 2 seconds (which, don't get me wrong, that is still incredibly slow for what we're trying to do), but when the collection size is in the thousands we REALLY start to notice, and eventually time out. At a certain point the endpoint was taking over 5 minutes in the production environment.

Keep in mind, when I joined the company, it had already had its product in business for a little over 2 years, which would mean THIS is the way they were coding each bulk operation for at least 2 years and not a single person thought to find a better alternative to this performance killing workaround.

## The ACTUAL fix

Okay, as promised, the fix was actually really simple and stupid, and it was to just implement the repository ourselves with the methods EF core already provides us... Who would've thought creating a lightweight API that fits your use case on top of an existing framework could be a good idea after all.

Here is for example, the `InsertManyAsync` function as I recall to have implemented.

```csharp
public Task InsertManyAsync(ICollection<T> entities)
{
  context.Set<T>().AddRange(entities);
  return context.SaveChangesAsync();
}
```

As I said, two lines of code, and the problem was solved. After I did that I had to schedule a meeting for the entire team to look at the new implementation and help me eliminate all other manual bulk operations in favor of this implementation.

After we implemented this, the user list endpoint went from those 5+ minutes to execute to just 300ms for the roundtrip, so, needless to say I think it was a very clear improvement over the original implementation, everyone on the team could clearly see it, and a couple of my coworkers congratulated me for my optimization techniques and knowledge, but I think you all can agree with me here... It really wasn't so much that I did something smart, rather than I just removed something extremely stupid, you know, the old attage and all that

## Conclusion(?

I don't think there's much here to learn on a technical sense, but maybe there's something on a managerial one, if the development team is constantly pushing for new features and does not have time to look back even a little bit it WILL reflect on the product. Some of my peers think I'm some kind of optimization extremist, but I really just advocate for common sense measures to not let tech debt bleed out to the final users, they're always the ones paying the price of bad software, and I think we have a moral obligation to do right by them.
