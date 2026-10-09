/**
 * Theme switcher (claro / oscuro)
 * - El tema inicial lo aplica el script inline de _ThemeHead.cshtml.
 * - La preferencia del usuario se guarda en localStorage ('theme').
 * - Si el usuario nunca eligio, se sigue la preferencia del sistema operativo.
 */
(function () {
    var KEY = 'theme';
    var root = document.documentElement;
    var media = window.matchMedia('(prefers-color-scheme: dark)');

    function stored() {
        try {
            var v = localStorage.getItem(KEY);
            return v === 'light' || v === 'dark' ? v : null;
        } catch (e) { return null; }
    }

    function current() {
        return root.getAttribute('data-bs-theme') === 'dark' ? 'dark' : 'light';
    }

    function syncButtons() {
        var dark = current() === 'dark';
        document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
            btn.setAttribute('aria-pressed', String(dark));
            btn.setAttribute('aria-label', dark ? 'Activar modo claro' : 'Activar modo oscuro');
            btn.setAttribute('title', dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
        });
    }

    function apply(theme, animate) {
        if (animate) {
            root.classList.add('theme-transition');
            window.setTimeout(function () { root.classList.remove('theme-transition'); }, 300);
        }
        root.setAttribute('data-bs-theme', theme);
        syncButtons();
        document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: theme } }));
    }

    document.addEventListener('DOMContentLoaded', function () {
        syncButtons();
        document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var next = current() === 'dark' ? 'light' : 'dark';
                try { localStorage.setItem(KEY, next); } catch (e) { }
                apply(next, true);
            });
        });
    });

    // Sin preferencia guardada: seguir los cambios del sistema operativo.
    var onSystemChange = function (e) {
        if (!stored()) apply(e.matches ? 'dark' : 'light', true);
    };
    if (media.addEventListener) media.addEventListener('change', onSystemChange);
    else if (media.addListener) media.addListener(onSystemChange);
})();
