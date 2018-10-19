# Stephen Squawking Presents: Tec Tac Croo

---

## Technologies Used:
- JQuery.
- Javascript.
- HTML.
- CSS.

---

## Thought process:
1. Started off with an HTML file to hold off the entire game.
2. Started working on the JS and Jquery creating grid functions.
3. Moved towards the winning function.
4. Making the entirety of the game dynamic.
5. Creating an A.I.
6. Creating a landing page.
7. Styling and animation.
8. Clean up and making code DRY.

---

## Math behind building an array of winning scenarios:

Selected Size = Grid Size (this could be any number but for this example it will be 3)

Create empty array to host all scenarios 
arr3 = [];

### Horizontal wins :

```
0|1|2
3|4|5
6|7|8
```

Create nested loops, both will iterate a number of times equal to the selected size (3)

First loop start at 0:
 i = 0 
index = 0

Second loop start at index:
J = index —> J=0
 
Add current element “J” into a temp array (arr2):
arr2 = [j] —> arr2 = [0]
increment j++
loop < selected size  (3)

End second loop —> now arr2 = [0, 1, 2]

Push arr2 into big array arr3
Now arr3 = [ [0,1,2] ]

Now index will be: index + selected size —> 0+3 = 3
Because you want to start at the second row

The loop will go into the second loop again making J= index —> J=3 
Second end of first loop will make arr2 = [3,4,5]
Index will be index + selected size —> 3+3= 6
Third end of first loop will make arr2 = [6,7,8]

By the end your big array will have small arrays (equal to the number of the selected size) containing all possible scenarios for row wins 
Arr3 = [ [0,1,2] , [3,4,5] , [6,7,8] ]

* Code:

```
for (var i = 0; i < selectedSize; i++) {
      var arr2 = [];
      var currentIndex = startIndex;
   for (var j = 0; j < selectedSize; j++) {
    arr2.push(currentIndex);
    currentIndex++;
    }
 arr3.push(arr2);
 startIndex += selectedSize;
} 
```


### Vertical wins:

```
0|1|2
3|4|5
6|7|8
```
Create nested loops, both will iterate a number of times equal to the selected size (3)

First loop start at 0:
 i = 0 

Second loop start at i:
J = i —> J=0
 
Add current element “J” into a temp array (arr2):
arr2 = [j] —> arr2 = [0]
increment J+selected size —> 0+3 = 3
Now J is 3
Next iteration J+selected size will be 3+3= 6
loop < selected size*selected size —> (9)

End second loop —> now arr2 = [0, 3, 6]

Push arr2 into big array arr3
Now arr3 = [ 0, 3, 6] ]

Now i will be incremented i++ —> i=1

The loop will go into the second loop again making J=i —> J=1 
Second end of second loop will make arr2 = [1,4,7]
i will be 2 and J will start at 2 
Third end of second loop will make arr2 = [2,5,8]

By the end your big array will have the previous row wins arrays we pushed AND small arrays (equal to the number of the selected size) containing all possible scenarios for column wins 
Arr3 = [ [0,1,2] , [3,4,5] , [6,7,8] , [0,3,6] , [1,4,7] , [2,5,8] ]

* Code:

```
for (var i = 0; i < selectedSize; i++) {
      var arr2 = [];
for (var j = 0; j < selectedSize*selectedSize; j+= selectedSize) {
        arr2.push(j);
      }
      arr3.push(arr2);
}
```

### Diagonal wins:

```
0|1|2
3|4|5
6|7|8
```
There are two types of diagonal wins: top left corner, and right left corner 

#### First top right corner:
This is what a diagonal top right corner winning scenario would  look like in a 3x3 grid:
[2, 4, 6]

if you notice the difference between the first element and the second is equal to: selected size - 1 —> 3-1 =2
If we add 2 to 2 we get 4 which is the second element we want, and if we add 2 to 4 we get 6 which is the third element we want.

This works for all grid sizes 
In a 4x4 example

```
0 |1 |2 |3
4 |5 |6 |7
8 |9 |10|11
12|13|14|15
```
the winning scenario would be this:
[3, 6, 9, 12]

If you notice the difference between each element is just like the 3x3 example: selected size-1 —> 4-1 = 3
3+3 = 6 
6+3 = 9 
9+3 = 12
—> [3, 6, 9, 12]

This can be added to our big array by creating a single loop that increments = selected size-1

By the end our big array will be like this
Arr3 = [ [0,1,2] , [3,4,5] , [6,7,8] , [0,3,6] , [1,4,7] , [2,5,8] , [2,4,6] ]

* Code:

 ``` 
 var arr2 = [];
    var currentIndex = selectedSize - 1;
    for (var j = 0; j < selectedSize; j++) {
      arr4.push(currentIndex);
      currentIndex += selectedSize - 1;
    }
    arr3.push(arr2);
  } 
  ```

#### Second top left corner:
This is what a diagonal top left corner winning scenario would look like in a 3x3 grid:
[0, 4, 8]

if you notice the difference between the first element and the second is equal to: selected size + 1 —> 3+1 =4
If we add 4 to 0 we get 4 which is the second element we want and if we add 4 to 4 we get 8 which is the third element we want.

This works for all grid sizes 
In a 4x4 example

```
0 |1 |2 |3
4 |5 |6 |7
8 |9 |10|11
12|13|14|15
```
the winning scenario would be this:
[0, 5, 10, 15]

If you notice the difference between each element is just like the 3x3 example: selected size+1 —> 4+1 = 5
0+5 = 5 
5+5 = 10 
10+5 = 15
—> [0, 5, 10, 15]

This can be added to our big array by creating a single loop that increments = selected size+1

* Code:

```
var arr2 = [];
    var currentIndex = 0;
    for (var j = 0; j < selectedSize; j++) {
      arr2.push(currentIndex);
      currentIndex += selectedSize + 1;
    }
    arr3.push(arr2);
```
### End

By the end our big array will be like this
Arr3 = [ [0,1,2] , [3,4,5] , [6,7,8] , [0,3,6] , [1,4,7] , [2,5,8] , [2,4,6], [0,4,8] ]

Containing all possible winning scenarios without us hard coding anything, the array will adjust based on the selected size and will always be correct no matter the size;

The only downfall of this array is the fact that it is predictable in it’s order meaning the player will know which scenario the A.I will try to pursue in order.

A good way to avoid this is to shuffle this array every time the game is played.

---

## Code Used From Other Sources:

#### 1. The dynamic creation of a grid
 - Source: [@codyseibert](https://github.com/codyseibert/js-connect-four)
```
    for (let row = 0; row < this.ROWS; row++) {
      const $row = $('<div>')
        .addClass('row');
      for (let col = 0; col < this.COLS; col++) {
        const $col = $('<div>')
          .addClass('col empty')
          .attr('data-col', col)
          .attr('data-row', row);
        $row.append($col);
      }
      $board.append($row);
    }
```
#### 2. The customizable pop-up
 - Source: [W3School](https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal)
---

## Link:
[Stephen Squawking Presents: Tec Tac Croo](https://alanoudssr.github.io/project_0/)

---

## What's Next:
- Online multiplayer.

---

## Credits:
- Jack Jeffress [@ga-wolf](https://github.com/ga-wolf)
- Trevor Preston [@trevorpreston](https://github.com/trevorpreston)
- Moath Althawad [@mfalthaw](https://github.com/mfalthaw/)
- [Google Fonts](https://fonts.google.com)
- [JQquery](https://github.com/jquery/jquery)
- [Animate CC](https://daneden.github.io/animate.css/)
- [Peacock illustration](https://alboardman.tumblr.com/post/125439936401/peacock)
- [W3School](https://www.w3schools.com/)
- [Cody Seibert](https://www.youtube.com/watch?v=zIreWkKfChE&t=37s)


