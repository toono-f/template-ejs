// 設定ファイル
// 対象パスやオプションを指定
// const DOMAIN = (module.exports.DOMAIN = 'http://www.example.com');
const DIR = (module.exports.DIR = {
  // 語尾にスラッシュはつけない
  PATH: '',
  SRC: 'src',
  DEST: 'dst',
  BUILD: 'build',
});
const WEBPACK_CONFIG = {
  NODE_ENV: JSON.stringify(process.env.NODE_ENV),
};

module.exports.serve = {
  dest: {
    notify: false,
    startPath: `${DIR.PATH}/`,
    ghostMode: false,
    server: {
      baseDir: DIR.DEST,
      index: 'index.html',
      routes: {
        [DIR.PATH]: `${DIR.DEST}${DIR.PATH}/`,
      },
    },
  },
  build: {
    notify: false,
    startPath: DIR.PATH,
    ghostMode: false,
    server: {
      baseDir: DIR.BUILD,
      index: 'index.html',
      routes: {
        [DIR.PATH]: `${DIR.BUILD}${DIR.PATH}/`,
      },
    },
  },
};

const { DefinePlugin } = require('webpack');
// const TerserPlugin = require('terser-webpack-plugin');  // license を main.min.jsに含める場合コメント解除
module.exports.scripts = {
  src: [`./${DIR.SRC}/**/*.js`],
  dest: {
    development: `./${DIR.DEST}${DIR.PATH}/assets/js`,
    production: `./${DIR.BUILD}${DIR.PATH}/assets/js`,
  },
  webpack: {
    entry: {
      main: `./${DIR.SRC}/js/main.js`,
    },
    output: {
      filename: `[name].js`,
    },
    target: ['web', 'es5'], // IE非対応の場合は safari10 まで対応させるようにes6に変更
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime'],
              sourceType: 'unambiguous',
            },
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                // ソースマップを出力する場合、以下2行コメント解除
                // sourceMap:
                // process.env.NODE_ENV === "development" ? true : false,
                url: false,
                importLoaders: 2,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    require('cssnano')({
                      preset: ['default', { minifyFontValues: { removeQuotes: false } }],
                    }),
                    require('autoprefixer')({
                      grid: true,
                    }),
                    require('postcss-sort-media-queries')({
                      sort: 'mobile-first',
                    }),
                  ],
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                // ソースマップを出力する場合、以下2行コメント解除
                // sourceMap:
                // process.env.NODE_ENV === "development" ? true : false,
                implementation: require('sass'),
                sassOptions: {
                  fiber: require('fibers'),
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [new DefinePlugin(WEBPACK_CONFIG)],
    // license を main.min.jsに含める場合コメント解除
    // optimization: {
    //   minimizer: [
    //     new TerserPlugin({
    //       extractComments: false,
    //     }),
    //   ],
    // },
  },
};

module.exports.vendorScripts = {
  src: [`./${DIR.SRC}/js/vendor/**/*.js`],
  // concat: "vendor.js", // 1つのjsファイルに統合する場合コメント解除
  dest: `./${DIR.DEST}${DIR.PATH}/assets/js/`,
};

module.exports.pug = {
  src: [`${DIR.SRC}/**/*.pug`, `!${DIR.SRC}/**/_**/*.pug`, `!${DIR.SRC}/**/_*.pug`],
  dest: `${DIR.DEST}${DIR.PATH}`,
  opts: {
    pretty: true,
  },
  json: `${DIR.SRC}/data.json`,
};

module.exports.ejs = {
  src: [`${DIR.SRC}/**/*.ejs`, `!${DIR.SRC}/**/_**/*.ejs`, `!${DIR.SRC}/**/_*.ejs`],
  dest: `${DIR.DEST}${DIR.PATH}`,
  json: `${DIR.SRC}/data.json`,
};

module.exports.sass = {
  src: [`${DIR.SRC}/**/*.{sass,scss}`, `!${DIR.SRC}/**/_**/*.{sass,scss}`, `!${DIR.SRC}/**/_*.{sass,scss}`],
  dest: `${DIR.DEST}${DIR.PATH}/assets/css`,
};

module.exports.replace = {
  html: {
    src: [`${DIR.DEST}${DIR.PATH}/**/*.html`],
    dest: `${DIR.BUILD}${DIR.PATH}`,
  },
};

module.exports.cleanCss = {
  src: `${DIR.DEST}${DIR.PATH}/assets/css/*.css`,
  dest: `${DIR.BUILD}${DIR.PATH}/assets/css`,
};

module.exports.copy = {
  dest: {
    src: [`${DIR.SRC}/images/**/*.*`, `${DIR.SRC}/font/**/*.*`, `${DIR.SRC}/json/**/*.*`, `${DIR.SRC}/file/**/*.*`],
    dest: `${DIR.DEST}${DIR.PATH}/assets`,
    opts: {
      base: `${DIR.SRC}`,
    },
  },

  build: {
    src: [`${DIR.SRC}/font/**/*.*`, `${DIR.SRC}/json/**/*.*`, `${DIR.SRC}/file/**/*.*`],
    dest: `${DIR.BUILD}${DIR.PATH}/assets`,
    opts: {
      base: `${DIR.SRC}`,
    },
  },

  img: {
    src: [`${DIR.SRC}/images/**/*.*`],
    dest: `${DIR.BUILD}${DIR.PATH}/assets/images/no_compress/`,
    opts: {
      base: `${DIR.SRC}`,
    },
  },

  js: {
    src: [`${DIR.SRC}/js/vendor/**/*.js`],
    // concat: "vendor.js", // 1つのjsファイルに統合する場合コメント解除
    dest: `${DIR.BUILD}${DIR.PATH}/assets/js/`,
    opts: {
      base: `${DIR.SRC}`,
    },
  },

  php: {
    src: [`${DIR.SRC}/html/**/*.php`],
    dest: `${DIR.BUILD}${DIR.PATH}`,
    opts: {
      base: `${DIR.SRC}/html/`,
    },
  },
};

module.exports.imagemin = {
  src: [
    `${DIR.DEST}${DIR.PATH}/**/*.{jpg,jpeg,png,gif,svg,ico}`,
    `!${DIR.DEST}${DIR.PATH}/assets/images/**/no_compress/*.*`,
    `!${DIR.DEST}${DIR.PATH}/assets/font/*.*`,
  ],
  dest: `${DIR.BUILD}${DIR.PATH}/assets/images`,
  opts: {
    pngquant: {
      quality: [0.8, 1.0],
      speed: 1,
    },
    mozjpeg: {
      quality: 90,
      progressive: true,
    },
    svgo: {
      plugins: [{ removeViewBox: false }, { cleanupIDs: true }],
    },
  },
};

module.exports.imageminWebp = {
  dest: {
    src: [`${DIR.SRC}/images/**/*.{jpg,jpeg,png}`, `!${DIR.SRC}/assets/font/*.*`],
    dest: `${DIR.DEST}${DIR.PATH}/assets`,
    opts: {
      base: `${DIR.SRC}`,
    },
  },

  build: {
    src: [`${DIR.DEST}${DIR.PATH}/**/*.{jpg,jpeg,png}`, `!${DIR.DEST}${DIR.PATH}/assets/font/*.*`],
    dest: `${DIR.BUILD}${DIR.PATH}/assets/images`,
    opts: {
      base: `${DIR.SRC}`,
    },
  },
};

module.exports.clean = {
  dest: {
    path: [`${DIR.DEST}`],
  },
  build: {
    path: [`${DIR.BUILD}`],
  },
};
