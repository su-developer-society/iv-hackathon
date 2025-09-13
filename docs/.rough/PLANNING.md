
## foundation 

- [ ] Web App
  - [ ] Vercel -> host on browser
  - [ ] Supabase -> Database 
  - [ ] Model -> Get context from (LLM) -> API

### Idea 

> In order to remember material that students have studied, they have to go over the material often.
> Flash cards are an effective tool for revising old material, **Problem:** but writing "physical cards" can be time consuming and cumbersome to not lose.
> Services exist to make digital flash cards, but these often don't allow users enough **expressive power**(AMANI) to represent **complicated mathematical equations**, (TK)
> or **they don't allow easy syncing between devices**(WILLIE).
> You have to build an app that allows a student to make flash cards using **markdown**, easily **sync these cards accross devices**(DYLAN), and make reviewing more powerful by 
> making use of an LLM to them on cards.

### Specifics


Specify a syntax for storing flash cards in plain text files that enable the following:

  Start and end of a flash card
  Start and end of the front of a flash card, with markdown content
  Start and end of the back of a flash card, with markdown content


### Tasks

- WILLE: They don't allow easy syncing between devices, Browser() ->  sync these cards accross devices, (connect the frontend)

- DYLAN: Build the Chat iterface (frontend) + Connect frontend + <!-- A web app that renderes the markdown (see https://marked.js.org/demo/ for an example). -->

- TK: Complicated mathematical equations (Get them to work, LLM to work with it, display it ), LLM -> How can i prompt the LLM to display (Math syntax, Latex, MD)
  
- AMANI: Expressive power (Visual way to represent work)


### Tasks when done 
 
- [ ] Make the app a progressive web app so that users can use it on their phones more easily. <!-- Install as a webapp -->
- [ ] The app should allow you to ask an AI to quiz you on a deck of cards. <!-- Gamefication and LLM can do easy :)  -->
- [ ] The web app should allow you to select a folder containing .md files. Each file will be treated as a deck of cards. <!-- Supabase -->
- [ ] Session management , cache browser
- [ ] Rate Limiting (Subscibe, load bar next to chatbar)
- [ ] Add different file types -> (Look at that, pdf, pptx, md, and so on) (Docling)




