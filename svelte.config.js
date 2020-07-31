// :NOTE: This file is picked up by some editor tooling and will determine how syntax is
//        handled in different Svelte template blocks.
//
//        It is also wired up manually to other config files in this repo so that it remains
//        a canonical source of truth.

// const path = require('path')
const sveltePreprocess = require('svelte-preprocess')

const production = !process.env.ROLLUP_WATCH

module.exports = {
  // enable run-time checks when not in production
  dev: !production,
  // we'll extract any component CSS out into
  // a separate file - better for performance
  css: css => {
    css.write('public/build/bundle.css')
  },
  customElement: false, // generate Svelte runtime components in app build (not WebComponents)
  preprocess: [
    sveltePreprocess({
      // sourceMap: true,
      postcss: true,
      // :TODO: has issues with Svelte `3.15.0`, subsequent versions may fix
      // typescript: {
      //   tsconfigDirectory: path.resolve(__dirname, '../'),
      //   transpileOnly: false,
      // },
      stylus: false,
      scss: false,
      pug: false,
    }),
  ],
}
