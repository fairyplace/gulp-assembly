import gulp from 'gulp'
import { path } from './gulp/config/path.js'

global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path:path,
  gulp:gulp,
  plugins:plugins,
}

import { html   } from "./gulp/tasks/html.js"
import { scss   } from './gulp/tasks/scss.js'
import { js     } from './gulp/tasks/js.js'
import { images } from './gulp/tasks/images.js'
import { otfToTtf, ttfToWoff } from './gulp/tasks/fonts.js'
import { server } from "./gulp/tasks/server.js"
import { reset  } from "./gulp/tasks/reset.js"

import { plugins } from './gulp/config/plugins.js'

function watcher() {
  gulp.watch(path.watch.html, html)
  gulp.watch(path.watch.scss, scss)
  gulp.watch(path.watch.js, js)
  gulp.watch(path.watch.images, images)
} 

// Построение сценариев порядка выполения задач
const fonts = gulp.series(otfToTtf, ttfToWoff)
const mainTasks = gulp.series(fonts, gulp.parallel(html, scss, js, images))
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))
const build = gulp.series(reset, mainTasks)

export {dev}
export {build}
export {fonts}

gulp.task('default', dev)