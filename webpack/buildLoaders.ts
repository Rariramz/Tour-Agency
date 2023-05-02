import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types';

const buildLoaders = ({ isDev }: BuildOptions): webpack.RuleSetRule[] => {
  return [
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: ['ts-loader']
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader'
      ]
    },
    {
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    },
    {
      test: /\.(?:ico|png|jpg|jpeg|gif)$/i,
      type: 'asset/resource'
    },
    {
      test: /\.(woff(2)?|eot|ttf|otf)$/i,
      type: 'asset/inline'
    }
  ];
};

export default buildLoaders;
