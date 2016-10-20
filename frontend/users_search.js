const FollowToggle = require('./follow_toggle');

class UsersSearch {
  constructor(el) {
    this.$el = $(el);
    this.$el.on('input', (e) => this.handleInput(e));
  }

  handleInput(e) {
    e.preventDefault();

    $.ajax({
      url: '/users/search.json',
      data: {query: this.$el.val()},
      success: (users) => {
        this.renderResults(users);
      }
    });
  }

  renderResults(users) {
    $('ul.users').empty();
    users.forEach( (user) => {
      let userName = user.username;
      let url = `/users/${user.id}`;
      let link = `<a href="${url}">${userName}</a>`;
      let button = $("<button class='follow-toggle'>");
      let li = $('<li></li>');
      li.append(link);
      li.append(button);

      // debugger

      $('ul.users').append(li);

      new FollowToggle(button, {user_id: user.id, followed: user.followed.toString()});
    });
  }
}

module.exports = UsersSearch;
