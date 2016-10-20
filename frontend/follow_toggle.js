class FollowToggle {
  constructor(el, options){
    this.$el = $(el);
    this.userId = this.$el.data("user-id")|| options['user_id'];
    this.followState = this.$el.data("initial-follow-state") || options['followed'];
    this.render();
    this.$el.click( e => this.handleClick(e));
  }

  render() {
    if (this.followState === "false") {
      this.$el.text('Follow!');
      this.$el.prop('disabled', false);
    } else if (this.followState === "true" ) {
      this.$el.text('Unfollow!');
      this.$el.prop('disabled', false);
    } else {
      this.$el.prop('disabled', true);
    }
  }

  handleClick(e) {
    const origFollowState = this.followState;
    e.preventDefault();


    this.followState = "processing";
    this.render();

    $.ajax({
      type: (origFollowState === "false" ? 'POST' : 'DELETE'),
      url: `/users/${this.userId}/follow`,
      dataType: 'JSON',
      success: () => {
        this.successCb(origFollowState);
      }
    });
  }

  successCb(origFollowState) {
    if (origFollowState) {
      this.followState = ( origFollowState === "false" ? "true" : "false");
    }
    this.render();
  }
}

module.exports = FollowToggle;
