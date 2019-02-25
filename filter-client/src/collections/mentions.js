// Dependencies
var Backbone = require('backbone');

// Models
var Mention = require('../models/mentions.js');

// Collection
var Mentions = Backbone.Collection.extend({
  'model': Mention,
  'addMention': function addMention (mention) {
    this.add({
      'createdAt': mention.created_at,
      'id': mention.id_str,
      'text': mention.text,
      'user': {
        'name': mention.user.name,
        'avatar': mention.user.profile_image_url
      },
      'replyCount': mention.reply_count,
      'reteweetCount': mention.retweet_count,
      'favoriteCount': mention.favorite_count,
      'coordinates': mention.coordinates
    });
  }
});

// Mock
var response = [{
  'created_at': 'Tue Jan 15 10:22:02 +0000 2019',
  'id_str': '1085119914376077314',
  'text': 'We are hiring in the STATION F team! If you LOVE startups, with capital letters, and are looking for an internship,… https://t.co/1bqWJI5uDi',
  'user': {
    'name': 'STATION F',
    'profile_image_url': 'http://pbs.twimg.com/profile_images/937640813395431425/HfQbWe_1_normal.jpg'
  },
  'coordinates': null,
  'retweet_count': 2,
  'favorite_count': 12
}, {
  'created_at': 'Tue Jan 15 09:48:46 +0000 2019',
  'id_str': '1085111542725644288',
  'text': 'Réparer l\'ascenseur social, s\'engager à tous les étages, soutenir l\'égalité des chances ! Bravo @BNPParibas… https://t.co/QHg9s2jb0R',
  'user': {
    'name': 'La France s\'engage',
    'profile_image_url': 'http://pbs.twimg.com/profile_images/879939336212537345/9s_xtRrJ_normal.jpg'
  },
  'coordinates': null,
  'retweet_count': 4,
  'favorite_count': 8
}];

var formatter = function formatter (data) {
  var results = [];

  data.forEach(function loop (mention) {
    var item = {
      'createdAt': mention.created_at,
      'id': mention.id_str,
      'text': mention.text,
      'user': {
        'name': mention.user.name,
        'avatar': mention.user.profile_image_url
      },
      'replyCount': mention.reply_count,
      'reteweetCount': mention.retweet_count,
      'favoriteCount': mention.favorite_count,
      'coordinates': mention.coordinates
    };

    results.push(item);
  });
  return results;
};

var mentionsList = formatter(response);

mentionsList.forEach(function mentionsLoop (item) {
  mentionsList.push(new Mention(item));
});

module.exports = new Mentions(mentionsList);