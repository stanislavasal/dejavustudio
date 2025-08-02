const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    index: './src/index.js',
    categories: './src/categories/categories.js',
    products: './src/products/products.js',
    search: './src/search/search.js',
    legals: './src/legals/legals.js',
    contacts: './src/contacts/contacts.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'docs')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']]
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
      {
        test: /\.(ttf|otf|woff|woff2)$/i,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),

    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/images/meta/meta.png'),
          to: path.resolve(__dirname, 'docs/images')
        },
      ],
    }),

    // Landing page
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/index.html',
      filename: './index.html',
      chunks: ['index']
    }),

    // Search page
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/search/search/index.html',
      filename: './search/search/index.html',
      chunks: ['search']
    }),

    // Contacts page

    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/contacts/index.html',
      filename: './contacts/index.html',
      chunks: ['contacts']
    }),

    // Сategories pages

    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/categories/collections.html',
      filename: './categories/collections.html',
      chunks: ['categories']
    }),

    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/categories/mockups.html',
      filename: './categories/mockups.html',
      chunks: ['categories']
    }),

    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/categories/textures.html',
      filename: './categories/textures.html',
      chunks: ['categories']
    }),

    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/categories/templates.html',
      filename: './categories/templates.html',
      chunks: ['categories']
    }),

    // Products pages

    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/products/mockups/index1.html',
      filename: './products/mockups/index1.html',
      chunks: ['products']
    }),

    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/products/collections/index1.html',
      filename: './products/collections/index1.html',
      chunks: ['products']
    }),

    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/products/textures/index1.html',
      filename: './products/textures/index1.html',
      chunks: ['products']
    }),

    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/products/templates/index1.html',
      filename: './products/templates/index1.html',
      chunks: ['products']
    }),

    // Legals pages

    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/legals/index-cookies-policy.html',
      filename: './legals/index-cookies-policy.html',
      chunks: ['legals']
    }),

    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/legals/index-FAQ.html',
      filename: './legals/index-FAQ.html',
      chunks: ['legals']
    }),

    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/legals/index-GCT.html',
      filename: './legals/index-GCT.html',
      chunks: ['legals']
    }),

    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/legals/index-get-in-touch.html',
      filename: './legals/index-get-in-touch.html',
      chunks: ['legals']
    }),

    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/legals/index-legal-terms.html',
      filename: './legals/index-legal-terms.html',
      chunks: ['legals']
    }),

    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/legals/index-license.html',
      filename: './legals/index-license.html',
      chunks: ['legals']
    }),

    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/legals/index-privacy-policy.html',
      filename: './legals/index-privacy-policy.html',
      chunks: ['legals']
    }),

    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/legals/index-refund.html',
      filename: './legals/index-refund.html',
      chunks: ['legals']
    }),

    // Partials
    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, './src/partials/analytics.html'),
        location: 'analytics',
        template_filename: '*',
        priority: 'replace'
      }
    ])
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()]
  }
}
