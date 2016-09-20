/**
 * Created by mailis on 16/09/16.
 */
$(document).ready(function () {

    var $contactCard = $(".contact-card");
    // Close contact card
    $(".close").click(function () {
        $(".personal").hide();
        if ($contactCard.hasClass("green-border")) {
            $contactCard.removeClass("green-border");
        } else {
            $contactCard.removeClass("yellow-border");
        }
        if ($("#like, #next").hasClass("hidden")) {
            $("#like, #next").removeClass("hidden");
        }
        $(".search input").val('');
    });
    // Like and next functionality, show when match occurs
    $(".button").click(function () {
        if (this.id == 'like') {
            if (likesMe == true) {
                $("#like").addClass('hidden');
                $(".match-found p").removeClass('hidden').animate({
                    fontSize: "30px"
                }, 600);
                return false;
            }
            callDragons();
        } else if (this.id == 'next') {
            callDragons();
            if ($("#like").hasClass('hidden')) {
                $("#like").removeClass('hidden');
                $(".match-found p").addClass('hidden').animate({
                    fontSize: "100px"
                }, 600);
            }
        }
    });

    // Setting url
    var apiUrl = 'http://www.dragonsofmugloar.com/dating/api/profile/';
    urlBoy = 'random?gender=boy';
    urlGirl = 'random?gender=girl';
    $(".girls").click(function () {
        url = apiUrl.concat(urlGirl);
    });

    $(".boys").click(function () {
        url = apiUrl.concat(urlBoy);
    });

    $(".search .button a").click(function () {
        url = apiUrl.concat($(".search input").val());
        $("#like, #next").addClass('hidden'); // Hiding like & next button, when searching by ID
    });
    // Search by ID or going through dragons by gender
    $(".gender, .search .button").click(function (event) {
        callDragons();
        $(".personal").show(); // Showing contact card
    });
    // Making AJAX request to Bigbank dragons API & getting responses
    var callback = function (response) {
        renderHtml();
        likesMe = response.likesYou;

        function renderHtml() {
            $(".profile-img img").attr('src', response.image);
            $(".id").html(response.id);
            $(".name").html(response.name);
            $(".sex").html(response.gender);
            $(".description").html(response.description);
            if (response.gender == 'boy' || response.gender == 'vegan') {
                $contactCard.addClass("green-border");
            }
            if (response.gender == 'girl') {
                $contactCard.addClass("yellow-border");
            }
        }
    }

    function callDragons() {
        $.get(url, callback);
    }

});