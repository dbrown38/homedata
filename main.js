// JavaScript Document
var changeBadgeCount = function(type, value) {
    var count = $("#menu-" + type + " .badge").text();
    count = parseInt(count) + value;
    $("#menu-" + type + " .badge").text(count);
};

var showPanel = function(panel) {
	$("#animals").hide();
    $("#food").hide();
    $("#movies").hide();

    $(panel).show();
};

$(document).ready(function() {

  $("#menu-animals").click(function() {
    showPanel("#animals");
  });

  $("#menu-food").click(function() {
    showPanel("#food");
  });

  $("#menu-movies").click(function() {
    showPanel("#movies");
  });

  $("form").submit(function (event) {
    event.preventDefault();
    
    var type = $("#type").val();
    var item = $("#item").val();

    // Make sure the item is not blank.
    if (item === "") {
      $("#item-error").text("A value is required!!!!").show();
      return;
    }
    

    // Make sure the item is unique
    var duplicate = false;
    $("#" + type + " .favorite-list li").each(function(index, li) {
    	if (item === li.innerText) {
    		duplicate = true;
    	}
    });
    if (duplicate) {
      $("#item-error").text("That item already exists").show();
      return;
    }

    $("#item-error").hide();

    var newHtml = "<li>" + item + "</li>";

    $("#" + type + " .favorite-list").append(newHtml);

    $("#item").val("");

    changeBadgeCount(type, 1);
  });

  $(".favorite-list").click(function (event) {
    var target = event.originalEvent.target
    if (! $(target).hasClass("delete")) {
    	return
    }

    var item = $(target).data("name");

    var sure = confirm("Are you sure you want to delete " + item + "?");

    if (! sure) {
    	return;
	}

	var type = $(target).closest(".panel").attr("id")
	changeBadgeCount(type, -1);
	$(target).remove();
  });

});








