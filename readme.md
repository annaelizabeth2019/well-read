# Well Read
## by Anna Peterson, Web Developer
<annapeterson89@gmail.com>

## Description

Well Read is an app for users to track the books they read and keep reviews, quotes, and other notes on their favorite literature. 


## Wireframes

![a wireframe of Well Read showing a homepage](images/home.png)

![a wireframe of Well Read showing the post a book page](images/post.png)

![A wireframe of Well Read showing the library page](images/library.png) 

## Planning
### Trello
I used Trello to come up with some User Stories for Well Read. 
![A Trello Board of Well Read showing the library page](images/trello.png) 
<https://trello.com/b/jMrJFzd7/well-read-app>

### ERD (Entity Relationship Diagram)

![A diagram of Well Read's entity relationships showing that every user has a library with many books and the sub-attributes of each entity](images/erd.png) 

As you can see in the diagram above, in Well Read every user will get a library. For the purposes of my app, *a user is a library* with: 

	* A name
	* A Google ID 
	* Books

The books are embedded in the library Schema and contain these values: 

	* Title
	* Author
	* Cover
	* Published
	* Notes



## API

### Not all APIs are equal

After looking at the NYT books API, I ultimately went with Google Books because it has **extensive documentation**. Check it out at: <https://developers.google.com/books/docs/v1/getting_started>

Just for fun, let's preview the table of contents for Google's documentation: 
![A table of contents for google books API](images/GoogleAPI.png) 
Very documented!

How about the NYT Books table of contents? Well, they don't exactly have a Table of Contents, but they do have *this*:

![A table of contents for google books API](images/NYT-API.png) 

<https://developer.nytimes.com/>

The New York Times API also had higher security. I wanted my users to have unlimited acces to a broad range of titles. In the future, I would like to integrate the NYT Best Sellers list seperately from the main books search, but for my initial launch, Google Books had everything a user could ask for. 


### Taming the API

Google's API delivers, but it's a bit like asking for a cup of coffee and getting the entire cafe. The objects Google returns are **huge** complete with lots of fun information about every book. Let's look at my `bookData.items[0]` when I search for _The Giving Tree_: 
``` { title: 'The Giving Tree',
authors: [ 'Shel Silverstein' ],
  publisher: 'Harper Collins',
  publishedDate: '2014-02-18',
  description:
   "As The Giving Tree turns fifty, this timeless classic is available for the first time ever in ebook format. This digital edition allows young readers and lifelong fans to continue the legacy and love of a household classic that will now reach an even wider audience. Never before have Shel Silverstein's children's books appeared in a format other than hardcover. Since it was first published fifty years ago, Shel Silverstein's poignant picture book for readers of all ages has offered a touching interpretation of the gift of giving and a serene acceptance of another's capacity to love in return. Shel Silverstein's incomparable career as a bestselling children's book author and illustrator began with Lafcadio, the Lion Who Shot Back. He is also the creator of picture books including A Giraffe and a Half, Who Wants a Cheap Rhinoceros?, The Missing Piece, The Missing Piece Meets the Big O, and the perennial favorite The Giving Tree, and of classic poetry collections such as Where the Sidewalk Ends, A Light in the Attic, Falling Up, Every Thing On It, Don't Bump the Glump!, and Runny Babbit. And don't miss Runny Babbit Returns, the new book from Shel Silverstein!",
  industryIdentifiers:
   [ { type: 'ISBN_13', identifier: '9780061965104' },
     { type: 'ISBN_10', identifier: '0061965103' } ],
  readingModes: { text: true, image: true },
  pageCount: 64,
  printType: 'BOOK',
  categories: [ 'Juvenile Fiction' ],
  averageRating: 4,
  ratingsCount: 4805,
  maturityRating: 'NOT_MATURE',
  allowAnonLogging: true,
  contentVersion: '1.3.3.0.preview.3',
  panelizationSummary: { containsEpubBubbles: false, containsImageBubbles: false },
  imageLinks:
   { smallThumbnail:
      'http://books.google.com/books/content?id=1IleAgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
     thumbnail:
      'http://books.google.com/books/content?id=1IleAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' },
  language: 'en',
  previewLink:
   'http://books.google.com/books?id=1IleAgAAQBAJ&printsec=frontcover&dq=the+giving+tree&hl=&cd=1&source=gbs_api',
  infoLink:
   'https://play.google.com/store/books/details?id=1IleAgAAQBAJ&source=gbs_api',
  canonicalVolumeLink: 'https://market.android.com/details?id=book-1IleAgAAQBAJ' } ```
  
As a user, I'm not interested in who the publisher was or seeing a lot of links and I don't care what the ISBN is. Well Read is for book tracking so I only really care about the title, author, a description, and how the cover looks. For fun, let's grab the publishing date as well. But WAIT! Some books don't have Authors and some of Google Book's results didn't provide links to a thumbnail of the cover! As I searched for random terms, I found out that my app would break if the data didn't provide every value I was querying for! Have no fear, ReadMe reader! We can fix it! After investigating various approaches to dealing with my dirty data, the best solution was to write a function that would look at my data, determine what I was dealing with, and provide the correct output for each item. 

![Functions from controllers/](images/dry.png) 