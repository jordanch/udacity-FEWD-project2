//strict mode enabled
'use strict';

//global jQuery #header selector object

var $header = $("#header");

//global %data% replacement object

var data = "%data%";

bio.injectHTML = function () {
  //Create formatted name and role and insert into DOM
  var newHtmlHeaderName = HTMLheaderName.replace(data, bio.name);
  var newHtmlHeaderRole = HTMLheaderRole.replace(data, bio.role);
  $header.prepend(newHtmlHeaderName, newHtmlHeaderRole);

  //create formatted contact information and insert into DOM
  $('#topContacts').append(
    HTMLmobile.replace(data, bio.contact.mobile),
    HTMLemail.replace(data, bio.contact.email),
    HTMLgithub.replace(data, bio.contact.github),
    HTMLtwitter.replace(data, bio.contact.twitter),
    HTMLlocation.replace(data, bio.contact.location)
  );

  //create edited pic html and insert into DOM
  $header.append(HTMLbioPic.replace(data, bio.picture),
    HTMLwelcomeMsg.replace(data, bio.welcome)
  );

  //check if skills is empty, if not, inject skills. Because in JavaScript 0 is falsy, the condition
  //statement below evaluates to true when the array's length is not empty
  if(bio.skills.length) {
    $header.append(HTMLskillsStart);
    var len = bio.skills.length;
    for (var i = 0; i < len ; i++) {
      $("#skills").append(HTMLskills.replace(data, bio.skills[i]));
    };
  };
};

bio.injectHTML();

work.displayWork = function () {
  if(work.jobs.length) {
    var len = work.jobs.length;
    for(var i = 0; i < len; i++) {
      $("#workExperience").append(HTMLworkStart);
      var formattedEmployer = HTMLworkEmployer.replace(data, work.jobs[i].employer);
      var formattedTitle = HTMLworkTitle.replace(data, work.jobs[i].position);
      var combinedEmployerAndTitle = formattedEmployer + formattedTitle;
      var $workEntryLast = $(".work-entry:last");
      $workEntryLast.append(combinedEmployerAndTitle,
        HTMLworkDates.replace(data, work.jobs[i].dates),
        HTMLworkDescription.replace(data, work.jobs[i].description)
      );
      $(".date-text:last").append(HTMLworkLocation.replace(data, work.jobs[i].location));
    };
  };
};

work.displayWork();

portfolio.display = function() {
  if(portfolio.projects.length) {
    var len = portfolio.projects.length;
    for(var i = 0; i < len; i++) {
      $('#projects').append(HTMLprojectStart);
      var $projectEntryLast = $('.project-entry:last');
      $projectEntryLast.append(HTMLprojectTitle.replace(data, portfolio.projects[i].title),
        HTMLprojectDates.replace(data, portfolio.projects[i].dates),
        HTMLprojectDescription.replace(data, portfolio.projects[i].description),
        HTMLprojectImage.replace(data, portfolio.projects[i].images)
      );
    }
	};
};

portfolio.display();

//***************************
//***NB: Udacity Reviewer ***
//***************************
//If I declare and initializing a variable for the selector $('.education-entry:last') here in the Global scope or in the function's local scope, it
//doesn't seem to work properly. When the line 93 is uncommented, as well as 98-100, 103 and 106, and lines 95-97, 102 and 107 are commented out, the
//for loop misses the first array item. Why does this happen? My understanding is that if a global variable is delared using var, it should be accessible by other functions.

//education data injection
education.displayEducation = function() {
  if(education.institutions.length) {
    var len = education.institutions.length;
    for(var i = 0; i < len; i++) {
      //var $educationLastEntry = $('.education-entry:last');
      $('#education').append(HTMLschoolStart);
      $('.education-entry:last').append(HTMLschoolName.replace(data, education.institutions[i].name + ", " + education.institutions[i].type),
        HTMLschoolCourseName.replace(data, education.institutions[i].courseName + ", " + education.institutions[i].status)
      );
      /*$educationLastEntry.append(HTMLschoolName.replace(data, education.institutions[i].name + ", " + education.institutions[i].type),
        HTMLschoolCourseName.replace(data, education.institutions[i].courseName + ", " + education.institutions[i].status)
      );*/
      if(education.institutions[i].link.length && education.institutions[i].linkName.length) {
        $('.education-entry:last').append(HTMLcourseLink.replace("%1data%", education.institutions[i].link));
        //$educationLastEntry.append(HTMLcourseLink.replace("%1data%", education.institutions[i].link));
        $('.course-link:last').html(education.institutions[i].linkName);
      }
      //$educationLastEntry.append(HTMLschoolLocation.replace(data, education.institutions[i].location));
      $('.education-entry:last').append(HTMLschoolLocation.replace(data, education.institutions[i].location));
    }
  }
};

education.displayEducation();

//insert contact social links, their render is dependant on initial window width
var $footerContacts = $('#footerContacts');

bio.checkPositionAndDisplayContacts = function() {
    if (window.matchMedia('(max-width: 750px)').matches) {
      var facebookSmall = contactListItemSmallClass.replace(data, "facebook") + contactListItemSmallSource.replace(data, bio.footerContacts.facebook);
      var gmailSmall = contactListItemSmallClass.replace(data, "gmail") + contactListItemSmallSource.replace(data, bio.footerContacts.gmail);
      var linkedinSmall = contactListItemSmallClass.replace(data, "linkedin") + contactListItemSmallSource.replace(data, bio.footerContacts.linkedin);
      var googlePlusSmall = contactListItemSmallClass.replace(data, "googleplus") + contactListItemSmallSource.replace(data, bio.footerContacts.googleplus);
      var gitHubSmall = contactListItemSmallClass.replace(data, "github") + contactListItemSmallSource.replace(data, bio.footerContacts.github);
      var twitterSmall = contactListItemSmallClass.replace(data, "twitter") + contactListItemSmallSource.replace(data, bio.footerContacts.twitter);
      $footerContacts.append(facebookSmall,
        gmailSmall,
        linkedinSmall,
        googlePlusSmall,
        gitHubSmall,
        twitterSmall
      );
    }
    else  {
      var facebookLarge = contactListItemLargeClass.replace(data, "facebook") + contactListItemLargeSource.replace(data, bio.footerContacts.facebook) + contactListItemLargeName.replace(data, bio.name);
      var gmailLarge = contactListItemLargeClass.replace(data, "gmail") + contactListItemLargeSource.replace(data, bio.footerContacts.gmail) + contactListItemLargeName.replace(data, bio.contact.email);
      var linkedinLarge = contactListItemLargeClass.replace(data, "linkedin") + contactListItemLargeSource.replace(data, bio.footerContacts.linkedin) + contactListItemLargeName.replace(data, bio.name);
      var googlePlusLarge = contactListItemLargeClass.replace(data, "googleplus") + contactListItemLargeSource.replace(data, bio.footerContacts.googleplus) + contactListItemLargeName.replace(data, bio.name);
      var gitHubLarge = contactListItemLargeClass.replace(data, "github") + contactListItemLargeSource.replace(data, bio.footerContacts.github) + contactListItemLargeName.replace(data, bio.contact.github);
      var twitterLarge = contactListItemLargeClass.replace(data, "twitter") + contactListItemLargeSource.replace(data, bio.footerContacts.twitter) + contactListItemLargeName.replace(data, bio.contact.twitter);
      $footerContacts.append(facebookLarge,
        gmailLarge,
        linkedinLarge,
        googlePlusLarge,
        gitHubLarge,
        twitterLarge
      );
    }
}

bio.checkPositionAndDisplayContacts();

travelCountries.injectGoogleMapAndDisplay = function() {
 //append google map
  $('#mapDiv').append(googleMap);

  //Calls the travelCountries.initializeMap() function when the page loads
  window.addEventListener('load', travelCountries.initializeMap);

  // Vanilla JS way to listen for resizing of the window
  // and adjust map bounds
  window.addEventListener('resize', function(e) {
    //Make sure the map bounds get updated on page resize
    map.fitBounds(mapBounds);
  });

};

travelCountries.injectGoogleMapAndDisplay();

