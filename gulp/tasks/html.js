// Откючение кэширования стилей в браузере
import versionNumber from "gulp-version-number";
// Обертка изображений в picture для поддержки .webp
import WebpHtmlNosvg from "gulp-webp-html-nosvg";

export const html = () => {
	return (
		app.gulp
			.src(app.path.src.html)
			.pipe(app.plugins.replace(/@img\//g, "img/"))
			// Запуск только в режиме сборки
			// Генерация версии файла для *.js и *.css
			.pipe(
				app.plugins.if(
					app.isBuild,
					versionNumber({
						value: "%DT%",
						append: {
							key: "_v",
							cover: 0,
							to: ["css", "js"],
						},
						output: {
							file: "gulp/version.json",
						},
					})
				)
			)
			.pipe(WebpHtmlNosvg())
			.pipe(app.gulp.dest(app.path.build.html))
			.pipe(app.plugins.browserSync.stream())
	);
};
