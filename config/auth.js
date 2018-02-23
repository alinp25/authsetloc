module.exports = {

  'facebookAuth': {
    'clientID': '180588565886718',
    'clientSecret': '599c94c20d92bea835287b6938026557',
    'callbackURL': 'http://localhost:8080/auth/facebook/callback',
    'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
    'profileFields': ['id', 'email', 'name']
  },
  'twitterAuth': {
    'consumerKey': 'mWwQ4OiOwTmPFckjUiYHwtvgn',
    'consumerSecret': 'HqSqRnnOgVb9bx7wZT0Hra0iNdQUTcth3AvP6zXNIKra1ynNYc',
    'callbackURL': 'http://localhost:8080/auth/twitter/callback'
  },
  'googleAuth': {
    'clientID': '374720140953-c0h50f1lqhuqaptq2ta3d5pg86vkd7lp.apps.googleusercontent.com',
    'clientSecret': 'OfOegfex6Q5CL0FBfGQRaDm1',
    'callbackURL': 'http://localhost:8080/auth/google/callback'
  }

}