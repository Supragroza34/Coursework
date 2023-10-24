

//window.onload is used to execute JavaScript code once all the content on a webpage has been fully loaded
window.onload = function() {
  // Firebase configuration 
  var firebaseConfig = {
    apiKey: "AIzaSyAEZPr0IXy-ShzCaGGfmG8W6yHBuUj6lQg",
    authDomain: "coursework-f1a2d.firebaseapp.com",
    projectId: "coursework-f1a2d",
    storageBucket: "coursework-f1a2d.appspot.com",
    messagingSenderId: "255130409141",
    appId: "1:255130409141:web:33c136f2011ae70a2706fc"
  };
  // Initialise Firebase
  firebase.initializeApp(firebaseConfig);


  var db = firebase.database()
  // This is where we start to use object oriented programming to devise our chat facility

  var messageCount = 0;

  var isSliderVisible = false;

  var customiseButton = document.getElementById('customise_button');
  customiseButton.addEventListener('click', function () {
    if (isSliderVisible) {
      var colourSliderContainer = document.getElementById('colour_slider_container')
      if (colourSliderContainer) {
        colourSliderContainer.remove()
      }
    } else {
      webby.customiseColours(); // Call the customiseColours method
    }

    isSliderVisible = !isSliderVisible;

  });


  // Add an event listener to the "Italics" button
  var italicsButton = document.getElementById('italics_button');
  italicsButton.addEventListener('click', function () {
    webby.toggleItalics(); // Call the toggleItalics method when the button is clicked
  });

  // Add an event listener to the "Italics" button
  var boldButton = document.getElementById('bold_button');
  boldButton.addEventListener('click', function () {
    webby.toggleBold(); // Call the toggleItalics method when the button is clicked
  });

  // Add an event listener to the "Italics" button
  var UnderButton = document.getElementById('underline_button');
  UnderButton.addEventListener('click', function () {
    webby.toggleUnderline(); // Call the toggleItalics method when the button is clicked
  });



  function checkAndRemoveUser() {
    var userRef = db.ref('users');
  
    userRef.once('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var userData = childSnapshot.val();
        var userId = childSnapshot.key;
        var banCount = userData.banCount || 0;
  
        if (banCount >= 3) {
          // If banCount is 3 or more, remove the user
          userRef.child(userId)
            .remove()
            .then(function () {
              // Log the removal message to the chat box as if it's a server message
              var bannedUserName = userData.PreUsername;
              var removalMessage = `server: User ${bannedUserName} removed due to excessive bans.`;
              appendMessageToChat(removalMessage);
  
              // Now, also remove the username from the 'usernames' child
              var usernameRef = db.ref('usernames/' + userData.PreUsername);
              usernameRef.remove()
                .then(function () {
                  console.log(`Username ${userData.PreUsername} removed from 'usernames' child.`);
                })
                .catch(function (error) {
                  console.error("Error removing username:", error);
                });
            })
            .catch(function (error) {
              console.error("Error removing user:", error);
            });
        }
      });
    });
  }


  
  


  // Function to append a message to the chat
  function appendMessageToChat(message) {
    var chatContentContainer = document.getElementById('chat_content_container');
    if (chatContentContainer) {
      var messageContainer = document.createElement('div');
      messageContainer.setAttribute('class', 'message_container');
      
      var messageContent = document.createElement('p');
      messageContent.textContent = message;

      messageContainer.appendChild(messageContent);
      chatContentContainer.appendChild(messageContainer);

      // Scroll to the recent message at the bottom of the container
      chatContentContainer.scrollTop = chatContentContainer.scrollHeight;
    }
  }

  // Call the checkAndRemoveUser function every second
  setInterval(checkAndRemoveUser, 1000);





  function hasReported() {
    // Check if the 'hasReported' flag is set in sessionStorage
    var hasReportedFlag = sessionStorage.getItem('hasReported');
  
    // If 'hasReportedFlag' is not null it means the user has reported someone in this session
    return hasReportedFlag !== null;
  }


  
  
  








  class TRIP_CHAT{

    constructor() {
      // Initialise most recent user variable
      this.mostRecentUser = '';
    }

    updateMostRecentUser(username) {
      this.mostRecentUser = username; // Set the most recent user
      var mostRecentUserContainer = document.getElementById('most_recent_user');
      if (mostRecentUserContainer) {
        mostRecentUserContainer.textContent = `Most Recent User: ${username}`;
      }
    }
    // main() is used to create the main page
    main(){
      // First clear the body before adding in
      // a title and the join form
      document.body.innerHTML = ''
      this.create_title()
    }
    // chat() is used to create the chat page
    chat(){
      this.create_title()
      this.create_chat()
    }

    toggleItalics() {
      // Get the chat input element by its unique ID
      var chatInput = document.getElementById('chat_input');
    
      // Check the current font style of the chat input
      if (chatInput.style.fontStyle === 'italic') {
        // If the font style is already italic,
        // change it to normal to turn off italics
        chatInput.style.fontStyle = 'normal';
      } else {
        // If the font style is not italic,
        // change it to italic to turn on italics
        chatInput.style.fontStyle = 'italic';
      }
    }


    updateMessageCount() {
      messageCount++; // Increment the message count
      var messageCountContainer = document.getElementById('message_count');
      if (messageCountContainer) {
        messageCountContainer.textContent = `Messages: ${messageCount}`;
      }
    }

    toggleBold() {
      // Get the chat input element by its unique ID
      var chatInput = document.getElementById('chat_input');
    
      // Check the current font style of the chat input
      if (chatInput.style.fontWeight === 'bold') {
        // If the font style is already italic,
        // change it to normal to turn off italics
        chatInput.style.fontWeight = 'normal';
      } else {
        // If the font style is not italic,
        // change it to italic to turn on italics
        chatInput.style.fontWeight = 'bold';
      }
    }

    

    toggleUnderline() {
      // Get the chat input element by its unique ID
      var chatInput = document.getElementById('chat_input');
    
      // Check the current font style of the chat input
      if (chatInput.style.textDecoration === 'underline') {
        // If the font style is already italic,
        // change it to normal to turn off italics
        chatInput.style.textDecoration = 'none';
      } else {
        // If the font style is not italic,
        // change it to italic to turn on italics
        chatInput.style.textDecoration = 'underline';
      }
    }
    
    
    
    
    requestToBan() {
      // Check if the user has already reported someone in this session
      var hasReported = sessionStorage.getItem('hasReported');
    
      if (hasReported) {
        alert('You have already reported a user in this session.');
        return; // Exit the function if the user has already reported someone
      }
    
      // Use window.prompt to ask for user input
      var banTarget = window.prompt("Who would you like to ban? Enter their username:");
    
      if (banTarget !== null && banTarget.trim() !== '') {
        var confirmBan = window.confirm(`Are you sure you want to request a ban for ${banTarget}?`);
        if (confirmBan) {
          // Retrieve the user's banCount from Firebase
          var userRef = db.ref('users');
          userRef.orderByChild('PreUsername').equalTo(banTarget).once('value', (snapshot) => {
            if (snapshot.exists()) {
              // Get the user's data and increment their banCount
              var userData = snapshot.val();
              var userId = Object.keys(userData)[0];
              var currentBanCount = userData[userId].banCount || 0; // Get current banCount
    
              // Increase the banCount by one
              db.ref('users/' + userId + '/banCount').set(currentBanCount + 1)
                .then(() => {
                  alert(`Ban request sent for ${banTarget}!`);
                  // Set the flag to indicate that the user has reported someone in this session
                  sessionStorage.setItem('hasReported', 'true');
                })
                .catch((error) => {
                  console.error("Error updating banCount:", error);
                });
            } else {
              // User not found, show an alert or feedback to the user
              alert("User not found.");
            }
          });
        }
      }
    }



    


  


    customiseColours() {
      console.log("Customise button clicked"); // Add this line to check if the function is triggered
    
      // Create a div element to hold the colour customisation slider
      var colourSliderContainer = document.createElement('div');
      colourSliderContainer.setAttribute('id', 'colour_slider_container');
    
      // Create an input element for the colour slider
      var colourSlider = document.createElement('input');
      colourSlider.setAttribute('type', 'range');
      colourSlider.setAttribute('min', '0');
      colourSlider.setAttribute('max', '360');
      colourSlider.setAttribute('value', '0');
      colourSlider.setAttribute('id', 'colour_slider');
    
      // Create a div element to display the selected colour
      var selectedColourDisplay = document.createElement('div');
      selectedColourDisplay.setAttribute('id', 'selected_colour_display');
    
      // Append the colour slider and colour display elements to the container
      colourSliderContainer.appendChild(colourSlider);
      colourSliderContainer.appendChild(selectedColourDisplay);
    
      // Append the container to the body or any other desired element
      document.body.appendChild(colourSliderContainer);
    
      // Add an event listener to update the selected colour when the slider value changes
      colourSlider.addEventListener('input', function () {
        var selectedColour = `hsl(${colourSlider.value}, 100%, 50%)`; // Create an HSL colour based on the slider value
        selectedColourDisplay.style.backgroundColor = selectedColour; // Set the background colour of the display div
        document.body.style.backgroundColor = selectedColour; // Set the background colour of the entire page
      });
    }
    
    
    
    getCurrentFontStyle(){
      var chatInput = document.getElementById('chat_input');
      return chatInput.style.fontStyle;
    }

    getCurrentBold (){
      var chatInput = document.getElementById('chat_input');
      return chatInput.style.fontWeight;
    }

    getUnderline (){
      var chatInput = document.getElementById('chat_input');
      return chatInput.style.textDecoration;
    }
    
    
    
    
  
    // create_title() is used to create the title for the 
    create_title(){
      // This is the title creator. 
      var title_container = document.createElement('div') // <div> acts as a container for the title
      title_container.setAttribute('id', 'title_container') // this is setting the attribute of 'title_container'
      var title_inner_container = document.createElement('div') //another <div> element created 
      title_inner_container.setAttribute('id', 'title_inner_container') //again attribute has been set

      var title = document.createElement('h1') //header element created and 'TRIPCHAT' text will be placed
      title_container.classList.add('chat_title_container')
        // Make the title smaller by making it 'chat_title'
        title.classList.add('chat_title')
      title.setAttribute('id', 'title') // attribute setting
      title.textContent = 'TRIPCHAT' // Title has been set

      title_inner_container.append(title)// These lines handle the nesting of elements as mentioned before 
      title_container.append(title_inner_container)
      document.body.append(title_container) //title container appended to the <body> element of HTML

      // Create the "Request to Ban" button
      var requestToBanButton = document.createElement('button');
      requestToBanButton.setAttribute('id', 'request_to_ban_button');
      requestToBanButton.textContent = 'Request to Ban';

      // Add a click event handler to the button
      requestToBanButton.addEventListener('click', () => {
        this.requestToBan(); // Call the requestToBan method
      });
      // Append the button to the title container
      title_inner_container.appendChild(requestToBanButton);
    }
    // Get name. Gets the username from localStorage
    get_name(){
      // Get the name from localstorage
      if(localStorage.getItem('name') != null){
        return localStorage.getItem('name')
      }else{
        this.main()
        return null
      }
    }

    // create_load() creates a loading circle that is used in the chat container for visual stimulation
    create_load(container_id){
      var parent = this;

      // This is a loading function which makes my program look more neater
      var container = document.getElementById(container_id)
      container.innerHTML = ''

      var loader_container = document.createElement('div')
      loader_container.setAttribute('class', 'loader_container')

      var loader = document.createElement('div')
      loader.setAttribute('class', 'loader')

      loader_container.append(loader)
      container.append(loader_container)

    }




    // create_chat() creates the chat container and stuff
    create_chat(){
      // create_chat has to be parented 
      var parent = this;
      // GET THAT MEMECHAT HEADER OUTTA HERE
      var title_container = document.getElementById('title_container')
      var title = document.getElementById('title')
      
      
      var chat_container = document.createElement('div')
      chat_container.setAttribute('id', 'chat_container')

      var chat_inner_container = document.createElement('div')
      chat_inner_container.setAttribute('id', 'chat_inner_container')

      var chat_content_container = document.createElement('div')
      chat_content_container.setAttribute('id', 'chat_content_container')

      var chat_input_container = document.createElement('div')
      chat_input_container.setAttribute('id', 'chat_input_container')

      var chat_input_send = document.createElement('button')
      chat_input_send.setAttribute('id', 'chat_input_send')
      chat_input_send.setAttribute('disabled', true)
      chat_input_send.innerHTML = `send<i class="far fa-paper-plane"></i>`

      var chat_input = document.createElement('input')
      chat_input.setAttribute('id', 'chat_input')





      
      // Get the name of the user
      chat_input.placeholder = `${parent.get_name()} say something` //placeholder in the input container being created 
      chat_input.onkeyup  = function(){ //event handler that listens for a key being released
        if(chat_input.value.length > 0){ //checks if there is atleast one character in the input field
          chat_input_send.removeAttribute('disabled') // Now the disabled button becomes enabled as there are characters in the box
          chat_input_send.classList.add('enabled')
          chat_input_send.onclick = function(){//Another event handler added which listens for the click of the 'send' button
            chat_input_send.setAttribute('disabled', true) 
            chat_input_send.classList.remove('enabled')
            if(chat_input.value.length <= 0){ //This now focuses on verifying whether there are any characters in the container
              return
            }
            // I have created a loading circle that will be placed when transition between login to chat facility occurs
            parent.create_load('chat_content_container')
            // Send the message. Pass in the chat_input.value
            parent.send_message(chat_input.value)
            // Clear the chat input box
            chat_input.value = ''
            // Focus on the input just after
            chat_input.focus()
          }
        }else{
          chat_input_send.classList.remove('enabled') //removes the CSS class named enabled which does not let the user interact with it anymore
        }
      }

      var chat_logout_container = document.createElement('div')
      chat_logout_container.setAttribute('id', 'chat_logout_container')

      var chat_logout = document.createElement('button')
      chat_logout.setAttribute('id', 'chat_logout')
      chat_logout.textContent = `${parent.get_name()} • logout`
      // "Logout" is really just deleting the name from the localStorage and going back to the mainpage
      chat_logout.onclick = function(){
        window.location.href = "MainHub.html";
        localStorage.clear()
        // Go back to the main page
        parent.main()
      }

      chat_logout_container.append(chat_logout)
      chat_input_container.append(chat_input, chat_input_send)
      chat_inner_container.append(chat_content_container, chat_input_container, chat_logout_container)
      chat_container.append(chat_inner_container)
      document.body.append(chat_container)
      // After creating the chat. We immediatly create a loading circle in the 'chat_content_container'
      parent.create_load('chat_content_container')
      // then we "refresh" and get the chat data from Firebase
      parent.refresh_chat()
    }
    // Sends message/saves the message to firebase database
    send_message(message){
      var parent = this

      var username = parent.get_name();

      // if the local storage name is null and there is no message
      // then return/don't send the message because the user
      // just deleted the localstorage themeselves
      if(parent.get_name() == null && message == null){
        return
      }

      // Get the firebase database value
      db.ref('chats/').once('value', function(message_object) { //fetches existing data in chat section in D-base
        // Chat will be ordered by the index below which calculates by analysing how many chats already present
        var index = parseFloat(message_object.numChildren()) + 1
        db.ref('chats/' + `message_${index}`).set({ // new data entry set in form message_I where I is index
          name: username, //User's name retrieved using 'get_name'
          message: message, //sent as a parameter to send_message function
          timestamp: new Date().getTime(), // Represents when it was sent
          index: index, //calculated index
          fontStyle: parent.getCurrentFontStyle(),// Include the current font style
          fontWeight: parent.getCurrentBold() ,
          textDecoration: parent.getUnderline()



        })
        .then(function(){ //.then refers to what happens after success in storing message
          // After we send the chat refresh to get the new messages
          parent.updateMessageCount(); // Function parented and called here

          parent.updateMostRecentUser(username); //parented and called within this branch


          parent.refresh_chat();
        });
      });
    }


    refresh_chat(){
      var chat_content_container = document.getElementById('chat_content_container')

      // Get the chats from firebase
      db.ref('chats/').on('value', function(messages_object) {
        // When we get the data clear chat_content_container
        chat_content_container.innerHTML = ''
        // if there are no messages in the chat, we return, nothing is loaded
        if(messages_object.numChildren() == 0){
          return
        }

        // convert the message object values to an array.
        var messages = Object.values(messages_object.val());
        var guide = [] // this will be our guide to organising the messages
        var unordered = [] // unordered messages
        var ordered = [] // we're going to order these messages

        for (var i, i = 0; i < messages.length; i++) {
          // The guide is simply an array from 0 to the messages.length
          guide.push(i+1)
          // unordered is the [message, index_of_the_message]
          unordered.push([messages[i], messages[i].index]);
        }

        // Sort the unordered messages by the guide
        guide.forEach(function(key) {
          var found = false
          unordered = unordered.filter(function(item) {
            if(!found && item[1] == key) {
              // Now push the ordered messages to ordered array
              ordered.push(item[0])
              found = true
              return false
            }else{
              return true
            }
          })
        })

        // This section is used to display the chat on the user's screen
        ordered.forEach(function(data) {
          var name = data.name; // Extract the sender's name from message data
          var message = data.message; // Extract the message content from message data
          var timestamp = data.timestamp; // Extract the timestamp from message data

        
          var message_container = document.createElement('div'); // Create a container for the message
          message_container.setAttribute('class', 'message_container'); // Set a CSS class for styling
        
          var message_inner_container = document.createElement('div'); // Create an inner container
          message_inner_container.setAttribute('class', 'message_inner_container'); // Set a CSS class for styling
        
          var message_user_container = document.createElement('div'); // Create a container for the user's name
          message_user_container.setAttribute('class', 'message_user_container'); // Set a CSS class for styling
        
          var message_user = document.createElement('p'); // Create a paragraph for the user's name
          message_user.setAttribute('class', 'message_user'); // Set a CSS class for styling
          message_user.textContent = `${name}`; // Display the sender's name in the paragraph
        
          var message_timestamp = document.createElement('p'); // Create a paragraph for the timestamp
          message_timestamp.setAttribute('class', 'message_timestamp'); // Set a CSS class for styling
          // The timestamp will be added here to show when the message was sent or received
          
          // Format the timestamp using the Date object
          var date = new Date(timestamp); // Create a Date object from the timestamp
          var formattedTimestamp = date.toLocaleTimeString(); // Format Timestamp so humans can read it
          message_timestamp.textContent = formattedTimestamp; //Display formtted timesteamp

          




          
        
          // Create a container for the message content
          var message_content_container = document.createElement('div');
          message_content_container.setAttribute('class', 'message_content_container'); //Set a CSS class

          // Inside the forEach loop of the ordered messages
          var message_content = document.createElement('p');
          message_content.setAttribute('class', 'message_content');
          message_content.textContent = `${message}`;
          message_content.style.fontStyle = data.fontStyle; // Apply the font style


          //Create an element for the message content
          var message_content = document.createElement('p');
          message_content.setAttribute('class', 'message_content'); //Set a CSS class

          message_content.textContent = `${message}`; // Set the text content to the message content
          message_content.style.fontWeight = data.fontWeight;
          message_content.style.fontStyle = data.fontStyle; // Apply the font style
          message_content.style.textDecoration = data.textDecoration;



          // Append the user's name and timestamp elements to the user container
          message_user_container.append(message_user, message_timestamp); // Append timestamp element

          // Append the message content paragraph to its container
          message_content_container.append(message_content);

          // Append the user container and message content container to the inner container
          message_inner_container.append(message_user_container, message_content_container);

          // Append the inner container (with user info and message) to the message container
          message_container.append(message_inner_container);

          // Append the message container to the chat content container
          chat_content_container.append(message_container);



                    // Check and remove users with banCount >= 3
          if (name && name !== 'null') {
            var userRef = db.ref('users');
            userRef
              .orderByChild('PreUsername')
              .equalTo(name)
              .once('value', (snapshot) => {
                if (snapshot.exists()) {
                  var userData = snapshot.val();
                  var userId = Object.keys(userData)[0];
                  var banCount = userData[userId].banCount || 0;

                  if (banCount >= 3) {
                    // User has a banCount of 3 or more, remove them from the chat
                    db.ref('users/' + userId).remove();
                    alert(`${name} has been removed due to excessive bans.`);
                  }
                }
              });
          }
        });

        // Call checkAndRemoveUser periodically
        checkAndRemoveUser();        
        // Go to the recent message at the bottom of the container
        chat_content_container.scrollTop = chat_content_container.scrollHeight;
        
    });

    }



  }
  // So we've "built" our app. Let's make it work!!
  var webby = new TRIP_CHAT()


  // Add an event listener for the "Italics" button
  document.addEventListener('DOMContentLoaded', function () {
    var italicsButton = document.getElementById('italics_button');
    italicsButton.addEventListener('click', function () {
      webby.toggleItalics(); // Call the toggleItalics method when the button is clicked
    });
  });

  // Add an event listener for the "Bold" button
  document.addEventListener('DOMContentLoaded', function () {
    var boldButton = document.getElementById('bold_button');
    boldButton.addEventListener('click', function () {
      webby.toggleBold(); // Call the toggleBold method when the button is clicked
    });
  });

  // Add an event listener for the "Bold" button
  document.addEventListener('DOMContentLoaded', function () {
    var UnderButton = document.getElementById('underline_button');
    UnderButton.addEventListener('click', function () {
      webby.toggleUnderline(); // Call the toggleBold method when the button is clicked
    });
  });


  // Add an event listener for the "Customise" button
  document.addEventListener('DOMContentLoaded', function () {
    var customiseButton = document.getElementById('customise_button');
    customiseButton.addEventListener('click', function () {
      webby.customiseColors(); // Call the customiseColors method when the button is clicked
    });
  });





  // If we have a name stored in localStorage.
  // Then use that name. Otherwise , if not.
  // Go to main page.
  if(webby.get_name() != null){
    webby.chat()
  }
}

