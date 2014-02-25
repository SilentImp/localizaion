gulp        = require 'gulp'
coffee      = require 'gulp-coffee'
stylus      = require 'gulp-stylus'
imagemin    = require 'gulp-imagemin'
jade        = require 'gulp-jade'
prefix      = require 'gulp-autoprefixer'
minifyCSS   = require 'gulp-minify-css'
concat      = require 'gulp-concat'

paths =
  coffee: 'developer/coffee/*.coffee'
  images: 'developer/img/*'
  stylus: 'developer/styl/*'
  jade:   'developer/*.jade'
  prefix: 'production/css/*'


gulp.task('stylus', ()->
  return gulp.src(paths.stylus)
    .pipe(stylus())
    .pipe(prefix())
    .pipe(minifyCSS({removeEmpty:true}))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('production/css'))
)

gulp.task('jade', ()->
  return gulp.src(paths.jade)
    .pipe(jade())
    .pipe(gulp.dest('production/'))
)

gulp.task('coffee', ()->
  return gulp.src(paths.coffee)
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
  gulp.watch paths.stylus, ['stylus']
)

gulp.task 'default', ['stylus','jade','coffee', 'images', 'watch']