//implementar isso
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');


// Minifica o CSS
const cssmin = require("gulp-cssmin");

// Agrupa todos arquivos em UM
const concat = require("gulp-concat");

const babel = require('gulp-babel');
// Transforma o javascript em formato ilegível para humanos
const uglify = require('gulp-uglify');

const clean = require('gulp-clean');
// Remove comentários CSS
var stripCssComments = require('gulp-strip-css-comments');


const js = [ 'assets/js/util.js','assets/js/apiRequester.js','assets/js/login-cadastro.js','assets/js/recuperarSenha.js'/*, 'assets/js/teste.js'*/]

const css = ['init/reset.css','assets/css/main.css','assets/css/login-cadastro.css','assets/css/telaInicial.css','assets/css/index.css']

gulp.task('clean', function () {
    return gulp.src('dist/')
        .pipe(clean());
});
gulp.task('comprimirImagens', () =>
    gulp.src('assets/img/*.png', 'assets/img/*.jpg')
        .pipe(imagemin())
        .pipe(gulp.dest('assets/img/compress/'))
);

gulp.task('minify-css', function (done) {
    gulp.src(css)
        .pipe(concat('style.min.css'))
        .pipe(stripCssComments({ all: true }))
        .pipe(cssmin())
        .pipe(gulp.dest("assets/css/css-min"));
        done();
});

gulp.task('minify-js', function (done) {
    gulp.src(js)                        // Arquivos que serão carregados, veja variável 'js' no início
        .pipe(concat('script.min.js'))      // Arquivo único de saída
        
     
         .pipe(babel({
            presets: ['@babel/env']
        }))
        // Transforma para formato ilegível
        .pipe(uglify())
        .pipe(gulp.dest("assets/js/js-min"));          // pasta de destino do arquivo(s)
        done();
});

gulp.task('watch',function(){
    gulp.watch('assets/js/*.js',gulp.series(['minify-js']));
    gulp.watch('assets/css/*.css',gulp.series(['minify-css']));
})

gulp.task('default', gulp.parallel('minify-css','minify-js'));