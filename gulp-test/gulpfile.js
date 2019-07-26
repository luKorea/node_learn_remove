const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require("browser-sync").create(), //自动刷新
    reload = browserSync.reload;
const filter = require('gulp-filter');
// gulp-filter 包， 以确保只有 *.css 文件响应 .reload - 这样一来，
// 您还是会得到CSS注入，而不是整个页面重载。
const useref = require('gulp-useref'); //合并JS
const uglify = require('gulp-uglify'); //js压缩
const minifyCSS = require('gulp-minify-css'); //压缩css
const gulpIf = require('gulp-if');
const del = require('del');
const runSequence = require('run-sequence');//组织任务执行顺序,未使用
const rename = require('gulp-rename');//重命名
const watch = require('gulp-watch');//监视
const minifyHtml = require("gulp-minify-html");//压缩html
const babel = require("gulp-babel");
// npm install --save-dev gulp-babel@7 babel-core babel-preset-env
const jshint = require("gulp-jshint");//js检查
const imagemin = require('gulp-imagemin');//压缩图片文件
const pngquant = require('imagemin-pngquant'); //png图片压缩插件
const connect = require('gulp-connect');//引入gulp-connect模块 浏览器刷新
const cache = require('gulp-cache');//压缩图片可能会占用较长时间，使用 gulp-cache 插件可以减少重复压缩。
const RevAll = require("gulp-rev-all");//md5后缀

gulp.task('html', () => {//编译html
  return gulp.src('src/*.html')
      .pipe(gulp.dest('src/dist'))
      .pipe(connect.reload());
});

gulp.task('css', () => {//编译scss
  return gulp.src('src/scss/**/*.scss')
      .pipe(sass())//编译scss
      // .pipe(gulp.dest('src/css')) //当前对应css文件
      .pipe(gulp.dest('src/dist/css')) //当前对应css文件
      .pipe(connect.reload());//更新
});

gulp.task('js', () => {//编译ES6并且压缩
  return gulp.src('src/js/**/*.js')
      .pipe(jshint())//检查代码
      .pipe(babel({//编译ES6
        presets: ['es2015']
      }))
      .pipe(uglify())//压缩js
      .pipe(gulp.dest('src/dist/js'))
      .pipe(connect.reload());
});

gulp.task('fonts', () => {
  return gulp.src('src/fonts/**/*')
      .pipe(gulp.dest('src/dist/fonts'))
});

gulp.task('images', () => {
  return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
      .pipe(cache(imagemin({//压缩图片文件
        interlaced: true,
      })))
      .pipe(gulp.dest('dist/images'))
});

gulp.task('clean:src/dist', () => {//删除之前生成的文件
  return del(['src/dist']);
});

gulp.task('clean:dist', () => {//异步清理除dist目录图片以外的文件
  return del(['src/dist/**/*', '!dist/images', '!dist/images/**/*']);
});

gulp.task('minFs', () => {//压缩文件
  return gulp.src('src/dist/*.html')
      .pipe(useref())//合并js
      .pipe(
          gulpIf('*.js', uglify())//压缩js
      )
      .pipe(gulpIf('*.css', minifyCSS()))//压缩css
      .pipe(RevAll.revision({//不被重命名
        dontRenameFile: [/^\/favicon.ico$/g, ".html"]
      }))
      .pipe(gulp.dest('dist'));
});

gulp.task('connect:src', () => {
  connect.server({
    root: 'src',//根目录
    // ip:'192.168.11.62',//默认localhost:8080
    livereload: true,//自动更新
    port: 9998//端口
  })
});

gulp.task('connect:dist', function (cb) {
  connect.server({
    root: 'src',//根目录
    // ip:'192.168.11.62',//默认localhost:8080
    livereload: true,//自动更新
    port: 9999//端口
  });
  cb()//执行回调，表示这个异步任务已经完成，起通作用,这样会执行下个任务
});

gulp.task('watchs', () => {//监听变化执行任务
  //当匹配任务变化才执行相应任务
  gulp.watch('src/*.html', gulp.series('html'));
  gulp.watch('src/scss/**/*.scss', gulp.series('css'));
  gulp.watch('src/js/**/*.js', gulp.series('js'));
  gulp.watch('src/fonts/**/*', gulp.series('fonts'));
  gulp.watch('src/images/**/*', gulp.series('images'));
});

//gulp.series|4.0 依赖顺序执行
//gulp.parallel|4.0 多个依赖嵌套'html','css','js'并行

//下面1和2分别运行

//1.自动监测文件变化并刷新浏览器

//初始生成src/dist目录
gulp.task('init', gulp.series('clean:src/dist', gulp.parallel('html', 'css', 'js', 'fonts', 'images')));

//启动任务connect:src服务，并监控变化
gulp.task('run', gulp.series('init', 'connect:src', 'watchs'));

//2.生成打包文件
gulp.task('build', gulp.series('clean:dist', gulp.parallel('init'), 'minFs'));

//启动任务connect:dist服务，生成打包文件后，监控其变化
gulp.task('serve', gulp.series('connect:dist', 'build', 'clean:src/dist', 'watchs'));
