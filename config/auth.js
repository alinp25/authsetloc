module.exports = {

  'facebookAuth': {
    'clientID': '180588565886718',
    'clientSecret': '599c94c20d92bea835287b6938026557',
    'callbackURL': 'http://localhost:8080/auth/facebook/callback',
    'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
    'profileFields': ['id', 'email', 'name']
  },
  'twitterAuth': {
    'consumerKey': '',
    'consumerSecret': '',
    'callbackURL': 'http://localhost:8080/auth/twitter/callback'
  },
  'googleAuth': {
    'clientID': '',
    'clientSecret': '',
    'callbackURL': 'http://localhost:8080/auth/google/callback'
  }

}