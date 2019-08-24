// Copyright (c) 2019 deviltea
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

module.exports = {
  devServer: {
    // Enable dev server to accept the external requests.
    disableHostCheck: true
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/neo-library-fronted/'
    : '/'
}
