import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace'
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser'
import typescript from '@rollup/plugin-typescript'

const svelteConfig = require('./svelte.config')

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.ts',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js'
  },
  plugins: [
    svelte(svelteConfig),

    replace({
      // Configuration env vars passthrough
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.REACT_APP_HC_CONN_URL': JSON.stringify(process.env.REACT_APP_HC_CONN_URL),

      // GraphQL client type to use for development.
      // Possible values:
      //   - 'mock' to use a lightweight mocked datasource
      //   - 'holochain' to connect to a Holochain websocket running Holo-REA at process.env.REACT_APP_HC_CONN_URL
      // Planned:
      //   - 'commonspub'
      //   - 'scuttlebutt'
      __GRAPHQL_CLIENT_MODULE__: '@vf-ui/graphql-client-holochain',
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte', 'graphql']
    }),
    commonjs(),
    typescript({ sourceMap: !production }),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true
        });
      }
    }
  };
}
