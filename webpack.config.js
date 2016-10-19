module.exports = {
  entry: './js/index.js',
  // entry: './js/indexNonReactive.js',
  output: {
    path: __dirname,
    filename: './dist/bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        plugins: ['transform-runtime'],
        presets: ['es2015', 'stage-0', 'react'],
      }
    }]
  }
}

// module.exports = {
// 	entry: './js/svgBarGraph.js',
// 	output: {
// 		path: __dirname
// 		filename: './dist/bundle.js',
// 	},
// 	module: {
// 	    loaders: [{
// 	    	test: /\.jsx?$/,
// 	    	exclude: /node_modules/,
// 	    	loader: 'babel-loader',
// 	    	query: {
// 	        	plugins: ['transform-runtime'],
// 	        	presets: ['es2015', 'stage-0', 'react'],
// 	      	}
// 	    }]
//   	}
// }