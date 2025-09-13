
## foundation 

- [x] Web App
  - [x] Vercel -> host on browser
  - [x] Supabase -> Database 
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

- WILLE: Handle PROMPT workings -> how our model is going to work with the user (Setup a personality)  (Get conversation going, setting up the responses, get it to work)

- DYLAN: Model we will use, setting up the responses, get it to work, help display a window (Flashcard design and visual algorhtim), put that data into the model directory

- TK: Dsiplay Complicated mathematical equations, keep conversations relevant with MArkdown being the prime goal for usage
  
- AMANI: (Database + understand it), Chat conversation, Flashcards, file upload, put that data into the model directory


### Tasks when done 
 
- [x] Make the app a progressive web app so that users can use it on their phones more easily. <!-- Install as a webapp -->
- [x] The app should allow you to ask an AI to quiz you on a deck of cards. <!-- Gamefication and LLM can do easy :)  -->
- [ ] The web app should allow you to select a folder containing .md files. Each file will be treated as a deck of cards. <!-- Supabase --> @n-dlms
- [ ] Session management , cache browser @willieloea , @DylanPrinsloo (Redis)
