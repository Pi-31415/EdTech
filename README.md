# EdTech Web Development Front Page

>If you have any questions about the code, please contact the original developer Pi at https://github.com/Pi-31415 on Github, or https://t.me/joinchat/AAAAAEWFzdFCW_I7nipJgA on Telegram.

I will be using the following tools for this single-page design.

## Languages and Locally hosted

* HTML 5
* SASS
* JavaScript
* PHP (for recording data)
* jQuery
* Slick
* D3js
* Venn.js

## via CDN

Note, for 'Bungee Hairline', there is only one line weight available, so it is not possible to bold. In CSS, I used font-stroke from webkit to get the bold effect on that font.

* Google Fonts (Kodchasan,Bungee Hairline,Source Serif Pro)
* Google Material Icons
* Font Awesome

To compile sass to css, first install SASS via NPM

```
npm install -g sass
```

Then, locate to source folder and please run

```
cd css
sass style.sass style.css
```

## Venn Diagram
Venn diagram is created by combining Slick and Venn js.

* I am not able to solve the issue where two bubbles are highlighted simultaneously when user selects the bubble. Other people also have had this issue with Slick js (https://github.com/kenwheeler/slick/issues/1945).

## List of Stock Images Used

* Hero Banner (from unsplash)
* Person holding pen (https://unsplash.com/photos/O3gOgPB4sRU)
* Avatars of people

## Todo list

* Edit schedule(), logout() and login() functions in js/app.js when the backend API is available
* Reduce the file size for the stock images before use.
* Venn Diagram animation for multi devices
* Validate all parts of all the forms

>Further documentation in detail is written where necessary in the source files.
