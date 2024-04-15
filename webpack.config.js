import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const port = process.env.PORT || 3000;

export default {
  mode: "development",
  entry: "./src/main.tsx",
  output: {
    filename: "bundle.[hash].js"
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              localsConvention: "camelCase",
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      favicon: "public/vite.svg"
    })
  ],
  devServer: {
    host: "localhost",
    port: port,
    historyApiFallback: true,
    open: true
  }
};
