# New-Portfolio

A single-page personal portfolio built with Angular, with a thin Django wrapper that serves
the compiled build.

This is **v2**. The first version, [htmlPortfolio](https://github.com/kingpingx/htmlPortfolio),
was loose HTML, CSS and JavaScript files opened straight from disk; this rebuild moves the
same content into an Angular project with a real build step.

**[Live demo →](https://angular-portfolio-1o32.onrender.com/)**

---

## What changed from v1

| [htmlPortfolio](https://github.com/kingpingx/htmlPortfolio) (v1) | New-Portfolio (v2) |
| --- | --- |
| Loose `main.html` and `Experience.html` at the repo root | One Angular component rendering one page |
| A flat `style.css` | SCSS, compiled by the Angular CLI |
| Fonts and images dropped in the root directory | `src/assets/`, emitted with the build |
| No dependency management | npm, with versions pinned in `package.json` |
| Opened from the filesystem | Built to `dist/`, served over HTTP |

## The page

One scrolling page, no router — `app-routing.module.ts` is deliberately empty. The sections are:

`home` · `about` · `bio` · `education` · `experience` · `portfolio` · `blog` · `contact`

Project cards open in Bootstrap modals; the contact section renders a form and an embedded map.

## Stack

- **Angular 15.2** with TypeScript 4.9 and SCSS
- **Bootstrap 3.4, jQuery 3.5, Font Awesome, Iconify** — pulled from CDNs in the Django template
- **Django 4.2** — see below

### What the Django side actually does

Nothing but serve files. The whole of `backend/backend/urls.py` is:

```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name="home.html"), name="home")
]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
```

There are no apps, no models and no API endpoints, and the Angular side makes no HTTP calls.
The `home.html` template loads the compiled Angular bundle from `backend/static/angular-build/`
along with the CDN dependencies. Django is a static file host here, not an application server —
which means the frontend can be deployed on its own to any static host.

## Layout

```
frontend/                  the Angular application
  src/
    index.html             shell; the real markup lives in the component
    app/
      app.component.html   the entire page
      app.component.scss   its styles
      app-routing.module.ts  empty routes - single page, no navigation
    assets/                images, fonts, scripts.js
  angular.json             builds to dist/frontend
backend/                   Django, serving the build
  backend/
    urls.py                admin + one TemplateView + static files
    settings.py
  templates/home.html      loads the Angular bundle and the CDN dependencies
  static/angular-build/    the committed production build
  requirements.txt
start.sh                   venv + install + runserver
```

## Running it

### Frontend

```bash
cd frontend
npm install
ng serve
```

Then open <http://localhost:4200>. This is the fast path — live reload, no Django involved.

### Backend

```bash
cd backend
python -m venv ../portfolio_env
../portfolio_env/Scripts/activate      # Linux/macOS: source ../portfolio_env/bin/activate
pip install -r requirements.txt
python manage.py runserver
```

Then open <http://localhost:8000>. This serves whatever build currently sits in
`backend/static/angular-build/`, so run it after a build if you want to see your changes.

### Building the frontend into Django

```bash
cd frontend
ng build --configuration production \
         --output-path ../backend/static/angular-build \
         --output-hashing none
```

Add `--watch` to rebuild into Django on every save. `--output-hashing none` keeps the
filenames stable so `home.html` does not have to change each time.

## Deploying

The live demo is a static deploy of the Angular build — no Django process. To host it
somewhere else, build with a base href matching the path it will be served from:

```bash
ng build --configuration production --base-href /New-Portfolio/
```

At a domain root, `--base-href /` (the default) is correct. Since there is no router,
there are no deep links to break, so no SPA fallback is needed.

## Notes

- `backend/requirements.txt` is saved as UTF-16. Re-save it as UTF-8 if `pip` complains.
- `backend/settings.py` ships `DEBUG = True` and a committed `SECRET_KEY`. That is fine for a
  static deploy where Django never runs, but both must change before running Django in public.
