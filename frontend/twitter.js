const FollowToggle = require("./follow_toggle.js");
const UsersSearch = require("./users_search");

$(() => {
  let $toggleButton = $('button.follow-toggle');
  $toggleButton.each( (idx, obj) => {
      obj = new FollowToggle(obj);
  });

  let $search = $('.users-search input');
  $search.each( (idx, obj) => {
    let users = new UsersSearch(obj);
    }
  );


});
