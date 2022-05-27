## FILEDRIVE-NEXTJS

## 1. Introduction

This project aims to provide a file storage service for registered users. I decided on creating this app mainly to learn about stuff I haven't had the chance to put my hands on before but also because I always wondered myself how some of the features offered by cloud services work under the hood. Creating this application was a fun journey where I learnt a lot about things I could use in future projects.

For starters, it was my first contact with a relational database. For quite a long time, I had a desire to use PostgreSQL so I took the plunge and chose it to be my database for this app. It became clearer to me when/should I use a relational db over a noSQL one. It also made me see the differences between SQL and noSQL when it comes to their own particularities: "the way I do this thing in MongoDB is so different than it is in PostgreSQL" or maybe "wow, Prisma makes working with this stuff very easy!", and so on. I also dived on more advanced stuff, like creating my own custom models and extending methods into my tables as an alternative to Instance and Static methods in mongoose.

I have been using Next Auth for my authentication needs on my latest projects but never had the chance to go deeper with it. On this project, users have the option to log in to the system via Google. Needless to say that Next auth did all the heavy-lifting for me - I got my routes protected from unauthenticated users, 3rd-party log in Providers work beautifully and in less than two days I made my application really secure with no sweat.

It is no big news to see modern applications using drag and drop (D'n'D) functionality. The way users move their files from drive to bin (and vice-versa) could be done by dragging and dropping files. And so I did. It was a nice learning curve until I got stuck in a very particular problem involving D'n'D plus the ability of having a central place to manage state of all the files in the bin. After some days architecting ways of making the job done, learning ins and outs about React's inner nature, like the useEffect limitation of having state values when it first ran, the impossibility of using hooks inside loops, conditionals and nested functions, I finally managed to do it. I talked about that problem in greater detail on use-checkbox.ts file, on hooks folder.

Other very important feature that most websites are using today is the ability to translate the page content according to user's language. NextJS has i18n bult-in, so integrating it into the app is a very straightforward implementation.

AWS S3. My first time using it and I confess I feared doing something wrong and having to sell my house to pay the bills. Good thing about it is that internet is full of resources talking about it (even though Amazon docs are not the best place to get info sadly). I also used Cloudinary as a cloud solution for user profile images.

TypeScript. Even though I had experience working with TS in non-react projects, it was my first time using it fully in a React project. Simply put, TS is awesome.

All in all, I am pretty proud of what I have done on this project. It works, and it works really well. It is optimized thanks to React's own tools. Tried to make my code as clean and organized as I could.

## 2. Features

Built with NextJS  
Typescript  
PostgreSQL  
Prisma  
Next Auth using Google Provider (will add more in the future)  
Drag and drop  
i18n  
AWS S3  
Cloudinary  
Error handling on both frontend and backend

## 3. Missing Improvements

It was my primary intention to use a middleware to check if there is session and if it is, attach user's ID to req. Apparently, due to NextJS's design this is simply not possible yet, at least not if you are using some Next-Auth built-in providers. getSession() needs req of the type IncomingMessage but \_middleware has access to req of the type NextRequest. Implementing this would be a nice addition to the application as it would get rid of the same lines of code in every protected page for getting session and checking if user is authenticated. I also tried to use Next-Auth's own middleware but with no success as currently this solution only works for JWT.

## 4. Getting Started

First, clone this repo or download the files. Navigate to the root folder and install the dependencies by typing:

```bash
npm install
# or
yarn install
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app running.

## 5. See it live

NOT YET!!!

## 6. Feedback

I would love to hear some feedback on this application. If you have any suggestions, improvements or just want to chat, you can reach out to me on my social pages:
// <INCLUIR LINK PARA SOCIAL>
