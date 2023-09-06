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
    class TRIP_CHAT{
      // main() is used to create the main page
      main(){
        // First clear the body before adding in
        // a title and the join form
        document.body.innerHTML = ''
        this.create_title()

        //A username should be present
        var username = this.get_name();
        if (username) {
        // If a username exists, proceed to the chat page
            this.chat(username);
        } else {
        // If no username is found, create the join form
            this.create_join_form();
        }
      }

      // chat() is used to create the chat page
      chat(username){
        this.create_title()
        this.create_chat()
      }
      // create_title() is used to create the title for the 
      create_title(){
        // This is the title creator. 
        var title_container = document.createElement('div') // <div> acts as a container for the title
        title_container.setAttribute('id', 'title_container') // this is setting the attribute of 'title_container'
        var title_inner_container = document.createElement('div') //another <div> element created 
        title_inner_container.setAttribute('id', 'title_inner_container') //again attribute has been set
  
        var title = document.createElement('h1') //header element created and 'TRIPCHAT' text will be placed 
        title.setAttribute('id', 'title') // attribute setting
        title.textContent = 'TRIPCHAT' // Title has been set
  
        title_inner_container.append(title)// These lines handle the nesting of elements as mentioned before 
        title_container.append(title_inner_container)
        document.body.append(title_container) //title container appended to the <body> element of HTML
      }

      // create_chat() creates the chat container and stuff
      create_chat(){
        // create_chat has to be parented which is a way to structure the display that the user sees ultimately
        var parent = this;
        var title_container = document.getElementById('title_container')
        var title = document.getElementById('title')
        title_container.classList.add('chat_title_container')
        // Make the title smaller by making it 'chat_title'
        title.classList.add('chat_title')
  
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
        // Only a max message length of 1000
        chat_input.setAttribute('maxlength', 1000)
        // Get the name of the user
        chat_input.placeholder = `${parent.get_name()}. Say something...`
        chat_input.onkeyup  = function(){
          if(chat_input.value.length > 0){
            chat_input_send.removeAttribute('disabled')
            chat_input_send.classList.add('enabled')
            chat_input_send.onclick = function(){
              chat_input_send.setAttribute('disabled', true)
              chat_input_send.classList.remove('enabled')
              if(chat_input.value.length <= 0){
                return
              }
              // Enable the loading circle in the 'chat_content_container'
              parent.create_load('chat_content_container')
              // Send the message. Pass in the chat_input.value
              parent.send_message(chat_input.value)
              // Clear the chat input box
              chat_input.value = ''
              // Focus on the input just after
              chat_input.focus()
            }
          }else{
            chat_input_send.classList.remove('enabled')
          }
        }
  
        var chat_logout_container = document.createElement('div')
        chat_logout_container.setAttribute('id', 'chat_logout_container')
  
        var chat_logout = document.createElement('button')
        chat_logout.setAttribute('id', 'chat_logout')
        chat_logout.textContent = `${parent.get_name()} • logout`
        // "Logout" is really just deleting the name from the localStorage
        chat_logout.onclick = function(){
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
      // create_join_form() creates the join form
      create_join_form(){
        var parent = this;
  
        var join_container = document.createElement('div')
        join_container.setAttribute('id', 'join_container')
        var join_inner_container = document.createElement('div')
        join_inner_container.setAttribute('id', 'join_inner_container')
  
        var join_button_container = document.createElement('div')
        join_button_container.setAttribute('id', 'join_button_container')
  
        var join_button = document.createElement('button')
        join_button.setAttribute('id', 'join_button')
        join_button.innerHTML = 'join <i class="fas fa-sign-in-alt"></i>'
  
        var join_input_container = document.createElement('div')
        join_input_container.setAttribute('id', 'join_input_container')
  
        var join_input = document.createElement('input')
        join_input.setAttribute('id', 'join_input')
        join_input.setAttribute('maxlength', 15)
        join_input.placeholder = 'Username'
        // Every time we type into the join_input
        join_input.onkeyup  = function(){
          // If the input we have is longer that 0 letters
          if(join_input.value.length > 0){
            // Make the button light up
            join_button.classList.add('enabled')
            // Allow the user to click the button
            join_button.onclick = function(){
              // Save the name to local storage. Passing in
              // the join_input.value
              parent.save_name(join_input.value)
              // Remove the join_container. So the site doesn't look weird.
              join_container.remove()
              // parent = this. But it is not the join_button
              // It is (MEME_CHAT = this).
              parent.create_chat()
            }
          }else{
            // If the join_input is empty then turn off the
            // join button
            join_button.classList.remove('enabled')
          }
        }
  
        // Append everything to the body
        join_button_container.append(join_button)
        join_input_container.append(join_input)
        join_inner_container.append(join_input_container, join_button_container)
        join_container.append(join_inner_container)
        document.body.append(join_container)
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
      // Save name. It literally saves the name to localStorage
      save_name(name){
        // Save name to localStorage
        localStorage.setItem('name', name)
      }
      // Sends message/saves the message to firebase database
      send_message(message){
        var parent = this
        // if the local storage name is null and there is no message
        // then return/don't send the message. The user is somehow hacking
        // to send messages. Or they just deleted the
        // localstorage themselves. But hacking sounds cooler!!
        if(parent.get_name() == null && message == null){
          return
        }
  
        // Get the firebase database value
        db.ref('chats/').once('value', function(message_object) {
          // This index is mortant. It will help organize the chat in order
          var index = parseFloat(message_object.numChildren()) + 1
          db.ref('chats/' + `message_${index}`).set({
            name: parent.get_name(),
            message: message,
            timestamp: new Date().getTime(), // Add the timestamp
            index: index
          })
          .then(function(){
            // After we send the chat refresh to get the new messages
            parent.refresh_chat()
          })
        })
      }
      // Get name. Gets the username from localStorage
      get_name(){
        // Get the name from localstorage
        return localStorage.getItem('name');
      }
      // Refresh chat gets the message/chat data from firebase
      refresh_chat(){
        var chat_content_container = document.getElementById('chat_content_container')
  
        // Get the chats from firebase
        db.ref('chats/').on('value', function(messages_object) {
          // When we get the data clear chat_content_container
          chat_content_container.innerHTML = ''
          // if there are no messages in the chat. Retrun . Don't load anything
          if(messages_object.numChildren() == 0){
            return
          }
  
          // OK! SO IF YOU'RE A ROOKIE CODER. THIS IS GOING TO BE
          // SUPER EASY-ISH! I THINK. MAYBE NOT. WE'LL SEE!
  
          // convert the message object values to an array.
          var messages = Object.values(messages_object.val());
          var guide = [] // this will be our guide to organizing the messages
          var unordered = [] // unordered messages
          var ordered = [] // we're going to order these messages
  
          for (var i, i = 0; i < messages.length; i++) {
            // The guide is simply an array from 0 to the messages.length
            guide.push(i+1)
            // unordered is the [message, index_of_the_message]
            unordered.push([messages[i], messages[i].index]);
          }
  
          // Now this is straight up from stack overflow 🤣
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
  
          // Now we're done. Simply display the ordered messages
          ordered.forEach(function(data) {
            var name = data.name;
            var message = data.message;
            var timestamp = data.timestamp; // Get the timestamp
          
            var message_container = document.createElement('div');
            message_container.setAttribute('class', 'message_container');
          
            var message_inner_container = document.createElement('div');
            message_inner_container.setAttribute('class', 'message_inner_container');
          
            var message_user_container = document.createElement('div');
            message_user_container.setAttribute('class', 'message_user_container');
          
            var message_user = document.createElement('p');
            message_user.setAttribute('class', 'message_user');
            message_user.textContent = `${name}`;
          
            var message_timestamp = document.createElement('p'); // Create a new element for the timestamp
            message_timestamp.setAttribute('class', 'message_timestamp');
            
            // Format the timestamp using the Date object
            var date = new Date(timestamp);
            var formattedTimestamp = date.toLocaleTimeString(); // Customize this format as needed
            message_timestamp.textContent = formattedTimestamp;
          
            var message_content_container = document.createElement('div');
            message_content_container.setAttribute('class', 'message_content_container');
          
            var message_content = document.createElement('p');
            message_content.setAttribute('class', 'message_content');
            message_content.textContent = `${message}`;
          
            message_user_container.append(message_user, message_timestamp); // Append timestamp element
            message_content_container.append(message_content);
            message_inner_container.append(message_user_container, message_content_container);
            message_container.append(message_inner_container);
          
            chat_content_container.append(message_container);
          });
          
          // Go to the recent message at the bottom of the container
          chat_content_container.scrollTop = chat_content_container.scrollHeight;
          
      })
  
      }
    }
    // So we've "built" our app. Let's make it work!!
    var webby = new TRIP_CHAT()
    // If we have a name stored in localStorage.
    // Then use that name. Otherwise , if not.
    // Go to main page.
    webby.main
    if(webby.get_name() != null){
      webby.chat()
    }
  }
  