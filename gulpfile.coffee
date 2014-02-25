gulp = require 'gulp'
coffee = require 'gulp-coffee'
stylus = require 'gulp-stylus'
imagemin = require 'gulp-imagemin'
jade = require 'gulp-jade'

paths =
  coffee: 'developer/coffee/*.coffee'
  images: 'developer/img/*'
  jade: 'developer/*.jade'


gulp.task('jade', ()->
  return gulp.src(paths.jade)
    .pipe(jade())
    .pipe(gulp.dest('production/'))
)

gulp.task('coffee', ()->
  return gulp.src(paths.scripts)
    .pipe(coffee())
    .pipe(gulp.dest('production/js'))
)

gulp.task('images', ()->
  return gulp.src(paths.images)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('production/img'))
)

gulp.task('watch', ()->
  gulp.watch paths.scripts, ['coffee']
  gulp.watch paths.images, ['images']
  gulp.watch paths.jade, ['jade']
)

gulp.task 'default', ['jade','coffee', 'images', 'watch']