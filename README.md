What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
ans: Use getElementById()  when selecting one element by ID (fastest, simple).
Use getElementsByClassName()  when you specifically need a live collection.
Use querySelector()  when you want flexibility and only need the first match.
Use querySelectorAll()  when you want full CSS power and multiple elements.

How do you create and insert a new element into the DOM?
ans: The first step is using the document.createElement() method. 
This creates the element in the browser's memory, but it isn't visible on the page yet.
const newDiv = document.createElement('div');

What is Event Bubbling? And how does it work?
ans: Event bubbling is how events move through the DOM after being triggered.
When an event happens on an element (like a button click), the event:
Fires on the target element
Then "bubbles up" to its parent
Then to the parent's parent
And continues up to document.

What is Event Delegation in JavaScript? Why is it useful?
Ans: Event Delegation is a clever technique that leverages Event Bubbling to handle events more efficiently. 
Instead of attaching an event listener to every single child element, you attach a single listener to their common parent.
+1
When a child is clicked, the event "bubbles" up to the parent, where you catch it and determine which child triggered it.

What is the difference between preventDefault() and stopPropagation() methods?
Ans: While they both "stop" something from happening, they handle completely different parts of an event's life cycle. 
The simplest way to remember it is: preventDefault() stops the browser's built-in behavior, 
while stopPropagation() stops the event from traveling up the DOM tree.
Without preventDefault()  the page reloads.
With preventDefault()  form submission is handled by JS.
