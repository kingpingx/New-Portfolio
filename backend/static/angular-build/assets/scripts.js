// for navbar fade in and fade out
$(document).ready(function() {

    $(".navbar").hide(); //Hide the navigation bar first

    $(window).scroll(function() { //Listen for the window's scroll event
      if (isScrolledAfterElement("#home")) { //if it has scrolled beyond the #content elment
        $('.navbar').fadeIn(); //Show the navigation bar
      } else {
        $('.navbar').fadeOut(); //Else hide it
      }
    });

    //Function that returns true if the window has scrolled beyond the given element
    function isScrolledAfterElement(elem) {
      var $elem = $(elem);
      var $window = $(window);

      var docViewTop = $window.scrollTop();
      var docViewBottom = docViewTop + $window.height();

      var elemTop = $elem.offset().top;

      return elemTop < docViewTop;
    }
    });

    $(document).ready(function() {

    
    // for name fade in fade out

    $("#prabal").hide(); //Hide the navigation bar first

    $(window).scroll(function() { //Listen for the window's scroll event
      if (isScrolledAfterElement("#bio")) { //if it has scrolled beyond the #content elment
        $('#prabal').fadeIn(); //Show the navigation bar
      } else {
        $('#prabal').fadeOut(); //Else hide it
      }
    });

    //Function that returns true if the window has scrolled beyond the given element
    function isScrolledAfterElement(elem) {
      var $elem = $(elem);
      var $window = $(window);

      var docViewTop = $window.scrollTop();
      var docViewBottom = docViewTop + $window.height();

      var elemTop = $elem.offset().top;

      return elemTop < docViewTop;
    }
    });



    // List of sentences
    var _CONTENT = [ 
      "Computer Science Student", 
      "Web Developer",
      "Python & Django Developer", 
      "Front End Enthusiast", 
      "Programming Enthusiast",
      "Gate Qualified"
    ];

    // Current sentence being processed
    var _PART = 0;

    // Character number of the current sentence being processed 
    var _PART_INDEX = 0;

    // Holds the handle returned from setInterval
    var _INTERVAL_VAL;

    // Element that holds the text
    var _ELEMENT = document.querySelector("#text");

    // Cursor element 
    var _CURSOR = document.querySelector("#cursor");

    // Implements typing effect
    function Type() { 
      // Get substring with 1 characater added
      var text =  _CONTENT[_PART].substring(0, _PART_INDEX + 1);
      _ELEMENT.innerHTML = text;
      _PART_INDEX++;

      // If full sentence has been displayed then start to delete the sentence after some time
      if(text === _CONTENT[_PART]) {
        // Hide the cursor
        _CURSOR.style.display = 'none';

        clearInterval(_INTERVAL_VAL);
        setTimeout(function() {
          _INTERVAL_VAL = setInterval(Delete, 50);
        }, 1000);
      }
    }

    // Implements deleting effect
    function Delete() {
      // Get substring with 1 characater deleted
      var text =  _CONTENT[_PART].substring(0, _PART_INDEX - 1);
      _ELEMENT.innerHTML = text;
      _PART_INDEX--;

      // If sentence has been deleted then start to display the next sentence
      if(text === '') {
        clearInterval(_INTERVAL_VAL);

        // If current sentence was last then display the first one, else move to the next
        if(_PART == (_CONTENT.length - 1))
          _PART = 0;
        else
          _PART++;
        
        _PART_INDEX = 0;

        // Start to display the next sentence after some time
        setTimeout(function() {
          _CURSOR.style.display = 'inline-block';
          _INTERVAL_VAL = setInterval(Type, 100);
        }, 200);
      }
    }

    // Start the typing effect on load
    _INTERVAL_VAL = setInterval(Type, 100);


    
    
    let section = document.querySelectorAll("section");
    let menu = document.querySelectorAll("navbar-nav nav li a");

    window.onscroll = () => {
      section.forEach((i) => {
        let top = window.scrollY;
        let offset = i.offsetTop - 150;
        let height = i.offsetHeight;
        let id = i.getAttribute("id");

        if (top >= offset && top < offset + height) {
          menu.forEach((link) => {
            link.classList.remove("active");
            document
              .querySelector("header nav a[href*=" + id + "]")
              .classList.add("active");
          });
        }
      });
    };
    function reveal() {
      var reveals = document.querySelectorAll(".reveal");

      for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active");
        } else {
          reveals[i].classList.remove("active");
        }
      }
    }

    window.addEventListener("scroll", reveal);

    $(document).ready(function () {
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });
});

    function showportf(myvalue){
      var dname = "pf"+myvalue;
      var elem = document.getElementById(dname);
      elem.classList.replace('hidef', 'showf');
      for (let i = 1; i < 4; i++) {
        if(i != myvalue){
          var cname = "pf"+i;
          var elem = document.getElementById(cname);
          elem.classList.replace('showf', 'hidef');
        }
    }


}

$(".click-phone").click(function() {
    $(this).replaceWith("9910917727");
});
  $(".click-email").click(function() {
    $(this).replaceWith("i.prabal19" + decodeURIComponent("%40") + "gmail.com");
})

 window.onload = function(){
      // Get the button that opens the modal
      var btn = document.querySelectorAll("img.modal-button");

      // All page modals
      var modals = document.querySelectorAll('.modal');

      // Get the <span> element that closes the modal
      var spans = document.getElementsByClassName("close");

      // When the user clicks the button, open the modal
      for (var i = 0; i < btn.length; i++) {
      btn[i].onclick = function(e) {
          e.preventDefault();
          document.getElementById('contact').classList.add('ontop');
          modal = document.querySelector(e.target.getAttribute("href"));
          modal.style.display = "block";
        }
      }

      // When the user clicks on <span> (x), close the modal
      for (var i = 0; i < spans.length; i++) {
      spans[i].onclick = function() {
           
          for (var index in modals) {
            document.getElementById('contact').classList.remove('ontop'); 
            if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none"; 
           
          }
        }
      }

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
          if (event.target.classList.contains('modal')) {
          for (var index in modals) {
            document.getElementById("contact").classList.remove("ontop");
            if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";    
          }
          }
      }
    }