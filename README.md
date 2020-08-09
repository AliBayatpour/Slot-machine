# Slot-machine
Here is a simple slot matchine game
In order to build this game I used: 
1-JavaScript
2-GSAP Library for the animation parts
3-Some Ionic components to create beautiful select boxes, check boxes and etc.

How to download and use the code?
1- Download the project file
2- Unzip it if it is a zip file
3-Open it with your code editor.
4-Run index.html file
Interface
reels
pay-table
balance indicator (text-box)
SPIN button.
Debug area
Reels
Slot machine has 3 reels, each having following 5 symbols in order: 3xBAR, BAR, 2xBAR, 7, CHERRY Only part of the reel is visible to user. There are horizontal win-lines on visible part of reel: top, center, bottom.

Pay Table
Table with combinations prizes, this table blinks and moves once on its corresponding value when the combination in one of the Reels has occured.

Prizes combinations:

 *  3 BAR symbols on any line 10
 *  Combination of any BAR symbols on any line 5
 *  3 2xBAR symbols on any line 20
 *  3 3xBAR symbols on any line 50
 *  3 7 symbols on any line 150
 *  3 CHERRY symbols on top line 2000
 *  3 CHERRY symbols on center line 1000
 *  3 CHERRY symbols on bottom line 4000
 *  Any combination of CHERRY and 7 on any line 75 
Balance
Text-box showing the coin balance, it can be modified for debugging purposes on a range from 1 to 5000.

Spin Button
Press on SPIN button start spinning of all three reels. Each spin costs player 1 coin.

Debug Area
It is posible to run the application in mode random and fixed, with the sencond one it is possible to set up the desire values with a select element which defines the verticall position where the user would like to set a specific value, each select has its own slider with the values to be set.

Select: * Top Line * Center Line * Bottom Line

Slider: Bar - 2Bar - 3Bar - 7 - Cherry
