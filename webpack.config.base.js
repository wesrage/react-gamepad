import path from 'path';
import webpack from 'webpack';

export default {
   entry: ['./src/index'],
   output: {
      path: path.join(__dirname, 'dist'),
      filename: 'main.js',
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: [['env', { modules: false }], 'react', 'stage-2'],
                  env: {
                     development: {
                        presets: ['react-hmre'],
                     },
                  },
               },
            },
         },
         {
            test: /\.html$/,
            use: {
               loader: 'file-loader',
               options: {
                  name: '[name].[ext]',
               },
            },
         },
      ],
   },
   plugins: [new webpack.NoEmitOnErrorsPlugin()],
   resolve: {
      extensions: ['.js', '.jsx'],
   },
};
