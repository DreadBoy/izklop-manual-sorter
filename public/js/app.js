var app = {};

app.Comment = Backbone.Model.extend({
    defaults: {
        text: '',
        type: 0
    },
    url: "/comment",
    initialize: function () {
    }
});

app.CommentView = Backbone.View.extend({
    initialize: function () {
        this.template = $('#comment-template').html();
    },
    render: function () {
        var template = _.template(this.template, {})(this.model.attributes);
        this.$el.html(template);
        return this;
    }
});

app.CommentList = Backbone.Collection.extend({
    model: app.Comment,
    url: "/comments",
    initialize: function () {
    }
});

app.commentList = new app.CommentList();

app.AppView = Backbone.View.extend({
    initialize: function () {
        app.commentList.on('add', this.addOne, this);
        app.commentList.on('reset', this.addAll, this);
        app.commentList.fetch();

        this.headerView = new app.HeaderView();
        this.headerView.render();
    },
    el: $('.page-content'),
    filter: function (type) {
        //this.$el.html(this.lobbyView.render().$el);
        this.headerView.select(type);
    },
    addOne: function(comment){
        var view = new app.CommentView({model: comment});
        $('.comment-list').append(view.render().el);
    },
    addAll: function(){
        this.$('.comment-list').html('');
        app.commentList.each(this.addOne, this);
    }
});

app.HeaderView = Backbone.View.extend({
    initialize: function () {
        this.template = $('#header-template').html();
        this.el = $('header');
    },
    render: function () {
        var template = _.template(this.template, {});
        this.el.html(template);
        return this;
    },
    select: function (type) {
        this.el.find(".header-link").removeClass("active");
        this.el.find(".header-link.type" + type).addClass("active");
    }
});

app.Router = Backbone.Router.extend({

    routes: {
        'neuvrsceni': 'neuvrsceni',
        'primerni': 'primerni',
        'neprimerni': 'neprimerni'
    },
    initialize: function () {
    },
    neuvrsceni: function () {
        if(!this.appView)
            this.appView = app.appView;
        this.appView.filter(0);
    },
    primerni: function () {
        if(!this.appView)
            this.appView = app.appView;
        this.appView.filter(1);
    },
    neprimerni: function () {
        if(!this.appView)
            this.appView = app.appView;
        this.appView.filter(-1);
    }
});

$(document).ready(function () {
    app.appView = new app.AppView();
    new app.Router({appView: app.appView});
    Backbone.history.start();
});